export const MainCategory = {
  CRYPTO: 'Crypto',
  FOREX: 'Forex',
  INDICES: 'Indices',
  ECONOMY: 'Economy',
  LIBRARY: 'Library',
  TOOLS: 'Tools',
  COMMUNITY: 'Community'
} as const;

export type MainCategory = typeof MainCategory[keyof typeof MainCategory];

export interface WebSite {
  id: string;
  name: string;
  url: string;
  description: string;
  mainCategory: MainCategory[]; 
  subCategory: string[];
  imageUrl: string;
  tags: string[];
}