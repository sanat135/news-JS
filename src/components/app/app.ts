import AppController from '../controller/controller';
import AppView from '../view/appView';
import type { ArticlesResponse, SourcesResponse } from '../../types/api';
import { requireElement } from '../../utils/dom';

class App {
  private readonly controller: AppController = new AppController();
  private readonly view: AppView = new AppView();
  private loadingNews: boolean = false;

  public start(): void {
    const sources: HTMLElement = requireElement('.sources', HTMLElement);
    sources.addEventListener('click', (event: MouseEvent): void => {
      if (this.loadingNews) return;
      this.loadingNews = true;
      sources.setAttribute('aria-busy', 'true');
      void this.controller.getNews(event, (data: ArticlesResponse): void => {
        this.view.drawNews(data);
      }).catch((error: unknown): void => {
        this.view.showError(error);
      }).finally((): void => {
        this.loadingNews = false;
        sources.removeAttribute('aria-busy');
      });
    });
    void this.controller.getSources((data: SourcesResponse): void => {
      this.view.drawSources(data);
    }).catch((error: unknown): void => {
      this.view.showError(error);
    });
  }
}

export default App;
