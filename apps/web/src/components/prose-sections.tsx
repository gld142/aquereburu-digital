import { Gravure, type NomDessin } from './gravure';
import { Section } from './ui';

/**
 * Pages de texte en « code annoté » : l'intertitre tient dans la manchette,
 * numéroté comme un paragraphe de code, et le texte se lit à droite.
 * `dessins` pose une petite scène dans la marge de certains paragraphes (même rang que `sections`).
 */
export function ProseSections({
  sections,
  dessins,
}: {
  sections: { id: string; title: string; body: React.ReactNode }[];
  dessins?: (NomDessin | null)[];
}) {
  return (
    <>
      {sections.map((s, i) => {
        const d = dessins?.[i];
        return (
          <Section key={s.id} id={s.id} heading label={s.title} gloss={`§ ${i + 1}`} marge={d ? <Gravure nom={d} /> : undefined}>
            <div className="prose">{s.body}</div>
          </Section>
        );
      })}
    </>
  );
}
