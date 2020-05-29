import { DenoModule } from "@/types";

export const isDev = process.env.NODE_ENV === "development";

export const transformModuleFields = (fields: DenoModule): DenoModule => {
  const { name, org, repo, type } = fields;
  return {
    ...fields,
    repoUrl: `https://${type.toLowerCase()}.com/${org}/${repo}`,
    denolandUrl: `https://deno.land/x/${name}`,
  };
};

export const searchModuleFields = (fields: DenoModule, search: string) => {
  return (
    fields.name.includes(search) ||
    fields.desc.includes(search) ||
    fields.org.includes(search) ||
    fields.repo.includes(search)
  );
};