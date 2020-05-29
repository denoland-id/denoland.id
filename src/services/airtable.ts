import Airtable, { Table } from "airtable";

import { DenoModule } from "@/types";

export const apiKey = process.env.AIRTABLE_API_KEY;
export const baseId = process.env.AIRTABLE_BASE_ID;

export const getTable = (tableName: string) => {
  return new Airtable({ apiKey }).base(baseId)(tableName);
};

export const getModulesTable = () => {
  return getTable("Modules") as Table<DenoModule>;
};
