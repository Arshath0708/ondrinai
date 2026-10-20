import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
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
  ShieldCheck,
} from 'lucide-react';
import { contributionCauses, activitySponsorships } from '@/data/contributions';
import { siteConfig, paymentConfig, WHATSAPP_COMMUNITY_URL } from '@/config/site';
import { Reveal, PageHeader } from '@/components/ui/Primitives';
import type { ContributionCause, ActivitySponsorship } from '@/types';

export function DonatePage() {
  const [searchParams] = useSearchParams();

  // State for cause quantities: id -> quantity (initialized from URL if present)
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    contributionCauses.forEach((cause) => {
      const paramVal = searchParams.get(`cause_${cause.id}`);
      if (paramVal) {
        const parsed = parseInt(paramVal, 10);
        if (!isNaN(parsed) && parsed > 0) {
          initial[cause.id] = parsed;
        }
      }
    });
    return initial;
  });
  
  // State for optional donor details
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [publicConsent, setPublicConsent] = useState(false); // Unchecked by default
  
  // State for copying UPI ID and GPay number
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedGpay, setCopiedGpay] = useState(false);

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

  const handleCopyGpay = () => {
    const num = paymentConfig.gpayNumber || '8428858856';
    navigator.clipboard.writeText(num);
    setCopiedGpay(true);
    setTimeout(() => setCopiedGpay(false), 2500);
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
        eyebrow="Direct Citizen Impact &bull; Transparent Causes"
        title="Together, We Create a Better Tomorrow"
        subtitle="Every rupee directly funds on-ground materials, fresh meals, native saplings, and community care. Transparent, accountable, and driven by collective action."
      />

      {/* Trust & Legal Status Notice */}
      <section className="bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-white/10 py-6">
        <div className="container-max container-px">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 rounded-2xl text-xs text-slate-700 dark:text-slate-300 shadow-xs">
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 shrink-0 border border-amber-200/80 dark:border-amber-800">
              <Info className="w-4 h-4" />
            </div>
            <div className="leading-relaxed">
              <strong className="font-semibold text-slate-900 dark:text-white font-mono uppercase text-[11px] tracking-wider">Honest Community Status:</strong>{' '}
              ONDRINAI is a community-led grassroots social initiative in Madurai, Tamil Nadu. We are <em>not</em> a registered NGO, company, or 80G tax-exempt entity. Contributions support direct activity supplies and are not tax-deductible.
            </div>
          </div>
        </div>
      </section>

      {/* Main Contribution Selection Section */}
      <section className="py-12 sm:py-16 bg-white dark:bg-[#0B0F19]">
        <div className="container-max container-px">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Causes Grid */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-8">
              <div>
                <span className="eyebrow text-amber-700 dark:text-amber-400 font-mono font-bold">Step 1 &bull; Choose Items</span>
                <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
                  Proposed Contribution Benchmarks
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  Select the causes and quantities you wish to support. The amounts below represent ONDRINAI&apos;s proposed ground cost benchmarks based on actual community drives in Madurai.
                </p>

                {/* 1-Click Fast Sponsor Presets */}
                <div className="flex flex-wrap items-center gap-2 pt-3">
                  <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">⚡ 1-Click:</span>
                  <button
                    type="button"
                    onClick={() => setQuantities({ 'breakfast-person': 1 })}
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs font-mono font-semibold text-slate-800 dark:text-slate-200 hover:border-amber-500 hover:text-amber-700 dark:hover:text-amber-400 transition-colors shadow-xs"
                  >
                    🍲 1 Meal (₹30)
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuantities({ 'lunch-person': 1 })}
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs font-mono font-semibold text-slate-800 dark:text-slate-200 hover:border-amber-500 hover:text-amber-700 dark:hover:text-amber-400 transition-colors shadow-xs"
                  >
                    🍱 1 Lunch (₹60)
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuantities({ 'stray-animal-food': 2 })}
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs font-mono font-semibold text-slate-800 dark:text-slate-200 hover:border-amber-500 hover:text-amber-700 dark:hover:text-amber-400 transition-colors shadow-xs"
                  >
                    🐕 2 Stray Dogs (₹40)
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuantities({ 'plant-tree': 1 })}
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs font-mono font-semibold text-slate-800 dark:text-slate-200 hover:border-amber-500 hover:text-amber-700 dark:hover:text-amber-400 transition-colors shadow-xs"
                  >
                    🌱 1 Tree (₹70)
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuantities({ 'breakfast-person': 1, 'lunch-person': 1, 'dinner-person': 1 })}
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs font-mono font-semibold text-slate-800 dark:text-slate-200 hover:border-amber-500 hover:text-amber-700 dark:hover:text-amber-400 transition-colors shadow-xs"
                  >
                    🍲 Full Day Meals (₹120)
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuantities({ 'lunch-person': 1, 'stray-animal-food': 1, 'plant-tree': 1 })}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border border-amber-300 dark:border-amber-700 text-xs font-mono font-bold text-slate-800 dark:text-slate-100 hover:border-amber-400 transition-colors shadow-xs"
                  >
                    🌟 Trinity Pack (₹140)
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {contributionCauses.map((cause) => {
                  const qty = quantities[cause.id] || 0;
                  const isSelected = qty > 0;
                  const isWater = cause.category === 'WATER';

                  return (
                    <div
                      key={cause.id}
                      className={`flex flex-col justify-between p-5 rounded-2xl border transition-all duration-200 ${
                        isSelected
                          ? isWater
                            ? 'bg-sky-50/40 dark:bg-sky-950/30 border-sky-500 dark:border-sky-400 shadow-md ring-2 ring-sky-500/20'
                            : 'bg-amber-50/40 dark:bg-amber-950/30 border-amber-500 dark:border-amber-500 shadow-md ring-2 ring-amber-500/20'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 shadow-xs'
                      }`}
                    >
                      <div>
                        {/* Header: Category Badge + Amount */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className={`inline-block px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-wider rounded-md uppercase border ${
                            isWater
                              ? 'text-sky-800 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 border-sky-200 dark:border-sky-800'
                              : 'text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800'
                          }`}>
                            {cause.category}
                          </span>
                          <div className="text-right">
                            <span className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                              ₹{cause.amount}
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 ml-1">
                              {cause.unitLabel}
                            </span>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <h3 className="font-serif font-bold text-slate-900 dark:text-white text-base mb-1.5 leading-snug">
                          {cause.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                          {cause.description}
                        </p>

                        {/* Context Note / Disclaimer */}
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border-l-2 border-amber-500 leading-normal mb-4">
                          {cause.disclaimer}
                        </p>
                      </div>

                      {/* Quantity Controller */}
                      <div className="pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                          Quantity:
                        </span>
                        <div className="flex items-center border border-slate-200 dark:border-white/15 rounded-xl bg-white dark:bg-slate-950 overflow-hidden shadow-xs">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(cause.id, -1)}
                            disabled={qty === 0}
                            aria-label={`Decrease quantity for ${cause.title}`}
                            className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent text-slate-700 dark:text-slate-300 transition-colors"
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
                            className="w-12 text-center text-xs font-bold text-slate-900 dark:text-white bg-transparent focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(cause.id, 1)}
                            aria-label={`Increase quantity for ${cause.title}`}
                            className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/10 text-amber-700 dark:text-amber-400 transition-colors font-bold"
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
              <div className="p-6 bg-gradient-to-r from-amber-900 to-stone-950 text-white rounded-2xl border border-amber-500/20 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono tracking-widest uppercase text-amber-300 font-bold">
                    Complete Sponsorship
                  </span>
                  <h3 className="text-lg font-serif font-bold text-white mt-1">
                    Looking to sponsor an entire community activity?
                  </h3>
                  <p className="text-xs text-amber-100/80 mt-1 leading-relaxed max-w-xl">
                    You can fund an entire 50-meal food drive, a native Panai seed planting weekend, or an elder care lunch visit.
                  </p>
                </div>
                <a
                  href="#sponsor-activity"
                  className="px-4 py-2.5 rounded-xl bg-white text-stone-950 hover:bg-amber-50 font-bold text-xs shrink-0 whitespace-nowrap shadow-md transition-all hover:scale-[1.02] active:scale-100"
                >
                  View Activity Targets &darr;
                </a>
              </div>
            </div>

            {/* Right Column: Dynamic Summary & Payment Execution */}
            <div className="lg:col-span-5 xl:col-span-4 sticky top-28 space-y-6">
              
              {/* Contribution Summary Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-white/10 p-6 sm:p-7 rounded-2xl shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-4 mb-4">
                  <div>
                    <span className="eyebrow text-amber-600 dark:text-amber-400 font-mono tracking-widest text-xs uppercase">Step 2</span>
                    <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white">
                      Contribution Summary
                    </h3>
                  </div>
                  {selectedCauses.length > 0 && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs text-slate-500 dark:text-slate-400 hover:text-amber-700 dark:hover:text-amber-300 underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {selectedCauses.length === 0 ? (
                  <div className="py-8 text-center text-slate-500 dark:text-slate-400">
                    <p className="text-sm">No items selected yet.</p>
                    <p className="text-xs mt-1 text-slate-400 dark:text-slate-500">
                      Choose one or more causes from the left to calculate your contribution.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-1">
                    {selectedCauses.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start justify-between text-xs py-2 border-b border-slate-100 dark:border-white/5"
                      >
                        <div className="pr-2">
                          <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            ₹{item.amount} &times; {item.quantity} {item.unitLabel}
                          </p>
                        </div>
                        <span className="font-mono font-bold text-amber-700 dark:text-amber-400">
                          ₹{item.subtotal.toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Grand Total Calculation */}
                <div className="pt-4 border-t-2 border-amber-500/20 flex items-baseline justify-between mb-6">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Total Contribution
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Calculated directly from selected quantities</p>
                  </div>
                  <span className="text-3xl font-serif font-bold text-slate-900 dark:text-white">
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Optional Donor Information */}
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-white/10 mb-6">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400">
                    <Lock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Optional Donor Details</span>
                  </div>

                  <div>
                    <label htmlFor="donor-name" className="block text-xs font-mono font-medium text-slate-600 dark:text-slate-300 mb-1">
                      Your Name <span className="text-slate-400 font-sans">(Optional — leave blank to stay anonymous)</span>
                    </label>
                    <input
                      id="donor-name"
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="Anonymous Supporter"
                      className="w-full text-xs p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-950 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="donor-email" className="block text-xs font-mono font-medium text-slate-600 dark:text-slate-300 mb-1">
                      Email Address <span className="text-slate-400 font-sans">(Optional — for follow-up notes)</span>
                    </label>
                    <input
                      id="donor-email"
                      type="email"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full text-xs p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-950 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="donor-message" className="block text-xs font-mono font-medium text-slate-600 dark:text-slate-300 mb-1">
                      Contribution Message <span className="text-slate-400 font-sans">(Optional)</span>
                    </label>
                    <textarea
                      id="donor-message"
                      rows={2}
                      value={donorMessage}
                      onChange={(e) => setDonorMessage(e.target.value)}
                      placeholder="e.g., In support of the old-age home lunch visit"
                      className="w-full text-xs p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-amber-500 focus:bg-white dark:focus:bg-slate-950 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* UNCHECKED-BY-DEFAULT Consent Box */}
                  <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={publicConsent}
                      onChange={(e) => setPublicConsent(e.target.checked)}
                      className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
                    />
                    <span className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                      I consent to my name being acknowledged publicly if ONDRINAI shares a community thank-you note. <em className="text-slate-400">(Leave unchecked to remain completely anonymous.)</em>
                    </span>
                  </label>
                </div>

                {/* Payment Action / Direct UPI Section */}
                <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow text-amber-600 font-mono tracking-widest text-xs uppercase">Step 3 &bull; Payment</span>
                    <span className="text-[11px] font-mono text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60 font-semibold">Direct UPI</span>
                  </div>

                  {paymentConfig.isEnabled && paymentConfig.upiId ? (
                    /* Active Verified UPI Interface */
                    <div className="space-y-4">
                      {grandTotal > 0 ? (
                        <>
                          <a
                            href={upiPaymentUrl}
                            className="btn-donate w-full justify-center text-sm py-3.5 rounded-xl font-bold shadow-lg hover:scale-[1.02] active:scale-100 transition-all flex items-center gap-2"
                          >
                            <span>⚡ Pay ₹{grandTotal.toLocaleString('en-IN')} via Google Pay / Any UPI</span>
                            <ArrowRight className="w-4 h-4" />
                          </a>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center font-mono">
                            Automatically opens Google Pay, PhonePe, Paytm, or BHIM with ₹{grandTotal.toLocaleString('en-IN')} pre-filled.
                          </p>

                          {/* Dual Quick-Copy Grid: Google Pay Number & UPI ID */}
                          <div className="grid sm:grid-cols-2 gap-2.5 pt-1">
                            {/* GPay Number Box */}
                            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between gap-2 shadow-2xs">
                              <div className="min-w-0">
                                <p className="text-[10px] uppercase font-mono text-slate-400 dark:text-amber-400 font-semibold truncate">Google Pay / PhonePe</p>
                                <p className="text-sm font-mono font-bold text-slate-900 dark:text-white">8428858856</p>
                              </div>
                              <button
                                type="button"
                                onClick={handleCopyGpay}
                                className="p-1.5 rounded-lg hover:bg-slate-200/80 dark:hover:bg-slate-800 text-slate-600 dark:text-amber-400 transition-colors shrink-0"
                                title="Copy Google Pay Number"
                              >
                                {copiedGpay ? (
                                  <span className="text-amber-600 dark:text-amber-400 text-[11px] inline-flex items-center gap-1 font-bold">
                                    <Check className="w-3.5 h-3.5" /> Copied
                                  </span>
                                ) : (
                                  <span className="text-slate-600 dark:text-slate-300 text-[11px] inline-flex items-center gap-1 font-mono">
                                    <Copy className="w-3.5 h-3.5" /> Copy
                                  </span>
                                )}
                              </button>
                            </div>

                            {/* UPI ID Box */}
                            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between gap-2 shadow-2xs">
                              <div className="min-w-0">
                                <p className="text-[10px] uppercase font-mono text-slate-400 dark:text-amber-400 font-semibold truncate">UPI ID (VPA)</p>
                                <p className="text-xs font-mono font-bold text-amber-800 dark:text-amber-300 truncate">{paymentConfig.upiId}</p>
                              </div>
                              <button
                                type="button"
                                onClick={handleCopyUpi}
                                className="p-1.5 rounded-lg hover:bg-slate-200/80 dark:hover:bg-slate-800 text-slate-600 dark:text-amber-400 transition-colors shrink-0"
                                title="Copy UPI ID"
                              >
                                {copiedUpi ? (
                                  <span className="text-amber-600 dark:text-amber-400 text-[11px] inline-flex items-center gap-1 font-bold">
                                    <Check className="w-3.5 h-3.5" /> Copied
                                  </span>
                                ) : (
                                  <span className="text-slate-600 dark:text-slate-300 text-[11px] inline-flex items-center gap-1 font-mono">
                                    <Copy className="w-3.5 h-3.5" /> Copy
                                  </span>
                                )}
                              </button>
                            </div>
                          </div>

                          {/* WhatsApp Confirmation Notification Link */}
                          <a
                            href={`https://wa.me/918428858856?text=${encodeURIComponent(
                              `Hello Arshath! I have contributed ₹${grandTotal} for:\n` +
                              selectedCauses.map((c) => `• ${c.title} x${c.quantity} (= ₹${c.subtotal})`).join('\n') +
                              (donorName ? `\nFrom: ${donorName}` : '') +
                              (donorMessage ? `\nNote: ${donorMessage}` : '') +
                              `\n\nSharing screenshot for verification.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full justify-center text-xs py-2.5 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 font-semibold flex items-center gap-2 transition-colors"
                          >
                            <MessageCircle className="w-4 h-4 text-amber-600" />
                            <span>Send Screenshot on WhatsApp (+91 84288 58856)</span>
                          </a>
                        </>
                      ) : (
                        <div className="p-4 bg-slate-50 dark:bg-slate-950 text-center rounded-xl text-xs text-slate-500 dark:text-slate-400 border border-dashed border-slate-200 dark:border-slate-800">
                          Please select at least one cause or preset above to proceed with payment.
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Safe Inactive / Pending Details State — Active Direct Coordination */
                    <div className="space-y-4">
                      <div className="p-4 bg-amber-50/70 border border-amber-300 rounded-xl">
                        <div className="flex items-start gap-2.5">
                          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-bold text-amber-900">
                              Direct Ground Coordination
                            </p>
                            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                              To ensure 100% human-to-human transparency and zero processing fees, contributions are coordinated directly with our volunteer team.
                            </p>
                          </div>
                        </div>
                      </div>

                      {grandTotal > 0 ? (
                        <a
                          href={`https://wa.me/918428858856?text=${encodeURIComponent(
                            `Hello ONDRINAI Team! I would like to contribute ₹${grandTotal} for:\n` +
                            selectedCauses.map((c) => `• ${c.title} x${c.quantity} (= ₹${c.subtotal})`).join('\n') +
                            (donorName ? `\nFrom: ${donorName}` : '') +
                            (donorMessage ? `\nNote: ${donorMessage}` : '') +
                            `\n\nPlease share the direct contribution transfer details.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-donate w-full justify-center text-sm py-3.5 rounded-xl shadow-lg hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] flex items-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4 fill-white" />
                          <span>⚡ Send Contribution via WhatsApp (₹{grandTotal.toLocaleString('en-IN')})</span>
                        </a>
                      ) : (
                        <div className="p-3 bg-slate-100 text-center rounded-xl text-xs text-slate-500 font-mono">
                          Select at least one cause above to proceed with your contribution.
                        </div>
                      )}

                      <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                        <p className="text-[11px] text-slate-500 font-mono uppercase font-bold">
                          Direct Contact Lines:
                        </p>
                        <a
                          href={`tel:${siteConfig.founderPhoneTel}`}
                          className="flex items-center gap-2 text-xs font-semibold text-slate-800 hover:text-amber-700 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-amber-600" />
                          <span>Call Founder: {siteConfig.founderPhone} ({siteConfig.founderName})</span>
                        </a>
                        <a
                          href={`mailto:${siteConfig.email}`}
                          className="flex items-center gap-2 text-xs text-slate-600 hover:text-amber-700 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>{siteConfig.email}</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Honest Verification Notice */}
                  <div className="pt-3 border-t border-slate-200/80 dark:border-white/10">
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                      <strong className="text-slate-700 dark:text-slate-200">Payment Verification Note:</strong> In this transparent database-free release, payments are completed directly via your bank&apos;s UPI app. The website does not store transaction records or automatically verify payments. If you require manual confirmation, kindly share your transaction reference with us via WhatsApp or email.
                    </p>
                  </div>
                </div>
              </div>

              {/* Privacy & Non-storage Guarantee */}
              <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-white/10 leading-relaxed space-y-1.5">
                <p className="font-semibold text-slate-700 dark:text-slate-300 font-mono uppercase text-[10px] tracking-wider">Privacy &amp; Data Ethics:</p>
                <p>
                  No donor accounts, passwords, or personal databases are maintained. Your name and message remain strictly on your local browser during this session.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Sponsor a Complete Activity */}
      <section id="sponsor-activity" className="py-16 sm:py-20 bg-slate-50 dark:bg-[#0B0F19] border-t border-slate-200/80 dark:border-white/10">
        <div className="container-max container-px">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="eyebrow text-amber-600 dark:text-amber-400 font-mono tracking-widest text-xs uppercase inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Targeted Funding
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white mt-1 text-balance">
                Sponsor a Complete Activity
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed text-pretty">
                Individuals, student clubs, or local groups can fully fund or contribute toward planned community drives. Below are real-world activity estimates based on previous execution.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8">
            {activitySponsorships.map((sponsorship, index) => (
              <Reveal key={sponsorship.id} delay={index * 80}>
                <div className="h-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs hover:border-amber-500/40 hover:shadow-md transition-all">
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
                          <span className="px-3 py-1 text-[10px] font-mono font-bold tracking-wider text-amber-300 bg-slate-900/90 rounded-full uppercase border border-amber-500/30">
                            {sponsorship.category} &bull; {sponsorship.status}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-6 sm:p-7">
                      <div className="flex items-baseline justify-between gap-3 mb-2">
                        <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
                          {sponsorship.title}
                        </h3>
                      </div>

                      {sponsorship.targetAmount && (
                        <div className="mb-4 pb-3 border-b border-slate-100 dark:border-white/10 flex items-baseline gap-2">
                          <span className="text-2xl font-serif font-bold text-amber-700 dark:text-amber-400">
                            ₹{sponsorship.targetAmount.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs font-mono text-slate-400 font-medium">
                            Full Activity Target
                          </span>
                        </div>
                      )}

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                        {sponsorship.shortDescription}
                      </p>

                      <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl mb-4 space-y-1.5 text-xs text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-white/10">
                        <p>
                          <strong className="text-slate-900 dark:text-white">What this target covers:</strong>{' '}
                          {sponsorship.targetDescription}
                        </p>
                        {sponsorship.plannedDate && (
                          <p>
                            <strong className="text-slate-900 dark:text-white">Timing:</strong>{' '}
                            {sponsorship.plannedDate}
                          </p>
                        )}
                      </div>

                      {sponsorship.fundingNotes && (
                        <p className="text-[11px] text-slate-400 italic leading-relaxed">
                          Note: {sponsorship.fundingNotes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="p-6 pt-0 sm:p-7 sm:pt-0">
                    <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex items-center justify-between gap-3">
                      {sponsorship.activitySlug ? (
                        <Link
                          to={`/activities/${sponsorship.activitySlug}`}
                          className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 inline-flex items-center gap-1"
                        >
                          View Past Activity Details &rarr;
                        </Link>
                      ) : (
                        <span className="text-xs text-slate-400">Upcoming Community Drive</span>
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
          <div className="mt-12 p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 rounded-2xl shadow-xs">
            <h4 className="font-serif font-bold text-slate-900 dark:text-white text-lg mb-2 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              Transparent Activity Funding Policies
            </h4>
            <div className="grid sm:grid-cols-3 gap-6 text-xs text-slate-600 dark:text-slate-300 mt-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-white/10">
                <strong className="text-slate-900 dark:text-white block mb-1 font-mono uppercase text-[11px] tracking-wider">Partial Funding</strong>
                If an activity receives partial sponsorship, funds are held in transparent reserve strictly for that specific drive until remaining resources are secured.
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-white/10">
                <strong className="text-slate-900 dark:text-white block mb-1 font-mono uppercase text-[11px] tracking-wider">Surplus Funding</strong>
                If contributions exceed the target of a specific drive, surplus funds are rolled forward to the subsequent scheduled drive under the same cause.
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-white/10">
                <strong className="text-slate-900 dark:text-white block mb-1 font-mono uppercase text-[11px] tracking-wider">Postponement or Delays</strong>
                If weather or on-ground conditions require postponing an initiative (e.g. seed sowing), activities are rescheduled to the earliest viable period.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Participation Reminder */}
      <section className="relative py-16 bg-[#0B0F19] text-white text-center border-t border-slate-800">
        <div className="container-max container-px max-w-2xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Civic Participation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
            You Don&apos;t Have to Contribute Money to Help
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-8">
            Our most valuable support comes from hands on the ground — planting seeds, serving meals, sharing logistics, and spreading awareness.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/get-involved" className="btn-light text-xs sm:text-sm py-3 px-6 rounded-xl font-semibold shadow-md">
              Explore Volunteer Paths
            </Link>
            <a
              href={WHATSAPP_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl border border-amber-500/30 text-amber-300 hover:bg-amber-500/10 text-xs sm:text-sm font-semibold transition-colors"
            >
              Join WhatsApp Community
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
