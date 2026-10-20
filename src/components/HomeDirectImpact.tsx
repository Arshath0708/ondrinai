import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Sprout,
  Droplets,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  Check,
  CheckCircle2,
} from 'lucide-react';
import { contributionCauses } from '@/data/contributions';
import { ASSETS, WHATSAPP_COMMUNITY_URL } from '@/config/site';
import { Reveal } from '@/components/ui/Primitives';

const causeImages: Record<string, string> = {
  'breakfast-person': ASSETS.activity1,
  'lunch-person': ASSETS.activity3,
  'dinner-person': '/assets/gallery/Feed/Screenshot 2026-10-19 144819.png',
  'stray-animal-food': ASSETS.dog,
  'plant-tree': ASSETS.activity2,
};

// Emotional story mapping for 2100 Cyber-Empathy
const causeEmotionalNotes: Record<string, { tag: string; story: string }> = {
  'breakfast-person': {
    tag: '🌅 Dawn Nourishment',
    story: 'Fresh hot idlis or pongal served at 7 AM to elderly street residents before the morning heat begins.',
  },
  'lunch-person': {
    tag: '☀️ Midday Dignity',
    story: 'Wholesome full meal with fresh rice, hot sambar, and vegetables shared with elders and day-wage workers.',
  },
  'dinner-person': {
    tag: '🌙 Night Shield',
    story: 'Warm nutritious meal before dark so no abandoned elder sleeps on concrete with an empty stomach.',
  },
  'stray-animal-food': {
    tag: '🐾 Voiceless Care',
    story: 'Nutritious high-protein meal served to starving, abandoned stray dogs across street corners.',
  },
  'plant-tree': {
    tag: '🌳 100-Year Legacy',
    story: 'Native Palmyra palm seed sown by youth to anchor groundwater and restore earth for the next century.',
  },
};

// Preset quantities for one-click selection
const PRESETS = [1, 5, 10, 25];

export function HomeDirectImpact() {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'FEED' | 'PLANT' | 'RESPOND'>('ALL');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  // Filtered causes based on category
  const filteredCauses = useMemo(() => {
    if (selectedCategory === 'ALL') return contributionCauses;
    return contributionCauses.filter((cause) => cause.category === selectedCategory);
  }, [selectedCategory]);

  // Derived selected items
  const selectedItems = useMemo(() => {
    return contributionCauses
      .filter((cause) => (quantities[cause.id] || 0) > 0)
      .map((cause) => ({
        ...cause,
        quantity: quantities[cause.id] || 0,
        subtotal: (quantities[cause.id] || 0) * cause.amount,
      }));
  }, [quantities]);

  // Grand total
  const totalAmount = useMemo(() => {
    return selectedItems.reduce((acc, item) => acc + item.subtotal, 0);
  }, [selectedItems]);

  // Total lives / units impacted
  const totalUnits = useMemo(() => {
    return selectedItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [selectedItems]);

  const updateQuantity = (id: string, delta: number) => {
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

  const setPresetQuantity = (id: string, qty: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: qty,
    }));
  };

  const resetAll = () => {
    setQuantities({});
  };

  // 1-Click Fast Impact Bundles for rapid donation
  const applyBundle = (bundle: Record<string, number>) => {
    setQuantities((prev) => ({
      ...prev,
      ...bundle,
    }));
  };

  // Pre-filled WhatsApp link for direct confirmation
  const whatsappUrl = useMemo(() => {
    if (selectedItems.length === 0) {
      return WHATSAPP_COMMUNITY_URL;
    }
    const breakdown = selectedItems.map((item) => `${item.title} (Qty: ${item.quantity} = ₹${item.subtotal})`).join(', ');
    const text = encodeURIComponent(
      `Hello ONDRINAI team! I would like to sponsor:\n${breakdown}\n\nTotal Contribution: ₹${totalAmount}\nPlease guide me with the direct contribution details.`
    );
    return `https://wa.me/918428858856?text=${text}`;
  }, [selectedItems, totalAmount]);

  // Build donate link with pre-filled query params
  const donatePageUrl = useMemo(() => {
    if (selectedItems.length === 0) return '/donate';
    const params = new URLSearchParams();
    selectedItems.forEach((item) => {
      params.append(`cause_${item.id}`, item.quantity.toString());
    });
    return `/donate?${params.toString()}`;
  }, [selectedItems]);

  const upiPaymentUrl = useMemo(() => {
    if (totalAmount <= 0) return '';
    const note = encodeURIComponent(`ONDRINAI Aid: ${selectedItems.map((i) => `${i.title} x${i.quantity}`).join(', ')}`.slice(0, 80));
    return `upi://pay?pa=8428858856@okaxis&pn=Arshath%20Abdulla%20ONDRINAI&am=${totalAmount}&cu=INR&tn=${note}`;
  }, [totalAmount, selectedItems]);

  return (
    <section id="direct-impact" className="bg-slate-50 dark:bg-[#02140C] py-20 sm:py-28 border-b border-slate-200/80 dark:border-emerald-500/20 relative cyber-grid">
      <div className="container-max container-px relative z-10">
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-semibold tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>DIRECT COMMUNITY ACTION &bull; EVERY RUPEE REACHES THE GROUND</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-slate-900 dark:text-white text-balance tracking-tight">
              Sponsor a meal. Plant a tree.
              <br />
              <span className="italic font-normal text-emerald-700 dark:text-emerald-400">Change a life in 15 seconds.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto text-pretty">
              You don&rsquo;t need thousands to make an immediate impact. Select what you wish to provide today &mdash; every single rupee goes straight to raw ingredients, fresh cooking, and native saplings.
            </p>
          </div>
        </Reveal>

        {/* 1-CLICK FAST SPONSOR ACCELERATOR (Fast Donation Bundles) */}
        <Reveal delay={60}>
          <div className="bg-white/80 dark:bg-[#031C11] backdrop-blur-md border border-slate-200 dark:border-emerald-500/20 rounded-2xl p-4 sm:p-5 mb-10 shadow-sm max-w-5xl mx-auto">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-beacon" />
                ⚡ Fast 1-Click Sponsorship Packs:
              </span>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">Tap to select instantly</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
              <button
                type="button"
                onClick={() => applyBundle({ 'breakfast-person': 1 })}
                className="p-2.5 text-left rounded-xl bg-slate-50 dark:bg-[#02140C] hover:bg-emerald-50 dark:hover:bg-emerald-950/60 border border-slate-200 dark:border-white/10 hover:border-emerald-400 dark:hover:border-emerald-500/40 transition-all group"
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 font-serif">🍲 Feed 1 Elder</div>
                <div className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">₹30 &bull; Breakfast</div>
              </button>
              <button
                type="button"
                onClick={() => applyBundle({ 'breakfast-person': 1, 'lunch-person': 1, 'dinner-person': 1 })}
                className="p-2.5 text-left rounded-xl bg-slate-50 dark:bg-[#02140C] hover:bg-emerald-50 dark:hover:bg-emerald-950/60 border border-slate-200 dark:border-white/10 hover:border-emerald-400 dark:hover:border-emerald-500/40 transition-all group"
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 font-serif">🍱 Full Day Meals</div>
                <div className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">₹120 &bull; 3 Feeds</div>
              </button>
              <button
                type="button"
                onClick={() => applyBundle({ 'stray-animal-food': 2 })}
                className="p-2.5 text-left rounded-xl bg-slate-50 dark:bg-[#02140C] hover:bg-emerald-50 dark:hover:bg-emerald-950/60 border border-slate-200 dark:border-white/10 hover:border-emerald-400 dark:hover:border-emerald-500/40 transition-all group"
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 font-serif">🐕 Feed 2 Dogs</div>
                <div className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">₹40 &bull; 2 Feeds</div>
              </button>
              <button
                type="button"
                onClick={() => applyBundle({ 'plant-tree': 1 })}
                className="p-2.5 text-left rounded-xl bg-slate-50 dark:bg-[#02140C] hover:bg-emerald-50 dark:hover:bg-emerald-950/60 border border-slate-200 dark:border-white/10 hover:border-emerald-400 dark:hover:border-emerald-500/40 transition-all group"
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 font-serif">🌱 Plant 1 Tree</div>
                <div className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">₹70 &bull; Palmyra</div>
              </button>
              <button
                type="button"
                onClick={() => applyBundle({ 'breakfast-person': 1, 'lunch-person': 1, 'dinner-person': 1 })}
                className="p-2.5 text-left rounded-xl bg-slate-50 dark:bg-[#02140C] hover:bg-emerald-50 dark:hover:bg-emerald-950/60 border border-slate-200 dark:border-white/10 hover:border-emerald-400 dark:hover:border-emerald-500/40 transition-all group"
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 font-serif">🍲 Full Day Meals</div>
                <div className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">₹120 &bull; 3 Warm Meals</div>
              </button>
              <button
                type="button"
                onClick={() => applyBundle({ 'lunch-person': 1, 'stray-animal-food': 1, 'plant-tree': 1 })}
                className="p-2.5 text-left rounded-xl bg-gradient-to-r from-amber-50 to-emerald-50 dark:from-amber-950/40 dark:to-emerald-950/40 hover:from-amber-100 hover:to-emerald-100 border border-amber-300 dark:border-amber-500/40 hover:border-amber-400 transition-all group shadow-xs"
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-800 dark:group-hover:text-amber-300 font-serif">🌟 Trinity Pack</div>
                <div className="text-xs font-mono font-semibold text-amber-700 dark:text-amber-400 mt-0.5">₹140 &bull; Meal + Tree + Dog</div>
              </button>
            </div>
          </div>
        </Reveal>

        {/* Category Pills Switcher */}
        <Reveal delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <button
              type="button"
              onClick={() => setSelectedCategory('ALL')}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                selectedCategory === 'ALL'
                  ? 'bg-slate-900 dark:bg-emerald-400 text-white dark:text-slate-950 shadow-md font-bold'
                  : 'bg-white dark:bg-[#031C11] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10'
              }`}
            >
              All Causes ({contributionCauses.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('FEED')}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                selectedCategory === 'FEED'
                  ? 'bg-slate-900 dark:bg-emerald-400 text-white dark:text-slate-950 shadow-md font-bold'
                  : 'bg-white dark:bg-[#031C11] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10'
              }`}
            >
              🍲 Meals & Feeding (3)
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('PLANT')}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                selectedCategory === 'PLANT'
                  ? 'bg-slate-900 dark:bg-emerald-400 text-white dark:text-slate-950 shadow-md font-bold'
                  : 'bg-white dark:bg-[#031C11] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10'
              }`}
            >
              🌱 Native Trees (1)
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory('RESPOND')}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                selectedCategory === 'RESPOND'
                  ? 'bg-slate-900 dark:bg-emerald-400 text-white dark:text-slate-950 shadow-md font-bold'
                  : 'bg-white dark:bg-[#031C11] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10'
              }`}
            >
              🐕 Animal Welfare (1)
            </button>
          </div>
        </Reveal>

        {/* Micro-Sponsorship Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCauses.map((cause, idx) => {
            const qty = quantities[cause.id] || 0;
            const subtotal = qty * cause.amount;
            const img = causeImages[cause.id] || ASSETS.activity1;

            const emotional = causeEmotionalNotes[cause.id] || {
              tag: '🌱 Direct Action',
              story: cause.description,
            };

            const isWater = cause.category === 'WATER';

            return (
              <Reveal key={cause.id} delay={idx * 60}>
                <div
                  className={`border transition-all duration-300 rounded-2xl overflow-hidden flex flex-col justify-between group ${
                    qty > 0
                      ? isWater
                        ? 'bg-sky-50/40 dark:bg-[#021F2B] border-sky-500 shadow-[0_10px_30px_rgba(14,165,233,0.3)] ring-2 ring-sky-500/40'
                        : 'bg-emerald-50/40 dark:bg-[#032415] border-emerald-600 dark:border-emerald-500 shadow-[0_10px_30px_rgba(16,185,129,0.25)] ring-2 ring-emerald-500/40'
                      : 'bg-white dark:bg-[#031B10] border-slate-200 dark:border-white/10 hover:border-emerald-500/50 dark:hover:border-emerald-500/40 hover:shadow-2xl dark:hover:shadow-[0_10px_35px_rgba(0,0,0,0.7)] hover:-translate-y-1'
                  }`}
                >
                  {/* Image & Price Header */}
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                      <img
                        src={img}
                        alt={cause.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = ASSETS.activity1;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                      
                      {/* Top Category Tag */}
                      <div className="absolute top-3 left-3">
                        <span className={`px-2.5 py-1 backdrop-blur-md text-[10px] font-mono font-bold uppercase tracking-wider rounded-md border ${
                          isWater
                            ? 'bg-sky-950/80 text-sky-300 border-sky-500/40'
                            : 'bg-black/70 text-emerald-300 border-emerald-500/30'
                        }`}>
                          {cause.category}
                        </span>
                      </div>

                      {/* Emotional Urgency Ribbon */}
                      <div className="absolute bottom-3 left-3">
                        <span className={`text-xs font-mono font-semibold backdrop-blur-md px-2.5 py-1 rounded-md border ${
                          isWater
                            ? 'text-sky-100 bg-sky-950/70 border-sky-400/30'
                            : 'text-white/95 bg-black/60 border-white/20'
                        }`}>
                          {emotional.tag}
                        </span>
                      </div>

                      {/* Prominent Price Tag Badge */}
                      <div className={`absolute bottom-3 right-3 backdrop-blur-md px-3.5 py-1.5 shadow-lg rounded-xl text-right border ${
                        isWater
                          ? 'bg-white/95 dark:bg-[#021824]/90 border-sky-500/40'
                          : 'bg-white/95 dark:bg-[#02140C]/90 border-emerald-500/30'
                      }`}>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono uppercase font-semibold block leading-none">
                          Micro-Sponsorship
                        </span>
                        <div className={`text-xl font-bold font-serif leading-none mt-1 ${
                          isWater ? 'text-sky-600 dark:text-sky-400' : 'text-emerald-700 dark:text-emerald-400'
                        }`}>
                          ₹{cause.amount}
                          <span className="text-xs font-sans font-normal text-slate-600 dark:text-slate-400 ml-1">
                            {cause.unitLabel}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6 bg-white dark:bg-[#031B10]">
                      <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-white leading-snug">
                        {cause.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                        {cause.description}
                      </p>
                      
                      {/* Emotional Ground Context */}
                      <div className="mt-3.5 p-3 rounded-xl bg-slate-50 dark:bg-[#02130B] border border-slate-200/80 dark:border-white/10 text-[11px] text-slate-700 dark:text-slate-300 leading-relaxed flex items-start gap-2">
                        {isWater ? (
                          <Droplets className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                        ) : (
                          <Heart className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        )}
                        <span>{emotional.story}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity & Impact Selector Footer */}
                  <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 dark:border-white/10 mt-auto bg-slate-50/60 dark:bg-[#02140C]/80">
                    <div className="flex items-center justify-between gap-3 pt-4 mb-3">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider font-mono">
                        Select Quantity:
                      </span>
                      {qty > 0 && (
                        <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md border ${
                          isWater
                            ? 'text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/60 border-sky-300 dark:border-sky-700'
                            : 'text-emerald-700 dark:text-emerald-400 font-mono bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700'
                        }`}>
                          = ₹{subtotal}
                        </span>
                      )}
                    </div>

                    {/* Stepper Controls */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="inline-flex items-center border border-slate-300 dark:border-white/15 bg-white dark:bg-[#031E12] rounded-xl shadow-2xs overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateQuantity(cause.id, -1)}
                          disabled={qty === 0}
                          aria-label={`Decrease ${cause.title}`}
                          className="w-9 h-9 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-12 text-center text-sm font-bold font-mono text-slate-900 dark:text-white">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(cause.id, 1)}
                          aria-label={`Increase ${cause.title}`}
                          className={`w-9 h-9 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-white/10 transition-colors font-bold ${
                            isWater ? 'text-sky-600 dark:text-sky-400' : 'text-emerald-700 dark:text-emerald-400'
                          }`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Quick preset buttons */}
                      <div className="flex items-center gap-1.5">
                        {PRESETS.map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setPresetQuantity(cause.id, p)}
                            className={`px-2.5 py-1 text-xs font-mono font-medium rounded-lg border transition-all duration-200 ${
                              qty === p
                                ? isWater
                                  ? 'bg-sky-600 text-white border-sky-600 font-bold shadow-[0_0_12px_rgba(14,165,233,0.4)]'
                                  : 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                                : 'bg-white dark:bg-[#031E12] border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-400'
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Status hint */}
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-mono">
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isWater ? 'text-sky-500' : 'text-emerald-500'}`} />
                      <span>Direct ground preparation &bull; Photo proof shared</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Future Generation Water Motive Informational Callout */}
        <Reveal delay={200}>
          <div className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-sky-950/70 via-slate-900/90 to-blue-950/70 border border-sky-500/30 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center shrink-0">
                <Droplets className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-sky-300 font-bold">Upcoming Core Motive</span>
                  <span className="text-white/30">&bull;</span>
                  <span className="text-[10px] font-mono text-sky-200">Save Water for Future Generations</span>
                </div>
                <p className="text-sm font-serif font-bold text-white mt-0.5">
                  Protecting Madurai's Groundwater Security
                </p>
                <p className="text-xs text-sky-100/80 font-sans mt-0.5 max-w-xl">
                  Till now, we haven't conducted a water action yet. We are preparing volunteer teams and planning community water channel cleanups so the next generation inherits water security.
                </p>
              </div>
            </div>
            <a
              href={WHATSAPP_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold transition-all shadow-md flex items-center gap-1.5 self-end sm:self-auto"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Join Water Motive</span>
            </a>
          </div>
        </Reveal>

        {/* Live Floating 2100 Impact Dock */}
        {totalAmount > 0 && (
          <div className="sticky bottom-6 z-40 mt-10">
            <Reveal>
              <div className="glass-hud text-white p-4 sm:p-6 rounded-3xl shadow-[0_20px_60px_rgba(3,32,20,0.6)] border border-emerald-400/40 backdrop-blur-2xl flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in max-w-4xl mx-auto ring-2 ring-emerald-500/20">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-600 to-emerald-500 flex items-center justify-center shrink-0 shadow-[0_0_25px_rgba(245,158,11,0.5)]">
                    <Heart className="w-7 h-7 text-white fill-white/30" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase tracking-wider font-mono text-emerald-300 font-bold flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-beacon" />
                        {totalUnits} Direct {totalUnits === 1 ? 'Sponsorship' : 'Sponsorships'} Active
                      </span>
                      <span className="text-white/30">&bull;</span>
                      <span className="text-[11px] font-mono text-emerald-200">100% Raw Provisioning</span>
                    </div>
                    <p className="text-2xl sm:text-3xl font-serif font-extrabold text-white mt-0.5 tracking-tight">
                      Total: ₹{totalAmount.toLocaleString('en-IN')}
                    </p>
                    <p className="text-xs text-white/80 max-w-md truncate font-sans">
                      {selectedItems.map((item) => `${item.title} x${item.quantity}`).join(' • ')}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                  <button
                    type="button"
                    onClick={resetAll}
                    className="text-xs text-white/60 hover:text-white underline px-2 py-2"
                  >
                    Reset
                  </button>
                  <a
                    href={upiPaymentUrl}
                    className="btn-donate text-xs sm:text-sm px-4 py-3 rounded-xl flex-1 md:flex-initial justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center gap-1.5"
                    title="Pay directly via Google Pay or any UPI app"
                  >
                    <span>⚡ Pay ₹{totalAmount} via GPay / UPI</span>
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-colors border border-white/15"
                    title="Send details via WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                  <Link
                    to={donatePageUrl}
                    className="inline-flex items-center gap-1.5 px-3.5 py-3 rounded-xl border border-white/20 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm transition-colors"
                  >
                    <span>Summary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        )}

        {/* Authenticity & Transparency Pillars */}
        <Reveal delay={200}>
          <div className="mt-16 pt-12 border-t border-slate-200 grid sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="bg-white/90 p-6 border border-slate-200 rounded-2xl shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 mx-auto sm:mx-0 border border-emerald-200">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-slate-900 text-base">
                100% Direct Provisioning
              </h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Zero administrative salaries or cuts. Every single rupee is converted directly into meals, native seeds, and essential community supplies.
              </p>
            </div>

            <div className="bg-white/90 p-6 border border-slate-200 rounded-2xl shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 mx-auto sm:mx-0 border border-emerald-200">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-slate-900 text-base">
                Verified Ground Photos
              </h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Every food drive, tree planting initiative, and community visit is documented with real field photographs published openly in our public gallery.
              </p>
            </div>

            <div className="bg-white/90 p-6 border border-slate-200 rounded-2xl shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3 mx-auto sm:mx-0 border border-emerald-200">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-slate-900 text-base">
                Student & Volunteer Led
              </h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Built by local youth volunteers waking up early to cook, package, plant, and serve with love &mdash; not one person, but all of us, together.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
