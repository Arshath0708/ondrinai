import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  RotateCcw,
  Key,
  ShieldCheck,
  ChevronDown,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { ASSETS } from '@/config/site';
import { askArshathAI, type ChatMessage } from '@/services/aiGuideService';

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome',
  sender: 'assistant',
  text: `Vanakkam! 🙏 I am Arshath Abdulla, founder and community guide of ONDRINAI.

I'm here to guide you directly. How can I help you today? You can ask me how ₹30 feeds an elder on Madurai streets, how to join our student volunteer squad, or about our native tree and water conservation drives!`,
  timestamp: new Date(),
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

export function AIAvatarGuide() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [customKey, setCustomKey] = useState('');
  const [savedKey, setSavedKey] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load custom Gemini API key from localStorage if present
  useEffect(() => {
    const key = localStorage.getItem('ondrinai_gemini_api_key');
    if (key) {
      setSavedKey(key);
      setCustomKey(key);
    }
  }, []);

  // Proactive greeting pop after 3 seconds on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPrompted(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll to bottom of chat
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

  const speakText = (text: string) => {
    if (!speechEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      // Remove URLs and markdown formatting before speaking
      const clean = text
        .replace(/https?:\/\/\S+/g, '')
        .replace(/[#*_`•]/g, ' ')
        .trim();
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore speech synthesis errors gracefully
    }
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      // Natural thinking delay
      const [reply] = await Promise.all([
        askArshathAI(text, messages, savedKey || undefined),
        new Promise((resolve) => setTimeout(resolve, 600)),
      ]);

      const botMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: reply.text,
        timestamp: new Date(),
        action: reply.action,
      };

      setMessages((prev) => [...prev, botMsg]);
      speakText(reply.text);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: `I'm right here with you! You can sponsor a meal directly or reach me on WhatsApp at +91 84288 58856.`,
        timestamp: new Date(),
        action: {
          label: '⚡ Sponsor a Meal (₹30)',
          url: '/donate?cause_breakfast-person=1',
          type: 'donate',
        },
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSaveKey = () => {
    if (customKey.trim()) {
      localStorage.setItem('ondrinai_gemini_api_key', customKey.trim());
      setSavedKey(customKey.trim());
    } else {
      localStorage.removeItem('ondrinai_gemini_api_key');
      setSavedKey(null);
    }
    setShowKeyModal(false);
  };

  const resetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <>
      {/* Floating Trigger Dock */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3 select-none">
          {/* Proactive Speech Bubble */}
          {hasPrompted && showBubble && (
            <div className="card-advanced card-sheen p-3.5 sm:p-4 max-w-[280px] sm:max-w-xs shadow-2xl animate-fade-up border border-amber-500/40 relative">
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
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  Arshath &bull; Online Guide
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-snug">
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
                <span>Ask Arshath now</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Avatar Button */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setShowBubble(false);
            }}
            className="group relative flex items-center gap-2.5 p-1 sm:p-1.5 rounded-full card-advanced card-sheen border border-amber-500/50 hover:border-amber-400 shadow-[0_10px_35px_rgba(245,158,11,0.35)] hover:shadow-[0_15px_45px_rgba(245,158,11,0.5)] transition-all duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            aria-label="Open ONDRINAI AI Guide Chat with Arshath"
          >
            <div className="relative">
              <img
                src={ASSETS.avatar}
                alt="Arshath Abdulla A - ONDRINAI AI Guide"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover object-top ring-2 ring-amber-500 shadow-md"
              />
              {/* Live Status Beacon */}
              <span className="absolute bottom-0 right-0 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
              </span>
            </div>

            {/* Pill Label */}
            <div className="pr-3 pl-1 text-left hidden sm:block">
              <div className="flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                <Sparkles className="w-3 h-3 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
                <span>AI Guide</span>
              </div>
              <p className="text-xs font-serif font-bold text-slate-900 dark:text-white leading-tight">
                Ask Arshath
              </p>
            </div>
          </button>
        </div>
      )}

      {/* Expanded Chat Drawer / Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="ONDRINAI AI Guide Chatbot"
          className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 w-[calc(100vw-1.5rem)] sm:w-[430px] h-[600px] max-h-[88vh] z-50 card-advanced shadow-2xl flex flex-col overflow-hidden border border-amber-500/40 animate-scale-in"
        >
          {/* Header */}
          <div className="p-3.5 sm:p-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white flex items-center justify-between shrink-0 shadow-md">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <img
                  src={ASSETS.avatar}
                  alt="Arshath Abdulla A"
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover object-top ring-2 ring-white/80 shadow-md"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif font-bold text-sm sm:text-base leading-tight truncate">
                    Arshath Abdulla A
                  </h3>
                  <ShieldCheck className="w-4 h-4 text-amber-200 shrink-0" title="Verified Founder & Guide" />
                </div>
                <p className="text-[11px] font-sans text-amber-100/90 leading-tight truncate">
                  Founder &bull; ONDRINAI AI Ground Guide
                </p>
                <div className="flex items-center gap-1 text-[10px] font-mono text-amber-200 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  <span>Online &bull; Madurai Grassroots</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1 text-white/90">
              {/* Speech synthesis toggle */}
              <button
                type="button"
                onClick={() => setSpeechEnabled(!speechEnabled)}
                className={`p-2 rounded-lg transition-colors ${
                  speechEnabled ? 'bg-white/25 text-white' : 'hover:bg-white/10 text-white/75'
                }`}
                title={speechEnabled ? 'Mute AI voice' : 'Enable AI voice reading'}
                aria-label="Toggle voice"
              >
                {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Gemini Key Config */}
              <button
                type="button"
                onClick={() => setShowKeyModal(true)}
                className={`p-2 rounded-lg transition-colors ${
                  savedKey ? 'bg-amber-500/40 text-amber-100' : 'hover:bg-white/10 text-white/75'
                }`}
                title="Configure Gemini API Key"
                aria-label="Gemini API Key Settings"
              >
                <Key className="w-4 h-4" />
              </button>

              {/* Reset Chat */}
              <button
                type="button"
                onClick={resetChat}
                className="p-2 hover:bg-white/10 text-white/75 hover:text-white rounded-lg transition-colors"
                title="Reset conversation"
                aria-label="Reset chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Minimize / Close */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 text-white/90 hover:text-white rounded-lg transition-colors"
                title="Minimize chat"
                aria-label="Close chat"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Gemini API Key Modal / Drawer */}
          {showKeyModal && (
            <div className="p-4 bg-amber-50/95 dark:bg-slate-900/95 border-b border-amber-300 dark:border-amber-600/30 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  Gemini AI Key (Optional)
                </span>
                <button
                  type="button"
                  onClick={() => setShowKeyModal(false)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-2.5 leading-relaxed text-[11px]">
                Arshath AI works <strong>100% free out-of-the-box</strong> with our built-in Madurai knowledge engine.
                Optionally paste your free Google Gemini API key below to enable live conversational generation:
              </p>
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  value={customKey}
                  onChange={(e) => setCustomKey(e.target.value)}
                  className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-mono focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <button
                  type="button"
                  onClick={handleSaveKey}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60 dark:bg-slate-950/40">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'assistant' && (
                  <img
                    src={ASSETS.avatar}
                    alt="Arshath"
                    className="w-7 h-7 rounded-full object-cover object-top ring-1 ring-amber-500 shrink-0 self-start mt-1 shadow-xs"
                  />
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

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 items-center">
                <img
                  src={ASSETS.avatar}
                  alt="Arshath"
                  className="w-7 h-7 rounded-full object-cover object-top ring-1 ring-amber-500 shrink-0"
                />
                <div className="card-advanced p-3 rounded-2xl rounded-tl-none border border-amber-500/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Prompts */}
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

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Arshath about meals, volunteering, UPI..."
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-md disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all"
              aria-label="Send message to Arshath"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
