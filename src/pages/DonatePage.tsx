import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Plus,
  Minus,
  ArrowRight,
  ShieldAlert,
  Info,
  Check,
  Copy,
  ExternalLink,
  MessageCircle,
  Mail,
  Phone,
  Sparkles,
  HelpCircle,
  Lock,
} from 'lucide-react';
import { contributionCauses, activitySponsorships } from '@/data/contributions';
import { siteConfig, paymentConfig, WHATSAPP_COMMUNITY_URL } from '@/config/site';
import { Reveal, PageHeader } from '@/components/ui/Primitives';
import type { ContributionCause, ActivitySponsorship } from '@/types';

export function DonatePage() {
  // State for cause quantities: id -> quantity
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  
  // State for optional donor details
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [publicConsent, setPublicConsent] = useState(false); // Unchecked by default
  
  // State for copying UPI ID
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Selected causes with quantity > 0
  const selectedCauses = useMemo(() => {
    return contributionCauses
      .filter((cause) => (quantities[cause.id] || 0) > 0)
      .map((cause) => ({
        ...cause,
        quantity: quantities[cause.id] || 0,
        subtotal: (quantities[cause.id] || 0) * cause.amount,
      }));
  }, [quantities]);

  // Grand total derived strictly from selected items
  const grandTotal = useMemo(() => {
    return selectedCauses.reduce((sum, item) => sum + item.subtotal, 0);
  }, [selectedCauses]);

  const handleQuantityChange = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const handleManualQuantity = (id: string, value: string) => {
    const num = parseInt(value, 10);
    if (isNaN(num) || num <= 0) {
      setQuantities((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    } else {
      setQuantities((prev) => ({ ...prev, [id]: Math.min(500, num) }));
    }
  };

  const handleReset = () => {
    setQuantities({});
  };

  const handleCopyUpi = () => {
    if (paymentConfig.upiId) {
      navigator.clipboard.writeText(paymentConfig.upiId);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2500);
    }
  };

  // Generate UPI payment URL if enabled
  const upiPaymentUrl = useMemo(() => {
    if (!paymentConfig.isEnabled || !paymentConfig.upiId || grandTotal <= 0) return '';
    const note = encodeURIComponent(
      `${paymentConfig.transactionNotePrefix} (${selectedCauses.map((c) => `${c.title} x${c.quantity}`).join(', ')})`.slice(0, 80)
    );
    const pn = encodeURIComponent(paymentConfig.recipientName);
    return `upi://pay?pa=${paymentConfig.upiId}&pn=${pn}&am=${grandTotal}&cu=INR&tn=${note}`;
  }, [grandTotal, selectedCauses]);

  return (
    <>
      <PageHeader
        eyebrow="Financial Contributions"
        title="Together, We Create a Better Tomorrow"
        subtitle="Every rupee directly funds on-ground materials, fresh meals, native saplings, and community care in Madurai. Transparent, accountable, and driven by collective action."
      />

      {/* Trust & Legal Status Notice */}
      <section className="bg-cream/40 border-b border-forest/10 py-6">
        <div className="container-max container-px">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-off-white border border-forest/15 rounded-sm text-xs text-charcoal/80">
            <div className="p-2 rounded-full bg-forest/10 text-forest shrink-0">
              <Info className="w-4 h-4" />
            </div>
            <div className="leading-relaxed">
              <strong className="font-semibold text-forest">Honest Community Status:</strong> ONDRINAI is a community-led grassroots social initiative in Madurai, Tamil Nadu. We are <em>not</em> a registered NGO, company, or 80G tax-exempt entity. Contributions support direct activity supplies and are not tax-deductible.
            </div>
          </div>
        </div>
      </section>

      {/* Main Contribution Selection Section */}
      <section className="py-12 sm:py-16">
        <div className="container-max container-px">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Causes Grid */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-8">
              <div>
                <span className="eyebrow text-accent-dark">Step 1 &bull; Choose Items</span>
                <h2 className="text-2xl sm:text-3xl font-serif font-medium text-forest mt-1">
                  Proposed Contribution Benchmarks
                </h2>
                <p className="text-sm text-charcoal/70 mt-2 leading-relaxed">
                  Select the causes and quantities you wish to support. The amounts below represent ONDRINAI&apos;s proposed ground cost benchmarks based on actual community drives in Madurai.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {contributionCauses.map((cause) => {
                  const qty = quantities[cause.id] || 0;
                  const isSelected = qty > 0;

                  return (
                    <div
                      key={cause.id}
                      className={`flex flex-col justify-between p-5 rounded-sm border transition-all duration-200 ${
                        isSelected
                          ? 'bg-cream/50 border-forest shadow-sm ring-1 ring-forest/20'
                          : 'bg-off-white border-forest/15 hover:border-forest/30'
                      }`}
                    >
                      <div>
                        {/* Header: Category Badge + Amount */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="inline-block px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-wider text-forest bg-forest/10 rounded-full uppercase">
                            {cause.category}
                          </span>
                          <div className="text-right">
                            <span className="text-xl font-bold font-serif text-forest">
                              ₹{cause.amount}
                            </span>
                            <span className="text-[11px] text-charcoal/60 ml-1">
                              {cause.unitLabel}
                            </span>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <h3 className="font-serif font-bold text-forest text-base mb-1.5 leading-snug">
                          {cause.title}
                        </h3>
                        <p className="text-xs text-charcoal/70 leading-relaxed mb-3">
                          {cause.description}
                        </p>

                        {/* Context Note / Disclaimer */}
                        <p className="text-[11px] text-charcoal/55 bg-cream/70 p-2.5 rounded-sm border-l-2 border-forest/30 leading-normal mb-4">
                          {cause.disclaimer}
                        </p>
                      </div>

                      {/* Quantity Controller */}
                      <div className="pt-3 border-t border-forest/10 flex items-center justify-between">
                        <span className="text-xs font-medium text-charcoal/70">
                          Quantity:
                        </span>
                        <div className="flex items-center border border-forest/20 rounded-sm bg-white overflow-hidden shadow-2xs">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(cause.id, -1)}
                            disabled={qty === 0}
                            aria-label={`Decrease quantity for ${cause.title}`}
                            className="p-1.5 hover:bg-forest/10 disabled:opacity-30 disabled:hover:bg-transparent text-forest transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <input
                            type="number"
                            min="0"
                            max="500"
                            value={qty === 0 ? '' : qty}
                            onChange={(e) => handleManualQuantity(cause.id, e.target.value)}
                            placeholder="0"
                            aria-label={`Quantity for ${cause.title}`}
                            className="w-12 text-center text-xs font-semibold text-forest focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(cause.id, 1)}
                            aria-label={`Increase quantity for ${cause.title}`}
                            className="p-1.5 hover:bg-forest/10 text-forest transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sponsor Entire Activity Banner */}
              <div className="p-6 bg-forest text-cream rounded-sm border border-forest/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono tracking-widest uppercase text-sage font-bold">
                    Complete Sponsorship
                  </span>
                  <h3 className="text-lg font-serif font-medium text-cream mt-1">
                    Looking to sponsor an entire community activity?
                  </h3>
                  <p className="text-xs text-cream/75 mt-1 leading-relaxed max-w-xl">
                    You can fund an entire 50-meal food drive, a native Panai seed planting weekend, or an elder care lunch visit.
                  </p>
                </div>
                <a
                  href="#sponsor-activity"
                  className="btn-light text-xs shrink-0 whitespace-nowrap"
                >
                  View Activity Targets &darr;
                </a>
              </div>
            </div>

            {/* Right Column: Dynamic Summary & Payment Execution */}
            <div className="lg:col-span-5 xl:col-span-4 sticky top-28 space-y-6">
              
              {/* Contribution Summary Card */}
              <div className="bg-off-white border border-forest/20 p-6 rounded-sm shadow-sm">
                <div className="flex items-center justify-between border-b border-forest/10 pb-4 mb-4">
                  <div>
                    <span className="eyebrow text-accent-dark">Step 2</span>
                    <h3 className="text-lg font-serif font-bold text-forest">
                      Contribution Summary
                    </h3>
                  </div>
                  {selectedCauses.length > 0 && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs text-charcoal/50 hover:text-forest underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {selectedCauses.length === 0 ? (
                  <div className="py-8 text-center text-charcoal/50">
                    <p className="text-sm">No items selected yet.</p>
                    <p className="text-xs mt-1 text-charcoal/40">
                      Choose one or more causes from the left to calculate your contribution.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-1">
                    {selectedCauses.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start justify-between text-xs py-2 border-b border-forest/5"
                      >
                        <div className="pr-2">
                          <p className="font-semibold text-charcoal/90">{item.title}</p>
                          <p className="text-[11px] text-charcoal/60">
                            ₹{item.amount} &times; {item.quantity} {item.unitLabel}
                          </p>
                        </div>
                        <span className="font-mono font-bold text-forest">
                          ₹{item.subtotal.toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Grand Total Calculation */}
                <div className="pt-4 border-t-2 border-forest/20 flex items-baseline justify-between mb-6">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-charcoal/70">
                      Total Contribution
                    </span>
                    <p className="text-[11px] text-charcoal/50">Calculated directly from selected quantities</p>
                  </div>
                  <span className="text-3xl font-serif font-bold text-forest">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Optional Donor Information */}
                <div className="space-y-4 pt-4 border-t border-forest/10 mb-6">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-forest">
                    <Lock className="w-3.5 h-3.5 text-forest/70" />
                    <span>Optional Donor Details</span>
                  </div>

                  <div>
                    <label htmlFor="donor-name" className="block text-xs text-charcoal/70 mb-1">
                      Your Name <span className="text-charcoal/40">(Optional — leave blank to stay anonymous)</span>
                    </label>
                    <input
                      id="donor-name"
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="Anonymous Supporter"
                      className="w-full text-xs p-2.5 bg-cream/30 border border-forest/15 rounded-sm text-forest placeholder:text-charcoal/40 focus:border-forest focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="donor-email" className="block text-xs text-charcoal/70 mb-1">
                      Email Address <span className="text-charcoal/40">(Optional — for follow-up notes)</span>
                    </label>
                    <input
                      id="donor-email"
                      type="email"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full text-xs p-2.5 bg-cream/30 border border-forest/15 rounded-sm text-forest placeholder:text-charcoal/40 focus:border-forest focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="donor-message" className="block text-xs text-charcoal/70 mb-1">
                      Contribution Message <span className="text-charcoal/40">(Optional)</span>
                    </label>
                    <textarea
                      id="donor-message"
                      rows={2}
                      value={donorMessage}
                      onChange={(e) => setDonorMessage(e.target.value)}
                      placeholder="e.g., In support of the old-age home lunch visit"
                      className="w-full text-xs p-2.5 bg-cream/30 border border-forest/15 rounded-sm text-forest placeholder:text-charcoal/40 focus:border-forest focus:outline-none resize-none"
                    />
                  </div>

                  {/* UNCHECKED-BY-DEFAULT Consent Box */}
                  <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={publicConsent}
                      onChange={(e) => setPublicConsent(e.target.checked)}
                      className="mt-0.5 rounded text-forest focus:ring-forest"
                    />
                    <span className="text-[11px] text-charcoal/70 leading-snug">
                      I consent to my name being acknowledged publicly if ONDRINAI shares a community thank-you note. <em className="text-charcoal/50">(Leave unchecked to remain completely anonymous.)</em>
                    </span>
                  </label>
                </div>

                {/* Payment Action / Direct UPI Section */}
                <div className="pt-4 border-t border-forest/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow text-accent-dark">Step 3 &bull; Payment</span>
                    <span className="text-[11px] font-mono text-forest/70">Direct UPI</span>
                  </div>

                  {paymentConfig.isEnabled && paymentConfig.upiId ? (
                    /* Active Verified UPI Interface */
                    <div className="space-y-4">
                      {grandTotal > 0 ? (
                        <>
                          <a
                            href={upiPaymentUrl}
                            className="btn-primary w-full justify-center text-sm py-3"
                          >
                            <span>Pay ₹{grandTotal.toLocaleString('en-IN')} via UPI App</span>
                            <ArrowRight className="w-4 h-4" />
                          </a>
                          <p className="text-[11px] text-charcoal/60 text-center">
                            Opens Google Pay, PhonePe, Paytm, or your default UPI app.
                          </p>
                        </>
                      ) : (
                        <div className="p-3 bg-cream/50 text-center rounded-sm text-xs text-charcoal/60">
                          Please select at least one cause above to proceed with payment.
                        </div>
                      )}

                      {/* Display UPI ID with Copy button */}
                      <div className="p-3 bg-cream/40 border border-forest/15 rounded-sm flex items-center justify-between gap-2">
                        <div>
                          <p className="text-[10px] uppercase font-mono text-charcoal/50">Verified UPI ID</p>
                          <p className="text-xs font-mono font-bold text-forest">{paymentConfig.upiId}</p>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyUpi}
                          className="btn-ghost text-xs p-1.5"
                          title="Copy UPI ID"
                        >
                          {copiedUpi ? (
                            <span className="text-forest text-[11px] inline-flex items-center gap-1 font-semibold">
                              <Check className="w-3.5 h-3.5" /> Copied
                            </span>
                          ) : (
                            <span className="text-charcoal/70 text-[11px] inline-flex items-center gap-1">
                              <Copy className="w-3.5 h-3.5" /> Copy
                            </span>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Safe Inactive / Pending Details State */
                    <div className="space-y-4">
                      <div className="p-4 bg-cream/60 border border-forest/20 rounded-sm">
                        <div className="flex items-start gap-2.5">
                          <ShieldAlert className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-forest">
                              Direct UPI Activation Pending
                            </p>
                            <p className="text-[11px] text-charcoal/70 mt-1 leading-relaxed">
                              {paymentConfig.notice}
                            </p>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled
                        className="w-full py-3 px-4 bg-forest/20 text-forest/60 text-xs font-semibold rounded-sm cursor-not-allowed text-center"
                      >
                        Payment Action Pending Official Account
                      </button>

                      <div className="p-3 bg-off-white border border-forest/10 rounded-sm">
                        <p className="text-[11px] text-charcoal/70 font-medium mb-2">
                          To coordinate a contribution directly with our team:
                        </p>
                        <div className="space-y-1.5 text-xs text-charcoal/80">
                          <a
                            href={`tel:${siteConfig.founderPhoneTel}`}
                            className="flex items-center gap-2 hover:text-forest transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5 text-forest" />
                            <span>{siteConfig.founderPhone} ({siteConfig.founderName})</span>
                          </a>
                          <a
                            href={`mailto:${siteConfig.email}`}
                            className="flex items-center gap-2 hover:text-forest transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5 text-forest" />
                            <span>{siteConfig.email}</span>
                          </a>
                          <a
                            href={WHATSAPP_COMMUNITY_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-forest font-semibold hover:underline"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Join Volunteer WhatsApp Community</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Honest Verification Notice */}
                  <div className="pt-3 border-t border-forest/10">
                    <p className="text-[11px] text-charcoal/55 leading-relaxed">
                      <strong>Payment Verification Note:</strong> In this transparent database-free release, payments are completed directly via your bank&apos;s UPI app. The website does not store transaction records or automatically verify payments. If you require manual confirmation, kindly share your transaction reference with us via WhatsApp or email.
                    </p>
                  </div>
                </div>
              </div>

              {/* Privacy & Non-storage Guarantee */}
              <div className="text-[11px] text-charcoal/55 bg-cream/30 p-4 rounded-sm border border-forest/10 leading-relaxed space-y-1.5">
                <p className="font-semibold text-charcoal/70">Privacy &amp; Data Ethics:</p>
                <p>
                  No donor accounts, passwords, or personal databases are maintained. Your name and message remain strictly on your local browser during this session.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Sponsor a Complete Activity */}
      <section id="sponsor-activity" className="py-16 sm:py-20 bg-cream/40 border-t border-forest/10">
        <div className="container-max container-px">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="eyebrow text-accent-dark inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-forest" />
                Targeted Funding
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-medium text-forest mt-1 text-balance">
                Sponsor a Complete Activity
              </h2>
              <p className="mt-3 text-sm sm:text-base text-charcoal/70 leading-relaxed text-pretty">
                Individuals, student clubs, or local groups can fully fund or contribute toward planned community drives. Below are real-world activity estimates based on previous execution.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {activitySponsorships.map((sponsorship, index) => (
              <Reveal key={sponsorship.id} delay={index * 80}>
                <div className="h-full bg-off-white border border-forest/15 rounded-sm overflow-hidden flex flex-col justify-between shadow-2xs hover:border-forest/30 transition-all">
                  <div>
                    {/* Activity Image Banner if available */}
                    {sponsorship.image && (
                      <div className="h-48 overflow-hidden relative">
                        <img
                          src={sponsorship.image}
                          alt={sponsorship.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider text-cream bg-deep-green/90 rounded-full uppercase">
                            {sponsorship.category} &bull; {sponsorship.status}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-6 sm:p-7">
                      <div className="flex items-baseline justify-between gap-3 mb-2">
                        <h3 className="text-xl font-serif font-bold text-forest">
                          {sponsorship.title}
                        </h3>
                      </div>

                      {sponsorship.targetAmount && (
                        <div className="mb-4 pb-3 border-b border-forest/10 flex items-baseline gap-2">
                          <span className="text-2xl font-serif font-bold text-forest">
                            ₹{sponsorship.targetAmount.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-charcoal/60 font-medium">
                            Full Activity Target
                          </span>
                        </div>
                      )}

                      <p className="text-xs sm:text-sm text-charcoal/75 leading-relaxed mb-4">
                        {sponsorship.shortDescription}
                      </p>

                      <div className="bg-cream/60 p-3.5 rounded-sm mb-4 space-y-1.5 text-xs text-charcoal/70">
                        <p>
                          <strong className="text-forest">What this target covers:</strong>{' '}
                          {sponsorship.targetDescription}
                        </p>
                        {sponsorship.plannedDate && (
                          <p>
                            <strong className="text-forest">Timing:</strong>{' '}
                            {sponsorship.plannedDate}
                          </p>
                        )}
                      </div>

                      {sponsorship.fundingNotes && (
                        <p className="text-[11px] text-charcoal/55 italic leading-relaxed">
                          Note: {sponsorship.fundingNotes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="p-6 pt-0 sm:p-7 sm:pt-0">
                    <div className="pt-4 border-t border-forest/10 flex items-center justify-between gap-3">
                      {sponsorship.activitySlug ? (
                        <Link
                          to={`/activities/${sponsorship.activitySlug}`}
                          className="text-xs font-semibold text-forest hover:text-deep-green inline-flex items-center gap-1"
                        >
                          View Past Activity Details &rarr;
                        </Link>
                      ) : (
                        <span className="text-xs text-charcoal/50">Upcoming Community Drive</span>
                      )}

                      <a
                        href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(`Inquiry: Sponsoring ${sponsorship.title}`)}`}
                        className="btn-outline text-xs py-2 px-3"
                      >
                        Sponsor / Inquire
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Transparent Funding Policy Card */}
          <div className="mt-12 p-6 sm:p-8 bg-off-white border border-forest/15 rounded-sm">
            <h4 className="font-serif font-bold text-forest text-lg mb-2 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-forest/70" />
              Transparent Activity Funding Policies
            </h4>
            <div className="grid sm:grid-cols-3 gap-6 text-xs text-charcoal/75 mt-4">
              <div>
                <strong className="text-forest block mb-1">Partial Funding</strong>
                If an activity receives partial sponsorship, funds are held in transparent reserve strictly for that specific drive until remaining resources are secured.
              </div>
              <div>
                <strong className="text-forest block mb-1">Surplus Funding</strong>
                If contributions exceed the target of a specific drive, surplus funds are rolled forward to the subsequent scheduled drive under the same cause.
              </div>
              <div>
                <strong className="text-forest block mb-1">Postponement or Delays</strong>
                If weather or on-ground conditions require postponing an initiative (e.g. seed sowing), activities are rescheduled to the earliest viable period.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Participation Reminder */}
      <section className="py-14 bg-deep-green text-cream text-center">
        <div className="container-max container-px max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-serif font-medium text-cream mb-3">
            You Don&apos;t Have to Contribute Money to Help
          </h2>
          <p className="text-xs sm:text-sm text-cream/75 leading-relaxed mb-6">
            Our most valuable support comes from hands on the ground — planting seeds, serving meals, sharing logistics, and spreading awareness.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/get-involved" className="btn-light text-xs sm:text-sm">
              Explore Volunteer Paths
            </Link>
            <a
              href={WHATSAPP_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-xs sm:text-sm border-cream/30 text-cream hover:bg-cream/10"
            >
              Join WhatsApp Community
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
