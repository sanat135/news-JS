import './news.css';
import type { Article } from '../../../types/api';
import { cloneTemplate, requireElement, safeWebUrl } from '../../../utils/dom';

class News {
  public draw(data: ReadonlyArray<Article>): void {
    const container: HTMLElement = requireElement('.news', HTMLElement);
    const fragment: DocumentFragment = document.createDocumentFragment();
    data.slice(0, 10).forEach((item: Article, index: number): void => {
      const clone: DocumentFragment = cloneTemplate('#newsItemTemp');
      if (index % 2 !== 0) requireElement('.news__item', HTMLElement, clone).classList.add('alt');
      const photo: HTMLElement = requireElement('.news__meta-photo', HTMLElement, clone);
      const imageUrl: string | null = item.urlToImage ? safeWebUrl(item.urlToImage) : null;
      if (imageUrl) photo.style.backgroundImage = `url(${JSON.stringify(imageUrl)})`;
      requireElement('.news__meta-author', HTMLElement, clone).textContent = item.author ?? item.source.name;
      requireElement('.news__meta-date', HTMLElement, clone).textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
      requireElement('.news__description-title', HTMLElement, clone).textContent = item.title;
      requireElement('.news__description-source', HTMLElement, clone).textContent = item.source.name;
      requireElement('.news__description-content', HTMLElement, clone).textContent = item.description ?? '';
      const link: HTMLAnchorElement = requireElement('.news__read-more a', HTMLAnchorElement, clone);
      const articleUrl: string | null = safeWebUrl(item.url);
      if (articleUrl) {
        link.href = articleUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      } else {
        link.removeAttribute('href');
        link.textContent = 'Link unavailable';
      }
      fragment.append(clone);
    });
    container.replaceChildren(fragment);
    if (data.length === 0) container.textContent = 'No articles found.';
  }
}

export default News;
