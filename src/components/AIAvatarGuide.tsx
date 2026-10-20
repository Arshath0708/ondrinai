import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Send,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  Bot,
  Heart,
  Mic,
  MicOff,
} from 'lucide-react';
import { ASSETS } from '@/config/site';
import { askArshathAI, type ChatMessage } from '@/services/aiGuideService';

type AvatarEmote = 'idle' | 'think' | 'wave' | 'cheer';

// Define SpeechRecognition interface for browser support
interface IWindowSpeechRecognition extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome',
  sender: 'assistant',
  text: `Vanakkam! 🙏 I am Arshi, your friendly ONDRINAI AI companion and guide.

Ask me anything! Whether you'd like to know how ₹30 sponsors a warm elder meal, how to volunteer in Madurai, our native Panai tree planting, or have any general questions — I'm right here with you!`,
  timestamp: new Date(),
  reaction: 'wave',
  action: {
    label: '⚡ Sponsor a Meal (₹30)',
    url: '/donate?cause_breakfast-person=1',
    type: 'donate',
  },
};

const SUGGESTED_QUESTIONS = [
  '⚡ How does ₹30 feed an elder?',
  '🤝 How can I volunteer in Madurai?',
  '🌱 Tell me about Panai seeds',
  '💧 What is the Water Motive?',
  '💳 Direct UPI / GPay details',
];

// Lightweight procedural web audio sound effects
function playAudioChirp(type: 'open' | 'send' | 'receive' | 'cheer' | 'poke') {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === 'open') {
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(620, now + 0.16);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    } else if (type === 'send') {
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(680, now + 0.08);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.09);
      osc.start(now);
      osc.stop(now + 0.09);
    } else if (type === 'receive') {
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.12);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'cheer') {
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.setValueAtTime(880, now + 0.08); // A5
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'poke') {
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.09);
      gain.gain.setValueAtTime(0.07, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.11);
      osc.start(now);
      osc.stop(now + 0.11);
    }
  } catch {
    // Ignore restricted audio context
  }
}

/**
 * LIVE 3D CARTOON CHARACTER AVATAR
 * Clean, high-fidelity render of Arshi with smooth animations (idle breathing,
 * thinking head tilt, waving greeting, celebration bounce) and interactive poke.
 * No artificial overlay boxes or glitches!
 */
function LiveCartoonAvatar({
  emote,
  size = 'md',
  interactive = false,
  onPoke,
}: {
  emote: AvatarEmote;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onPoke?: () => void;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth 3D tilt tracking on mouse hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const getAvatarImage = (em: AvatarEmote) => {
    switch (em) {
      case 'cheer':
        return ASSETS.avatarCheer;
      case 'think':
        return ASSETS.avatarThink;
      case 'wave':
        return ASSETS.avatarWave;
      case 'idle':
      default:
        return ASSETS.avatarIdle;
    }
  };

  // Dimensions
  const sizeClasses = {
    sm: 'w-8 h-8 rounded-full',
    md: 'w-14 h-14 sm:w-16 sm:h-16 rounded-2xl',
    lg: 'w-16 h-16 sm:w-20 sm:h-20 rounded-2xl',
  }[size];

  // Emote animation class for dynamic living cartoon motion
  const animClass =
    emote === 'think'
      ? 'animate-game-think'
      : emote === 'wave'
      ? 'animate-game-wave'
      : emote === 'cheer'
      ? 'animate-game-cheer'
      : 'animate-game-idle';

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onPoke}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      className={`relative select-none shrink-0 group ${interactive ? 'cursor-pointer' : ''}`}
      style={{
        transform: interactive
          ? `perspective(400px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`
          : undefined,
        transition: 'transform 0.15s ease-out',
      }}
      title={interactive ? 'Click to interact with Arshi!' : undefined}
    >
      {/* 3D Character Stage with Illuminated Border & Dynamic Emote Physics */}
      <div
        className={`${sizeClasses} overflow-hidden ring-2 ring-amber-400/90 shadow-xl bg-slate-950 p-0.5 ${animClass} relative transition-all duration-300 group-hover:scale-105`}
      >
        <img
          src={getAvatarImage(emote)}
          alt="Arshi - 3D Cartoon AI Guide"
          className="w-full h-full object-cover object-top rounded-[inherit] transition-all duration-300"
        />
      </div>

      {/* Floating Status / Reaction Badge */}
      {size !== 'sm' && (
        <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-slate-950/95 text-[10px] font-mono border border-amber-300 font-bold shadow-md pointer-events-none">
          {emote === 'think' ? '💡' : emote === 'wave' ? '👋' : emote === 'cheer' ? '🎉' : '✨'}
        </span>
      )}
    </div>
  );
}

export function AIAvatarGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [currentEmote, setCurrentEmote] = useState<AvatarEmote>('wave');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-greeting prompt after 3.2 seconds on first view
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPrompted(true);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  // When opening, play friendly sound and switch to waving emote
  useEffect(() => {
    if (isOpen) {
      playAudioChirp('open');
      setCurrentEmote('wave');
      const timer = setTimeout(() => setCurrentEmote('idle'), 2800);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Optional voice playback (ONLY when voice button was explicitly activated)
  const speakTextIfVoiceActive = (text: string) => {
    if (!isVoiceActive || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const clean = text
        .replace(/https?:\/\/\S+/g, '')
        .replace(/[#*_`•]/g, ' ')
        .trim();
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.rate = 1.05;
      utterance.pitch = 1.05;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore synthesis error
    }
  };

  // Toggle voice speech recognition from typebar
  const toggleVoiceInteraction = () => {
    if (typeof window === 'undefined') return;

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const win = window as IWindowSpeechRecognition;
    const SpeechRec = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (SpeechRec) {
      try {
        const recognition = new SpeechRec();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-IN';

        recognition.onstart = () => {
          setIsListening(true);
          setIsVoiceActive(true);
          playAudioChirp('poke');
        };

        recognition.onresult = (event: any) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          if (transcript) {
            setInputText(transcript);
          }
        };

        recognition.onerror = () => {
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
        recognition.start();
      } catch {
        setIsListening(false);
        // Fallback toggle voice mode
        setIsVoiceActive((prev) => !prev);
      }
    } else {
      // Browser does not support speech recognition, toggle voice reply mode
      setIsVoiceActive((prev) => !prev);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isTyping) return;

    // Stop listening if user sends
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }

    playAudioChirp('send');

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);
    setCurrentEmote('think'); // Arshi immediately puts hand to chin and thinks!

    try {
      const [reply] = await Promise.all([
        askArshathAI(text, messages),
        new Promise((resolve) => setTimeout(resolve, 600)),
      ]);

      const botMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: reply.text,
        timestamp: new Date(),
        action: reply.action,
        reaction: reply.reaction || 'wave',
      };

      if (reply.reaction === 'cheer') {
        playAudioChirp('cheer');
      } else {
        playAudioChirp('receive');
      }

      // Arshi answers on chat!
      setMessages((prev) => [...prev, botMsg]);

      // Reaction move
      if (reply.reaction === 'cheer') {
        setCurrentEmote('cheer');
        setTimeout(() => setCurrentEmote('idle'), 3500);
      } else if (reply.reaction === 'think') {
        setCurrentEmote('think');
        setTimeout(() => setCurrentEmote('idle'), 3000);
      } else {
        setCurrentEmote('wave');
        setTimeout(() => setCurrentEmote('idle'), 3000);
      }

      // If voice button was used, also speak back
      speakTextIfVoiceActive(reply.text);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: `I'm right here with you! You can sponsor a meal directly or reach our team on WhatsApp at +91 84288 58856.`,
        timestamp: new Date(),
        reaction: 'wave',
        action: {
          label: '⚡ Sponsor a Meal (₹30)',
          url: '/donate?cause_breakfast-person=1',
          type: 'donate',
        },
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      setCurrentEmote('idle');
    } finally {
      setIsTyping(false);
    }
  };

  // Fun interactive poke / click on avatar
  const handleAvatarPoke = () => {
    playAudioChirp('poke');
    setCurrentEmote((prev) => (prev === 'cheer' ? 'wave' : 'cheer'));
    setTimeout(() => setCurrentEmote('idle'), 2400);
  };

  const resetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setCurrentEmote('wave');
    setIsListening(false);
    setIsVoiceActive(false);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <>
      {/* ===== FLOATING 3D CARTOON CHARACTER DOCK (BOTTOM-RIGHT) ===== */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 select-none">
          {/* Proactive Speech Bubble */}
          {hasPrompted && showBubble && (
            <div className="card-advanced card-sheen p-3.5 sm:p-4 max-w-[290px] sm:max-w-xs shadow-2xl animate-fade-up border border-amber-500/50 relative">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowBubble(false);
                }}
                className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-md"
                aria-label="Dismiss message"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <Bot className="w-3 h-3 text-amber-500" />
                  Arshi &bull; Live Online
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-snug font-sans">
                Vanakkam! Need help sponsoring a meal, volunteering, or exploring our Madurai drives?
              </p>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(true);
                  setShowBubble(false);
                }}
                className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
              >
                <span>Chat with Arshi</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Live Cartoon Character Floating Button */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setShowBubble(false);
            }}
            className="group relative flex items-center gap-3 p-1.5 sm:p-2 rounded-full card-advanced card-sheen border-2 border-amber-500/60 hover:border-amber-400 shadow-[0_10px_40px_rgba(245,158,11,0.45)] hover:shadow-[0_15px_50px_rgba(245,158,11,0.65)] transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Open Arshi AI Companion Chat"
          >
            {/* Live Character Viewport */}
            <div className="relative">
              <LiveCartoonAvatar emote={currentEmote} size="md" />

              {/* Glowing Status Crystal */}
              <span className="absolute bottom-0 right-0 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 ring-2 ring-white dark:ring-slate-900 shadow-sm" />
              </span>
            </div>

            {/* Character Badge Label */}
            <div className="pr-3 pl-1 text-left hidden sm:block">
              <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                <Sparkles className="w-3 h-3 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
                <span>AI COMPANION</span>
              </div>
              <p className="text-xs font-serif font-bold text-slate-900 dark:text-white leading-tight">
                Ask Arshi
              </p>
            </div>
          </button>
        </div>
      )}

      {/* ===== EXPANDED LIVE CARTOON AI COMPANION INTERFACE ===== */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Arshi - ONDRINAI AI Avatar Companion"
          className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 w-[calc(100vw-1.5rem)] sm:w-[440px] h-[640px] max-h-[88vh] z-50 card-advanced shadow-2xl flex flex-col overflow-hidden border-2 border-amber-500/50 animate-scale-in bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-2xl"
        >
          {/* Live Cartoon Character Interactive Header */}
          <div className="p-4 bg-gradient-to-r from-amber-600 via-amber-500 to-orange-600 text-white shrink-0 shadow-lg relative overflow-hidden">
            {/* Ambient Animated Beam */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-white/15 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Live Cartoon Character Stage with Interactive Poking */}
                <LiveCartoonAvatar
                  emote={currentEmote}
                  size="md"
                  interactive={true}
                  onPoke={handleAvatarPoke}
                />

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-serif font-extrabold text-lg leading-tight truncate">
                      Arshi
                    </h3>
                    <span title="Verified AI Guide & Movement Companion">
                      <ShieldCheck className="w-4 h-4 text-amber-200 shrink-0" />
                    </span>
                  </div>

                  <p className="text-[11px] font-mono text-amber-100/90 font-medium leading-tight flex items-center gap-1.5 mt-0.5">
                    <Sparkles className="w-3 h-3 text-amber-200" />
                    <span>ONDRINAI AI Companion</span>
                  </p>

                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/25 text-[10px] font-mono text-emerald-300 mt-1 border border-white/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>
                      {isTyping
                        ? 'Thinking on ground...'
                        : isListening
                        ? 'Listening to you... 🎙️'
                        : currentEmote === 'cheer'
                        ? 'Cheering with you! 🎉'
                        : currentEmote === 'wave'
                        ? 'Welcoming you!'
                        : 'Active & Ready'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Header Controls (Sound symbol removed as requested) */}
              <div className="flex items-center gap-1 text-white/90">
                {/* Reset Chat */}
                <button
                  type="button"
                  onClick={resetChat}
                  className="p-2 hover:bg-white/15 text-white/80 hover:text-white rounded-xl transition-colors"
                  title="Reset conversation"
                  aria-label="Reset chat"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Minimize */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/15 text-white/95 hover:text-white rounded-xl transition-colors"
                  title="Minimize chat"
                  aria-label="Close chat"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/70 dark:bg-slate-950/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="mt-1 shrink-0">
                    <LiveCartoonAvatar
                      emote={msg.reaction || 'idle'}
                      size="sm"
                    />
                  </div>
                )}

                <div className={`max-w-[85%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-tr-none'
                        : 'card-advanced border border-slate-200/90 dark:border-white/10 text-slate-800 dark:text-slate-100 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Inline Action CTA */}
                  {msg.action && (
                    <div className="mt-2">
                      {msg.action.url?.startsWith('http') ? (
                        <a
                          href={msg.action.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-semibold text-xs transition-colors shadow-2xs"
                        >
                          <span>{msg.action.label}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <Link
                          to={msg.action.url || '/donate'}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-xs shadow-sm hover:scale-102 transition-transform"
                        >
                          <span>{msg.action.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  )}

                  <span className="text-[10px] text-slate-400 font-mono mt-1 block px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {/* Thinking / Reaction Live State */}
            {isTyping && (
              <div className="flex gap-2.5 items-center">
                <div className="shrink-0">
                  <LiveCartoonAvatar emote="think" size="sm" />
                </div>
                <div className="card-advanced p-3 rounded-2xl rounded-tl-none border border-amber-500/40 flex items-center gap-2">
                  <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-bold">
                    Arshi is thinking...
                  </span>
                  <div className="flex items-center gap-1">
                    <span
                      className="w-2 h-2 rounded-full bg-amber-500 animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-amber-500 animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-amber-500 animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Prompt Chips */}
          <div className="px-3 py-2 bg-white/70 dark:bg-slate-900/70 border-t border-slate-200/80 dark:border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q)}
                className="shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 hover:bg-amber-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-400 border border-slate-200 dark:border-slate-700 transition-colors whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Interactive Footer & Typebar Input */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            {/* Live voice listening banner */}
            {isListening && (
              <div className="mb-2 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 flex items-center justify-between text-xs animate-fade-in">
                <span className="flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  Listening... speak your question now
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (recognitionRef.current) recognitionRef.current.stop();
                    setIsListening(false);
                  }}
                  className="font-bold underline text-[11px]"
                >
                  Stop
                </button>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  isListening
                    ? 'Listening to your voice...'
                    : 'Ask Arshi anything (meals, volunteering, questions)...'
                }
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />

              {/* Voice Interaction Button in Typebar */}
              <button
                type="button"
                onClick={toggleVoiceInteraction}
                className={`p-2.5 rounded-xl transition-all duration-200 relative ${
                  isListening
                    ? 'bg-rose-500 text-white shadow-lg ring-2 ring-rose-400 animate-pulse'
                    : isVoiceActive
                    ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                    : 'bg-slate-100 hover:bg-amber-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400'
                }`}
                title={
                  isListening
                    ? 'Listening... Click to stop'
                    : isVoiceActive
                    ? 'Voice mode active (Arshi will voice responses)'
                    : 'Click to speak with Arshi using voice'
                }
                aria-label="Voice interaction button"
              >
                {isListening ? (
                  <Mic className="w-4 h-4 animate-bounce" />
                ) : isVoiceActive ? (
                  <Mic className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
                {isListening && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white animate-ping" />
                )}
              </button>

              {/* Send Button */}
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-md disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all"
                aria-label="Send message to Arshi"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1.5 px-1">
              <span className="flex items-center gap-1">
                <Heart className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                Direct Madurai Action &bull; ₹0 Admin Cut
              </span>
              <span>Tap Arshi to interact ✨</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
