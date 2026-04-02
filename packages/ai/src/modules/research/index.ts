import type { JurisdictionPack, Citation, ConfidenceLevel } from '../../core/types';

export interface ResearchQuery {
  question: string;
  jurisdictions?: JurisdictionPack[];
  context?: string;
  sessionId?: string;
}

export interface ResearchResult {
  answer: string;
  citations: Citation[];
  confidence: ConfidenceLevel;
  jurisdictions: JurisdictionPack[];
  relatedQuestions: string[];
}

export const researchModule = {
  name: 'ResearchBot' as const,
  description: 'AI legal research assistant with multi-jurisdictional RAG',

  async query(_input: ResearchQuery): Promise<ResearchResult> {
    // TODO: Implement with Claude API + vector DB + jurisdiction packs
    throw new Error('ResearchBot not yet implemented — Sprint 4');
  },
};
