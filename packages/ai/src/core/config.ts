import { z } from 'zod';

export const aiConfigSchema = z.object({
  anthropicApiKey: z.string().min(1, 'ANTHROPIC_API_KEY is required'),
  defaultModel: z.string().default('claude-sonnet-4-6'),
  complexModel: z.string().default('claude-opus-4-6'),
  embeddingModel: z.string().default('multilingual-e5-large'),
  maxTokens: z.number().default(4096),
  temperature: z.number().min(0).max(1).default(0.1),
});

export type AiConfig = z.infer<typeof aiConfigSchema>;

export function createAiConfig(env: Record<string, string | undefined>): AiConfig {
  return aiConfigSchema.parse({
    anthropicApiKey: env.ANTHROPIC_API_KEY,
    defaultModel: env.AI_DEFAULT_MODEL,
    complexModel: env.AI_COMPLEX_MODEL,
    embeddingModel: env.AI_EMBEDDING_MODEL,
    maxTokens: env.AI_MAX_TOKENS ? parseInt(env.AI_MAX_TOKENS, 10) : undefined,
    temperature: env.AI_TEMPERATURE ? parseFloat(env.AI_TEMPERATURE) : undefined,
  });
}
