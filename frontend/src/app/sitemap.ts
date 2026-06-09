import { config } from '@/config';

type SitemapFile = {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: 'always' | 'daily' | 'hourly' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
};

async function fetchTrpcQuery(url: string): Promise<string[]> {
  try {
    const res = await fetch(
      `${url}?batch=1&input=${encodeURIComponent(JSON.stringify({ '0': {} }))}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    const json = await res.json();
    // tRPC batch response: [{result:{data:[...]}}]
    // tRPC non-batch response: {result:{data:[...]}}
    const result = Array.isArray(json) ? json[0] : json;
    return result?.result?.data ?? [];
  } catch {
    return [];
  }
}

function toEntries(
  urls: string[],
  priority: number,
  changeFrequency: SitemapFile['changeFrequency'] = 'weekly'
): SitemapFile[] {
  const lastModified = new Date().toISOString();
  return urls.map(url => ({ url, lastModified, priority, changeFrequency }));
}

export default async function sitemap(): Promise<SitemapFile[]> {
  try {
    const [
      staticUrls,
      classUrls,
      bookUrls,
      chapterUrls,
      boardUrls,
      headingUrls,
      subHeadingUrls,
      onlineTestUrls,
      vuUrls,
    ] = await Promise.all([
      fetchTrpcQuery(config.sitemap.static),
      fetchTrpcQuery(config.sitemap.classes),
      fetchTrpcQuery(config.sitemap.books),
      fetchTrpcQuery(config.sitemap.chapters),
      fetchTrpcQuery(config.sitemap.boards),
      fetchTrpcQuery(config.sitemap.headings),
      fetchTrpcQuery(config.sitemap.subHeadings),
      fetchTrpcQuery(config.sitemap.onlineTest),
      fetchTrpcQuery(config.sitemap.vu),
    ]);

    return [
      ...toEntries(staticUrls, 1.0, 'daily'),
      ...toEntries(classUrls, 0.9, 'weekly'),
      ...toEntries(boardUrls, 0.8, 'weekly'),
      ...toEntries(bookUrls, 0.8, 'weekly'),
      ...toEntries(vuUrls, 0.8, 'weekly'),
      ...toEntries(chapterUrls, 0.7, 'weekly'),
      ...toEntries(onlineTestUrls, 0.7, 'weekly'),
      ...toEntries(headingUrls, 0.6, 'weekly'),
      ...toEntries(subHeadingUrls, 0.5, 'weekly'),
    ];
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return [];
  }
}
