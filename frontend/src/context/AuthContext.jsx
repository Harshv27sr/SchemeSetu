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
    "detailedDescription": "The Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector scheme with 100% funding from Government of India. The scheme aims to supplement the financial needs of the Small and Marginal Farmers (SMFs) in procuring various inputs to ensure proper crop health and appropriate yields, commensurate with the anticipated farm income at the end of each crop cycle. This would also protect them from falling in the clutches of moneylenders for meeting such expenses and ensure their continuance in the farming activities.",
    "detailedBenefits": "Under the scheme an income support of ₹6,000/- per year in three equal installments will be provided to small and marginal farmer families having combined land holding/ownership of upto 2 hectares.\n\n| Installment | Amount | Disbursement Period |\n| --- | --- | --- |\n| 1st | ₹2,000 | April - July |\n| 2nd | ₹2,000 | August - November |\n| 3rd | ₹2,000 | December - March |\n\nThe fund will be directly transferred to the bank accounts of the beneficiaries.",
    "detailedEligibility": "1. The scheme is available to all farmer families across the country irrespective of the size of their landholdings.\n2. The family should own cultivable land as per the land records of the concerned State/UT.\n3. **Exclusions**: Institutional Landholders, farmer families holding constitutional posts, former and present Ministers/State Ministers, former/present Members of LokSabha/ RajyaSabha/ State Legislative Assemblies/ State Legislative Councils, former and present Mayors of Municipal Corporations, former and present Chairpersons of District Panchayats are not eligible.\n4. All serving or retired officers and employees of Central/ State Government Ministries/Offices/Departments and its field units Central or State PSEs and Attached offices /Autonomous Institutions under Government as well as regular employees of the Local Bodies (Excluding Multi Tasking Staff /Class IV/Group D employees) are excluded.",
    "applicationProcess": "### Online Application\n1. Visit the official PM-KISAN portal (pmkisan.gov.in).\n2. Click on 'New Farmer Registration' in the Farmers Corner.\n3. Enter your Aadhaar number and fill the registration form.\n4. Upload the required land documents.\n5. Submit for verification by State Nodal Officers.\n\n### Offline Application\n1. Farmers can approach the local patwari/revenue officer/Nodal Officer (PM-Kisan) nominated by the State Government.\n2. The Common Service Centres (CSCs) have also been authorized to do registration of the farmers for the Scheme upon payment of fees.",
    "state": "Central",
    "category": "All",
    "deadline": "2026-08-15",
    "requiredDocuments": [
      "Aadhaar Card",
      "Income Certificate",
      "Land Holding Certificate",
      "Bank Passbook"
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
    "detailedDescription": "The objective of the scheme is to appreciably increase the Gross Enrolment Ratio of SC students in higher education with a focus on those from the poorest households, by providing financial assistance at post-matriculation or post-secondary stage to enable them to complete their education. This is a Centrally Sponsored Scheme and implemented through State Government and UT administration.",
    "detailedBenefits": "The scheme provides for 100% non-refundable fees reimbursement and a monthly maintenance allowance.\n\n| Course Group | Maintenance Allowance (Hostellers) | Maintenance Allowance (Day Scholars) |\n| --- | --- | --- |\n| Group I (Degree/PG professional courses) | ₹1,200 | ₹550 |\n| Group II (Other professional courses) | ₹820 | ₹530 |\n| Group III (Graduate/PG courses not covered above) | ₹570 | ₹300 |\n| Group IV (All post-matriculation non-degree courses) | ₹380 | ₹230 |",
    "detailedEligibility": "1. The scholarships are open to nationals of India.\n2. These scholarships will be given for the study of all recognized post-matriculation or post-secondary courses pursued in recognized institutions.\n3. Students who, after failing or passing the under graduate/post-graduate examinations in Arts/Science/Commerce join any recognized professional or Technical certificate/diploma/degree courses will be awarded scholarships if otherwise eligible.\n4. Students who after failing or passing the under graduate/post-graduate examinations in Arts/Science/Commerce join any recognized professional or Technical certificate/diploma/degree courses will be awarded scholarships if otherwise eligible.\n5. Income ceiling: Scholarships will be paid to the students whose parents/guardians' income from all sources does not exceed ₹2,50,000 per annum.",
    "applicationProcess": "### Application Steps\n1. Registration on the National Scholarship Portal (NSP).\n2. Login to the NSP using the credentials.\n3. Fill in the application form accurately.\n4. Upload the necessary documents such as Caste Certificate, Income Certificate, Marksheets, etc.\n5. Submit the application.\n6. The application is then verified at the Institute level, followed by District/State level verification.",
    "state": "Central",
    "category": "SC/ST",
    "deadline": "2026-07-31",
    "requiredDocuments": [
      "Aadhaar Card",
      "Caste Certificate",
      "Income Certificate",
      "Marksheet of last qualifying exam",
      "Fee Receipt"
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
    "detailedDescription": "To achieve the objective of 'Housing for All', the Government of India launched the Pradhan Mantri Awas Yojana-Gramin (PMAY-G). The scheme aims at providing a pucca house, with basic amenities, to all houseless householder and those households living in kutcha and dilapidated house. The minimum size of the house is prescribed at 25 sq.mt with a hygienic cooking space.",
    "detailedBenefits": "1. **Financial Assistance**: ₹1.20 lakh in plain areas and ₹1.30 lakh in hilly states, difficult areas, and IAP districts.\n2. **MGNREGS Integration**: Beneficiary is entitled to 90.95 person days of unskilled labour from MGNREGS.\n3. **Sanitation**: Assistance of ₹12,000 for construction of toilets through Swachh Bharat Mission-Gramin (SBM-G).\n4. **Loan Facility**: Beneficiaries are facilitated to avail loans up to ₹70,000 from financial institutions if they wish.",
    "detailedEligibility": "1. Deprivation scores in the Socio-Economic and Caste Census (SECC) 2011 data.\n2. Households without shelter.\n3. Destitute / living on alms.\n4. Manual scavengers.\n5. Primitive Tribal Groups.\n6. Legally released bonded labour.\n7. Households with zero, one, or two room kutcha houses with kutcha roof.",
    "applicationProcess": "### Application Steps\n1. Beneficiaries are identified based on housing deprivation parameters in SECC 2011 data.\n2. The Gram Sabha verifies the list of eligible beneficiaries.\n3. An appellate process is available to add eligible households left out of the SECC data.\n4. Selected beneficiaries register via the AwaasApp or through the Gram Panchayat.\n5. Geo-tagged photographs of the existing dwelling and the proposed site are uploaded.\n6. Funds are transferred in installments directly to the beneficiary's bank account after verification of construction stages.",
    "state": "Central",
    "category": "All",
    "deadline": "2026-12-31",
    "requiredDocuments": [
      "Aadhaar Card",
      "Income Certificate",
      "Passport Photo",
      "Bank Account Details",
      "Swachh Bharat Mission (SBM) number"
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
    "detailedDescription": "The Lado Protsahan Yojana is a flagship scheme by the State Government of Rajasthan aimed at addressing the declining child sex ratio and promoting the birth and education of the girl child. The scheme provides financial incentives to families to encourage them to educate their daughters and delay their marriages until the legal age.",
    "detailedBenefits": "A total financial incentive of ₹1,00,000 is provided to the girl child in stages:\n\n| Milestone | Amount |\n| --- | --- |\n| At birth | ₹2,500 |\n| On completing 1 year with full immunization | ₹2,500 |\n| On admission to Class I | ₹4,000 |\n| On admission to Class VI | ₹5,000 |\n| On admission to Class X | ₹11,000 |\n| On admission to Class XII | ₹25,000 |\n| On attaining 21 years of age | ₹50,000 |",
    "detailedEligibility": "1. Girls born in the state of Rajasthan after the scheme's notification date.\n2. Parents must be permanent residents of Rajasthan.\n3. The family's annual income should be less than ₹2,00,000.\n4. Maximum of two girl children per family can benefit from the scheme.\n5. The girl must be enrolled in an Anganwadi centre or recognized school.",
    "applicationProcess": "### Application Steps\n1. Parents can apply at the nearest Anganwadi Centre, E-Mitra center, or Gram Panchayat office.\n2. Submit the prescribed application form along with the birth certificate and other required documents.\n3. Registration must be done within one year of the girl's birth for the first installment.\n4. Subsequent claims must be submitted upon reaching the specified educational milestones.\n5. Funds are transferred via Direct Benefit Transfer (DBT) to the bank account of the girl or her mother.",
    "state": "Rajasthan",
    "category": "All",
    "deadline": "2026-09-30",
    "requiredDocuments": [
      "Aadhaar Card",
      "Income Certificate",
      "Caste Certificate",
      "Birth Certificate of Girl Child",
      "Mother's Bank Account Details"
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
    "detailedDescription": "Atal Pension Yojana (APY) addresses the old-age income security of the working poor and focuses on encouraging and enabling them to save for their retirement. To make the pension scheme more attractive, the Government guarantees a minimum monthly pension for the subscribers.",
    "detailedBenefits": "1. Guaranteed minimum monthly pension ranging from ₹1,000 to ₹5,000 upon attaining the age of 60 years.\n2. In case of the subscriber's death, the spouse is guaranteed the same pension for life.\n3. Upon the death of both the subscriber and the spouse, the accumulated pension wealth is returned to the nominee.\n4. Tax benefits are available on contributions under Section 80CCD of the Income Tax Act.",
    "detailedEligibility": "1. Must be a citizen of India.\n2. Age should be between 18 and 40 years.\n3. Should have a valid savings bank account or post office savings account.\n4. Should not be an income taxpayer (effective from October 1, 2022).\n5. Should not be a member of any statutory social security scheme (e.g., EPF, NPS).",
    "applicationProcess": "### Application Steps\n1. Approach the bank branch or post office where you have a savings account.\n2. Fill up the APY registration form and provide your Aadhaar number and mobile number.\n3. Choose the desired monthly pension amount (₹1,000 to ₹5,000).\n4. Ensure sufficient balance in the savings account for the monthly/quarterly/half-yearly auto-debit of contribution.\n5. Upon successful registration, a Permanent Retirement Account Number (PRAN) is issued.",
    "state": "Central",
    "category": "All",
    "deadline": "2026-11-30",
    "requiredDocuments": [
      "Aadhaar Card",
      "Savings Bank Account Details",
      "Nominee Details"
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
    "detailedDescription": "The Indira Gandhi National Widow Pension Scheme (IGNWPS) under the National Social Assistance Programme (NSAP) provides financial assistance to widows living below the poverty line. The scheme aims to provide social protection to vulnerable widows and ensure they have a regular source of income to meet their basic needs.",
    "detailedBenefits": "1. **Central Contribution**: The Government of India provides ₹300 per month.\n2. **State Contribution**: State governments top up the central contribution. The total pension amount varies by state, often reaching ₹1,500 to ₹3,000 per month (e.g., ₹3,000 in Delhi/Haryana).\n3. Funds are disbursed directly to the beneficiary's bank or post office account via Direct Benefit Transfer (DBT).",
    "detailedEligibility": "1. The applicant must be a widow.\n2. Age must be between 40 and 79 years.\n3. The applicant must belong to a Below Poverty Line (BPL) household as per criteria prescribed by the Government of India.\n4. She must be a destitute with no regular source of financial support from family members.",
    "applicationProcess": "### Application Steps\n1. Obtain the application form from the Gram Panchayat, Municipality, or local block development office.\n2. Fill in the details and attach a passport-size photograph.\n3. Attach the required documents including the husband's death certificate, BPL certificate, and age proof.\n4. Submit the form to the Social Welfare Department or local municipal office.\n5. The application is verified by field officers, and if approved, the pension is sanctioned.",
    "state": "Central",
    "category": "Widow",
    "deadline": "2026-12-31",
    "requiredDocuments": [
      "Aadhaar Card",
      "Death Certificate of Husband",
      "Income Certificate (BPL Proof)",
      "Age Proof",
      "Bank Account Details"
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
    "detailedDescription": "The Shramik Kalyan Yojana is designed to safeguard the interests of workers in the unorganized sector. It provides a safety net encompassing health insurance, financial assistance for purchasing essential tools, and scholarships for the children of registered workers. The scheme aims to improve the living and working conditions of daily wagers and informal sector labourers.",
    "detailedBenefits": "1. **Health Insurance**: Free cashless medical treatment up to ₹5 Lakhs per family per year in empanelled hospitals.\n2. **Tool Kit Grant**: A one-time financial grant of ₹10,000 to purchase tools and equipment necessary for their trade.\n3. **Maternity Benefit**: Financial assistance of ₹15,000 for female workers upon the birth of a child (up to two deliveries).\n4. **Accidental Insurance**: Coverage of ₹2 Lakhs in case of accidental death and ₹1 Lakh for permanent disability.",
    "detailedEligibility": "1. The applicant must be a registered worker in the unorganized sector (e.g., construction worker, street vendor, domestic worker).\n2. Must possess a valid e-Shram card.\n3. Age should be between 18 and 60 years.\n4. The family's annual income should not exceed ₹1,50,000.\n5. Should not be a beneficiary of similar benefits under ESIC or EPFO.",
    "applicationProcess": "### Application Steps\n1. Register on the e-Shram portal to obtain a 12-digit UAN card if not already registered.\n2. Visit the nearest Common Service Centre (CSC) or State Labour Department office.\n3. Fill out the Shramik Kalyan Yojana application form.\n4. Submit the form along with a copy of the e-Shram card, Aadhaar card, and bank account details.\n5. Upon verification, the benefits are activated and grants are transferred via DBT.",
    "state": "Central",
    "category": "Labour",
    "deadline": "2026-10-31",
    "requiredDocuments": [
      "Aadhaar Card",
      "e-Shram Card",
      "Income Certificate",
      "Bank Account Passbook"
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
    "detailedDescription": "The Indira Gandhi National Disability Pension Scheme (IGNDPS) and complementary state-level Divyangjan pension schemes provide monthly financial assistance to persons with severe or multiple disabilities. The objective is to provide a social security net to empower them and help meet their daily living and medical expenses.",
    "detailedBenefits": "1. **Monthly Pension**: Varies by state, ranging from ₹1,000 to ₹3,000 per month (e.g., ₹2,500 in many states). The central government contributes ₹300, and the rest is borne by the state.\n2. **Free Transport**: Concessional or free travel passes for state transport buses and Indian Railways.\n3. **Assistive Devices**: Eligibility for free or subsidized aids and appliances like wheelchairs, hearing aids, and artificial limbs under ADIP scheme.",
    "detailedEligibility": "1. The applicant must have a benchmark disability of 40% or more (some states require 80% for IGNDPS, but state schemes cover 40%+).\n2. Must hold a valid disability certificate issued by a competent medical authority or a UDID card.\n3. Must belong to a Below Poverty Line (BPL) household or meet the state-specific income criteria (e.g., annual income below ₹2,50,000).\n4. Minimum age requirement varies (usually 18+ for central scheme, but many states cover minors as well).",
    "applicationProcess": "### Application Steps\n1. Obtain a Unique Disability ID (UDID) card by registering on the Swavlamban Card portal.\n2. Apply online through the respective State Government's social security or pension portal (e.g., SSP Uttar Pradesh, e-District portals).\n3. Fill in the application form and upload the UDID card, Aadhaar, and income proof.\n4. Alternatively, submit the physical form to the District Social Welfare Officer or Block Development Officer.\n5. The pension amount is credited monthly via DBT.",
    "state": "Central",
    "category": "Disabled",
    "deadline": "2027-03-31",
    "requiredDocuments": [
      "Aadhaar Card",
      "UDID Card (Disability Certificate)",
      "Income Certificate",
      "Passport Photo",
      "Bank Passbook"
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
    "detailedDescription": "The Startup India Seed Fund Scheme (SISFS) aims to provide financial assistance to startups for proof of concept, prototype development, product trials, market entry, and commercialization. This enables these startups to graduate to a level where they will be able to raise investments from angel investors or venture capitalists, or seek loans from commercial banks or financial institutions.",
    "detailedBenefits": "Startups can receive support through selected incubators:\n1. **Up to ₹20 Lakhs** as a grant for validation of Proof of Concept, or prototype development, or product trials.\n2. **Up to ₹50 Lakhs** of investment for market entry, commercialization, or scaling up through convertible debentures or debt or debt-linked instruments.",
    "detailedEligibility": "1. A startup, recognized by DPIIT, incorporated not more than 2 years ago at the time of application.\n2. The startup must have a business idea to develop a product or a service with a market fit, viable commercialization, and scope of scaling.\n3. The startup should be using technology in its core product or service, or business model, or distribution model, or methodology to solve the problem being targeted.\n4. Preference is given to startups innovating in sectors such as social impact, waste management, water management, financial inclusion, education, agriculture, food processing, biotechnology, healthcare, energy, mobility, defence, space, railways, oil and gas, textiles, etc.\n5. The startup should not have received more than ₹10 lakh of monetary support under any other Central or State Government scheme.",
    "applicationProcess": "### Application Steps\n1. Ensure the startup is registered and recognized by DPIIT on the Startup India portal.\n2. Visit the official SISFS portal (seedfund.startupindia.gov.in).\n3. Login using Startup India credentials.\n4. Fill out the application form specifying the funding requirement and purpose.\n5. Select up to 3 incubators from the provided list based on preference.\n6. The incubators evaluate the application and present it to the Incubator Seed Management Committee (ISMC) for approval.",
    "state": "Central",
    "category": "Startup",
    "deadline": "2026-12-31",
    "requiredDocuments": [
      "Aadhaar Card",
      "DPIIT Recognition Certificate",
      "Project Report / Pitch Deck",
      "Certificate of Incorporation / Registration"
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
    "detailedDescription": "Pradhan Mantri Mudra Yojana (PMMY) is a scheme launched by the Hon'ble Prime Minister to provide loans up to ₹10 Lakhs to non-corporate, non-farm small/micro enterprises. These loans are classified as MUDRA loans under PMMY. These loans are given by Commercial Banks, RRBs, Small Finance Banks, MFIs, and NBFCs.",
    "detailedBenefits": "Mudra loans are divided into three categories to signify the stage of growth and funding needs of the beneficiary micro unit:\n1. **Shishu**: Covering loans up to ₹50,000. Focused on entrepreneurs who are either in the very early stage or need small capital.\n2. **Kishor**: Covering loans above ₹50,000 and up to ₹5,00,000.\n3. **Tarun**: Covering loans above ₹5,00,000 and up to ₹10,00,000.\n4. Collateral-free loans with reasonable interest rates (rates vary by lending institution).",
    "detailedEligibility": "1. Any Indian Citizen who has a business plan for a non-farm sector income-generating activity such as manufacturing, processing, trading, or service sector.\n2. The credit need should be less than ₹10 Lakhs.\n3. The applicant should not be a defaulter to any bank or financial institution.\n4. The applicant should possess the necessary skills/experience/knowledge to undertake the proposed activity.",
    "applicationProcess": "### Application Steps\n1. Prepare a business plan outlining the nature of the business and fund requirements.\n2. Approach any commercial bank, RRB, or MFI that provides Mudra loans.\n3. Fill out the loan application form specific to the category (Shishu, Kishor, or Tarun).\n4. Submit necessary documents such as identity proof, address proof, passport size photographs, and proof of business identity/address.\n5. Wait for the bank to process and approve the loan.\n6. Alternatively, apply online via the Udyamimitra portal (udyamimitra.in).",
    "state": "Central",
    "category": "Startup",
    "deadline": "2027-03-31",
    "requiredDocuments": [
      "Aadhaar Card",
      "Business Plan",
      "Bank Statement",
      "Proof of Identity and Address",
      "Quotations for machinery/items to be purchased"
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
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'en');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [schemes, setSchemes] = useState(DEFAULT_SCHEMES);
  const [applications, setApplications] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
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

    const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    setIsAuthenticated(true);
  }
}, []);

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

  // Load schemes + Restore session on page load (runs ONCE)
  useEffect(() => {
    const init = async () => {
      // 1. Load schemes (always)
      try {
        const health = await axios.get(`${API_URL}/auth/health`);
        if (health.status === 200) {
          setApiActive(true);
          const res = await axios.get(`${API_URL}/schemes`);
          setSchemes(res.data);
        }
      } catch (err) {
        console.error("Backend connection error", err);
        setApiActive(false);
      }

      // 2. Restore session if token exists
      const savedToken = localStorage.getItem('token');
      if (!savedToken) {
        setLoading(false);
        return;
      }

      try {
        const config = { headers: { Authorization: `Bearer ${savedToken}` } };
        const profileRes = await axios.get(`${API_URL}/auth/profile`, config);
        // Token is valid — restore session
        setUser(profileRes.data);
        setToken(savedToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;

        try {
          const appRes = await axios.get(`${API_URL}/applications`, config);
          setApplications(appRes.data);
        } catch (_) {}

        try {
          const role = profileRes.data.role;
          const ticketUrl = role === 'Admin'
            ? `${API_URL}/grievances/all`
            : `${API_URL}/grievances`;
          const ticketRes = await axios.get(ticketUrl, config);
          setTickets(ticketRes.data);
        } catch (_) {}

      } catch (err) {
        // Only logout on explicit 401 (invalid/expired token)
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
        // For network errors, keep user logged in
      } finally {
        setLoading(false);
      }
    };

    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Translate helper function
  const t = (key) => {
    return translations[language][key] || key;
  };

  // Sign In
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      const newToken = res.data.token;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(res.data.user);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || "Login failed" };
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
