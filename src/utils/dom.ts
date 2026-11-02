export function requireElement<T extends HTMLElement>(
  selector: string,
  constructor: { new (): T },
  root: ParentNode = document,
): T {
  const element: Element | null = root.querySelector(selector);
  if (!(element instanceof constructor)) {
    throw new Error(`Element not found or has an unexpected type: ${selector}`);
  }
  return element;
}

export function cloneTemplate(selector: string): DocumentFragment {
  const template: HTMLTemplateElement = requireElement(selector, HTMLTemplateElement);
  const clone: Node = template.content.cloneNode(true);
  if (!(clone instanceof DocumentFragment)) {
    throw new Error(`Invalid template: ${selector}`);
  }
  return clone;
}

export function safeWebUrl(value: string): string | null {
  try {
    const url: URL = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null;
  } catch {
    return null;
  }
}
