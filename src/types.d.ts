export type ModuleType = "GitHub" | "GitLab";

// https://github.com/denoland-id/registry/blob/master/types.d.ts#L3-L8
export interface DenoDbEntry {
  desc: string;
  type: ModuleType;
  org: string;
  repo: string;
}

// https://github.com/denoland-id/registry/blob/master/types.d.ts#L10-L13}
export interface DenoDatabase {
  $schema?: string;
  [module: string]: DenoDbEntry;
}

export interface DenoModule extends DenoDbEntry {
  name: string;
  repoUrl: string;
}

export type GitHubTreeFileType = "dir" | "file";
export type GitLabTreeFileType = "tree" | "blob";

export type TreeFileType = GitHubTreeFileType | GitLabTreeFileType;

export interface TreeFile<T = TreeFileType> {
  name: string;
  type: T;
  url: string;
}

export interface GitHubTreeFile extends TreeFile<GitHubTreeFileType> {
  size: number;
  content: string;
  download_url: string;
  encoding: BufferEncoding;
}

export interface RegistryResult {
  meta?: DenoModule;
  branchtag?: string;
  branchtags?: string[];
  segments?: string[];
  breadcrumbs?: string[][];
  path?: string;
  tree?: TreeFile | TreeFile[];
  readme?: string;
  content?: string;
  sourceUrl?: string;
  errors?: any;
}

export type CreateRepoUrl = (opts: {
  type: ModuleType;
  org: string;
  repo: string;
}) => string;

export type CreateBranchtagUrls = (opts: {
  type: ModuleType;
  org: string;
  repo: string;
}) => string[];

export type TransformBranchtags = (opts: {
  data: any;
  type: ModuleType;
}) => string[];

export type FetchModuleBranchtags = (opts: {
  type: ModuleType;
  org: string;
  repo: string;
}) => Promise<string[]>;

export type FetchModuleMetadata = (opts: {
  segments?: string[];
  isApi?: boolean;
}) => Promise<RegistryResult>;
