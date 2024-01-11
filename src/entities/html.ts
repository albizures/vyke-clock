import { r, type Result } from "@vyke/results";

export function setStyleVar(
  element: HTMLElement,
  name: `--${string}`,
  value: unknown
) {
  element.style.setProperty(name, String(value));
}

type Query<TType> = {
  selector: string;
  instance: TType | undefined;
};

type ExtraTypeFrom<TQuery> = TQuery extends Query<infer TType> ? TType : never;
type ExtraTypeFromEach<TQueries> = TQueries extends [
  infer THead,
  ...infer TTail
]
  ? [ExtraTypeFrom<THead>, ...ExtraTypeFromEach<TTail>]
  : TQueries extends [infer THead]
  ? [ExtraTypeFrom<THead>]
  : [];

export function query<TType = never>(
  selector: string,
  instance?: TType
): Query<TType> {
  return {
    selector,
    instance,
  };
}

export function select<TQueries extends Array<Query<unknown>>>(
  ...queries: TQueries
): Result<ExtraTypeFromEach<TQueries>, Error> {
  const elements: Array<unknown> = [];

  for (const query of queries) {
    const element = document.querySelector(query.selector);

    if (!element) {
      return r.err(
        new Error(`Element not found with selector "${query.selector}"`)
      );
    }

    if (query.instance && !(element instanceof (query.instance as any))) {
      return r.err(
        new Error(`Invalid selected type with selector "${query.selector}"`)
      );
    }

    elements.push(element);
  }

  return r.ok(elements as ExtraTypeFromEach<TQueries>);
}

export function removeClass(element: HTMLElement, className: string) {
  element.classList.remove(className);
}
export function addClass(element: HTMLElement, className: string) {
  element.classList.add(className);
}
