import './sources.css';
import type { SourceButton } from '../../../types/api';
import { cloneTemplate, requireElement } from '../../../utils/dom';

class Sources {
  public draw(data: ReadonlyArray<SourceButton>): void {
    const fragment: DocumentFragment = document.createDocumentFragment();
    data.forEach((item: SourceButton): void => {
      const clone: DocumentFragment = cloneTemplate('#sourceItemTemp');
      requireElement('.source__item-name', HTMLElement, clone).textContent = item.name;
      requireElement('.source__item', HTMLElement, clone).dataset.sourceId = item.id;
      fragment.append(clone);
    });
    requireElement('.sources', HTMLElement).replaceChildren(fragment);
  }
}

export default Sources;
