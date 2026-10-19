import { SEO } from '@/components/SEO';
import { Reveal, SectionHeading, CTASection } from '@/components/ui/Primitives';
import { transparencyEntries } from '@/data/activities';
import { Link } from 'react-router-dom';
import { ArrowRight, Info, ShieldCheck } from 'lucide-react';
import { WHATSAPP_COMMUNITY_URL, ASSETS } from '@/config/site';

export function TransparencyPage() {
  return (
    <>
      <SEO
        title="Transparency & Public Ledger"
        description="Good intentions deserve honest reporting. View ONDRINAI's verified activity ledger with documented costs, resources, and outcomes in Madurai."
        image={ASSETS.logo}
      />

      {/* Hero */}
      <section className="bg-cream pt-32 pb-16 sm:pt-36 sm:pb-20 border-b border-forest/10">
        <div className="container-max container-px">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest/10 text-forest text-xs font-semibold uppercase tracking-wider mb-5">
              <ShieldCheck className="w-4 h-4" />
              Open Reporting
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-forest text-balance max-w-3xl">
              Good intentions deserve honest reporting.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-charcoal/80 max-w-2xl text-pretty leading-relaxed">
              ONDRINAI documents completed activities, communicates how contributions are used, and reports progress without exaggeration.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Ledger Section */}
      <section className="bg-off-white py-20 sm:py-24">
        <div className="container-max container-px">
          <Reveal>
            <SectionHeading
              eyebrow="Activity Ledger"
              title="What we have done. What it cost."
              intro="Only verified, documented information is published here. Where details are not shown, it indicates that records have not yet been published or confirmed — not that they are hidden."
              className="mb-12"
            />
          </Reveal>

          {/* Desktop table */}
          <Reveal>
            <div className="hidden lg:block overflow-x-auto bg-cream/40 border border-forest/15 p-6 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-forest">
                    <th className="py-4 pr-4 text-xs font-semibold uppercase tracking-wider text-forest">No.</th>
                    <th className="py-4 pr-4 text-xs font-semibold uppercase tracking-wider text-forest">Activity</th>
                    <th className="py-4 pr-4 text-xs font-semibold uppercase tracking-wider text-forest">Location</th>
                    <th className="py-4 pr-4 text-xs font-semibold uppercase tracking-wider text-forest">Cost</th>
                    <th className="py-4 pr-4 text-xs font-semibold uppercase tracking-wider text-forest">Documented Outcome</th>
                    <th className="py-4 text-xs font-semibold uppercase tracking-wider text-forest">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-forest/10">
                  {transparencyEntries.map((entry, i) => (
                    <tr key={i} className="hover:bg-cream/60 transition-colors">
                      <td className="py-5 pr-4 font-mono font-bold text-sm text-forest">ACT #{entry.activityNumber}</td>
                      <td className="py-5 pr-4 font-serif font-medium text-base text-charcoal">{entry.title}</td>
                      <td className="py-5 pr-4 text-sm text-charcoal/70">{entry.location || 'Madurai, Tamil Nadu'}</td>
                      <td className="py-5 pr-4 text-sm font-mono font-semibold text-forest">
                        {entry.cost ? (
                          <span className="bg-forest/10 px-2 py-0.5">{entry.cost}</span>
                        ) : (
                          <span className="text-charcoal/50 italic font-sans text-xs">Not yet documented</span>
                        )}
                      </td>
                      <td className="py-5 pr-4 text-sm text-charcoal/80 max-w-sm leading-relaxed">{entry.outcome}</td>
                      <td className="py-5">
                        <Link
                          to={`/activities/activity-${entry.activityNumber}`}
                          className="inline-flex items-center gap-1 text-xs uppercase tracking-wider font-bold text-forest hover:text-deep-green transition-colors"
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
                <div className="bg-cream/50 border border-forest/15 p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-3 border-b border-forest/10 pb-3">
                    <span className="font-mono text-xs font-bold text-forest">ACTIVITY #{entry.activityNumber}</span>
                    <Link
                      to={`/activities/activity-${entry.activityNumber}`}
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-forest"
                    >
                      Report
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <h3 className="text-xl font-serif font-medium text-forest mb-3">{entry.title}</h3>
                  <dl className="space-y-2.5 text-sm bg-off-white p-4 border border-forest/10 mb-4">
                    <div className="flex justify-between">
                      <dt className="text-charcoal/60">Location</dt>
                      <dd className="text-charcoal/90 font-medium text-right">{entry.location || 'Madurai, Tamil Nadu'}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-charcoal/60">Documented Cost</dt>
                      <dd className="font-mono font-semibold text-forest text-right">
                        {entry.cost || <span className="text-charcoal/50 italic font-sans text-xs">Not yet documented</span>}
                      </dd>
                    </div>
                  </dl>
                  <p className="text-sm text-charcoal/80 leading-relaxed">{entry.outcome}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Note on Accounting and Transparency */}
          <Reveal>
            <div className="mt-12 flex items-start gap-4 bg-sage/20 border border-sage/40 p-6 shadow-sm">
              <Info className="w-5 h-5 text-forest shrink-0 mt-0.5" />
              <div className="space-y-2 text-sm text-charcoal/80 leading-relaxed">
                <p className="font-semibold text-forest">
                  Reporting Principles &amp; Honesty Notice:
                </p>
                <p>
                  This ledger shows only verified information from completed ground activities. Where fields indicate &ldquo;Not yet documented,&rdquo; it means that detailed financial accounting has not been officially confirmed or published.
                </p>
                <p className="text-xs text-charcoal/65">
                  ONDRINAI does not claim official charity registration, 80G tax exemptions, audited corporate balance sheets, or certifications. We believe honesty with the community is the foundation of trust.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Photographic Verification Link */}
          <Reveal>
            <div className="mt-8 p-6 bg-cream/50 border border-forest/15 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif font-bold text-forest text-base">
                  Looking for Photographic Documentation?
                </h3>
                <p className="text-xs text-charcoal/70 mt-1">
                  View genuine, unfiltered photographs from each on-ground initiative in our dedicated visual archive.
                </p>
              </div>
              <Link
                to="/gallery"
                className="btn-outline text-xs py-2 px-4 shrink-0"
              >
                <span>Visit Photo Gallery</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contribution Management & Operating Policies Section */}
      <section className="py-16 sm:py-20 bg-cream/30 border-t border-forest/10">
        <div className="container-max container-px">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="eyebrow text-accent-dark">Financial Ethics</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-forest mt-1">
                How Contributions Are Managed
              </h2>
              <p className="mt-3 text-sm sm:text-base text-charcoal/70 leading-relaxed">
                We believe total transparency regarding contributions builds lasting public trust. Below are the operational principles guiding every resource received.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <Reveal delay={60}>
              <div className="h-full bg-off-white border border-forest/15 p-6 rounded-sm shadow-2xs">
                <span className="text-xs font-mono font-bold text-forest tracking-wider uppercase block mb-2">
                  01 &bull; Restricted Funds
                </span>
                <h3 className="font-serif font-bold text-forest text-lg mb-2">
                  Purpose-Locked Giving
                </h3>
                <p className="text-xs text-charcoal/75 leading-relaxed">
                  Contributions designated for a specific cause (such as elderly meals, tree saplings, or animal feeding) are held strictly for that defined purpose. We never divert restricted funds to unrelated activities.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="h-full bg-off-white border border-forest/15 p-6 rounded-sm shadow-2xs">
                <span className="text-xs font-mono font-bold text-forest tracking-wider uppercase block mb-2">
                  02 &bull; Direct On-Ground Spending
                </span>
                <h3 className="font-serif font-bold text-forest text-lg mb-2">
                  Zero Overhead Inflations
                </h3>
                <p className="text-xs text-charcoal/75 leading-relaxed">
                  Funds received directly support real procurement: food grains, fresh vegetables, eco-friendly leaf plates, seeds, and local transport. While operational allocations have been discussed, no fixed overhead percentage has been formally adopted.
                </p>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="h-full bg-off-white border border-forest/15 p-6 rounded-sm shadow-2xs">
                <span className="text-xs font-mono font-bold text-forest tracking-wider uppercase block mb-2">
                  03 &bull; No Fabricated Metrics
                </span>
                <h3 className="font-serif font-bold text-forest text-lg mb-2">
                  Only Real Outcomes
                </h3>
                <p className="text-xs text-charcoal/75 leading-relaxed">
                  We refuse to publish automated live donation tickers, fake fundraising percentages, or unverified volunteer counts. If an activity target has not yet been audited, we say so plainly.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Action linking to Donate page */}
          <div className="mt-12 text-center">
            <Link
              to="/donate"
              className="btn-primary text-xs sm:text-sm inline-flex items-center gap-2"
            >
              <span>Review Proposed Contribution Benchmarks</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Transparency is a shared responsibility."
        copy="Have questions about an activity, documented expenses, or want to review our ground operations? Feel free to reach out anytime."
        primaryLabel="Contact ONDRINAI"
        primaryLink="/contact"
        secondaryLabel="Join Volunteer Community"
        secondaryLink={WHATSAPP_COMMUNITY_URL}
        variant="dark"
      />
    </>
  );
}
