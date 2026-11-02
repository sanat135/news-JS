import Loader from './loader';
import type { QueryOptions } from '../../types/api';

class AppLoader extends Loader {
  public constructor() {
    const baseUrl: string | undefined = process.env.API_URL;
    const apiKey: string | undefined = process.env.API_KEY;
    if (!baseUrl) throw new Error('Set API_URL in the .env file');
    const options: QueryOptions = apiKey ? { apiKey } : {};
    super(baseUrl, options);
  }
}

export default AppLoader;
