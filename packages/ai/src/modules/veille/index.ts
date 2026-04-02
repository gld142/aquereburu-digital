import type { JurisdictionPack } from '../../core/types';

export interface VeilleConfig {
  sources: VeilleSource[];
  syncIntervalHours: number;
  jurisdictions: JurisdictionPack[];
}

export interface VeilleSource {
  name: string;
  url: string;
  type: string;
  jurisdiction: JurisdictionPack;
}

export interface VeilleArticle {
  title: string;
  content: string;
  summary: string;
  url: string;
  category: string;
  jurisdiction: JurisdictionPack;
  publishedAt: Date;
}

export const veilleModule = {
  name: 'VeillBot' as const,
  description: 'Automated legislative monitoring',

  async sync(_config: VeilleConfig): Promise<VeilleArticle[]> {
    // TODO: Implement web scraping + AI classification — Sprint 5
    throw new Error('VeillBot not yet implemented — Sprint 5');
  },
};
