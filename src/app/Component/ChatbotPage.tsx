"use client";
import {
  MapPin, DollarSign, Sparkles, Clock, Bot, ArrowRight, User, Send
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

// Gemini  Service
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Message {
  id: number;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
  isRichContent?: boolean; 
}

// --- Gemini Service ---
const GeminiService = {
  // NOTE: Use environment variables (e.g., process.env.GEMINI_API_KEY) in a real app
  API_KEY: "AIzaSyBI-FfwQzFdicIK_upeQHnEDu9XKNsczn8",

  async generateTravelResponse(
    message: string,
    fromPlace: string,
    toPlace: string,
    conversationHistory: Message[]
  ): Promise<{ text: string, isRichContent: boolean }> {
    if (!this.API_KEY) {
      console.error("Missing Gemini LocalServer key");
      return { text: this.getFallbackResponse(message, fromPlace, toPlace), isRichContent: false };
    }

    // Map conversation history for the Gemini LocalServer format
    const history = conversationHistory
      // Filter out the initial 'bot' message (which is typically just a greeting)
      .filter((msg, index) => !(index === 0 && msg.sender === 'bot')) 
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      }));
      

    const systemInstruction = `
      You are an  Travel Assistant for a smart travel booking platform.
      Your tone should be knowledgeable, friendly, and enthusiastic. Your goal is to provide helpful, concise, and structured travel advice.
      Ensure all generated text is clear, well-organized, and utilizes strong markdown formatting (bolding, lists, and headers) to enhance readability.
      
      Current Trip Context:
      - From: ${fromPlace || "Not specified"}
      - To: ${toPlace || "Not specified"}
      
      Response Format:
      - **General Advice:** Use standard Markdown (bold, lists, etc.) for formatting.
      - **Travel Plan Request:** If the user asks to plan a trip from A to B (like the "Plan My Trip" button prompt), structure your response clearly using Markdown headings (## and ###) and lists.
      - **Crucial Rule:** DO NOT return any HTML, CSS, or a complete HTML document. Return only the helpful text and Markdown.
      
      Example Travel Plan Response (use similar structure and strong markdown):
      
      ## ✈️ Trip Plan: ${fromPlace || "Departure"} to ${toPlace || "Destination"}
      
      ### 🗺️ Routes & Carriers
      - **Direct:** [Carrier 1], [Carrier 2]. Duration: ~[X] hours.
      - **One-Stop:** [Carrier 3] (via [City]), [Carrier 4] (via [City]).
      
      ### ☀️ Best Time to Visit
      - **Peak:** [Month] for [Reason]. *Expect higher prices.*
    `;

    try {
      const genAI = new GoogleGenerativeAI(this.API_KEY);
      const model = genAI.getGenerativeModel({ 
          model: "gemini-2.0-flash", 
          config: { 
            systemInstruction: systemInstruction 
          }
      });
      
      const chat = model.startChat({ history: history as any }); 
     
        // FIX: Send the message
        const result = await chat.sendMessage(message);
        
        // FIX: Robust safety check for blocked/empty responses
        const feedback = result.promptFeedback;
      if (feedback?.blockReason) {
          let blockReason = feedback.blockReason.replace('BLOCK_REASON_', '');
          
          if (feedback.safetyRatings && feedback.safetyRatings.length > 0) {
              const blockedCategory = feedback.safetyRatings.find(
                  (rating: any) => rating.probability === 'HIGH'
              )?.category.replace('HARM_CATEGORY_', '');

              if (blockedCategory) {
                blockReason = `Safety Policy: HIGH risk in ${blockedCategory}`;
              }
          }
          
          throw new Error(`Response blocked. ${blockReason}`);
      }
      
      // FIX: Use the .text() method for robust text extraction
      const rawText = result.response.text();

      // Safely trim the text.
      const botText = rawText?.trim() ?? "Sorry, the Local model returned an empty response. This might be a temporary issue.";

      // Check for rich content based on common markdown structure
      const isRich = botText.includes('##') || botText.includes('###') || botText.includes('*') || botText.includes('-'); 
      
      return { text: botText, isRichContent: isRich };
    } catch (error) {
      console.error("Gemini LocalServer Error:", error);
      
      const detailedErrorMessage = (error as Error).message.includes("blocked")
        ? (error as Error).message
        : "An unexpected network or LocalServer error occurred. Please check your key and try again.";

      return { 
        text: detailedErrorMessage, 
        isRichContent: false 
      };
    }
  },

  getFallbackResponse(message: string, fromPlace: string, toPlace: string): string {
    const msg = message.toLowerCase();

    if (msg.includes("crowd") || msg.includes("busy") || msg.includes("low crowd")) {
      return `I can help you find serenity! Here are a few **low-crowd, highly-rated destinations** right now:

* **Kyoto, Japan (Gardens):** Best enjoyed early morning. Peaceful and visually stunning, away from major temples.
* **Porto, Portugal (Ribeira District):** Crowds thin out in the late afternoon for beautiful sunset views by the Douro River.
* **Patagonia (Hiking):** The sheer size of the wilderness guarantees low density. Best for adventure lovers and nature photographers!

Where should we explore first?`;
    } else if (msg.includes("budget") || msg.includes("cheap")) {
      return `Looking for value? Here are three **high-value, low-cost experiences** that maximize your travel funds:

1.  **Free Walking Tour in London:** Discover major sights on foot and pay what you think it's worth at the end.
2.  **Street Food Markets in Bangkok:** You can find incredible, authentic meals for under $5.
3.  **Hostels with Kitchens (Iceland):** Save a fortune by cooking your own meals in expensive regions like Scandinavia or Iceland.

Which strategy fits your budget best?`;
    } else if (fromPlace && toPlace && msg.includes("plan a trip")) {
      // Structured fallback for the Plan My Trip action
      return `## ✈️ Trip Plan: ${fromPlace} to ${toPlace}

I'm gathering real-time data for the best routes and prices, but here is a typical overview:

### 🗺️ Routes & Carriers
* **Fastest Option:** Often a direct flight with [Major Carrier] (7-8 hours travel time).
* **Best Value:** Look for connections through [Hub City] (11-13 hours total, but significant savings).

What travel dates do you have in mind?`;
    } else if (msg.includes("hello") || msg.includes("hi")) {
      return `Hello there! 👋 I'm ready to craft your perfect journey.

I specialize in smart planning:
* **Real-time Recommendations**
* **Crowd Avoidance**
* **Budget Optimization**

Tell me: Where in the world is calling your name?`;
    } else {
      return `To give you the best advice, I need a little more detail! Please specify:

1.  Your **Destination** (e.g., Paris, France)
2.  Your **Budget** (e.g., Mid-range, Luxury)
3.  The **Vibe** (e.g., Relaxing beach, adventurous hiking)

You can also use the 'Plan Your Trip' selector above. Let's get started!`;
    }
  },
};
// --- END Gemini Service ---

// --- Utilities (Simplified Markdown Renderer) ---
const markdownToHtml = (markdown: string) => {
    const imageUrl = "https://thumbs.dreamstime.com/b/world-landmarks-photo-collage-vintage-tes-sepia-textured-background-travel-tourism-study-around-world-concept-vintag-94756410.jpg";
    
    // Image element with fallbacks and styling
    const imageHtml = `
        <img src="${imageUrl}" alt="Global Travel Landmarks Collage" 
             class="w-full h-auto object-cover rounded-lg mb-4 shadow-xl" 
             onerror="this.onerror=null;this.src='https://placehold.co/400x150/0f766e/ffffff?text=Travel+Theme'" 
        />`;

    let html = markdown;

    // 1. Convert lists (Handle both * and - followed by a space, and numbered lists)
    html = html.replace(/\* (.*?)\n/g, '<li>₹1</li>\n');
    html = html.replace(/- (.*?)\n/g, '<li>₹1</li>\n');
    
    // Numbered lists (simple placeholder conversion for demonstration)
    html = html.replace(/(\d+)\. (.*?)\n/g, '<ol-item>₹2</ol-item>\n');


    // 2. Bold/Italics/Headers
    html = html
        .replace(/\*\*(.*?)\*\*/g, '<strong>₹1</strong>') // Bold
        .replace(/\*(.*?)\*/g, '<em>₹1</em>') // Italics
        .replace(/## (.*?)\n/g, '<h2>₹1</h2>\n') // H2
        .replace(/### (.*?)\n/g, '<h3>₹1</h3>\n'); // H3

    // 3. Paragraphs and Line Breaks
    html = html.replace(/\n\n/g, '</p><p>');
    html = html.replace(/\n/g, '<br>');

    // 4. Wrap list items (more robust block wrapping)
    const wrapListItems = (listType: 'ul' | 'ol', listTag: string, itemTag: string) => {
        const itemRegex = new RegExp(`(<br>)*<₹{itemTag}>(.*?)<\/₹{itemTag}>(<br>)*`, 'g');
        
        // Find blocks of list items and wrap them
        html = html.replace(new RegExp(`(<p>)?(₹{itemRegex.source})+(<\/p>)?`, 'gs'), (match) => {
            // Clean up unnecessary <p> and <br> within the block
            const cleanMatch = match.replace(/<\/?p>/g, '').replace(/<br>/g, '');
            return `<${listTag}>${cleanMatch}</${listTag}>`;
        });
        
        // Final cleanup of list contents
        html = html.replace(new RegExp(`<${listTag}>(<${itemTag}>.*?<\/${itemTag}>)+<\/${listTag}>`, 'g'), (match) => {
             return match.replace(new RegExp(`<\/?${itemTag}>`, 'g'), listType === 'ul' ? '<li>' : '<li>'); // Simplify ol-item to li
        });

        // Cleanup multiple lists joined together
        html = html.replace(new RegExp(`<\/${listTag}><${listTag}>`, 'g'), '');
    };

    wrapListItems('ul', 'ul', 'li');
    wrapListItems('ol', 'ol', 'ol-item');


    // 5. Cleanup and initial wrap (Add the image before the content)
    html = html.replace(/<br>(<h2>|<h3>|<ul>|<ol>)/g, '$1');
    
    // Ensure content that doesn't start with a block element is wrapped in a paragraph
    if (!html.startsWith('<') || html.startsWith('<p>') || html.startsWith('<br>')) {
        html = `<p>${html}</p>`;
        html = html.replace(/<br><\/p>/g, '</p>'); // Cleanup trailing breaks
    }
    
    // Final wrapper with styling and image
    // The prose class handles the H2/H3/P/UL styling, making it look professional.
    return `<div class="ai-response-content prose prose-sm prose-invert text-gray-100">${imageHtml}${html}</div>`;
};
// --- END Utilities ---


// --- Chatbot Component ---
const ChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "Hello! I'm your Local Travel Assistant 🌍. I can help you plan your perfect trip. Where would you like to go?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [fromPlace, setFromPlace] = useState("");
  const [toPlace, setToPlace] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

const popularDestinations = [
  "Chennai",
  "Coimbatore",
  "Madurai",
  "Tiruchirappalli",
  "Ooty",
  "Kodaikanal",
  "Rameswaram",
  "Thanjavur",
  "Kanyakumari",
  "Mahabalipuram",
  "Yelagiri",
  "Hogenakkal Falls",
  "Pondicherry",
  "Velankanni",
  "Courtallam"
];


  const quickActions = [
    { icon: MapPin, text: "Low crowd destinations", action: "crowd" },
    { icon: DollarSign, text: "Budget-friendly tours", action: "budget" },
    { icon: Sparkles, text: "Local travel recommendations", action: "recommend" },
    { icon: Clock, text: "Best time to visit", action: "timing" },
  ];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: inputMessage,
      timestamp: new Date(),
    };
    
    // Add user message immediately
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      // Pass the current state of messages (which now includes the user's message)
      const { text: botText, isRichContent } = await GeminiService.generateTravelResponse(
        inputMessage,
        fromPlace,
        toPlace,
        // Ensure the full history (including the new user message) is passed
        [...messages, userMessage] 
      );

      const botMessage: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: botText,
        timestamp: new Date(),
        isRichContent: isRichContent, 
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error sending message:", err);
      const errorMessage: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: "Sorry, a serious system error occurred. Please refresh the page.",
        timestamp: new Date(),
        isRichContent: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false); 
    }
  };

  const handleQuickAction = (action: string) => {
    const actionMap: Record<string, string> = {
      crowd: "Show me destinations with low crowd levels.",
      budget: "What are the most budget-friendly destinations?",
      recommend: "Give me personalized travel recommendations.",
      timing: "What's the best time to visit popular places?",
    };
    
    setInputMessage(actionMap[action]);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handlePlanTrip = () => {
    if (!fromPlace || !toPlace) {
      const warningMessage: Message = {
        id: Date.now(),
        sender: "bot",
        text: "Please select both departure and destination locations to plan your trip.",
        timestamp: new Date(),
        isRichContent: false,
      };
      setMessages((prev) => [...prev, warningMessage]);
      return;
    }
    
    setInputMessage(
      `I want to plan a trip from ${fromPlace} to ${toPlace}. Can you recommend routes, best times, and crowd info?`
    );
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Component to render the chat message content
  const ChatMessageContent = ({ message }: { message: Message }) => {
    if (message.sender === "bot" && message.isRichContent) {
      return (
        <div 
          className="text-sm whitespace-pre-line prose prose-invert prose-p:my-1 prose-headings:text-teal-400 prose-headings:my-2 prose-ul:my-2 prose-li:my-1" 
          dangerouslySetInnerHTML={{ __html: markdownToHtml(message.text) }} 
        />
      );
    }
    
    return (
      <p className="text-sm whitespace-pre-line">{message.text}</p>
    );
  };

  

  return (
    <div className="space-y-6 h-full max-w-4xl mx-auto p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-100 mb-2">Local Travel Assistant</h1>
        <p className="text-gray-400">Powered by Gemini Local – Smart travel planning made easy</p>
      </div>

      {/* Trip Planner */}
      <div className="bg-gradient-to-r from-teal-500/10 to-blue-500/10 border border-teal-500/20 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bot className="w-6 h-6 text-teal-400" />
          <h2 className="text-lg font-semibold text-gray-100">Plan Your Trip</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">From</label>
            <select
              value={fromPlace}
              onChange={(e) => setFromPlace(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-teal-500"
            >
              <option value="">Select departure</option>
              {popularDestinations.map((dest) => (
                <option key={dest} value={dest}>{dest}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">To</label>
            <select
              value={toPlace}
              onChange={(e) => setToPlace(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:border-teal-500"
            >
              <option value="">Select destination</option>
              {popularDestinations.map((dest) => (
                <option key={dest} value={dest}>{dest}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="block text-sm text-gray-400 mb-2 invisible">Action</label>
            <button
              onClick={handlePlanTrip}
              disabled={!fromPlace || !toPlace}
              className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-lg flex justify-center items-center gap-2 font-medium disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors"
            >
              Plan My Trip <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={() => handleQuickAction(action.action)}
              className="flex items-center gap-2 p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-750 hover:border-teal-500/30 transition-colors"
            >
              <Icon className="w-4 h-4 text-teal-400" />
              <span className="text-sm">{action.text}</span>
            </button>
          );
        })}
      </div>

      {/* Chat Window */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg flex flex-col h-[600px]">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    message.sender === "bot" 
                      ? "bg-gradient-to-br from-teal-500 to-blue-500" 
                      : "bg-gray-700"
                  }`}
                >
                  {message.sender === "bot" ? (
                    <Bot className="w-5 h-5 text-white" />
                  ) : (
                    <User className="w-5 h-5 text-gray-300" />
                  )}
                </div>
                <div className="flex-1">
                  <div
                    className={`px-4 py-3 rounded-lg ${
                      message.sender === "bot" 
                        ? "bg-gray-700 text-gray-100" 
                        : "bg-teal-500 text-white"
                    }`}
                  >
                    <ChatMessageContent message={message} />
                  </div>
                  <p className="text-xs text-gray-500 mt-1 px-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-teal-500 to-blue-500">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="px-4 py-3 rounded-lg bg-gray-700 flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                  <span className="text-sm text-gray-400">She is typing...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about travel..."
              className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-colors"
              disabled={isTyping}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="px-6 py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;