import { FieldSet } from "airtable";

export interface DenoModule extends FieldSet {
  name: string;
  desc: string;
  active: boolean;
  type: "GitHub" | "GitLab";
  org: string;
  repo: string;
  url: string;

  repoUrl?: string;
  denolandUrl?: string;
}
