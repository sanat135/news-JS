import AppLoader from './appLoader';
import { Endpoint } from '../../types/api';
import type { ArticlesResponse, Callback, NewsFilters, SourcesResponse } from '../../types/api';
import { isArticlesResponse, isSourcesResponse } from '../../utils/validators';

class AppController extends AppLoader {
  public async getSources(callback: Callback<SourcesResponse>): Promise<void> {
    await this.getResp<SourcesResponse>(Endpoint.Sources, isSourcesResponse, callback);
  }

  public async getNews(event: MouseEvent, callback: Callback<ArticlesResponse>): Promise<void> {
    if (!(event.target instanceof Element)) return;
    const container: EventTarget | null = event.currentTarget;
    if (!(container instanceof HTMLElement)) return;
    const source: HTMLElement | null = event.target.closest<HTMLElement>('.source__item');
    if (!source || !container.contains(source)) return;
    const sourceId: string | undefined = source.dataset.sourceId;
    if (!sourceId) return;
    const filters: NewsFilters = { sources: sourceId };
    await this.getResp<ArticlesResponse>(Endpoint.Everything, isArticlesResponse, callback, filters);
  }
}

export default AppController;
