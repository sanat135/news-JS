import News from './news/news';
import Sources from './sources/sources';
import type { ArticlesResponse, SourcesResponse } from '../../types/api';
import { requireElement } from '../../utils/dom';

export class AppView {
  private readonly news: News = new News();
  private readonly sources: Sources = new Sources();

  public drawNews(data: ArticlesResponse): void {
    this.news.draw(data.articles);
  }

  public drawSources(data: SourcesResponse): void {
    this.sources.draw(data.sources);
  }

  public showError(error: unknown): void {
    const message: string = error instanceof Error ? error.message : 'Unable to load news';
    requireElement('.news', HTMLElement).textContent = message;
  }
}

export default AppView;
