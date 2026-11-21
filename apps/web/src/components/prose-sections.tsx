/** Mise en page des pages de texte : intertitre à gauche, texte serif à droite. */
export function ProseSections({ sections }: { sections: { id: string; title: string; body: React.ReactNode }[] }) {
  return (
    <div className="shell py-12 md:py-20">
      {sections.map((s) => (
        <section
          key={s.id}
          id={s.id}
          aria-labelledby={`${s.id}-t`}
          className="grid gap-x-10 gap-y-4 border-t border-rule py-10 first:border-ink md:grid-cols-12 md:py-14"
        >
          <h2 id={`${s.id}-t`} className="t-h3 md:col-span-4">
            {s.title}
          </h2>
          <div className="t-body measure text-ink-2 md:col-span-7 md:col-start-6 [&_a]:link [&_li]:mt-2 [&_strong]:font-medium [&_strong]:text-ink [&_ul]:list-disc [&_ul]:pl-5">
            {s.body}
          </div>
        </section>
      ))}
    </div>
  );
}
