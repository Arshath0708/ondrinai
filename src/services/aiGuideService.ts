import { siteConfig, WHATSAPP_COMMUNITY_URL, UPI_CONFIG } from '@/config/site';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  action?: {
    label: string;
    url?: string;
    type?: 'link' | 'donate' | 'whatsapp' | 'upi';
  };
}

const SYSTEM_PROMPT = `
You are Arshath Abdulla A, the founder and community guide of ONDRINAI, a grassroots student and youth movement based in Madurai, Tamil Nadu, India.
Your mission is direct citizen action with 100% transparency and ₹0 administrative salary. Every rupee goes directly to food supplies, native saplings, and stray animal nourishment.

Key Facts you know:
- Philosophy: "Not one person. Not one team. All of us, together."
- Tamil Tagline: "ஒன்றிணைந்து, சிறந்த எதிர்காலத்தை உருவாக்குவோம்"
- Food Aid: ₹30 provides a warm breakfast/dinner for a waiting elder on the street. ₹60 provides a complete nutritious lunch. ₹120 provides full-day meals.
- Stray Animal Welfare: ₹20 feeds 1 stray dog; ₹40 feeds 2 dogs.
- Native Tree Planting: ₹70 plants a native Palmyra (Panai) sapling/seed. Over 2,000 Panai seeds have been sown across Madurai bunds.
- Trinity Pack: ₹140 (1 meal + 1 tree + 1 stray dog feed).
- Core Future Motive: Save Water & Groundwater Security for future generations. Preparing youth teams to restore Madurai water channels.
- Volunteer Movement: Youth and citizens can join our official WhatsApp Community at: ${WHATSAPP_COMMUNITY_URL}
- Direct Contribution: UPI ID "${UPI_CONFIG.upiId}", Phone "+91 ${UPI_CONFIG.merchantPhone}", Recipient "${UPI_CONFIG.merchantName}". Contributions are processed directly in UPI apps (Google Pay, PhonePe, Paytm).
- Completed Drives: Act 1 (Madurai Street Meal Drive), Act 2 (2,000 Panai Seeds on Madurai Bypass), Act 3 (Neighborhood Care & Animal Feeding).
- Contact: ondrinaicommunity@gmail.com / +91 84288 58856.

Tone: Warm, humble, energetic, compassionate, grassroots. Always speak with clarity. Keep replies concise, engaging, and encourage direct participation or meal sponsorships where relevant. If asked in Tamil, answer warmly in Tamil or Tanglish.
`;

export async function askArshathAI(
  userQuery: string,
  history: ChatMessage[],
  customApiKey?: string
): Promise<{ text: string; action?: ChatMessage['action'] }> {
  // Check for Gemini API Key (custom key passed from settings or env)
  const apiKey = customApiKey || (import.meta.env.VITE_GEMINI_API_KEY as string | undefined);

  if (apiKey && apiKey.trim().length > 10) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${SYSTEM_PROMPT}\n\nUser asked: "${userQuery}"` }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 350,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (replyText) {
          // Infer relevant action
          const action = determineAction(userQuery, replyText);
          return { text: replyText, action };
        }
      }
    } catch {
      // Fall through to instant smart local engine if API call fails
    }
  }

  // Intelligent local semantic knowledge engine (zero API key required, 100% reliable)
  return getLocalArshathResponse(userQuery);
}

function determineAction(query: string, reply: string): ChatMessage['action'] | undefined {
  const combined = `${query} ${reply}`.toLowerCase();
  if (combined.includes('sponsor') || combined.includes('donate') || combined.includes('meal') || combined.includes('cost') || combined.includes('₹30') || combined.includes('money')) {
    return {
      label: '⚡ Sponsor a Meal (₹30)',
      url: '/donate?cause_breakfast-person=1',
      type: 'donate',
    };
  }
  if (combined.includes('volunteer') || combined.includes('join') || combined.includes('whatsapp') || combined.includes('group') || combined.includes('participate')) {
    return {
      label: '🤝 Join Volunteer WhatsApp Community',
      url: WHATSAPP_COMMUNITY_URL,
      type: 'whatsapp',
    };
  }
  if (combined.includes('water') || combined.includes('future') || combined.includes('groundwater')) {
    return {
      label: '💧 Explore Save Water Motive',
      url: '/#direct-impact',
      type: 'link',
    };
  }
  if (combined.includes('activity') || combined.includes('proof') || combined.includes('photo') || combined.includes('gallery')) {
    return {
      label: '📸 View Verified Activity Gallery',
      url: '/gallery',
      type: 'link',
    };
  }
  return undefined;
}

export function getLocalArshathResponse(query: string): { text: string; action?: ChatMessage['action'] } {
  const q = query.toLowerCase().trim();

  // Greetings
  if (q.match(/^(hi|hello|hey|vanakkam|namaste|good morning|good evening)/)) {
    return {
      text: `Vanakkam! 🙏 I am Arshath Abdulla, founder and community volunteer at ONDRINAI. I'm here to guide you around our initiatives in Madurai.\n\nWhether you'd like to sponsor a ₹30 hot meal, volunteer with our youth squad, learn about our 2,000+ native Panai tree planting, or our upcoming Water Conservation motive — how can I help you today?`,
      action: {
        label: '⚡ Sponsor a Meal (₹30)',
        url: '/donate?cause_breakfast-person=1',
        type: 'donate',
      },
    };
  }

  // Donate / Sponsor / Money / Meal cost
  if (q.includes('donate') || q.includes('sponsor') || q.includes('cost') || q.includes('meal') || q.includes('money') || q.includes('rupee') || q.includes('price')) {
    return {
      text: `Every rupee at ONDRINAI is 100% direct with ₹0 admin cuts! Here are our community benchmarks:\n\n• 🍲 ₹30 — Fresh morning breakfast for 1 elder on the street\n• 🍱 ₹60 — Nutritious full lunch meal\n• 🐕 ₹20/₹40 — Food for 1 or 2 starving stray animals\n• 🌱 ₹70 — Native Palmyra (Panai) tree seed sowing\n• 🌟 ₹140 — Trinity Pack (Meal + Stray Dog + Tree!)\n\nYou can sponsor in 1 click or pay directly via UPI.`,
      action: {
        label: '⚡ Sponsor Directly (₹30)',
        url: '/donate?cause_breakfast-person=1',
        type: 'donate',
      },
    };
  }

  // UPI / Payment details / QR / GPay / PhonePe
  if (q.includes('upi') || q.includes('gpay') || q.includes('phonepe') || q.includes('qr') || q.includes('account') || q.includes('bank') || q.includes('paytm')) {
    return {
      text: `You can contribute directly through any UPI app (Google Pay, PhonePe, Paytm, BHIM):\n\n• UPI ID: ${UPI_CONFIG.upiId}\n• Phone Number: +91 ${UPI_CONFIG.merchantPhone}\n• Recipient Name: ${UPI_CONFIG.merchantName}\n\nWe verify every contribution and can send you a ground photo of the distribution directly on WhatsApp!`,
      action: {
        label: '💳 Go to Direct Contribution Portal',
        url: '/donate',
        type: 'upi',
      },
    };
  }

  // Volunteer / Join / Help
  if (q.includes('volunteer') || q.includes('join') || q.includes('whatsapp') || q.includes('participate') || q.includes('help') || q.includes('work with')) {
    return {
      text: `We would love to welcome you! ONDRINAI is run by students and youth from Madurai. You don't need money to make an impact — we need hands on the ground for:\n\n1. Morning food distribution across Madurai streets\n2. Weekend native tree sowing drives\n3. Future water body cleanup and community awareness\n\nJoin our official WhatsApp group to get drive schedules and coordinate directly with me!`,
      action: {
        label: '🤝 Join Official Volunteer WhatsApp',
        url: WHATSAPP_COMMUNITY_URL,
        type: 'whatsapp',
      },
    };
  }

  // Tree / Panai / Environment / Plant
  if (q.includes('tree') || q.includes('plant') || q.includes('panai') || q.includes('palmyra') || q.includes('environment') || q.includes('seed')) {
    return {
      text: `Tamil Nadu's native Palmyra (Panai) tree is an ecological miracle. Its deep taproots prevent soil erosion, hold groundwater, and can survive severe droughts.\n\nIn our documented drives, we have sown over 2,000+ native Panai seeds along Madurai highway bypasses and water bunds. It only costs ₹70 to sponsor and nurture a native tree!`,
      action: {
        label: '🌱 Sponsor a Native Tree (₹70)',
        url: '/donate?cause_plant-tree=1',
        type: 'donate',
      },
    };
  }

  // Water Conservation / Future motive
  if (q.includes('water') || q.includes('groundwater') || q.includes('future') || q.includes('lake') || q.includes('pond')) {
    return {
      text: `Save Water & Groundwater Security is our core upcoming motive for future generations! We haven't run our first water action yet, but we are actively assembling volunteer teams in Madurai to:\n\n• Clear neglected lake inlet channels\n• De-silt traditional pond bunds\n• Promote water conservation awareness\n\nEvery drop saved today is life for our children tomorrow. Join our water squad!`,
      action: {
        label: '💧 Explore Water Strategy',
        url: '/#direct-impact',
        type: 'link',
      },
    };
  }

  // Location / Where / Madurai
  if (q.includes('where') || q.includes('location') || q.includes('city') || q.includes('madurai') || q.includes('address')) {
    return {
      text: `ONDRINAI is proudly based in Madurai, Tamil Nadu, India. Our food distributions happen around Madurai railway station, Arapalayam, Periyar bus stand, and hospital surroundings. Tree planting takes place across rural Madurai highway bypasses and bunds.`,
      action: {
        label: '📍 View All Documented Activities',
        url: '/activities',
        type: 'link',
      },
    };
  }

  // Who is Arshath / Founder / Team / Who are you
  if (q.includes('who are you') || q.includes('arshath') || q.includes('founder') || q.includes('leader') || q.includes('team')) {
    return {
      text: `I'm Arshath Abdulla A, a student from Madurai. I started ONDRINAI because I believe real community support doesn't need big corporate entities or executive salaries — just committed local youth waking up early, cooking fresh meals, planting trees, and looking out for one another. Not one person. All of us, together!`,
      action: {
        label: '📖 Read Our Story & Philosophy',
        url: '/about',
        type: 'link',
      },
    };
  }

  // Contact / Phone / Email
  if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('number') || q.includes('reach')) {
    return {
      text: `You can reach me directly anytime:\n\n• Phone / WhatsApp: +91 84288 58856\n• Email: ondrinaicommunity@gmail.com\n• Direct WhatsApp Community: Connect with all our Madurai volunteers!`,
      action: {
        label: '📞 Open Contact Page',
        url: '/contact',
        type: 'link',
      },
    };
  }

  // Default fallback
  return {
    text: `I'm here to help you navigate ONDRINAI! You can ask me how to sponsor a ₹30 hot meal, how to volunteer with us on weekends, where our Madurai activities take place, or about our native Panai tree planting and upcoming water preservation drives.`,
    action: {
      label: '⚡ Sponsor a Meal (₹30)',
      url: '/donate?cause_breakfast-person=1',
      type: 'donate',
    },
  };
}
