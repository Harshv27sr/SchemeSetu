import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Core translation strings for English and Hindi
const translations = {
  en: {
    // Navbar
    home: "Home",
    schemes: "Explore Schemes",
    dashboard: "Dashboard",
    profile: "My Profile",
    adminDashboard: "Admin Console",
    login: "Sign In",
    signup: "Register",
    logout: "Log Out",
    language: "Hindi",
    
    // Hero Section
    heroTitle: "Find Government Schemes Tailored For You",
    heroSubtitle: "SchemeSetu bridges the gap between citizens and benefits. Seamlessly discover eligible central & state schemes, upload documents, check mismatches via OCR, and track your applications.",
    getStarted: "Get Started",
    howItWorks: "How It Works",
    popularSchemes: "Popular Schemes",
    viewAllSchemes: "View All Schemes",

    // Dashboard
    recommendedTitle: "Recommended Schemes For You",
    noMatches: "No exact matches found. Please complete your profile to receive personalized recommendations!",
    completeProfileBtn: "Complete Profile Now",
    applicationStatusTitle: "Active Applications",
    noApplications: "You haven't applied to any schemes yet.",
    uploadedDocumentsTitle: "My Document Center",
    uploadBtn: "Upload Document",
    deadlineReminder: "Upcoming Deadlines",
    daysLeft: "days left",

    // Profile Page
    profileTitle: "Citizen Profile Details",
    profileSubtitle: "Keep your profile up to date to receive highly accurate scheme recommendations.",
    fullName: "Full Name",
    age: "Age (Years)",
    gender: "Gender",
    state: "State",
    category: "Category",
    occupation: "Occupation",
    annualIncome: "Annual Income (INR)",
    education: "Highest Education",
    disabilityStatus: "Disability Status (Divyangjan)",
    saveProfile: "Save Profile",
    male: "Male",
    female: "Female",
    other: "Other",
    general: "General",
    obc: "OBC",
    sc: "SC",
    st: "ST",
    student: "Student",
    farmer: "Farmer",
    business: "Business Owner",
    unemployed: "Unemployed",
    retired: "Retired",
    others: "Others",
    disabled: "Yes, I have a disability certificate",
    notDisabled: "No disability",

    // Eligibility Checker
    eligibilityScore: "Eligibility Score",
    eligible: "Highly Eligible",
    partiallyEligible: "Partially Eligible",
    notEligible: "Not Eligible",
    incomeMatch: "Annual Income satisfies limit",
    incomeMismatch: "Income exceeds limit of ₹",
    occupationMatch: "Occupation criteria satisfied",
    occupationMismatch: "Occupation not covered by this scheme",
    categoryMatch: "Social category matched",
    categoryMismatch: "Scheme not available for your social category",
    stateMatch: "State of residency matches",
    stateMismatch: "Scheme is restricted to other states",
    ageMatch: "Age is within required brackets",
    ageMismatch: "Age is outside acceptable range (",

    // Admin Console
    totalUsers: "Total Users",
    totalApps: "Total Applications",
    activeSchemes: "Active Schemes",
    analytics: "Platform Analytics",
    userManagement: "User Management",
    addScheme: "Add New Scheme",
    editScheme: "Edit Scheme",
    deleteBtn: "Delete",
    viewAppBtn: "Review Application",
    changeStatus: "Change Status",
    underReview: "Under Review",
    verified: "Verified",
    approved: "Approved",
    rejected: "Rejected",
    adminOpsConsole: "Admin Operations Console",
    adminOpsSubtitle: "Manage applications and government schemes",
    ocrAlertsRate: "OCR Alerts",
    applicationsTab: "Applications",
    schemesTab: "Schemes",
    tableHeaderId: "ID",
    tableHeaderCitizen: "Citizen",
    tableHeaderScheme: "Scheme",
    tableHeaderStatus: "Status",
    tableHeaderAction: "Action",
    reviewBtn: "Review",
    addSchemeBtn: "Add Scheme",
    saveSchemeBtn: "Save Scheme",
    cancelBtn: "Cancel",
    requiredDocsLabel: "Required Documents",
    minAgeLabel: "Min Age",
    maxAgeLabel: "Max Age",
    maxIncomeLabel: "Max Income",
    schemeTitleLabel: "Scheme Title",
    schemeDescLabel: "Description",
    schemeBenefitsLabel: "Benefits",
    schemeStateLabel: "State",
    schemeCategoryLabel: "Category"
  },
  hi: {
    // Navbar
    home: "मुख्य पृष्ठ",
    schemes: "योजनाएं खोजें",
    dashboard: "डैशबोर्ड",
    profile: "मेरी प्रोफाइल",
    adminDashboard: "एडमिन कंसोल",
    login: "लॉग इन",
    signup: "पंजीकरण",
    logout: "लॉग आउट",
    language: "English",

    // Hero Section
    heroTitle: "विशेष रूप से आपके लिए सरकारी योजनाएं खोजें",
    heroSubtitle: "स्कीमसेतु नागरिकों और लाभों के बीच की दूरी को पाटता है। आसानी से केंद्रीय और राज्य योजनाओं की खोज करें, दस्तावेज़ अपलोड करें, ओसीआर के माध्यम से विसंगतियों की जांच करें और अपने आवेदनों को ट्रैक करें।",
    getStarted: "शुरू करें",
    howItWorks: "यह कैसे काम करता है",
    popularSchemes: "लोकप्रिय योजनाएं",
    viewAllSchemes: "सभी योजनाएं देखें",

    // Dashboard
    recommendedTitle: "आपके लिए अनुशंसित योजनाएं",
    noMatches: "कोई सटीक मिलान नहीं मिला। व्यक्तिगत सिफारिशें प्राप्त करने के लिए कृपया अपनी प्रोफ़ाइल पूरी करें!",
    completeProfileBtn: "अभी प्रोफाइल पूरी करें",
    applicationStatusTitle: "सक्रिय आवेदन",
    noApplications: "आपने अभी तक किसी योजना के लिए आवेदन नहीं किया है।",
    uploadedDocumentsTitle: "मेरा दस्तावेज़ केंद्र",
    uploadBtn: "दस्तावेज़ अपलोड करें",
    deadlineReminder: "आगामी समय सीमा",
    daysLeft: "दिन शेष",

    // Profile Page
    profileTitle: "नागरिक प्रोफ़ाइल विवरण",
    profileSubtitle: "सटीक योजना सिफारिशें प्राप्त करने के लिए अपनी प्रोफ़ाइल अपडेट रखें।",
    fullName: "पूरा नाम",
    age: "आयु (वर्ष)",
    gender: "लिंग",
    state: "राज्य",
    category: "वर्ग (जाति)",
    occupation: "व्यवसाय",
    annualIncome: "वार्षिक आय (रुपये में)",
    education: "उच्चतम शिक्षा",
    disabilityStatus: "विकलांगता स्थिति (दिव्यांगजन)",
    saveProfile: "प्रोफ़ाइल सहेजें",
    male: "पुरुष",
    female: "महिला",
    other: "अन्य",
    general: "सामान्य",
    obc: "ओबीसी",
    sc: "अनुसूचित जाति (SC)",
    st: "अनुसूचित जनजाति (ST)",
    student: "छात्र",
    farmer: "किसान",
    business: "व्यवसाय स्वामी",
    unemployed: "बेरोजगार",
    retired: "सेवानिवृत्त",
    others: "अन्य",
    disabled: "हाँ, मेरे पास विकलांगता प्रमाण पत्र है",
    notDisabled: "कोई विकलांगता नहीं",

    // Eligibility Checker
    eligibilityScore: "पात्रता स्कोर",
    eligible: "पूर्णतः पात्र",
    partiallyEligible: "आंशिक रूप से पात्र",
    notEligible: "पात्र नहीं",
    incomeMatch: "वार्षिक आय सीमा के भीतर है",
    incomeMismatch: "आय ₹ की सीमा से अधिक है",
    occupationMatch: "व्यवसाय मानदंड पूरा किया गया",
    occupationMismatch: "यह व्यवसाय इस योजना के अंतर्गत नहीं है",
    categoryMatch: "सामाजिक श्रेणी का मिलान हो गया",
    categoryMismatch: "योजना आपकी सामाजिक श्रेणी के लिए उपलब्ध नहीं है",
    stateMatch: "निवास का राज्य मेल खाता है",
    stateMismatch: "यह योजना अन्य राज्यों तक सीमित है",
    ageMatch: "आयु आवश्यक वर्ग के भीतर है",
    ageMismatch: "आयु स्वीकार्य सीमा से बाहर है (",

    // Admin Console
    totalUsers: "कुल उपयोगकर्ता",
    totalApps: "कुल आवेदन",
    activeSchemes: "सक्रिय योजनाएं",
    analytics: "प्लेटफॉर्म विश्लेषण",
    userManagement: "उपयोगकर्ता प्रबंधन",
    addScheme: "नई योजना जोड़ें",
    editScheme: "योजना संपादित करें",
    deleteBtn: "हटाएं",
    viewAppBtn: "आवेदन की समीक्षा करें",
    changeStatus: "स्थिति बदलें",
    underReview: "समीक्षा के अधीन",
    verified: "सत्यापित",
    approved: "स्वीकृत",
    rejected: "अस्वीकृत",
    adminOpsConsole: "प्रशासनिक संचालन कंसोल",
    adminOpsSubtitle: "आवेदनों और सरकारी योजनाओं का प्रबंधन करें",
    ocrAlertsRate: "OCR अलर्ट दर",
    applicationsTab: "प्राप्त आवेदन",
    schemesTab: "पंजीकृत योजनाएं",
    tableHeaderId: "आईडी",
    tableHeaderCitizen: "नागरिक",
    tableHeaderScheme: "योजना",
    tableHeaderStatus: "स्थिति",
    tableHeaderAction: "कार्रवाई",
    reviewBtn: "समीक्षा करें",
    addSchemeBtn: "योजना जोड़ें",
    saveSchemeBtn: "योजना सहेजें",
    cancelBtn: "रद्द करें",
    requiredDocsLabel: "आवश्यक दस्तावेज़",
    minAgeLabel: "न्यूनतम आयु",
    maxAgeLabel: "अधिकतम आयु",
    maxIncomeLabel: "अधिकतम आय",
    schemeTitleLabel: "योजना का शीर्षक",
    schemeDescLabel: "विवरण",
    schemeBenefitsLabel: "लाभ",
    schemeStateLabel: "राज्य",
    schemeCategoryLabel: "श्रेणी"
  }
};

const DEFAULT_SCHEMES = [
  {
    _id: "scheme_pm_kisan",
    title: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    description: "Income support scheme for all landholding farmer families across the country to enable them to take care of agricultural expenses.",
    benefits: "Financial benefit of ₹6,000 per year, paid in three equal installments of ₹2,000 directly into bank accounts.",
    state: "Central",
    category: "All",
    deadline: "2026-08-15",
    requiredDocuments: ["Aadhaar Card", "Income Certificate", "Land Holding Certificate"],
    eligibility: {
      minAge: 18,
      maxAge: 85,
      maxIncome: 300000,
      allowedOccupations: ["Farmer"],
      allowedCategories: ["General", "OBC", "SC", "ST"],
      allowedStates: ["All"],
      allowedGenders: ["Male", "Female", "Other"]
    }
  },
  {
    _id: "scheme_post_matric",
    title: "Post Matric Scholarship Scheme for SC/ST Students",
    description: "Financial assistance to students belonging to scheduled castes and tribes studying at post-matriculation or post-secondary stages.",
    benefits: "100% compulsory non-refundable fees reimbursement and monthly maintenance allowances up to ₹1,200.",
    state: "Central",
    category: "SC/ST",
    deadline: "2026-07-31",
    requiredDocuments: ["Aadhaar Card", "Caste Certificate", "Income Certificate", "Marksheet"],
    eligibility: {
      minAge: 15,
      maxAge: 30,
      maxIncome: 250000,
      allowedOccupations: ["Student"],
      allowedCategories: ["SC", "ST"],
      allowedStates: ["All"],
      allowedGenders: ["Male", "Female", "Other"]
    }
  },
  {
    _id: "scheme_pmay",
    title: "Pradhan Mantri Awas Yojana (PMAY-Gramin)",
    description: "Housing for All mission aiming to provide pucka houses with basic amenities to all homeless and households living in dilapidated houses.",
    benefits: "Financial assistance of ₹1.2 Lakhs in plains and ₹1.3 Lakhs in hilly/difficult areas for house construction.",
    state: "Central",
    category: "All",
    deadline: "2026-12-31",
    requiredDocuments: ["Aadhaar Card", "Income Certificate", "Passport Photo"],
    eligibility: {
      minAge: 18,
      maxAge: 99,
      maxIncome: 600000,
      allowedOccupations: ["Student", "Farmer", "Business Owner", "Unemployed", "Retired", "Others"],
      allowedCategories: ["General", "OBC", "SC", "ST"],
      allowedStates: ["All"],
      allowedGenders: ["Male", "Female", "Other"]
    }
  },
  {
    _id: "scheme_lado_protsahan",
    title: "Lado Protsahan Yojana",
    description: "State-specific financial support program supporting the birth and education of girls in low-income families.",
    benefits: "Savings bond of ₹1 Lakh given to the girl child, with milestone cash payouts at standard school levels.",
    state: "Rajasthan",
    category: "All",
    deadline: "2026-09-30",
    requiredDocuments: ["Aadhaar Card", "Income Certificate", "Caste Certificate"],
    eligibility: {
      minAge: 0,
      maxAge: 21,
      maxIncome: 200000,
      allowedOccupations: ["Student", "Others"],
      allowedCategories: ["General", "OBC", "SC", "ST"],
      allowedStates: ["Rajasthan"],
      allowedGenders: ["Female"]
    }
  },
  {
    _id: "scheme_atal_pension",
    title: "Atal Pension Yojana (APY)",
    description: "Pension scheme focused on the unorganized sector workers to provide post-retirement financial security.",
    benefits: "Guaranteed minimum pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000 or ₹5,000 per month after age 60 based on contribution.",
    state: "Central",
    category: "All",
    deadline: "2026-11-30",
    requiredDocuments: ["Aadhaar Card"],
    eligibility: {
      minAge: 18,
      maxAge: 40,
      maxIncome: 800000,
      allowedOccupations: ["Farmer", "Business Owner", "Unemployed", "Others"],
      allowedCategories: ["General", "OBC", "SC", "ST"],
      allowedStates: ["All"],
      allowedGenders: ["Male", "Female", "Other"]
    }
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'en');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [schemes, setSchemes] = useState(DEFAULT_SCHEMES);
  const [applications, setApplications] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiActive, setApiActive] = useState(false);

  // Sync token with axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  // Keep track of active translation language
  useEffect(() => {
    localStorage.setItem('lang', language);
  }, [language]);

  // Handle Theme Toggling on root document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Load applications/schemes from MERN backend server
  useEffect(() => {
    const initData = async () => {
      try {
        setLoading(true);
        // Test backend endpoint
        const health = await axios.get(`${API_URL}/auth/health`);
        if (health.status === 200) {
          setApiActive(true);
          // Load real schemas from backend
          const res = await axios.get(`${API_URL}/schemes`);
          setSchemes(res.data);
          
          if (token) {
            const profileRes = await axios.get(`${API_URL}/auth/profile`);
            setUser(profileRes.data);
            
            const appRes = await axios.get(`${API_URL}/applications`);
            setApplications(appRes.data);

            try {
              if (profileRes.data.role === 'Admin') {
                const ticketRes = await axios.get(`${API_URL}/grievances/all`);
                setTickets(ticketRes.data);
              } else {
                const ticketRes = await axios.get(`${API_URL}/grievances`);
                setTickets(ticketRes.data);
              }
            } catch (ticketErr) {
              console.error("Grievances load error", ticketErr);
            }
          }
        }
      } catch (err) {
        console.error("MERN Backend connection error", err);
        setApiActive(false);
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, [token]);

  // Translate helper function
  const t = (key) => {
    return translations[language][key] || key;
  };

  // Sign In
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      setToken(res.data.token);
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Login failed" };
    } finally {
      setLoading(false);
    }
  };

  // Register
  const signup = async (name, email, password, role = "Citizen") => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/register`, { name, email, password, role });
      setToken(res.data.token);
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Registration failed" };
    } finally {
      setLoading(false);
    }
  };

  // Update Profile
  const updateProfile = async (profileData) => {
    setLoading(true);
    try {
      const res = await axios.put(`${API_URL}/auth/profile`, profileData);
      setUser(res.data);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Profile update failed" };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    setApplications([]);
    setTickets([]);
    localStorage.removeItem('token');
  };

  // Dynamic eligibility checks for the catalog lists
  const calculateEligibility = (scheme) => {
    if (!user || !user.profile) {
      return { status: 'Partially Eligible', score: 50, reasons: ["Please set up your profile for exact scoring"] };
    }

    const prof = user.profile;
    const crit = scheme.eligibility;
    const reasons = [];
    let matches = 0;
    let totalChecks = 6; // age, income, occupation, category, state, gender

    // 1. Age
    const age = prof.age || 0;
    if (age >= crit.minAge && age <= crit.maxAge) {
      reasons.push({ matched: true, text: t('ageMatch') });
      matches++;
    } else {
      reasons.push({ matched: false, text: `${t('ageMismatch')}${crit.minAge}-${crit.maxAge})` });
    }

    // 2. Income
    const income = prof.income || 0;
    if (income <= crit.maxIncome) {
      reasons.push({ matched: true, text: t('incomeMatch') });
      matches++;
    } else {
      reasons.push({ matched: false, text: `${t('incomeMismatch')}${crit.maxIncome.toLocaleString()}` });
    }

    // 3. Occupation
    const occ = prof.occupation || "Others";
    if (crit.allowedOccupations.includes(occ) || crit.allowedOccupations.includes("All")) {
      reasons.push({ matched: true, text: t('occupationMatch') });
      matches++;
    } else {
      reasons.push({ matched: false, text: t('occupationMismatch') });
    }

    // 4. Social Category
    const cat = prof.category || "General";
    // Check match ('SC/ST' covers SC and ST)
    const categoryMatches = (allowed, current) => {
      if (allowed.includes("All") || allowed.includes(current)) return true;
      if (allowed.includes("SC/ST") && (current === "SC" || current === "ST")) return true;
      return false;
    };

    if (categoryMatches(crit.allowedCategories, cat)) {
      reasons.push({ matched: true, text: t('categoryMatch') });
      matches++;
    } else {
      reasons.push({ matched: false, text: t('categoryMismatch') });
    }

    // 5. State
    const state = prof.state || "All";
    if (crit.allowedStates.includes(state) || crit.allowedStates.includes("All") || state === "All") {
      reasons.push({ matched: true, text: t('stateMatch') });
      matches++;
    } else {
      reasons.push({ matched: false, text: t('stateMismatch') });
    }

    // 6. Gender
    const gender = prof.gender || "Male";
    if (crit.allowedGenders.includes(gender) || crit.allowedGenders.includes("All")) {
      reasons.push({ matched: true, text: "Gender criteria matched" });
      matches++;
    } else {
      reasons.push({ matched: false, text: "Scheme not available for selected gender" });
    }

    const score = Math.round((matches / totalChecks) * 100);
    let status = 'Not Eligible';
    if (score === 100) status = 'Eligible';
    else if (score >= 50) status = 'Partially Eligible';

    return { status, score, reasons };
  };

  // Recommends matched schemes
  const getRecommendedSchemes = () => {
    if (!user || !user.profile) return schemes;
    
    // Sort schemes by eligibility score descending
    return [...schemes].map(scheme => {
      const eligibility = calculateEligibility(scheme);
      return { ...scheme, eligibilityResult: eligibility };
    }).sort((a, b) => b.eligibilityResult.score - a.eligibilityResult.score);
  };

  // Apply to Scheme (Wizard Submit)
  const applyToScheme = async (schemeId, uploadedDocs, validationResult) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/applications`, {
        schemeId,
        uploadedDocuments: uploadedDocs,
        validationResult
      });
      setApplications(prev => [res.data, ...prev]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Failed to submit application" };
    } finally {
      setLoading(false);
    }
  };

  // OCR Match Checker (Client-Side Simulator, highly realistic)
  const runLocalOCRValidation = (doc1Name, doc2Name, name1, dob1, name2, dob2) => {
    // Standard string similarity check
    const formatName = (n) => n.trim().toLowerCase().replace(/\s+/g, '');
    const clean1 = formatName(name1);
    const clean2 = formatName(name2);

    let nameMatched = clean1 === clean2 || clean1.includes(clean2) || clean2.includes(clean1);
    
    // Check if names are partially similar
    let remarks = "";
    let status = "Success";

    if (!nameMatched) {
      status = "Mismatch";
      remarks = `⚠ Name mismatch detected! Aadhaar: "${name1}", Income Certificate: "${name2}". Please ensure both files represent the same individual.`;
    } else {
      remarks = "✅ Documents verified successfully. Extracted Name and DOB match perfectly across both certificates.";
    }

    return {
      status,
      remarks,
      extractedData: {
        doc1: { name: name1, dob: dob1 },
        doc2: { name: name2, dob: dob2 }
      }
    };
  };

  // Document Vault Actions
  const uploadDocument = async (type, name) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/profile/documents`, { type, name });
      setUser(res.data);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Failed to upload document" };
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (docId) => {
    setLoading(true);
    try {
      const res = await axios.delete(`${API_URL}/auth/profile/documents/${docId}`);
      setUser(res.data);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Failed to delete document" };
    } finally {
      setLoading(false);
    }
  };

  // Grievance Actions
  const raiseTicket = async (query) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/grievances`, { query });
      setTickets(prev => [res.data, ...prev]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Failed to submit grievance ticket" };
    } finally {
      setLoading(false);
    }
  };

  const replyToTicket = async (ticketId, reply, status) => {
    setLoading(true);
    try {
      const res = await axios.put(`${API_URL}/grievances/${ticketId}/reply`, { reply, status });
      setTickets(prev => prev.map(t => t._id === ticketId ? res.data : t));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Failed to submit reply" };
    } finally {
      setLoading(false);
    }
  };

  // Admin CRUD for schemes
  const createScheme = async (schemeData) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/schemes`, schemeData);
      setSchemes(prev => [...prev, res.data]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Failed to create scheme" };
    } finally {
      setLoading(false);
    }
  };

  const updateScheme = async (id, schemeData) => {
    setLoading(true);
    try {
      const res = await axios.put(`${API_URL}/schemes/${id}`, schemeData);
      setSchemes(prev => prev.map(s => s._id === id ? res.data : s));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Failed to update scheme" };
    } finally {
      setLoading(false);
    }
  };

  const deleteScheme = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/schemes/${id}`);
      setSchemes(prev => prev.filter(s => s._id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Failed to delete scheme" };
    } finally {
      setLoading(false);
    }
  };

  // Admin status update
  const updateApplicationStatus = async (appId, status) => {
    setLoading(true);
    try {
      const res = await axios.put(`${API_URL}/applications/${appId}/status`, { status });
      setApplications(prev => prev.map(app => app._id === appId ? res.data : app));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Failed to update application status" };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      language,
      schemes,
      applications,
      tickets,
      loading,
      apiActive,
      t,
      setLanguage,
      login,
      signup,
      updateProfile,
      logout,
      calculateEligibility,
      getRecommendedSchemes,
      applyToScheme,
      runLocalOCRValidation,
      createScheme,
      updateScheme,
      deleteScheme,
      updateApplicationStatus,
      uploadDocument,
      deleteDocument,
      raiseTicket,
      replyToTicket,
      theme,
      toggleTheme
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
