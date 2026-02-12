import type { WebSite } from './types.ts';
import { MainCategory } from './types.ts';
import sitesData from './data/data.json';

export const INITIAL_SITES: WebSite[] = sitesData.sites.map((site, index) => ({
  id: String(index + 1),
  name: site.name,
  url: site.url,
  description: site.description,
  mainCategory: site.mainCategory.map(mc => {
    const key = mc.toUpperCase() as keyof typeof MainCategory;
    return MainCategory[key] || mc;
  }) as MainCategory[],
  subCategory: site.subCategory, 
  imageUrl: site.imageUrl,
  tags: site.tags
}));

export const getDynamicSubCategoryMap = (): Record<string, string[]> => {
  const mapping: Record<string, Set<string>> = {};

  INITIAL_SITES.forEach(site => {
    site.mainCategory.forEach(main => {
      if (!mapping[main]) mapping[main] = new Set();
      
      site.subCategory.forEach(sub => {
        mapping[main].add(sub);
      });
    });
  });

  const finalMap: Record<string, string[]> = {};
  Object.keys(mapping).forEach(key => {
    finalMap[key] = Array.from(mapping[key]).sort();
  });

  return finalMap;
};