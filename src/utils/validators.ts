import type { Article, ArticlesResponse, Source, SourcesResponse, ApiError } from '../types/api';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === 'string';
}

function isSource(value: unknown): value is Source {
  if (!isRecord(value)) return false;
  return ['id', 'name', 'description', 'url', 'category', 'language', 'country']
    .every((key: string): boolean => typeof value[key] === 'string');
}

function isArticle(value: unknown): value is Article {
  if (!isRecord(value) || !isRecord(value.source)) return false;
  return isNullableString(value.source.id)
    && typeof value.source.name === 'string'
    && isNullableString(value.author)
    && typeof value.title === 'string'
    && isNullableString(value.description)
    && typeof value.url === 'string'
    && isNullableString(value.urlToImage)
    && typeof value.publishedAt === 'string'
    && isNullableString(value.content);
}

export function isSourcesResponse(value: unknown): value is SourcesResponse {
  return isRecord(value) && value.status === 'ok'
    && Array.isArray(value.sources) && value.sources.every(isSource);
}

export function isArticlesResponse(value: unknown): value is ArticlesResponse {
  return isRecord(value) && value.status === 'ok'
    && typeof value.totalResults === 'number'
    && Array.isArray(value.articles) && value.articles.every(isArticle);
}

export function isApiError(value: unknown): value is ApiError {
  return isRecord(value) && value.status === 'error'
    && typeof value.code === 'string' && typeof value.message === 'string';
}
