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

const hiddenClass = "hidden";
export function hide(...elements: Array<HTMLElement>) {
  for (const element of elements) {
    addClass(element, hiddenClass);
  }
}

export function show(...elements: Array<HTMLElement>) {
  for (const element of elements) {
    removeClass(element, hiddenClass);
  }
}

const shakeClass = "animate-shake";

export function shake(element: HTMLElement) {
  addClass(element, shakeClass);
  setTimeout(removeClass, 1000, element, shakeClass);
}

type HTMLElementWithDisabled =
  | HTMLButtonElement
  | HTMLInputElement
  | HTMLLinkElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  | HTMLOptionElement;

export function enable(btn: HTMLElementWithDisabled) {
  btn.disabled = false;
}

export function disable(btn: HTMLElementWithDisabled) {
  btn.disabled = true;
}
