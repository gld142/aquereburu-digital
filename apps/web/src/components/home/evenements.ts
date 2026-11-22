'use client';

/**
 * Petits messages que les sections de l'accueil s'envoient, sans se connaître :
 *
 *   « aqp:domaine »  détail { slug }   une puce de domaine (fiche d'associé…) demande au répertoire
 *                                      d'ouvrir ce domaine ; le répertoire s'ouvre et la page y défile.
 *   « aqp:rdv »      détail { objet }  un bouton « Prendre rendez-vous » transmet l'objet de la demande
 *                                      (le slug du domaine) au formulaire du pied de page (#rdv).
 *
 * Les deux sont émis sur `window`.
 */
export const EVT_DOMAINE = 'aqp:domaine';
export const EVT_RDV = 'aqp:rdv';

/** Demande au répertoire de l'accueil d'ouvrir un domaine et d'y faire défiler la page. */
export function ouvrirDomaineDansRepertoire(slug: string) {
  window.dispatchEvent(new CustomEvent(EVT_DOMAINE, { detail: { slug } }));
}

/**
 * Transmet l'objet de la demande au formulaire « Prendre rendez-vous ».
 * Deux voies, pour que le formulaire n'ait rien de particulier à faire :
 *  1. si le champ `#rdv [name="objet"]` existe et propose cette valeur, elle y est posée et un
 *     événement `change` est émis (React l'entend sur une liste déroulante) ;
 *  2. l'événement « aqp:rdv » est émis dans tous les cas.
 */
export function demanderRendezVous(objet: string) {
  const champ = document.querySelector<HTMLSelectElement | HTMLInputElement>('#rdv [name="objet"]');
  if (champ) {
    const propose = champ instanceof HTMLSelectElement ? [...champ.options].some((o) => o.value === objet) : true;
    if (propose) {
      champ.value = objet;
      champ.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
  window.dispatchEvent(new CustomEvent(EVT_RDV, { detail: { objet } }));
  // Le formulaire (components/home/rendez-vous.tsx) écoute « rdv:objet », dont le détail est le slug seul.
  window.dispatchEvent(new CustomEvent('rdv:objet', { detail: objet }));
}
