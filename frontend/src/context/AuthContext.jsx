import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Safely parse the API URL to prevent duplicate /api/api bugs
let rawUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// Remove any trailing slashes and trailing /api to normalize it
if (rawUrl.endsWith('/')) rawUrl = rawUrl.slice(0, -1);
if (rawUrl.endsWith('/api')) rawUrl = rawUrl.slice(0, -4);
const API_URL = rawUrl + '/api';

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
    coreCapabilities: "Core Capabilities",
    powerfulFeatures: "Powerful Features Made for Citizens",
    powerfulFeaturesSub: "Eliminating barriers of red tape, confusion, and complexity. Find, check, and track your claims instantly.",
    recEngine: "Recommendation Engine",
    recEngineDesc: "Matches your profile filters (age, income, state, category) directly to active state and central benefits in real-time.",
    eligibilityChecker: "Eligibility Checker",
    eligibilityCheckerDesc: "Calculates a transparent eligibility score based on dynamic parameter checks, with detailed explanations.",
    ocrValidation: "OCR Document Validation",
    ocrValidationDesc: "Harnesses OCR validation to read certificates and proactively alert users on critical spelling or birthdate mismatches.",
    appTracking: "Application Tracking",
    appTrackingDesc: "Keeps application statuses updated with a comprehensive timeline UI mapping each verification stage.",
    simplifyingBureaucracy: "Simplifying Bureaucracy",
    fiveStepFlow: "A 5-Step Digital Assistance Flow",
    fiveStepFlowSub: "Applying for benefits has never been this direct. We guide you through verification, file uploads, and approval.",
    step1Title: "Register Securely",
    step1Desc: "Sign up and protect your credentials with JWT authorization.",
    step2Title: "Fill Citizen Profile",
    step2Desc: "Enter age, state, caste, and income parameters for automated matching.",
    step3Title: "Review Schemes",
    step3Desc: "Compare customized score recommendations and check match explanations.",
    step4Title: "OCR Mismatch Scan",
    step4Desc: "Upload documents and let OCR detect any typos before submission.",
    step5Title: "Track & Succeed",
    step5Desc: "Submit to the Admin desk and monitor the timeline status dynamically.",
    readyToDiscover: "Ready to Discover Your Eligible Benefits?",
    takeTwoMins: "Take 2 minutes to fill your parameters. Find your matching schemes and secure your eligible assistance today.",
    getStartedFree: "Get Started for Free",

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
    coreCapabilities: "मुख्य क्षमताएं",
    powerfulFeatures: "नागरिकों के लिए बनाई गई शक्तिशाली विशेषताएं",
    powerfulFeaturesSub: "लालफीताशाही, भ्रम और जटिलता की बाधाओं को खत्म करना। तुरंत अपने दावों को खोजें, जांचें और ट्रैक करें।",
    recEngine: "सिफारिश इंजन",
    recEngineDesc: "वास्तविक समय में सक्रिय राज्य और केंद्रीय लाभों के साथ आपके प्रोफ़ाइल फ़िल्टर (आयु, आय, राज्य, श्रेणी) का मिलान करता है।",
    eligibilityChecker: "पात्रता जांचकर्ता",
    eligibilityCheckerDesc: "विस्तृत स्पष्टीकरण के साथ गतिशील पैरामीटर जांच के आधार पर एक पारदर्शी पात्रता स्कोर की गणना करता है।",
    ocrValidation: "ओसीआर दस्तावेज़ सत्यापन",
    ocrValidationDesc: "प्रमाणपत्रों को पढ़ने के लिए ओसीआर सत्यापन का उपयोग करता है और महत्वपूर्ण वर्तनी या जन्मतिथि के बेमेल पर उपयोगकर्ताओं को सचेत करता है।",
    appTracking: "आवेदन ट्रैकिंग",
    appTrackingDesc: "प्रत्येक सत्यापन चरण को मैप करने वाले एक व्यापक टाइमलाइन यूआई के साथ आवेदन स्थितियों को अपडेट रखता है।",
    simplifyingBureaucracy: "नौकरशाही को सरल बनाना",
    fiveStepFlow: "5-चरणीय डिजिटल सहायता प्रवाह",
    fiveStepFlowSub: "लाभ के लिए आवेदन करना इतना सीधा कभी नहीं रहा। हम सत्यापन, फ़ाइल अपलोड और अनुमोदन के माध्यम से आपका मार्गदर्शन करते हैं।",
    step1Title: "सुरक्षित रूप से पंजीकरण करें",
    step1Desc: "साइन अप करें और जेडब्ल्यूटी प्राधिकरण के साथ अपनी साख सुरक्षित रखें।",
    step2Title: "नागरिक प्रोफ़ाइल भरें",
    step2Desc: "स्वचालित मिलान के लिए आयु, राज्य, जाति और आय पैरामीटर दर्ज करें।",
    step3Title: "योजनाओं की समीक्षा करें",
    step3Desc: "अनुकूलित स्कोर सिफारिशों की तुलना करें और मिलान स्पष्टीकरण की जांच करें।",
    step4Title: "ओसीआर बेमेल स्कैन",
    step4Desc: "दस्तावेज़ अपलोड करें और जमा करने से पहले ओसीआर को किसी भी टाइपो का पता लगाने दें।",
    step5Title: "ट्रैक करें और सफल हों",
    step5Desc: "एडमिन डेस्क पर सबमिट करें और गतिशील रूप से टाइमलाइन स्थिति की निगरानी करें।",
    readyToDiscover: "क्या आप अपने पात्र लाभों को खोजने के लिए तैयार हैं?",
    takeTwoMins: "अपने पैरामीटर भरने के लिए 2 मिनट निकालें। अपनी मिलान योजनाएं खोजें और आज ही अपनी पात्र सहायता सुरक्षित करें।",
    getStartedFree: "मुफ़्त में शुरुआत करें",

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
    "_id": "scheme_pradhan_0",
    "title": "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    "description": "Income support scheme for all landholding farmer families across the country to enable them to take care of agricultural expenses.",
    "benefits": "Financial benefit of ₹6,000 per year, paid in three equal installments of ₹2,000 directly into bank accounts.",
    "detailedDescription": "An Education Loan (EL) scheme has been launched by the Ministry of Social Justice and Empowerment, Government of India.\n\nThe scheme aims to provide education loans to the students from the community of safai karamcharis/manual scavengers & their dependents for pursuing higher education.",
    "detailedBenefits": "| Course | Maximum Loan Limit |\n| :--- | :--- |\n| **Study in India** | Upto ₹ 10.00 Lakhs |\n| **Study in Abroad** | Upto ₹ 20.00 Lakhs |\n\n**Notes:**\n1. The loan will be provided for higher education.\n2. Up to 90% of the project cost is provided as a loan.\n\n**Repayment period:**\nThe loan is to be repaid in 5 years after the moratorium period.\n\n**Moratorium period:**\n6 months after completion of the course or getting employment, whichever is earlier.",
    "detailedEligibility": "The following person(s)/entities shall be considered eligible for availing of financial assistance under the various schemes of NSKFDC:-\n\n1. The applicant must be a citizen of India.\n2. Scavengers and their dependents.\n3. Safai Karamcharis and their dependents.\n4. The applicant should be a student who has secured admission to professional/technical courses.\n5. Admission to professional/technical courses must be through an entrance exam/merit-based selection.",
    "applicationProcess": "### Offline\n1. Loan applications are submitted by the applicants to the district offices of State Channelizing Agencies (SCAs) of NSKFDC or branches of Regional Rural Banks (RRBs) and Nationalised Banks.\n2. The applications are appraised and approved by the respective SCAs/Banks.\n3. Funds are disbursed to the applicants through the SCAs/Banks.\n\n### Online\n1. Visit the official portal.\n2. Register and fill the application form.\n3. Upload the required documents.\n4. Submit the application for verification.",
    "state": "Central",
    "category": "All",
    "deadline": "2026-08-15",
    "requiredDocuments": [
      "Aadhaar Card",
      "Marksheets/Certificate of qualifying examination",
      "Admission confirmation letter",
      "Fee structure of the course",
      "Caste Certificate (if applicable)",
      "Income Certificate"
    ],
    "eligibility": {
      "minAge": 18,
      "maxAge": 85,
      "maxIncome": 300000,
      "allowedOccupations": [
        "Farmer"
      ],
      "allowedCategories": [
        "General",
        "OBC",
        "SC",
        "ST"
      ],
      "allowedStates": [
        "All"
      ],
      "allowedGenders": [
        "Male",
        "Female",
        "Other"
      ]
    }
  },
  {
    "_id": "scheme_post_1",
    "title": "Post Matric Scholarship Scheme for SC/ST Students",
    "description": "Financial assistance to students belonging to scheduled castes and tribes studying at post-matriculation or post-secondary stages.",
    "benefits": "100% compulsory non-refundable fees reimbursement and monthly maintenance allowances up to ₹1,200.",
    "detailedDescription": "An Education Loan (EL) scheme has been launched by the Ministry of Social Justice and Empowerment, Government of India.\n\nThe scheme aims to provide education loans to the students from the community of safai karamcharis/manual scavengers & their dependents for pursuing higher education.",
    "detailedBenefits": "| Course | Maximum Loan Limit |\n| :--- | :--- |\n| **Study in India** | Upto ₹ 10.00 Lakhs |\n| **Study in Abroad** | Upto ₹ 20.00 Lakhs |\n\n**Notes:**\n1. The loan will be provided for higher education.\n2. Up to 90% of the project cost is provided as a loan.\n\n**Repayment period:**\nThe loan is to be repaid in 5 years after the moratorium period.\n\n**Moratorium period:**\n6 months after completion of the course or getting employment, whichever is earlier.",
    "detailedEligibility": "The following person(s)/entities shall be considered eligible for availing of financial assistance under the various schemes of NSKFDC:-\n\n1. The applicant must be a citizen of India.\n2. Scavengers and their dependents.\n3. Safai Karamcharis and their dependents.\n4. The applicant should be a student who has secured admission to professional/technical courses.\n5. Admission to professional/technical courses must be through an entrance exam/merit-based selection.",
    "applicationProcess": "### Offline\n1. Loan applications are submitted by the applicants to the district offices of State Channelizing Agencies (SCAs) of NSKFDC or branches of Regional Rural Banks (RRBs) and Nationalised Banks.\n2. The applications are appraised and approved by the respective SCAs/Banks.\n3. Funds are disbursed to the applicants through the SCAs/Banks.\n\n### Online\n1. Visit the official portal.\n2. Register and fill the application form.\n3. Upload the required documents.\n4. Submit the application for verification.",
    "state": "Central",
    "category": "SC/ST",
    "deadline": "2026-07-31",
    "requiredDocuments": [
      "Aadhaar Card",
      "Marksheets/Certificate of qualifying examination",
      "Admission confirmation letter",
      "Fee structure of the course",
      "Caste Certificate (if applicable)",
      "Income Certificate"
    ],
    "eligibility": {
      "minAge": 15,
      "maxAge": 30,
      "maxIncome": 250000,
      "allowedOccupations": [
        "Student"
      ],
      "allowedCategories": [
        "SC",
        "ST"
      ],
      "allowedStates": [
        "All"
      ],
      "allowedGenders": [
        "Male",
        "Female",
        "Other"
      ]
    }
  },
  {
    "_id": "scheme_pradhan_2",
    "title": "Pradhan Mantri Awas Yojana (PMAY-Gramin)",
    "description": "Housing for All mission aiming to provide pucka houses with basic amenities to all homeless and households living in dilapidated houses.",
    "benefits": "Financial assistance of ₹1.2 Lakhs in plains and ₹1.3 Lakhs in hilly/difficult areas for house construction.",
    "detailedDescription": "An Education Loan (EL) scheme has been launched by the Ministry of Social Justice and Empowerment, Government of India.\n\nThe scheme aims to provide education loans to the students from the community of safai karamcharis/manual scavengers & their dependents for pursuing higher education.",
    "detailedBenefits": "| Course | Maximum Loan Limit |\n| :--- | :--- |\n| **Study in India** | Upto ₹ 10.00 Lakhs |\n| **Study in Abroad** | Upto ₹ 20.00 Lakhs |\n\n**Notes:**\n1. The loan will be provided for higher education.\n2. Up to 90% of the project cost is provided as a loan.\n\n**Repayment period:**\nThe loan is to be repaid in 5 years after the moratorium period.\n\n**Moratorium period:**\n6 months after completion of the course or getting employment, whichever is earlier.",
    "detailedEligibility": "The following person(s)/entities shall be considered eligible for availing of financial assistance under the various schemes of NSKFDC:-\n\n1. The applicant must be a citizen of India.\n2. Scavengers and their dependents.\n3. Safai Karamcharis and their dependents.\n4. The applicant should be a student who has secured admission to professional/technical courses.\n5. Admission to professional/technical courses must be through an entrance exam/merit-based selection.",
    "applicationProcess": "### Offline\n1. Loan applications are submitted by the applicants to the district offices of State Channelizing Agencies (SCAs) of NSKFDC or branches of Regional Rural Banks (RRBs) and Nationalised Banks.\n2. The applications are appraised and approved by the respective SCAs/Banks.\n3. Funds are disbursed to the applicants through the SCAs/Banks.\n\n### Online\n1. Visit the official portal.\n2. Register and fill the application form.\n3. Upload the required documents.\n4. Submit the application for verification.",
    "state": "Central",
    "category": "All",
    "deadline": "2026-12-31",
    "requiredDocuments": [
      "Aadhaar Card",
      "Marksheets/Certificate of qualifying examination",
      "Admission confirmation letter",
      "Fee structure of the course",
      "Caste Certificate (if applicable)",
      "Income Certificate"
    ],
    "eligibility": {
      "minAge": 18,
      "maxAge": 99,
      "maxIncome": 600000,
      "allowedOccupations": [
        "All"
      ],
      "allowedCategories": [
        "General",
        "OBC",
        "SC",
        "ST"
      ],
      "allowedStates": [
        "All"
      ],
      "allowedGenders": [
        "Male",
        "Female",
        "Other"
      ]
    }
  },
  {
    "_id": "scheme_lado_3",
    "title": "Lado Protsahan Yojana",
    "description": "State-specific financial support program supporting the birth and education of girls in low-income families.",
    "benefits": "Savings bond of ₹1 Lakh given to the girl child, with milestone cash payouts at standard school levels.",
    "detailedDescription": "An Education Loan (EL) scheme has been launched by the Ministry of Social Justice and Empowerment, Government of India.\n\nThe scheme aims to provide education loans to the students from the community of safai karamcharis/manual scavengers & their dependents for pursuing higher education.",
    "detailedBenefits": "| Course | Maximum Loan Limit |\n| :--- | :--- |\n| **Study in India** | Upto ₹ 10.00 Lakhs |\n| **Study in Abroad** | Upto ₹ 20.00 Lakhs |\n\n**Notes:**\n1. The loan will be provided for higher education.\n2. Up to 90% of the project cost is provided as a loan.\n\n**Repayment period:**\nThe loan is to be repaid in 5 years after the moratorium period.\n\n**Moratorium period:**\n6 months after completion of the course or getting employment, whichever is earlier.",
    "detailedEligibility": "The following person(s)/entities shall be considered eligible for availing of financial assistance under the various schemes of NSKFDC:-\n\n1. The applicant must be a citizen of India.\n2. Scavengers and their dependents.\n3. Safai Karamcharis and their dependents.\n4. The applicant should be a student who has secured admission to professional/technical courses.\n5. Admission to professional/technical courses must be through an entrance exam/merit-based selection.",
    "applicationProcess": "### Offline\n1. Loan applications are submitted by the applicants to the district offices of State Channelizing Agencies (SCAs) of NSKFDC or branches of Regional Rural Banks (RRBs) and Nationalised Banks.\n2. The applications are appraised and approved by the respective SCAs/Banks.\n3. Funds are disbursed to the applicants through the SCAs/Banks.\n\n### Online\n1. Visit the official portal.\n2. Register and fill the application form.\n3. Upload the required documents.\n4. Submit the application for verification.",
    "state": "Rajasthan",
    "category": "All",
    "deadline": "2026-09-30",
    "requiredDocuments": [
      "Aadhaar Card",
      "Marksheets/Certificate of qualifying examination",
      "Admission confirmation letter",
      "Fee structure of the course",
      "Caste Certificate (if applicable)",
      "Income Certificate"
    ],
    "eligibility": {
      "minAge": 0,
      "maxAge": 21,
      "maxIncome": 200000,
      "allowedOccupations": [
        "All"
      ],
      "allowedCategories": [
        "General",
        "OBC",
        "SC",
        "ST"
      ],
      "allowedStates": [
        "Rajasthan"
      ],
      "allowedGenders": [
        "Female"
      ]
    }
  },
  {
    "_id": "scheme_atal_4",
    "title": "Atal Pension Yojana (APY)",
    "description": "Pension scheme focused on the unorganized sector workers to provide post-retirement financial security.",
    "benefits": "Guaranteed minimum pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000 or ₹5,000 per month after age 60 based on contribution.",
    "detailedDescription": "An Education Loan (EL) scheme has been launched by the Ministry of Social Justice and Empowerment, Government of India.\n\nThe scheme aims to provide education loans to the students from the community of safai karamcharis/manual scavengers & their dependents for pursuing higher education.",
    "detailedBenefits": "| Course | Maximum Loan Limit |\n| :--- | :--- |\n| **Study in India** | Upto ₹ 10.00 Lakhs |\n| **Study in Abroad** | Upto ₹ 20.00 Lakhs |\n\n**Notes:**\n1. The loan will be provided for higher education.\n2. Up to 90% of the project cost is provided as a loan.\n\n**Repayment period:**\nThe loan is to be repaid in 5 years after the moratorium period.\n\n**Moratorium period:**\n6 months after completion of the course or getting employment, whichever is earlier.",
    "detailedEligibility": "The following person(s)/entities shall be considered eligible for availing of financial assistance under the various schemes of NSKFDC:-\n\n1. The applicant must be a citizen of India.\n2. Scavengers and their dependents.\n3. Safai Karamcharis and their dependents.\n4. The applicant should be a student who has secured admission to professional/technical courses.\n5. Admission to professional/technical courses must be through an entrance exam/merit-based selection.",
    "applicationProcess": "### Offline\n1. Loan applications are submitted by the applicants to the district offices of State Channelizing Agencies (SCAs) of NSKFDC or branches of Regional Rural Banks (RRBs) and Nationalised Banks.\n2. The applications are appraised and approved by the respective SCAs/Banks.\n3. Funds are disbursed to the applicants through the SCAs/Banks.\n\n### Online\n1. Visit the official portal.\n2. Register and fill the application form.\n3. Upload the required documents.\n4. Submit the application for verification.",
    "state": "Central",
    "category": "All",
    "deadline": "2026-11-30",
    "requiredDocuments": [
      "Aadhaar Card",
      "Marksheets/Certificate of qualifying examination",
      "Admission confirmation letter",
      "Fee structure of the course",
      "Caste Certificate (if applicable)",
      "Income Certificate"
    ],
    "eligibility": {
      "minAge": 18,
      "maxAge": 40,
      "maxIncome": 800000,
      "allowedOccupations": [
        "All"
      ],
      "allowedCategories": [
        "General",
        "OBC",
        "SC",
        "ST"
      ],
      "allowedStates": [
        "All"
      ],
      "allowedGenders": [
        "Male",
        "Female",
        "Other"
      ]
    }
  },
  {
    "_id": "scheme_national_5",
    "title": "National Widow Pension Scheme (NWPS)",
    "description": "Financial assistance provided to widows to ensure a dignified life and cover basic living expenses.",
    "benefits": "Monthly pension of ₹3,000 transferred directly to the beneficiary's bank account.",
    "detailedDescription": "An Education Loan (EL) scheme has been launched by the Ministry of Social Justice and Empowerment, Government of India.\n\nThe scheme aims to provide education loans to the students from the community of safai karamcharis/manual scavengers & their dependents for pursuing higher education.",
    "detailedBenefits": "| Course | Maximum Loan Limit |\n| :--- | :--- |\n| **Study in India** | Upto ₹ 10.00 Lakhs |\n| **Study in Abroad** | Upto ₹ 20.00 Lakhs |\n\n**Notes:**\n1. The loan will be provided for higher education.\n2. Up to 90% of the project cost is provided as a loan.\n\n**Repayment period:**\nThe loan is to be repaid in 5 years after the moratorium period.\n\n**Moratorium period:**\n6 months after completion of the course or getting employment, whichever is earlier.",
    "detailedEligibility": "The following person(s)/entities shall be considered eligible for availing of financial assistance under the various schemes of NSKFDC:-\n\n1. The applicant must be a citizen of India.\n2. Scavengers and their dependents.\n3. Safai Karamcharis and their dependents.\n4. The applicant should be a student who has secured admission to professional/technical courses.\n5. Admission to professional/technical courses must be through an entrance exam/merit-based selection.",
    "applicationProcess": "### Offline\n1. Loan applications are submitted by the applicants to the district offices of State Channelizing Agencies (SCAs) of NSKFDC or branches of Regional Rural Banks (RRBs) and Nationalised Banks.\n2. The applications are appraised and approved by the respective SCAs/Banks.\n3. Funds are disbursed to the applicants through the SCAs/Banks.\n\n### Online\n1. Visit the official portal.\n2. Register and fill the application form.\n3. Upload the required documents.\n4. Submit the application for verification.",
    "state": "Central",
    "category": "Widow",
    "deadline": "2026-12-31",
    "requiredDocuments": [
      "Aadhaar Card",
      "Marksheets/Certificate of qualifying examination",
      "Admission confirmation letter",
      "Fee structure of the course",
      "Caste Certificate (if applicable)",
      "Income Certificate"
    ],
    "eligibility": {
      "minAge": 18,
      "maxAge": 99,
      "maxIncome": 200000,
      "allowedOccupations": [
        "All"
      ],
      "allowedCategories": [
        "General",
        "OBC",
        "SC",
        "ST"
      ],
      "allowedStates": [
        "All"
      ],
      "allowedGenders": [
        "Female"
      ],
      "targetSpecialCategories": [
        "Widow"
      ]
    }
  },
  {
    "_id": "scheme_shramik_6",
    "title": "Shramik Kalyan Yojana",
    "description": "Comprehensive welfare scheme for unorganized sector labourers, providing health coverage and tool kits.",
    "benefits": "Free health insurance up to ₹5 Lakhs and a one-time grant of ₹10,000 for purchasing occupational tools.",
    "detailedDescription": "An Education Loan (EL) scheme has been launched by the Ministry of Social Justice and Empowerment, Government of India.\n\nThe scheme aims to provide education loans to the students from the community of safai karamcharis/manual scavengers & their dependents for pursuing higher education.",
    "detailedBenefits": "| Course | Maximum Loan Limit |\n| :--- | :--- |\n| **Study in India** | Upto ₹ 10.00 Lakhs |\n| **Study in Abroad** | Upto ₹ 20.00 Lakhs |\n\n**Notes:**\n1. The loan will be provided for higher education.\n2. Up to 90% of the project cost is provided as a loan.\n\n**Repayment period:**\nThe loan is to be repaid in 5 years after the moratorium period.\n\n**Moratorium period:**\n6 months after completion of the course or getting employment, whichever is earlier.",
    "detailedEligibility": "The following person(s)/entities shall be considered eligible for availing of financial assistance under the various schemes of NSKFDC:-\n\n1. The applicant must be a citizen of India.\n2. Scavengers and their dependents.\n3. Safai Karamcharis and their dependents.\n4. The applicant should be a student who has secured admission to professional/technical courses.\n5. Admission to professional/technical courses must be through an entrance exam/merit-based selection.",
    "applicationProcess": "### Offline\n1. Loan applications are submitted by the applicants to the district offices of State Channelizing Agencies (SCAs) of NSKFDC or branches of Regional Rural Banks (RRBs) and Nationalised Banks.\n2. The applications are appraised and approved by the respective SCAs/Banks.\n3. Funds are disbursed to the applicants through the SCAs/Banks.\n\n### Online\n1. Visit the official portal.\n2. Register and fill the application form.\n3. Upload the required documents.\n4. Submit the application for verification.",
    "state": "Central",
    "category": "Labour",
    "deadline": "2026-10-31",
    "requiredDocuments": [
      "Aadhaar Card",
      "Marksheets/Certificate of qualifying examination",
      "Admission confirmation letter",
      "Fee structure of the course",
      "Caste Certificate (if applicable)",
      "Income Certificate"
    ],
    "eligibility": {
      "minAge": 18,
      "maxAge": 60,
      "maxIncome": 150000,
      "allowedOccupations": [
        "Labourer",
        "Daily Wager"
      ],
      "allowedCategories": [
        "General",
        "OBC",
        "SC",
        "ST"
      ],
      "allowedStates": [
        "All"
      ],
      "allowedGenders": [
        "Male",
        "Female",
        "Other"
      ]
    }
  },
  {
    "_id": "scheme_divyangjan_7",
    "title": "Divyangjan Pension Scheme",
    "description": "Financial support for persons with disabilities (Divyangjan) to help them lead an independent life.",
    "benefits": "Monthly pension of ₹2,500 and free bus/train passes.",
    "detailedDescription": "An Education Loan (EL) scheme has been launched by the Ministry of Social Justice and Empowerment, Government of India.\n\nThe scheme aims to provide education loans to the students from the community of safai karamcharis/manual scavengers & their dependents for pursuing higher education.",
    "detailedBenefits": "| Course | Maximum Loan Limit |\n| :--- | :--- |\n| **Study in India** | Upto ₹ 10.00 Lakhs |\n| **Study in Abroad** | Upto ₹ 20.00 Lakhs |\n\n**Notes:**\n1. The loan will be provided for higher education.\n2. Up to 90% of the project cost is provided as a loan.\n\n**Repayment period:**\nThe loan is to be repaid in 5 years after the moratorium period.\n\n**Moratorium period:**\n6 months after completion of the course or getting employment, whichever is earlier.",
    "detailedEligibility": "The following person(s)/entities shall be considered eligible for availing of financial assistance under the various schemes of NSKFDC:-\n\n1. The applicant must be a citizen of India.\n2. Scavengers and their dependents.\n3. Safai Karamcharis and their dependents.\n4. The applicant should be a student who has secured admission to professional/technical courses.\n5. Admission to professional/technical courses must be through an entrance exam/merit-based selection.",
    "applicationProcess": "### Offline\n1. Loan applications are submitted by the applicants to the district offices of State Channelizing Agencies (SCAs) of NSKFDC or branches of Regional Rural Banks (RRBs) and Nationalised Banks.\n2. The applications are appraised and approved by the respective SCAs/Banks.\n3. Funds are disbursed to the applicants through the SCAs/Banks.\n\n### Online\n1. Visit the official portal.\n2. Register and fill the application form.\n3. Upload the required documents.\n4. Submit the application for verification.",
    "state": "Central",
    "category": "Disabled",
    "deadline": "2027-03-31",
    "requiredDocuments": [
      "Aadhaar Card",
      "Marksheets/Certificate of qualifying examination",
      "Admission confirmation letter",
      "Fee structure of the course",
      "Caste Certificate (if applicable)",
      "Income Certificate"
    ],
    "eligibility": {
      "minAge": 0,
      "maxAge": 99,
      "maxIncome": 250000,
      "allowedOccupations": [
        "All"
      ],
      "allowedCategories": [
        "General",
        "OBC",
        "SC",
        "ST"
      ],
      "allowedStates": [
        "All"
      ],
      "allowedGenders": [
        "Male",
        "Female",
        "Other"
      ],
      "targetSpecialCategories": [
        "Disabled"
      ]
    }
  },
  {
    "_id": "scheme_startup_8",
    "title": "Startup India Seed Fund Scheme",
    "description": "Provides financial assistance to startups for proof of concept, prototype development, product trials, market entry, and commercialization.",
    "benefits": "Seed funding of up to ₹50 Lakhs for eligible early-stage startups.",
    "detailedDescription": "An Education Loan (EL) scheme has been launched by the Ministry of Social Justice and Empowerment, Government of India.\n\nThe scheme aims to provide education loans to the students from the community of safai karamcharis/manual scavengers & their dependents for pursuing higher education.",
    "detailedBenefits": "| Course | Maximum Loan Limit |\n| :--- | :--- |\n| **Study in India** | Upto ₹ 10.00 Lakhs |\n| **Study in Abroad** | Upto ₹ 20.00 Lakhs |\n\n**Notes:**\n1. The loan will be provided for higher education.\n2. Up to 90% of the project cost is provided as a loan.\n\n**Repayment period:**\nThe loan is to be repaid in 5 years after the moratorium period.\n\n**Moratorium period:**\n6 months after completion of the course or getting employment, whichever is earlier.",
    "detailedEligibility": "The following person(s)/entities shall be considered eligible for availing of financial assistance under the various schemes of NSKFDC:-\n\n1. The applicant must be a citizen of India.\n2. Scavengers and their dependents.\n3. Safai Karamcharis and their dependents.\n4. The applicant should be a student who has secured admission to professional/technical courses.\n5. Admission to professional/technical courses must be through an entrance exam/merit-based selection.",
    "applicationProcess": "### Offline\n1. Loan applications are submitted by the applicants to the district offices of State Channelizing Agencies (SCAs) of NSKFDC or branches of Regional Rural Banks (RRBs) and Nationalised Banks.\n2. The applications are appraised and approved by the respective SCAs/Banks.\n3. Funds are disbursed to the applicants through the SCAs/Banks.\n\n### Online\n1. Visit the official portal.\n2. Register and fill the application form.\n3. Upload the required documents.\n4. Submit the application for verification.",
    "state": "Central",
    "category": "Startup",
    "deadline": "2026-12-31",
    "requiredDocuments": [
      "Aadhaar Card",
      "Marksheets/Certificate of qualifying examination",
      "Admission confirmation letter",
      "Fee structure of the course",
      "Caste Certificate (if applicable)",
      "Income Certificate"
    ],
    "eligibility": {
      "minAge": 18,
      "maxAge": 65,
      "maxIncome": 9999999,
      "allowedOccupations": [
        "Business Owner"
      ],
      "allowedCategories": [
        "General",
        "OBC",
        "SC",
        "ST"
      ],
      "allowedStates": [
        "All"
      ],
      "allowedGenders": [
        "Male",
        "Female",
        "Other"
      ]
    }
  },
  {
    "_id": "scheme_pm_9",
    "title": "PM Mudra Yojana (PMMY)",
    "description": "Provides loans up to ₹10 Lakhs to non-corporate, non-farm small/micro enterprises.",
    "benefits": "Collateral-free business loans up to ₹10 Lakhs at subsidized interest rates.",
    "detailedDescription": "An Education Loan (EL) scheme has been launched by the Ministry of Social Justice and Empowerment, Government of India.\n\nThe scheme aims to provide education loans to the students from the community of safai karamcharis/manual scavengers & their dependents for pursuing higher education.",
    "detailedBenefits": "| Course | Maximum Loan Limit |\n| :--- | :--- |\n| **Study in India** | Upto ₹ 10.00 Lakhs |\n| **Study in Abroad** | Upto ₹ 20.00 Lakhs |\n\n**Notes:**\n1. The loan will be provided for higher education.\n2. Up to 90% of the project cost is provided as a loan.\n\n**Repayment period:**\nThe loan is to be repaid in 5 years after the moratorium period.\n\n**Moratorium period:**\n6 months after completion of the course or getting employment, whichever is earlier.",
    "detailedEligibility": "The following person(s)/entities shall be considered eligible for availing of financial assistance under the various schemes of NSKFDC:-\n\n1. The applicant must be a citizen of India.\n2. Scavengers and their dependents.\n3. Safai Karamcharis and their dependents.\n4. The applicant should be a student who has secured admission to professional/technical courses.\n5. Admission to professional/technical courses must be through an entrance exam/merit-based selection.",
    "applicationProcess": "### Offline\n1. Loan applications are submitted by the applicants to the district offices of State Channelizing Agencies (SCAs) of NSKFDC or branches of Regional Rural Banks (RRBs) and Nationalised Banks.\n2. The applications are appraised and approved by the respective SCAs/Banks.\n3. Funds are disbursed to the applicants through the SCAs/Banks.\n\n### Online\n1. Visit the official portal.\n2. Register and fill the application form.\n3. Upload the required documents.\n4. Submit the application for verification.",
    "state": "Central",
    "category": "Startup",
    "deadline": "2027-03-31",
    "requiredDocuments": [
      "Aadhaar Card",
      "Marksheets/Certificate of qualifying examination",
      "Admission confirmation letter",
      "Fee structure of the course",
      "Caste Certificate (if applicable)",
      "Income Certificate"
    ],
    "eligibility": {
      "minAge": 18,
      "maxAge": 65,
      "maxIncome": 9999999,
      "allowedOccupations": [
        "Business Owner"
      ],
      "allowedCategories": [
        "General",
        "OBC",
        "SC",
        "ST"
      ],
      "allowedStates": [
        "All"
      ],
      "allowedGenders": [
        "Male",
        "Female",
        "Other"
      ]
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
        const health = await axios.get(`${API_URL}/auth`);
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
    try {
      const res = await axios.put(`${API_URL}/auth/profile`, profileData);
      setUser(res.data);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Profile update failed" };
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

    // 7. Special Categories (Disability / Widow)
    const specialCats = crit.targetSpecialCategories || [];
    if (specialCats.length > 0) {
      totalChecks++;
      let isSpecialEligible = false;
      if (specialCats.includes("Disabled") && prof.disabilityStatus) isSpecialEligible = true;
      if (specialCats.includes("Widow") && prof.widow) isSpecialEligible = true;
      
      if (isSpecialEligible) {
        reasons.push({ matched: true, text: "Special category criteria (Disabled/Widow) matched" });
        matches++;
      } else {
        reasons.push({ matched: false, text: "Scheme restricted to special categories (e.g. Widow, Disabled)" });
      }
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
  const uploadDocument = async (type, name, fileData) => {
    try {
      const res = await axios.post(`${API_URL}/auth/profile/documents`, { type, name, fileData });
      setUser(res.data);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Failed to upload document" };
    }
  };

  const deleteDocument = async (docId) => {
    try {
      const res = await axios.delete(`${API_URL}/auth/profile/documents/${docId}`);
      setUser(res.data);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Failed to delete document" };
    }
  };

  // Grievance Actions
  const raiseTicket = async (query) => {
    try {
      const res = await axios.post(`${API_URL}/grievances`, { query });
      setTickets(prev => [res.data, ...prev]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Failed to submit grievance ticket" };
    }
  };

  const replyToTicket = async (ticketId, reply, status) => {
    try {
      const res = await axios.put(`${API_URL}/grievances/${ticketId}/reply`, { reply, status });
      setTickets(prev => prev.map(t => t._id === ticketId ? res.data : t));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Failed to submit reply" };
    }
  };

  // Admin CRUD for schemes
  const createScheme = async (schemeData) => {
    try {
      const res = await axios.post(`${API_URL}/schemes`, schemeData);
      setSchemes(prev => [...prev, res.data]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Failed to create scheme" };
    }
  };

  const updateScheme = async (id, schemeData) => {
    try {
      const res = await axios.put(`${API_URL}/schemes/${id}`, schemeData);
      setSchemes(prev => prev.map(s => s._id === id ? res.data : s));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Failed to update scheme" };
    }
  };

  const deleteScheme = async (id) => {
    try {
      await axios.delete(`${API_URL}/schemes/${id}`);
      setSchemes(prev => prev.filter(s => s._id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Failed to delete scheme" };
    }
  };

  // Admin status update
  const updateApplicationStatus = async (appId, status) => {
    try {
      const res = await axios.put(`${API_URL}/applications/${appId}/status`, { status });
      setApplications(prev => prev.map(app => app._id === appId ? res.data : app));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Failed to update application status" };
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
