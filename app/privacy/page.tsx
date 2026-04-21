import type { Metadata } from 'next'
import PageTransition from '@/components/layout/PageTransition'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité',
  description: 'Politique de confidentialité de K-Ré.',
}

export default function PrivacyPage() {
  return (
    <PageTransition>
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <header className="gsap-reveal mb-12">
            <h1 className="section-heading font-heading text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
              Politique de Confidentialité
            </h1>
            <p className="mt-4 text-sm text-slate-500">Dernière mise à jour: Avril 2026</p>
          </header>

          <div className="prose prose-slate max-w-none space-y-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-bold text-brand-dark">1. Données Collectées</h2>
              <p>
                K-Ré collecte les informations suivantes lorsque vous utilisez notre service:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Informations de contact (nom, email, téléphone)</li>
                <li>Informations de réservation (dates, stations, équipements)</li>
                <li>Données de localisation (pour afficher les cartes et stations)</li>
                <li>Cookies et données analytiques de navigation</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-dark">
                2. Utilisation de Vos Données
              </h2>
              <p>Vos données sont utilisées pour:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Traiter vos réservations et paiements</li>
                <li>Vous envoyer des confirmations et mises à jour</li>
                <li>Améliorer nos services et votre expérience</li>
                <li>Respecter les obligations légales</li>
                <li>Analyser l&apos;utilisation du site (Google Analytics)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-dark">3. Partage de Données</h2>
              <p>
                Vos données sont partagées uniquement avec:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Kayakomat (plateforme de réservation)</li>
                <li>Nos partenaires de paiement (chiffré)</li>
                <li>Les autorités légales si requis par la loi</li>
              </ul>
              <p>
                Nous ne vendons jamais vos données à des tiers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-dark">4. Sécurité des Données</h2>
              <p>
                Nous utilisons le chiffrement SSL/TLS pour protéger vos données. Votre mot de passe
                est haché et jamais stocké en clair. Cependant, aucune transmission par Internet n&apos;est
                100% sécurisée.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-dark">5. Vos Droits (RGPD)</h2>
              <p>Vous avez le droit de:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Accéder à vos données personnelles</li>
                <li>Les rectifier ou supprimer</li>
                <li>Vous opposer à leur traitement</li>
                <li>Demander une portabilité de vos données</li>
              </ul>
              <p>
                Pour exercer ces droits, contactez-nous à contact@kayak-en-re.fr
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-dark">6. Cookies</h2>
              <p>
                Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez désactiver
                les cookies dans les paramètres de votre navigateur, mais certaines fonctionnalités
                pourraient ne pas fonctionner correctement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-brand-dark">7. Contact</h2>
              <p>
                Pour toute question concernant cette politique, veuillez nous contacter:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> contact@kayak-en-re.fr<br />
                <strong>Téléphone:</strong> (33) 6 15 84 43 03<br />
                <strong>Adresse:</strong> 255 rue Antoine de Saint-Exupéry, 17580 Le Bois-Plage-en-Ré
              </p>
            </section>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
