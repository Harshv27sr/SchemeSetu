import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, X, Send, Bot, User, CheckCircle2, RefreshCw, PhoneCall, HelpCircle, FileSearch, Sparkles, SendHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
  const { schemes, language } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [flowState, setFlowState] = useState('idle'); // idle, check_occupation, check_income, check_age, check_category
  const [tempProfile, setTempProfile] = useState({
    occupation: '',
    income: 0,
    age: 0,
    category: ''
  });
  
  const messagesEndRef = useRef(null);
  const isHindi = language === 'hi';

  // Bot response dictionary
  const botStrings = {
    en: {
      botName: "Setu Doot",
      botSubtitle: "Intelligent Portal Assistant",
      greeting: "Greetings! I am Setu Doot, your virtual scheme assistant. Let's find your matching government benefits or verify your application status. Select an option below to begin!",
      optEligibility: "✨ Analyze My Eligibility",
      optOcr: "⚡ OCR Discrepancy Guide",
      optFaq: "📚 Platform Guidelines & FAQs",
      optContact: "📞 Central Desk Helpline",
      typeMessage: "Type your query here...",
      backMenu: "Back to Main Menu",
      
      // Eligibility diagnostic steps
      askOccupation: "Step 1/4 • Citizen Occupation\nWhat is your primary livelihood activity?",
      askIncome: "Step 2/4 • Annual Income limit\nWhat is your total yearly household income?",
      askAge: "Step 3/4 • Age Bracket\nSelect your age range in years:",
      askCategory: "Step 4/4 • Caste & Social Group\nSelect your demographic category:",
      calculating: "Compiling parameters against active scheme registries...",
      resultTitle: "Eligibility Analysis Complete!",
      noSchemesMatched: "Based on our matching algorithms, you don't satisfy the minimum eligibility thresholds for any active schemes currently. You can try adjusting your parameters or visit the full catalog!",
      congratsMatched: "Excellent! Our eligibility engine found these high-probability matching schemes for you:",
      scoreMatch: "Eligibility Match",
      viewDetails: "Examine Scheme",
      
      // FAQ Responses
      ocrExplanation: "### ⚡ OCR Document Discrepancy Guide\n\nOur system integrates **Tesseract OCR (Optical Character Recognition)** which performs a real-time smart audit on your uploaded certificates:\n\n1. **Extraction**: Reads textual content directly from image/PDF uploads (like Aadhaar cards, caste certificates, or income records).\n2. **Smart Validation**: Cross-checks metadata details, like the spelling of your name or date of birth, across documents.\n3. **Alert Dashboard**: Flags spelling discrepancies (e.g., `Rahul Sharma` on Aadhaar vs `Rahul S.` on Income Certificate) before final submission, helping you avoid direct rejection by desk officers.",
      
      faqSection: "### 📚 Platform Guidelines & FAQs\n\n* **Q: What is SchemeSetu?**\n  It is a next-generation portal designed to eliminate administrative gaps, helping citizens discover, verify eligibility, upload documents, scan for errors, and track central/state welfare programs.\n\n* **Q: Is my uploaded personal data secure?**\n  Absolutely! All uploads are checked securely using modern token validation, file isolation, and client-safe validation mechanisms, maintaining high privacy standards.\n\n* **Q: How long does application review take?**\n  Central desk officers typically complete documentation reviews and status updates within 3-5 business days.",
      
      contactSection: "### 📞 Official Helpdesk Directory\n\nNeed direct human assistance? Our centralized helpdesk is available 24/7:\n\n* 📞 **National Citizen Toll-Free Line**: `1800-11-2026`\n* ✉ **Official Support Email**: `support@schemesetu.gov.in`\n* 🏛 **Ministry Grievance Portal**: [pgportal.gov.in](https://pgportal.gov.in)\n\nFeel free to ask me other questions here at any time!",
    },
    hi: {
      botName: "सेतु दूत",
      botSubtitle: "इंटेलिजेंट पोर्टल सहायक",
      greeting: "प्रणाम! मैं सेतु दूत हूँ, आपका सरकारी योजना वर्चुअल गाइड। आइए मिलकर आपके लिए उपयुक्त सरकारी लाभ खोजें या आपके आवेदन की स्थिति जानें। शुरू करने के लिए नीचे दिए गए विकल्पों में से एक चुनें!",
      optEligibility: "✨ मेरी पात्रता की जांच करें",
      optOcr: "⚡ OCR विसंगति दिशानिर्देश",
      optFaq: "📚 योजना मार्गदर्शिका एवं प्रश्न",
      optContact: "📞 केंद्रीय डेस्क हेल्पलाइन",
      typeMessage: "अपना प्रश्न यहाँ लिखें...",
      backMenu: "मुख्य मेनू पर वापस जाएं",
      
      // Eligibility diagnostic steps
      askOccupation: "चरण 1/4 • नागरिक का व्यवसाय\nआपकी आजीविका का मुख्य साधन क्या है?",
      askIncome: "चरण 2/4 • वार्षिक पारिवारिक आय\nआपकी कुल वार्षिक पारिवारिक आय कितनी है?",
      askAge: "चरण 3/4 • आयु वर्ग\nअपनी आयु सीमा का चयन करें (वर्षों में):",
      askCategory: "चरण 4/4 • जाति एवं सामाजिक श्रेणी\nअपने सामाजिक वर्ग का चयन करें:",
      calculating: "सक्रिय योजनाओं के डेटाबेस से आपके मानदंडों का मिलान किया जा रहा है...",
      resultTitle: "पात्रता मिलान पूर्ण!",
      noSchemesMatched: "हमारे एल्गोरिदम के अनुसार, वर्तमान में आप किसी योजना की न्यूनतम पात्रता शर्तों को पूरा नहीं करते हैं। कृपया अन्य मापदंडों का चयन करें!",
      congratsMatched: "बधाई हो! हमारे पात्रता इंजन ने आपके लिए ये उच्च-संभाव्यता वाली योजनाएं खोजी हैं:",
      scoreMatch: "पात्रता स्कोर",
      viewDetails: "योजना की जांच करें",

      // FAQ Responses
      ocrExplanation: "### ⚡ OCR दस्तावेज़ विसंगति दिशानिर्देश\n\nहमारा सिस्टम **Tesseract OCR (ऑप्टिकल कैरेक्टर रिकॉग्निशन)** का उपयोग करता है जो आपके दस्तावेज़ों का रीयल-टाइम ऑडिट करता है:\n\n1. **डेटा एक्सट्रैक्शन**: अपलोड किए गए आधार कार्ड या आय प्रमाण पत्र से नाम और जन्म तिथि को स्कैन करके पढ़ता है।\n2. **स्मार्ट तुलना**: अलग-अलग दस्तावेजों के नामों का मिलान करता है।\n3. **विसंगति चेतावनी (Mismatch Alert)**: यदि आधार कार्ड में `Rahul Sharma` और आय प्रमाण पत्र में `Rahul S.` है, तो यह सबमिशन से पहले ही त्रुटि दिखा देता है ताकि अधिकारी आपका फॉर्म खारिज न करें।",
      
      faqSection: "### 📚 सामान्य प्रश्न (FAQs) और मार्गदर्शिका\n\n* **प्रश्न: स्कीमसेतु क्या है?**\n  यह एक डिजिटल सेतु है जो नागरिकों को बिना बिचौलियों के सरकारी योजनाओं की खोज करने, दस्तावेज त्रुटि जांचने और आवेदन की लाइव स्थिति जानने में मदद करता है।\n\n* **प्रश्न: क्या मेरे दस्तावेज सुरक्षित हैं?**\n  हाँ, सभी दस्तावेज सुरक्षित टोकन प्रमाणीकरण और डेटा एन्क्रिप्शन के साथ स्टोर किए जाते हैं, जिससे आपकी गोपनीयता सुरक्षित रहती है।\n\n* **प्रश्न: सत्यापन में कितना समय लगता है?**\n  केंद्रीय डेस्क अधिकारियों द्वारा दस्तावेजों के सत्यापन और मंजूरी में आमतौर पर 3 से 5 कार्य दिवस का समय लगता है।",
      
      contactSection: "### 📞 आधिकारिक हेल्पलाइन डायरेक्टरी\n\nयदि आप सीधे संपर्क करना चाहते हैं, तो हमारी हेल्प डेस्क चौबीसों घंटे सक्रिय है:\n\n* 📞 **राष्ट्रीय नागरिक टोल-फ्री हेल्पलाइन**: `1800-11-2026`\n* ✉ **आधिकारिक ईमेल**: `support@schemesetu.gov.in`\n* 🏛 **शिकायत निवारण पोर्टल**: [pgportal.gov.in](https://pgportal.gov.in)\n\nआप किसी भी समय मुझसे कोई भी प्रश्न पूछ सकते हैं!",
    }
  };

  const currentStrings = isHindi ? botStrings.hi : botStrings.en;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    setMessages([
      {
        id: 'greet',
        sender: 'bot',
        text: currentStrings.greeting,
        timestamp: new Date(),
        showMenu: true
      }
    ]);
    setFlowState('idle');
  }, [language]);

  const addBotMessage = (text, extra = {}) => {
    setMessages(prev => [...prev, {
      id: 'bot_' + Date.now() + Math.random(),
      sender: 'bot',
      text,
      timestamp: new Date(),
      ...extra
    }]);
  };

  const handleMenuClick = (option) => {
    const userText = currentStrings[option];
    setMessages(prev => [...prev, {
      id: 'user_' + Date.now(),
      sender: 'user',
      text: userText,
      timestamp: new Date()
    }]);

    if (option === 'optEligibility') {
      startEligibilityFlow();
    } else if (option === 'optOcr') {
      setTimeout(() => {
        addBotMessage(currentStrings.ocrExplanation, { showMenu: true });
      }, 500);
    } else if (option === 'optFaq') {
      setTimeout(() => {
        addBotMessage(currentStrings.faqSection, { showMenu: true });
      }, 500);
    } else if (option === 'optContact') {
      setTimeout(() => {
        addBotMessage(currentStrings.contactSection, { showMenu: true });
      }, 500);
    }
  };

  const startEligibilityFlow = () => {
    setFlowState('check_occupation');
    setTimeout(() => {
      addBotMessage(currentStrings.askOccupation, {
        buttons: [
          { value: 'Farmer', label: isHindi ? '🌾 किसान (Farmer)' : '🌾 Farmer' },
          { value: 'Student', label: isHindi ? '🎓 छात्र (Student)' : '🎓 Student' },
          { value: 'Business Owner', label: isHindi ? '💼 व्यवसायी (Business)' : '💼 Business Owner' },
          { value: 'Unemployed', label: isHindi ? '🛑 बेरोजगार (Unemployed)' : '🛑 Unemployed' },
          { value: 'Others', label: isHindi ? '⚙️ अन्य (Others)' : '⚙️ Others' }
        ]
      });
    }, 600);
  };

  const handleEligibilityOption = (field, val, label) => {
    setMessages(prev => [...prev, {
      id: 'user_' + Date.now(),
      sender: 'user',
      text: label,
      timestamp: new Date()
    }]);

    const updatedProfile = { ...tempProfile, [field]: val };
    setTempProfile(updatedProfile);

    if (field === 'occupation') {
      setFlowState('check_income');
      setTimeout(() => {
        addBotMessage(currentStrings.askIncome, {
          buttons: [
            { value: 150000, label: isHindi ? '📉 ₹1.5 लाख से कम' : '📉 Under ₹1.5 Lakhs' },
            { value: 250000, label: isHindi ? '📊 ₹2.5 लाख से कम' : '📊 Under ₹2.5 Lakhs' },
            { value: 500000, label: isHindi ? '📈 ₹5 लाख से कम' : '📈 Under ₹5 Lakhs' },
            { value: 900000, label: isHindi ? '💎 ₹9 लाख से कम' : '💎 Under ₹9 Lakhs' }
          ]
        });
      }, 500);
    } else if (field === 'income') {
      setFlowState('check_age');
      setTimeout(() => {
        addBotMessage(currentStrings.askAge, {
          buttons: [
            { value: 16, label: '👶 15-17 Yrs' },
            { value: 25, label: '🧑 18-35 Yrs' },
            { value: 45, label: '👨 36-60 Yrs' },
            { value: 65, label: '👴 Above 60 Yrs' }
          ]
        });
      }, 500);
    } else if (field === 'age') {
      setFlowState('check_category');
      setTimeout(() => {
        addBotMessage(currentStrings.askCategory, {
          buttons: [
            { value: 'General', label: '🛡️ General' },
            { value: 'OBC', label: '🎗️ OBC' },
            { value: 'SC', label: '🔹 SC' },
            { value: 'ST', label: '🔸 ST' }
          ]
        });
      }, 500);
    } else if (field === 'category') {
      setFlowState('calculating');
      setTimeout(() => {
        compileDiagnosticResults(updatedProfile);
      }, 1200);
    }
  };

  const compileDiagnosticResults = (prof) => {
    const results = schemes.map(scheme => {
      const crit = scheme.eligibility;
      let matches = 0;
      let totalChecks = 4;

      if (prof.age >= crit.minAge && prof.age <= crit.maxAge) matches++;
      if (prof.income <= crit.maxIncome) matches++;
      if (crit.allowedOccupations.includes(prof.occupation) || crit.allowedOccupations.includes("All")) matches++;
      
      const categoryMatches = (allowed, current) => {
        if (allowed.includes("All") || allowed.includes(current)) return true;
        if (allowed.includes("SC/ST") && (current === "SC" || current === "ST")) return true;
        return false;
      };
      if (categoryMatches(crit.allowedCategories, prof.category)) matches++;

      const score = Math.round((matches / totalChecks) * 100);
      return { ...scheme, score };
    }).filter(s => s.score >= 50)
      .sort((a, b) => b.score - a.score);

    setFlowState('idle');

    if (results.length === 0) {
      addBotMessage(currentStrings.noSchemesMatched, { showMenu: true });
    } else {
      addBotMessage(currentStrings.congratsMatched, {
        matchedSchemes: results.slice(0, 3),
        showMenu: true
      });
    }
  };

  const handleSendText = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal;
    setMessages(prev => [...prev, {
      id: 'user_' + Date.now(),
      sender: 'user',
      text: userText,
      timestamp: new Date()
    }]);
    setInputVal('');

    setTimeout(() => {
      const lower = userText.toLowerCase().trim();
      
      if (lower.includes('scheme') || lower.includes('yojana') || lower.includes('योजना') || lower.includes('list') || lower.includes('explore')) {
        addBotMessage(
          isHindi 
            ? "आप हमारी योजनाएं **'Explore Schemes'** टैब पर क्लिक करके सभी योजनाओं की सूची देख सकते हैं। क्या आप एक त्वरित पात्रता जांच शुरू करना चाहते हैं?"
            : "You can view all listed government benefits in the **'Explore Schemes'** section. Would you like to run a personalized eligibility analysis right here?",
          { showMenu: true }
        );
      } else if (lower.includes('ocr') || lower.includes('document') || lower.includes('आधार') || lower.includes('दस्तावेज') || lower.includes('error')) {
        addBotMessage(currentStrings.ocrExplanation, { showMenu: true });
      } else if (lower.includes('contact') || lower.includes('number') || lower.includes('help') || lower.includes('मदद') || lower.includes('helpline')) {
        addBotMessage(currentStrings.contactSection, { showMenu: true });
      } else {
        addBotMessage(
          isHindi 
            ? `मुझे समझ आ गया। मैं सेतु दूत गाइड के रूप में आपकी मदद करने के लिए तत्पर हूँ। कृपया नीचे दिए गए विकल्पों में से एक का चयन करें:`
            : `Understood! As your SchemeSetu Portal Assistant, I am programmed to offer you complete guidance. Please select one of the following official options:`,
          { showMenu: true }
        );
      }
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      {/* Redesigned Pulsing Action Button with Holographic Ashoka Ribbon Shadow */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-tr from-govblue-600 via-indigo-600 to-govblue-800 rounded-full text-white shadow-2xl flex items-center justify-center cursor-pointer border-[3px] border-white relative overflow-hidden group focus:outline-none focus:ring-4 focus:ring-indigo-300"
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.06 }}
        animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        style={{
          boxShadow: "0 10px 30px -5px rgba(29, 127, 196, 0.5), 0 0 15px 2px rgba(56, 185, 95, 0.3)"
        }}
      >
        {/* Saffron-Green rotating tricolor halo rings */}
        <span className="absolute inset-0 rounded-full border-[3px] border-dashed border-govgreen-400 opacity-60 animate-spin-slow group-hover:opacity-100 transition-opacity"></span>
        <span className="absolute -inset-1 rounded-full border border-dashed border-amber-500 opacity-40 animate-pulse"></span>
        
        {isOpen ? (
          <X className="w-7 h-7 relative z-10" />
        ) : (
          <div className="relative z-10 flex flex-col items-center">
            <MessageSquare className="w-7 h-7" />
            <span className="text-[7px] font-extrabold uppercase tracking-widest text-emerald-300 animate-pulse mt-0.5">Setu AI</span>
          </div>
        )}
      </motion.button>

      {/* Redesigned Premium Glassmorphic Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-[360px] sm:w-[410px] h-[580px] bg-slate-900/95 backdrop-blur-xl rounded-[32px] shadow-2xl border border-white/10 flex flex-col overflow-hidden mb-5 mr-0 sm:mr-2 relative"
            style={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(29, 127, 196, 0.15)"
            }}
          >
            {/* Holographic Saffron-Green Tricolor Ribbon Border */}
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-amber-500 via-white to-govgreen-500 z-50"></div>

            {/* Header Area with Ashoka Chakra Spun Glow & Tricolor ribbon */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white p-5 border-b border-white/5 flex items-center justify-between relative">
              <div className="flex items-center space-x-3.5">
                {/* Rotating micro chakra container */}
                <div className="w-11 h-11 rounded-full bg-slate-800/80 border border-white/10 flex items-center justify-center flex-shrink-0 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-govblue-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Bot className="w-6 h-6 text-govgreen-400 relative z-10 animate-pulse" />
                  {/* Subtle chakra spin element */}
                  <div className="absolute inset-0.5 border border-dashed border-govblue-500 rounded-full animate-spin-slow opacity-60"></div>
                </div>
                <div>
                  <h3 className="font-black text-sm tracking-wide flex items-center space-x-2 text-white">
                    <span>{currentStrings.botName}</span>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </h3>
                  <p className="text-[10px] text-govblue-300/80 font-bold uppercase tracking-wider mt-0.5 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                    <span>{currentStrings.botSubtitle}</span>
                  </p>
                </div>
              </div>
              
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white border border-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages Body Log (Premium Dark Slate Theme) */}
            <div className="flex-1 p-5 overflow-y-auto space-y-5 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 scrollbar-thin">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="flex space-x-2.5 max-w-[88%]">
                    {msg.sender === 'bot' && (
                      <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center flex-shrink-0 text-govgreen-400 self-end">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}
                    
                    <div className="space-y-3.5">
                      {/* Premium Chat bubble styling */}
                      {msg.text && (
                        <div className={`p-4 rounded-2xl text-xs leading-relaxed shadow-lg ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-govblue-600 to-indigo-700 text-white rounded-br-none border border-indigo-400/20 font-medium'
                            : 'bg-slate-800/90 text-slate-200 border border-white/5 rounded-bl-none font-medium'
                        }`}
                        style={{
                          boxShadow: msg.sender === 'user' 
                            ? "0 4px 15px rgba(29, 127, 196, 0.25)" 
                            : "0 4px 12px rgba(0, 0, 0, 0.15)"
                        }}
                        >
                          <div className="whitespace-pre-line prose prose-invert prose-xs">
                            {msg.text}
                          </div>
                        </div>
                      )}

                      {/* Redesigned Scheme Recommendation Cards inside chat */}
                      {msg.matchedSchemes && (
                        <div className="space-y-3">
                          {msg.matchedSchemes.map((s) => (
                            <div 
                              key={s._id} 
                              className="p-4 bg-slate-800/70 hover:bg-slate-800 border border-white/5 hover:border-govblue-500/40 rounded-2xl shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex flex-col justify-between"
                            >
                              <div>
                                <div className="flex justify-between items-center mb-2.5">
                                  <span className="text-[8px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 uppercase tracking-widest">
                                    {s.state}
                                  </span>
                                  <span className="text-[10px] font-extrabold text-govblue-300 bg-govblue-500/10 px-2.5 py-0.5 rounded-full border border-govblue-500/20 tracking-wider">
                                    🚀 {s.score}% {isHindi ? 'योग्य' : 'Eligible'}
                                  </span>
                                </div>
                                <h4 className="text-xs font-black text-white line-clamp-1">{s.title}</h4>
                                <p className="text-[10px] text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">{s.description}</p>
                              </div>
                              
                              {/* Redesigned matching score meter bar */}
                              <div className="mt-3.5">
                                <div className="flex justify-between text-[8px] font-bold text-slate-400 mb-1">
                                  <span>{isHindi ? 'पात्रता विश्लेषण' : 'Criteria Match Score'}</span>
                                  <span>{s.score}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                                  <div 
                                    className="h-full bg-gradient-to-r from-indigo-500 via-govblue-500 to-govgreen-500 rounded-full" 
                                    style={{ width: `${s.score}%` }}
                                  ></div>
                                </div>
                              </div>

                              <a 
                                href={`/schemes`}
                                className="mt-4 py-2.5 bg-gradient-to-r from-govblue-600/20 to-indigo-600/20 hover:from-govblue-600 hover:to-indigo-600 text-govblue-300 hover:text-white font-bold rounded-xl text-[10px] text-center transition-all duration-300 border border-govblue-500/20 hover:border-transparent block"
                              >
                                {currentStrings.viewDetails} →
                              </a>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Redesigned Glass Option Buttons (Questionnaire) */}
                      {msg.buttons && (
                        <div className="flex flex-col gap-2 pt-1.5 max-w-full">
                          {msg.buttons.map((btn) => (
                            <button
                              key={btn.value}
                              onClick={() => {
                                if (flowState === 'check_occupation') handleEligibilityOption('occupation', btn.value, btn.label);
                                else if (flowState === 'check_income') handleEligibilityOption('income', btn.value, btn.label);
                                else if (flowState === 'check_age') handleEligibilityOption('age', btn.value, btn.label);
                                else if (flowState === 'check_category') handleEligibilityOption('category', btn.value, btn.label);
                              }}
                              className="w-full text-left px-4 py-3 bg-slate-800/80 hover:bg-indigo-600/30 text-slate-200 hover:text-white font-bold border border-white/5 hover:border-indigo-500/40 rounded-2xl text-xs transition-all duration-300 shadow-md hover:shadow-indigo-500/5 hover:-translate-y-0.5 active:scale-98 cursor-pointer"
                            >
                              {btn.label}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Redesigned Main Menu Quick Glass Buttons */}
                      {msg.showMenu && flowState === 'idle' && (
                        <div className="flex flex-col gap-2.5 pt-2 max-w-full">
                          <button
                            onClick={() => handleMenuClick('optEligibility')}
                            className="w-full text-left px-4.5 py-3.5 bg-gradient-to-r from-govblue-600/20 to-indigo-700/20 hover:from-govblue-600 hover:to-indigo-700 text-govblue-300 hover:text-white font-bold rounded-2xl text-xs transition-all duration-300 flex items-center justify-between border border-govblue-500/30 hover:border-transparent shadow-lg hover:shadow-govblue-500/20 hover:-translate-y-0.5 cursor-pointer"
                          >
                            <span>{currentStrings.optEligibility}</span>
                            <Sparkles className="w-4 h-4 text-amber-400" />
                          </button>
                          
                          <button
                            onClick={() => handleMenuClick('optOcr')}
                            className="w-full text-left px-4.5 py-3.5 bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white font-bold rounded-2xl text-xs transition-all duration-300 flex items-center justify-between border border-white/5 hover:border-white/10 hover:-translate-y-0.5 cursor-pointer"
                          >
                            <span>{currentStrings.optOcr}</span>
                            <FileSearch className="w-4 h-4 text-govgreen-400" />
                          </button>

                          <button
                            onClick={() => handleMenuClick('optFaq')}
                            className="w-full text-left px-4.5 py-3.5 bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white font-bold rounded-2xl text-xs transition-all duration-300 flex items-center justify-between border border-white/5 hover:border-white/10 hover:-translate-y-0.5 cursor-pointer"
                          >
                            <span>{currentStrings.optFaq}</span>
                            <HelpCircle className="w-4 h-4 text-purple-400" />
                          </button>

                          <button
                            onClick={() => handleMenuClick('optContact')}
                            className="w-full text-left px-4.5 py-3.5 bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white font-bold rounded-2xl text-xs transition-all duration-300 flex items-center justify-between border border-white/5 hover:border-white/10 hover:-translate-y-0.5 cursor-pointer"
                          >
                            <span>{currentStrings.optContact}</span>
                            <PhoneCall className="w-4 h-4 text-rose-400" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Premium spin-glow typing loader */}
              {flowState === 'calculating' && (
                <div className="flex justify-start">
                  <div className="flex space-x-2.5 max-w-[88%]">
                    <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center flex-shrink-0 text-govgreen-400 self-end">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="p-4 bg-slate-800/90 border border-white/5 rounded-2xl rounded-tl-none shadow-lg flex items-center space-x-3 text-slate-300 text-xs font-semibold">
                      <RefreshCw className="w-4 h-4 animate-spin text-govgreen-400" />
                      <span className="tracking-wide animate-pulse">{currentStrings.calculating}</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form Footer (Redesigned Borderless Bar) */}
            <form onSubmit={handleSendText} className="p-4 border-t border-white/5 bg-slate-950 flex items-center space-x-2.5">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={currentStrings.typeMessage}
                disabled={flowState !== 'idle'}
                className="flex-1 px-4.5 py-3 bg-slate-900 border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-xs text-white transition-all disabled:bg-slate-950 disabled:text-slate-500 placeholder:text-slate-500 font-semibold"
              />
              <button
                type="submit"
                disabled={flowState !== 'idle' || !inputVal.trim()}
                className="p-3 bg-gradient-to-r from-govblue-600 to-indigo-700 disabled:from-slate-800 disabled:to-slate-850 text-white disabled:text-slate-500 rounded-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-govblue-600/10 disabled:shadow-none"
              >
                <SendHorizontal className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
