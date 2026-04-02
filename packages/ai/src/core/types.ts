export type JurisdictionPack =
  | 'ohada'
  | 'france'
  | 'canada'
  | 'usa'
  | 'suisse'
  | 'uk'
  | 'eu'
  | 'international';

export interface Citation {
  source: string;
  reference: string;
  text: string;
  url?: string;
  jurisdiction: JurisdictionPack;
}

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface AiResponse {
  content: string;
  citations: Citation[];
  confidence: ConfidenceLevel;
  jurisdictions: JurisdictionPack[];
  model: string;
  tokensUsed: number;
}
