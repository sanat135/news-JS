import App from './components/app/app';
import './global.css';

try {
  const app: App = new App();
  app.start();
} catch (error: unknown) {
  const container: Element | null = document.querySelector('.news');
  if (container) {
    container.textContent = error instanceof Error ? error.message : 'Unable to start application';
  }
}
