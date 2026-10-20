import { SEO } from '@/components/SEO';
import { Reveal } from '@/components/ui/Primitives';
import { siteConfig, ASSETS } from '@/config/site';

export function PrivacyPolicyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="How ONDRINAI handles contact enquiries and data responsibly."
        image={ASSETS.logo}
      />

      <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#03150D] dark:via-[#02140C] dark:to-[#03150D] pt-32 pb-16 sm:pt-36 sm:pb-20 border-b border-slate-200/80 dark:border-white/10 cyber-grid">
        <div className="container-max container-px relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-mono uppercase tracking-widest mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Transparent Governance</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 dark:text-white text-balance">
              Privacy &amp; Data Ethics
            </h1>
            <p className="mt-4 text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Last updated: October 2026 &bull; {siteConfig.brandName} Protocol
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-slate-50 dark:bg-[#02110A] py-16 sm:py-24">
        <div className="container-max container-px">
          <div className="max-w-3xl space-y-6">
            <Reveal>
              <div className="bg-white dark:bg-[#031C11] p-7 sm:p-9 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xs">
                <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-3">Our Commitment</h2>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {siteConfig.brandName} is a student-led community initiative in Madurai, Tamil Nadu. We believe in treating people with respect and transparency. This policy outlines how we handle any information you provide when interacting with us.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="bg-white dark:bg-[#031C11] p-7 sm:p-9 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xs">
                <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-3">Information We Receive</h2>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  When you send us an email or submit an enquiry via our contact form, we receive your name, email address, reason for contacting, and message details. If you join our WhatsApp volunteer community, your phone number and profile name are visible to other members of that group as per standard WhatsApp privacy settings.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="bg-white dark:bg-[#031C11] p-7 sm:p-9 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xs">
                <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-3">How We Use Information</h2>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  We use your contact details solely to respond to your questions, coordinate volunteer participation, or discuss collaborative initiatives. We do not sell, rent, monetize, or distribute your information to any third parties or advertisers.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="bg-white dark:bg-[#031C11] p-7 sm:p-9 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xs">
                <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-3">Contributions &amp; Donor Privacy</h2>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  When choosing to support ONDRINAI causes, any name, email address, or dedication message you enter on the website is completely optional. This website operates without a database — donor details are not saved to remote servers, persistent cookies, or profiling systems.
                </p>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  The option to consent to public recognition is <strong className="text-slate-900 dark:text-white">unchecked by default</strong>. Unless you explicitly check this consent box and provide your name, contributions are treated as completely anonymous. We will never publish donor names without explicit written consent.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="bg-white dark:bg-[#031C11] p-7 sm:p-9 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xs">
                <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-3">Third-Party UPI Payments</h2>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  Direct UPI contributions are completed directly within your banking or UPI application (such as Google Pay, PhonePe, Paytm, or BHIM) and processed by the respective payment networks and banks. This website does not process, handle, or store bank credentials, UPI PINs, or financial account details.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="bg-white dark:bg-[#031C11] p-7 sm:p-9 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xs">
                <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-3">Photographs &amp; Privacy</h2>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  ONDRINAI documents ground activities to ensure transparency and accountability in our visual gallery and activity archive. We strive to protect the dignity and privacy of all community members, children, and elderly residents. If you appear in any published activity photograph and wish for it to be removed or obscured, please email us directly.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="bg-white dark:bg-[#031C11] p-7 sm:p-9 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xs">
                <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-3">Legal Status &amp; Transparency</h2>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  ONDRINAI is a community-led grassroots social initiative in Madurai, Tamil Nadu. We are not a registered NGO, corporate entity, or Section 80G tax-exempt organization. Contributions represent voluntary community support for direct activity supplies and do not qualify for tax exemption receipts.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="bg-white dark:bg-[#031C11] p-7 sm:p-9 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-xs">
                <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-3">Your Rights &amp; Contact</h2>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  You can request to update, view, or delete any direct correspondence records we have by sending an email to{' '}
                  <a href={`mailto:${siteConfig.email}`} className="text-emerald-700 dark:text-emerald-400 underline hover:text-emerald-900 dark:hover:text-emerald-300 font-semibold">
                    {siteConfig.email}
                  </a>.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800 rounded-2xl p-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed shadow-xs">
                <p>
                  <strong className="text-emerald-800 dark:text-emerald-300">Notice:</strong> {siteConfig.brandName} is a grassroots student-led community initiative. This document is provided in good faith to explain our honest practices and does not represent a certified corporate or registered legal entity.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
