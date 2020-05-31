import { DenoModule } from "@/types";

export const isDev = process.env.NODE_ENV === "development";

export const searchModuleFields = (fields: DenoModule, search: string) => {
  return Object.values(fields)
    .join("")
    .toLowerCase()
    .includes(search.toLowerCase());
};
