export enum Endpoint {
  Sources = 'sources',
  Everything = 'everything',
}

export enum HttpMethod {
  Get = 'GET',
}

export interface Source {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface Article {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface SourcesResponse {
  status: 'ok';
  sources: Source[];
}

export interface ArticlesResponse {
  status: 'ok';
  totalResults: number;
  articles: Article[];
}

export interface ApiError {
  status: 'error';
  code: string;
  message: string;
}

export type ApiResponse = SourcesResponse | ArticlesResponse | ApiError;
export type Callback<T> = (data: T) => void;
export type Validator<T> = (value: unknown) => value is T;
export type QueryOptions = Readonly<Record<string, string>>;
export type NewsFilters = Partial<{ sources: string; q: string; language: string }>;
export type SourceButton = Pick<Source, 'id' | 'name'>;
