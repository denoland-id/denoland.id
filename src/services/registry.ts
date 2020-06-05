import { DenoDatabase } from "@/types";

export const fetchRegistry = async (registry: string = "all") => {
  const baseUrl = "https://registry.denoland-id.now.sh";
  const resp = await fetch(`${baseUrl}/${registry}.json`);
  const data = (await resp.json()) as DenoDatabase;
  delete data.$schema;
  return data;
};

export const fetchModule = async (moduleName: string) => {
  const registry = await fetchRegistry(moduleName[0]);
  return registry[moduleName];
};
