import { type Query } from "./html";

export type ClassId<TType> = Query<TType> & { name: string };

export function createClassId<TType = never>(name: string, instance?: TType) {
  const selector = `.${name}`;
  return {
    name,
    selector,
    instance,
    type: "one",
  } satisfies ClassId<TType>;
}
