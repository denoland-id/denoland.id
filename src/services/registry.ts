import { DenoDatabase } from "@/types";

export const fetchRegistry = async (registry: string = "all") => {
  const resp = await fetch(`https://registry.denoland.id/${registry}.json`);
  const data = (await resp.json()) as DenoDatabase;
  delete data.$schema;
  return data;
};

export const fetchModule = async (moduleName: string) => {
  const registry = await fetchRegistry(moduleName[0]);
  return registry[moduleName];
};
