import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

/**
 * Les textes du site vivent dans src/content (typés, FR/EN côte à côte).
 * next-intl ne sert qu'au routage localisé : aucun catalogue de messages.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;
  return { locale, messages: {} };
});
