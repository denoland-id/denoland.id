import {
  CreateBranchtagUrls,
  FetchModuleMetadata,
  FetchModuleBranchtags,
  GitHubTreeFile,
  TransformBranchtags,
  TreeFile,
} from "@/types";

import { getGitHubHeaders } from "@/services/github";
import { getModulesTable } from "@/services/airtable";

export const createBranchtagUrls: CreateBranchtagUrls = ({
  type,
  org,
  repo,
}) => {
  switch (type) {
    case "GitHub":
      return [
        `https://api.github.com/repos/${org}/${repo}/branches`,
        `https://api.github.com/repos/${org}/${repo}/tags`,
      ];
    case "GitLab":
      return [`https://gitlab.com/${org}/${repo}/refs`];
    default:
      throw new Error("invalid module type");
  }
};

export const transformBranchtags: TransformBranchtags = ({ data, type }) => {
  switch (type) {
    case "GitHub":
      return (data as any[]).map(({ name }) => name);
    case "GitLab":
      return [...data.Branches, ...data.Tags];
    default:
      throw new Error("invalid module type");
  }
};

export const fetchModuleBranchtags: FetchModuleBranchtags = async ({
  type,
  org,
  repo,
}) => {
  const refs: string[] = [];
  const urls = createBranchtagUrls({ type, org, repo });

  let headers: Headers;
  if (type === "GitHub") {
    headers = new Headers(getGitHubHeaders());
  }

  let data: any;
  for (const url of urls) {
    data = await fetch(url, { headers }).then((resp) => resp.json());
    refs.push(...transformBranchtags({ data, type }));
  }
  return refs;
};

export const fetchModuleMetadata: FetchModuleMetadata = async ({
  segments,
  isApi = false,
} = {}) => {
  let [, module, branchtag = null] = /([a-z]+)(?:@(.+))?/.exec(segments[0]);

  const result = await getModulesTable()
    .select({ filterByFormula: `AND({name} = '${module}', {active} = 1)` })
    .all();

  if (result.length > 0) {
    const meta = result[0].fields;

    let headers: Headers;
    if (meta.type === "GitHub") {
      headers = getGitHubHeaders();
    } else if (meta.type === "GitLab") {
      // TODO: implement gitlab request headers
    }

    if (!branchtag) {
      if (meta.type === "GitHub") {
        const branchtagUrl = `https://api.github.com/repos/${meta.org}/${meta.repo}`;
        const resp = await fetch(branchtagUrl, { headers });
        const data = await resp.json();
        branchtag = data.default_branch;
      } else if (meta.type === "GitLab") {
        // TODO: implement gitlab branchtag fetching
      } else {
        branchtag = "master";
      }
    }

    let branchtags: string[] = null;
    let breadcrumbs: string[][] = null;

    if (!isApi) {
      branchtags = await fetchModuleBranchtags(meta);

      const sx = ["x", ...segments];
      breadcrumbs = sx.map((_, i) => [
        sx[i],
        `/${sx.slice(0, i + 1).join("/")}`,
      ]);
    }

    const path = `/${segments.slice(1).join("/")}`;

    let tree: TreeFile | TreeFile[] = null;
    if (meta.type === "GitHub") {
      const treeUrl = `https://api.github.com/repos/${meta.org}/${meta.repo}/contents${path}?ref=${branchtag}`;
      const resp = await fetch(treeUrl, { headers });
      if (resp.ok) {
        tree = await resp.json();
      }
    } else if (meta.type === "GitLab") {
      const treeUrl = `https://gitlab.com/${meta.org}/${meta.repo}/-/refs/${branchtag}/logs_tree/?format=json`;
      // TODO: implement gitlab tree fetching
    } else {
      // TODO: implement tree fallback action
    }

    let content: string = null;

    if (tree) {
      if (Array.isArray(tree)) {
        tree = tree.sort((a, b) => a.type.localeCompare(b.type));
      } else {
        if (meta.type === "GitHub") {
          const file = tree as GitHubTreeFile;
          content = Buffer.from(file.content, file.encoding).toString();
        } else if (meta.type === "GitLab") {
          // TODO: implement gitlab file fetching
        } else {
          // TODO: implement file fallback action
        }
      }
    }

    return {
      meta,
      branchtag,
      branchtags,
      segments,
      breadcrumbs,
      path,
      tree,
      content,
    };
  }

  return { segments };
};

export const getContentType = (name: string) => {
  switch (/\w+\.(\w+)/.exec(name)[1]) {
    case "js":
      return "application/javascript";
    case "ts":
      return "application/typescript";
    default:
      return "text/plain";
  }
};
