import type { JurisdictionPack, ConfidenceLevel } from '../../core/types';

export interface TriageResult {
  dossierId: string;
  summary: string;
  facts: string[];
  parties: string[];
  litigationType: string;
  jurisdictions: JurisdictionPack[];
  suggestedDepartment: string;
  suggestedAvocat: string;
  suggestedAvocatReason: string;
  complexityScore: number;
  urgencyScore: number;
  confidence: ConfidenceLevel;
}

export const triageModule = {
  name: 'TriageBot' as const,
  description: 'Intelligent case triage and assignment',

  async analyzeDossier(_documentText: string): Promise<TriageResult> {
    // TODO: Implement with Claude API + OCR pipeline
    throw new Error('TriageBot not yet implemented — Sprint 3');
  },
};
