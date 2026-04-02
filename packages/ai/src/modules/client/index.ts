export interface ClientQuery {
  message: string;
  sessionId?: string;
  language: 'fr' | 'en';
}

export interface ClientResponse {
  message: string;
  suggestedDomain?: string;
  suggestedAction?: 'appointment' | 'contact' | 'information';
  disclaimer: string;
}

export const clientModule = {
  name: 'ClientBot' as const,
  description: 'Client-facing chatbot for pre-qualification',

  async respond(_input: ClientQuery): Promise<ClientResponse> {
    // TODO: Implement with Claude API + guardrails — Sprint 6
    throw new Error('ClientBot not yet implemented — Sprint 6');
  },

  getDisclaimer(language: 'fr' | 'en'): string {
    return language === 'fr'
      ? 'Cette information ne remplace pas une consultation avec un avocat.'
      : 'This information does not replace a consultation with a lawyer.';
  },
};
