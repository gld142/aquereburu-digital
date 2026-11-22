import { Section } from './ui';

/**
 * Pages de texte en « code annoté » : l'intertitre tient dans la manchette,
 * numéroté comme un paragraphe de code, et le texte se lit à droite.
 */
export function ProseSections({ sections }: { sections: { id: string; title: string; body: React.ReactNode }[] }) {
  return (
    <>
      {sections.map((s, i) => (
        <Section key={s.id} id={s.id} heading label={s.title} gloss={`§ ${i + 1}`}>
          <div className="prose">{s.body}</div>
        </Section>
      ))}
    </>
  );
}
