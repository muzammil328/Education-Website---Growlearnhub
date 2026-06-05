import { ApiResponse } from '@muzammil328/types';

export type SitemapUrlsResponse = ApiResponse<string[]>;

export interface SitemapData {
  urls: string[];
}
