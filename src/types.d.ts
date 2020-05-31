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
