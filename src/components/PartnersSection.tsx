import { Link } from 'react-router-dom';
import { Handshake, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { partners } from '@/data/partners';
import { Reveal, SectionHeading } from '@/components/ui/Primitives';

interface PartnersSectionProps {
  className?: string;
}

export function PartnersSection({ className = '' }: PartnersSectionProps) {
  return (
    <section className={`py-16 sm:py-20 bg-slate-50 dark:bg-[#03150D] border-t border-slate-200/80 dark:border-white/10 relative ${className}`}>
      <div className="container-max container-px">
        <Reveal>
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="eyebrow text-emerald-700 dark:text-emerald-400 inline-flex items-center gap-1.5 mb-3 font-bold">
              <Handshake className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Community Alliances
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900 dark:text-white text-balance tracking-tight">
              Collaborations &amp; Community Partners
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed text-pretty">
              Real community change thrives on genuine collaboration. We partner with grassroots groups and student volunteers with complete transparency.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-12 gap-8 items-stretch max-w-4xl mx-auto">
          {/* Confirmed Collaborator Card */}
          {partners.map((partner) => (
            <div key={partner.id} className="md:col-span-7">
              <Reveal>
                <div className="h-full bg-white dark:bg-[#031C11] border border-slate-200/90 dark:border-white/10 rounded-2xl p-7 sm:p-8 shadow-xs hover:shadow-lg transition-shadow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-white/10">
                      <span className="text-xs uppercase font-mono font-bold text-emerald-700 dark:text-emerald-400 tracking-wider inline-flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        Verified Collaborator
                      </span>
                      {partner.activitySlug && (
                        <Link
                          to={`/activities/${partner.activitySlug}`}
                          className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 inline-flex items-center gap-1"
                        >
                          View Activity &rarr;
                        </Link>
                      )}
                    </div>
                    <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-2">
                      {partner.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {partner.description}
                    </p>
                    {partner.collaborationDetail && (
                      <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-[#02140C] p-3.5 rounded-xl border-l-2 border-emerald-500 italic">
                        {partner.collaborationDetail}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>
          ))}

          {/* Invitation to Partner Card */}
          <div className="md:col-span-5">
            <Reveal delay={100}>
              <div className="h-full bg-gradient-to-br from-[#063D24] to-[#032014] text-white p-7 sm:p-8 rounded-2xl border border-emerald-500/30 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4 border border-white/15">
                    <HeartHandshake className="w-5 h-5 text-emerald-300" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white mb-2">
                    Partner With ONDRINAI
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
                    We welcome colleges, environmental student clubs, and local social groups to co-organize tree planting, food relief drives, and community care initiatives.
                  </p>
                </div>
                <div>
                  <Link
                    to="/contact"
                    className="btn-light text-xs sm:text-sm w-full justify-center rounded-xl"
                  >
                    <span>Propose a Collaboration</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <p className="text-[11px] text-white/50 text-center mt-3 font-mono">
                    We only list verified partners after confirmed on-ground participation.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
