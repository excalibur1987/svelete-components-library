export function getNearestElement<T extends HTMLElement>(
  elm: HTMLElement,
  query: string
): T {
  let element = elm.querySelector(query);
  let currentElm = elm;
  while ((element === null || element === undefined) && currentElm !== null) {
    element =
      currentElm.querySelector(query) !== null
        ? currentElm.querySelector(query)
        : currentElm.tagName == query.toUpperCase()
        ? currentElm
        : null;
    currentElm = currentElm.parentElement;
  }
  return element as T;
}
