import { FieldSet } from "airtable";

export type ModuleType = "GitHub" | "GitLab";

export interface DenoModule extends FieldSet {
  name: string;
  desc: string;
  active: boolean;
  type: ModuleType;
  org: string;
  repo: string;
  url: string;

  repoUrl?: string;
}

export type GitHubTreeFileType = "dir" | "file";
export type GitLabTreeFileType = "tree" | "blob";

export type TreeFileType = GitHubTreeFileType | GitLabTreeFileType;

export interface TreeFile<T = TreeFileType> {
  name: string;
  type: T;
}

export interface GitHubTreeFile extends TreeFile<GitHubTreeFileType> {
  size: number;
  content: string;
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
  content?: string;
}

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
