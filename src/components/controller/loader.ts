import { Endpoint, HttpMethod } from '../../types/api';
import type { ApiResponse, Callback, QueryOptions, Validator } from '../../types/api';
import { isApiError } from '../../utils/validators';

class Loader {
  private readonly baseLink: string;
  private readonly options: QueryOptions;

  public constructor(baseLink: string, options: QueryOptions) {
    this.baseLink = baseLink.endsWith('/') ? baseLink : `${baseLink}/`;
    this.options = { ...options };
  }

  protected async getResp<T extends ApiResponse>(
    endpoint: Endpoint,
    validate: Validator<T>,
    callback: Callback<T>,
    options: QueryOptions = {},
  ): Promise<void> {
    const response: Response = await fetch(this.makeUrl(endpoint, options), {
      method: HttpMethod.Get,
    });
    if (!response.ok) {
      throw new Error(`News request failed (HTTP ${response.status})`);
    }
    const data: unknown = await response.json();
    if (isApiError(data)) throw new Error(data.message);
    if (!validate(data)) throw new Error('Unexpected API response');
    callback(data);
  }

  private makeUrl(endpoint: Endpoint, options: QueryOptions): string {
    const url: URL = new URL(endpoint, this.baseLink);
    const parameters: QueryOptions = { ...this.options, ...options };
    Object.entries(parameters).forEach(([key, value]: [string, string]): void => {
      url.searchParams.set(key, value);
    });
    return url.href;
  }
}

export default Loader;
