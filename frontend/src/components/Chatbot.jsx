import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User, ChevronDown, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const { schemes, language } = useAuth();

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 1,
          type: 'bot',
          text: language === 'hi'
            ? "नमस्ते! 🙏 मैं सेतु दूत, आपका एआई सहायक हूं। मुझे अपने बारे में बताएं (जैसे 'मैं राजस्थान से 22 वर्षीय SC छात्र हूं') और मैं आपके लिए सर्वोत्तम योजनाएं खोजूंगा!"
            : "Namaste! 🙏 I am Setu Doot, your AI assistant. Tell me about yourself (e.g. 'I am a 22 year old SC student from Rajasthan') and I will find the best schemes for you!",
          time: new Date()
        }
      ]);
    }
  }, [isOpen, messages.length, language]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Smart Heuristic AI Logic (Simulated NLP)
  const processMessage = (userText) => {
    const text = userText.toLowerCase();

    // Extract parameters
    let matchedCategory = "All";
    let matchedState = "All";
    let matchedOccupation = "All";
    let matchedAge = 25; // Default assumption

    // 1. Check State
    const states = ["rajasthan", "uttar pradesh", "maharashtra", "delhi", "bihar", "punjab", "gujarat"];
    for (let st of states) {
      if (text.includes(st)) {
        matchedState = st.charAt(0).toUpperCase() + st.slice(1);
        break;
      }
    }

    // 2. Check Caste/Category
    if (text.includes("sc") || text.includes("scheduled caste")) matchedCategory = "SC";
    else if (text.includes("st") || text.includes("scheduled tribe")) matchedCategory = "ST";
    else if (text.includes("obc") || text.includes("backward")) matchedCategory = "OBC";
    else if (text.includes("general")) matchedCategory = "General";

    // 3. Check Occupation
    if (text.includes("student") || text.includes("padhai") || text.includes("college")) matchedOccupation = "Student";
    else if (text.includes("farmer") || text.includes("kisan") || text.includes("kheti")) matchedOccupation = "Farmer";
    else if (text.includes("business") || text.includes("vyapar")) matchedOccupation = "Business Owner";
    else if (text.includes("retired") || text.includes("pension")) matchedOccupation = "Retired";

    // 4. Age extraction (regex for digits)
    const ageMatch = text.match(/\b(\d{1,2})\b/);
    if (ageMatch && parseInt(ageMatch[1]) > 5 && parseInt(ageMatch[1]) < 100) {
      matchedAge = parseInt(ageMatch[1]);
    }

    // Now filter schemes based on extracted info
    let recommendations = schemes.filter(scheme => {
      // Very loose matching for chatbot to be helpful
      let sMatch = scheme.state === 'Central' || scheme.state === matchedState || scheme.eligibility?.allowedStates?.includes('All');
      let cMatch = scheme.eligibility?.allowedCategories?.includes(matchedCategory) || scheme.eligibility?.allowedCategories?.includes('All') || scheme.eligibility?.allowedCategories?.includes('SC/ST');
      let oMatch = scheme.eligibility?.allowedOccupations?.includes(matchedOccupation) || scheme.eligibility?.allowedOccupations?.includes('All');

      // Bonus: If user mentions 'women' or 'girl'
      if ((text.includes("women") || text.includes("girl") || text.includes("female")) && scheme.eligibility?.allowedGenders?.includes('Male') && !scheme.eligibility?.allowedGenders?.includes('Female')) {
        return false;
      }

      return sMatch && cMatch && oMatch;
    });

    // Generate smart response
    setTimeout(() => {
      let replyText = "";
      if (recommendations.length > 0) {
        if (language === 'hi') {
          replyText = `आपके द्वारा बताई गई जानकारी के आधार पर (राज्य: **${matchedState}**, श्रेणी: **${matchedCategory}**, व्यवसाय: **${matchedOccupation}**), मुझे आपके लिए **${recommendations.length}** अत्यधिक उपयुक्त योजनाएं मिली हैं!\n\nशीर्ष सिफारिशें:\n${recommendations.slice(0, 3).map(r => `✅ **${r.title}**: ${r.benefits}`).join("\n\n")}\n\nआप योजना पोर्टल में इनके लिए आवेदन कर सकते हैं!`;
        } else {
          replyText = `Based on what you told me (State: **${matchedState}**, Category: **${matchedCategory}**, Occupation: **${matchedOccupation}**), I found **${recommendations.length}** highly suitable schemes for you!\n\nTop recommendations:\n${recommendations.slice(0, 3).map(r => `✅ **${r.title}**: ${r.benefits}`).join("\n\n")}\n\nYou can apply for these in the Schemes portal!`;
        }
      } else {
        if (language === 'hi') {
          replyText = `मैंने आपकी प्रोफ़ाइल (राज्य: ${matchedState}, श्रेणी: ${matchedCategory}) का विश्लेषण किया है। वर्तमान में, मुझे कोई सटीक मेल नहीं मिला है, लेकिन आपको एक्सप्लोरर में "केंद्रीय योजनाएं" देखनी चाहिए जो सभी पर लागू होती हैं!`;
        } else {
          replyText = `I analyzed your profile (State: ${matchedState}, Category: ${matchedCategory}). Currently, I don't see an exact match, but you should check the "Central Schemes" in the explorer which apply to everyone!`;
        }
      }

      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'bot',
        text: replyText,
        time: new Date()
      }]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // 1.5 to 2.5s typing delay
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      text: userMsg,
      time: new Date()
    }]);
    setInput('');
    setIsTyping(true);

    // Process after slight delay to simulate network
    setTimeout(() => {
      processMessage(userMsg);
    }, 500);
  };

  const handleReset = () => {
    setMessages([{
      id: Date.now(),
      type: 'bot',
      text: language === 'hi' ? "चैट रीसेट हो गई! मैं आज आपकी और क्या सहायता कर सकता हूँ?" : "Chat reset! How else can I assist you today?",
      time: new Date()
    }]);
  };

  // Markdown-lite parser for bot messages
  const parseMarkup = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-slate-800 dark:text-slate-200">{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-tr from-govblue-600 to-govblue-500 rounded-full shadow-2xl flex items-center justify-center text-white hover:shadow-govblue-500/50 hover:-translate-y-1 transition-all z-50 group"
          >
            <Bot className="w-7 h-7 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 border-2 border-white dark:border-slate-900 rounded-full animate-pulse"></span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: isMinimized ? 'calc(100% - 60px)' : 0,
              scale: 1
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[550px] max-h-[85vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200/60 dark:border-white/10 flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div
              onClick={() => setIsMinimized(!isMinimized)}
              className="px-4 py-3 bg-gradient-to-r from-govblue-700 to-govblue-600 cursor-pointer flex justify-between items-center"
            >
              <div className="flex items-center space-x-2.5 text-white">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm relative">
                  <Bot className="w-5 h-5 text-white" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-govgreen-400 border-2 border-govblue-600 rounded-full"></span>
                </div>
                <div>
                  <h3 className="text-sm font-bold leading-tight">Setu Doot AI</h3>
                  <p className="text-[10px] text-govblue-100 flex items-center">
                    <Sparkles className="w-2.5 h-2.5 mr-1" /> Smart Assistant
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button onClick={(e) => { e.stopPropagation(); handleReset(); }} className="p-1.5 text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition-colors">
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }} className="p-1.5 text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition-colors">
                  <ChevronDown className={`w-5 h-5 transition-transform ${isMinimized ? 'rotate-180' : ''}`} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="p-1.5 text-white/70 hover:text-white hover:bg-white/20 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/50 scrollbar-hide">
              <div className="text-center text-[10px] text-slate-400 dark:text-slate-500 font-medium mb-4 uppercase tracking-wider">
                Today
              </div>

              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} items-end space-x-2`}>
                  {msg.type === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-govblue-100 dark:bg-govblue-900/30 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3.5 h-3.5 text-govblue-600 dark:text-govblue-400" />
                    </div>
                  )}

                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${msg.type === 'user'
                      ? 'bg-govblue-600 text-white rounded-br-sm'
                      : 'bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-white/5 text-slate-700 dark:text-slate-300 rounded-bl-sm shadow-sm'
                    }`}>
                    <div className="whitespace-pre-wrap leading-relaxed">{msg.type === 'bot' ? parseMarkup(msg.text) : msg.text}</div>
                    <div className={`text-[9px] mt-1 text-right ${msg.type === 'user' ? 'text-govblue-200' : 'text-slate-400'}`}>
                      {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  {msg.type === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                      <User className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start items-end space-x-2">
                  <div className="w-6 h-6 rounded-full bg-govblue-100 dark:bg-govblue-900/30 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3.5 h-3.5 text-govblue-600 dark:text-govblue-400" />
                  </div>
                  <div className="bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-white/5 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                    <div className="flex space-x-1.5">
                      <div className="w-1.5 h-1.5 bg-govblue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-govblue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1.5 h-1.5 bg-govblue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/5">
              <form onSubmit={handleSend} className="flex items-center space-x-2 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={language === 'hi' ? "लिखें 'rajasthan se student'..." : "Type 'student from up'..."}
                  className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-govblue-500 focus:ring-1 focus:ring-govblue-500 text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 bg-govblue-600 hover:bg-govblue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
              <div className="text-center mt-2">
                <span className="text-[9px] text-slate-400 dark:text-slate-500">
                  Setu Doot AI Simulator • Private & Secure
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;