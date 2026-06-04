import { ApiResponse } from '@muzammil328/core';

export type SitemapUrlsResponse = ApiResponse<string[]>;

export interface SitemapData {
  urls: string[];
}
