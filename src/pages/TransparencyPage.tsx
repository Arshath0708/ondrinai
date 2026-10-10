import { SEO } from '@/components/SEO';
import { Reveal, SectionHeading, CTASection } from '@/components/ui/Primitives';
import { transparencyEntries, activities } from '@/data/activities';
import { Link } from 'react-router-dom';
import { ArrowRight, Info } from 'lucide-react';

export function TransparencyPage() {
  return (
    <>
      <SEO
        title="Transparency"
        description="ONDRINAI documents completed activities, communicates how contributions are used, and reports progress without exaggeration. See our activity ledger."
      />

      {/* Hero */}
      <section className="bg-cream pt-32 pb-16 sm:pt-36 sm:pb-20">
        <div className="container-max container-px">
          <Reveal>
            <p className="eyebrow text-accent-dark mb-5">Transparency</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-forest text-balance max-w-3xl">
              Good intentions deserve honest reporting.
            </h1>
            <p className="mt-6 text-lg text-charcoal/70 max-w-2xl text-pretty">
              ONDRINAI aims to document completed activities, communicate how contributions are used, and report progress without exaggeration.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Ledger */}
      <section className="bg-off-white py-20 sm:py-24">
        <div className="container-max container-px">
          <Reveal>
            <SectionHeading
              eyebrow="Activity ledger"
              title="What we have done. What it cost."
              intro="Only verified information is published. Incomplete fields mean the information is not yet available — not that it is hidden."
              className="mb-12"
            />
          </Reveal>

          {/* Desktop table */}
          <Reveal>
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-forest">
                    <th className="py-4 pr-4 text-xs font-semibold uppercase tracking-wide text-accent-dark">No.</th>
                    <th className="py-4 pr-4 text-xs font-semibold uppercase tracking-wide text-accent-dark">Activity</th>
                    <th className="py-4 pr-4 text-xs font-semibold uppercase tracking-wide text-accent-dark">Date</th>
                    <th className="py-4 pr-4 text-xs font-semibold uppercase tracking-wide text-accent-dark">Cost</th>
                    <th className="py-4 pr-4 text-xs font-semibold uppercase tracking-wide text-accent-dark">Outcome</th>
                    <th className="py-4 text-xs font-semibold uppercase tracking-wide text-accent-dark">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {transparencyEntries.map((entry, i) => (
                    <tr key={i} className="border-b border-forest/10 hover:bg-cream/40 transition-colors">
                      <td className="py-5 pr-4 font-mono text-sm text-charcoal/50">{entry.activityNumber}</td>
                      <td className="py-5 pr-4 font-serif text-base text-charcoal">{entry.title}</td>
                      <td className="py-5 pr-4 text-sm text-charcoal/60">{entry.date || 'Not yet published'}</td>
                      <td className="py-5 pr-4 text-sm text-charcoal/60">{entry.cost || 'Not yet documented'}</td>
                      <td className="py-5 pr-4 text-sm text-charcoal/70 max-w-xs">{entry.outcome}</td>
                      <td className="py-5">
                        <Link
                          to={`/activities/activity-${entry.activityNumber}`}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-forest hover:text-deep-green transition-colors"
                        >
                          View
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          {/* Mobile cards */}
          <div className="lg:hidden space-y-6">
            {transparencyEntries.map((entry, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="bg-cream/50 border border-forest/10 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-charcoal/50">ACTIVITY {entry.activityNumber}</span>
                    <Link
                      to={`/activities/activity-${entry.activityNumber}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-forest"
                    >
                      View
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <h3 className="text-lg font-serif font-medium text-forest mb-3">{entry.title}</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <dt className="text-charcoal/50">Date</dt>
                      <dd className="text-charcoal/70">{entry.date || 'Not yet published'}</dd>
                    </div>
                    <div className="flex justify-between text-sm">
                      <dt className="text-charcoal/50">Cost</dt>
                      <dd className="text-charcoal/70">{entry.cost || 'Not yet documented'}</dd>
                    </div>
                  </dl>
                  <p className="mt-4 text-sm text-charcoal/70 leading-relaxed">{entry.outcome}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Note */}
          <Reveal>
            <div className="mt-12 flex items-start gap-3 bg-sage/15 border border-sage/30 p-5 rounded-sm">
              <Info className="w-5 h-5 text-forest shrink-0 mt-0.5" />
              <p className="text-sm text-charcoal/70 leading-relaxed">
                This ledger shows only verified information. Where fields read &ldquo;Not yet documented&rdquo; or &ldquo;Not yet published,&rdquo; it means the information has not been confirmed. ONDRINAI does not present these records as audited or certified financial statements.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Transparency is a shared responsibility."
        copy="Have questions about an activity or how contributions were used? We welcome them."
        primaryLabel="Contact Us"
        primaryLink="/contact"
        secondaryLabel="See Our Work"
        secondaryLink="/activities"
        variant="dark"
      />
    </>
  );
}
