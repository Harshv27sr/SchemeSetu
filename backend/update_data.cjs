const fs = require('fs');

const schemesData = [
  {
    title: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    description: "Income support scheme for all landholding farmer families across the country to enable them to take care of agricultural expenses.",
    benefits: "Financial benefit of ₹6,000 per year, paid in three equal installments of ₹2,000 directly into bank accounts.",
    detailedDescription: "The Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector scheme with 100% funding from Government of India. The scheme aims to supplement the financial needs of the Small and Marginal Farmers (SMFs) in procuring various inputs to ensure proper crop health and appropriate yields, commensurate with the anticipated farm income at the end of each crop cycle. This would also protect them from falling in the clutches of moneylenders for meeting such expenses and ensure their continuance in the farming activities.",
    detailedBenefits: "Under the scheme an income support of ₹6,000/- per year in three equal installments will be provided to small and marginal farmer families having combined land holding/ownership of upto 2 hectares.\n\n| Installment | Amount | Disbursement Period |\n| --- | --- | --- |\n| 1st | ₹2,000 | April - July |\n| 2nd | ₹2,000 | August - November |\n| 3rd | ₹2,000 | December - March |\n\nThe fund will be directly transferred to the bank accounts of the beneficiaries.",
    detailedEligibility: "1. The scheme is available to all farmer families across the country irrespective of the size of their landholdings.\n2. The family should own cultivable land as per the land records of the concerned State/UT.\n3. **Exclusions**: Institutional Landholders, farmer families holding constitutional posts, former and present Ministers/State Ministers, former/present Members of LokSabha/ RajyaSabha/ State Legislative Assemblies/ State Legislative Councils, former and present Mayors of Municipal Corporations, former and present Chairpersons of District Panchayats are not eligible.\n4. All serving or retired officers and employees of Central/ State Government Ministries/Offices/Departments and its field units Central or State PSEs and Attached offices /Autonomous Institutions under Government as well as regular employees of the Local Bodies (Excluding Multi Tasking Staff /Class IV/Group D employees) are excluded.",
    applicationProcess: "### Online Application\n1. Visit the official PM-KISAN portal (pmkisan.gov.in).\n2. Click on 'New Farmer Registration' in the Farmers Corner.\n3. Enter your Aadhaar number and fill the registration form.\n4. Upload the required land documents.\n5. Submit for verification by State Nodal Officers.\n\n### Offline Application\n1. Farmers can approach the local patwari/revenue officer/Nodal Officer (PM-Kisan) nominated by the State Government.\n2. The Common Service Centres (CSCs) have also been authorized to do registration of the farmers for the Scheme upon payment of fees.",
    state: "Central",
    category: "All",
    deadline: "2026-08-15",
    requiredDocuments: ["Aadhaar Card", "Income Certificate", "Land Holding Certificate", "Bank Passbook"],
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
    title: "Post Matric Scholarship Scheme for SC/ST Students",
    description: "Financial assistance to students belonging to scheduled castes and tribes studying at post-matriculation or post-secondary stages.",
    benefits: "100% compulsory non-refundable fees reimbursement and monthly maintenance allowances up to ₹1,200.",
    detailedDescription: "The objective of the scheme is to appreciably increase the Gross Enrolment Ratio of SC students in higher education with a focus on those from the poorest households, by providing financial assistance at post-matriculation or post-secondary stage to enable them to complete their education. This is a Centrally Sponsored Scheme and implemented through State Government and UT administration.",
    detailedBenefits: "The scheme provides for 100% non-refundable fees reimbursement and a monthly maintenance allowance.\n\n| Course Group | Maintenance Allowance (Hostellers) | Maintenance Allowance (Day Scholars) |\n| --- | --- | --- |\n| Group I (Degree/PG professional courses) | ₹1,200 | ₹550 |\n| Group II (Other professional courses) | ₹820 | ₹530 |\n| Group III (Graduate/PG courses not covered above) | ₹570 | ₹300 |\n| Group IV (All post-matriculation non-degree courses) | ₹380 | ₹230 |",
    detailedEligibility: "1. The scholarships are open to nationals of India.\n2. These scholarships will be given for the study of all recognized post-matriculation or post-secondary courses pursued in recognized institutions.\n3. Students who, after failing or passing the under graduate/post-graduate examinations in Arts/Science/Commerce join any recognized professional or Technical certificate/diploma/degree courses will be awarded scholarships if otherwise eligible.\n4. Students who after failing or passing the under graduate/post-graduate examinations in Arts/Science/Commerce join any recognized professional or Technical certificate/diploma/degree courses will be awarded scholarships if otherwise eligible.\n5. Income ceiling: Scholarships will be paid to the students whose parents/guardians' income from all sources does not exceed ₹2,50,000 per annum.",
    applicationProcess: "### Application Steps\n1. Registration on the National Scholarship Portal (NSP).\n2. Login to the NSP using the credentials.\n3. Fill in the application form accurately.\n4. Upload the necessary documents such as Caste Certificate, Income Certificate, Marksheets, etc.\n5. Submit the application.\n6. The application is then verified at the Institute level, followed by District/State level verification.",
    state: "Central",
    category: "SC/ST",
    deadline: "2026-07-31",
    requiredDocuments: ["Aadhaar Card", "Caste Certificate", "Income Certificate", "Marksheet of last qualifying exam", "Fee Receipt"],
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
    title: "Pradhan Mantri Awas Yojana (PMAY-Gramin)",
    description: "Housing for All mission aiming to provide pucka houses with basic amenities to all homeless and households living in dilapidated houses.",
    benefits: "Financial assistance of ₹1.2 Lakhs in plains and ₹1.3 Lakhs in hilly/difficult areas for house construction.",
    detailedDescription: "To achieve the objective of 'Housing for All', the Government of India launched the Pradhan Mantri Awas Yojana-Gramin (PMAY-G). The scheme aims at providing a pucca house, with basic amenities, to all houseless householder and those households living in kutcha and dilapidated house. The minimum size of the house is prescribed at 25 sq.mt with a hygienic cooking space.",
    detailedBenefits: "1. **Financial Assistance**: ₹1.20 lakh in plain areas and ₹1.30 lakh in hilly states, difficult areas, and IAP districts.\n2. **MGNREGS Integration**: Beneficiary is entitled to 90.95 person days of unskilled labour from MGNREGS.\n3. **Sanitation**: Assistance of ₹12,000 for construction of toilets through Swachh Bharat Mission-Gramin (SBM-G).\n4. **Loan Facility**: Beneficiaries are facilitated to avail loans up to ₹70,000 from financial institutions if they wish.",
    detailedEligibility: "1. Deprivation scores in the Socio-Economic and Caste Census (SECC) 2011 data.\n2. Households without shelter.\n3. Destitute / living on alms.\n4. Manual scavengers.\n5. Primitive Tribal Groups.\n6. Legally released bonded labour.\n7. Households with zero, one, or two room kutcha houses with kutcha roof.",
    applicationProcess: "### Application Steps\n1. Beneficiaries are identified based on housing deprivation parameters in SECC 2011 data.\n2. The Gram Sabha verifies the list of eligible beneficiaries.\n3. An appellate process is available to add eligible households left out of the SECC data.\n4. Selected beneficiaries register via the AwaasApp or through the Gram Panchayat.\n5. Geo-tagged photographs of the existing dwelling and the proposed site are uploaded.\n6. Funds are transferred in installments directly to the beneficiary's bank account after verification of construction stages.",
    state: "Central",
    category: "All",
    deadline: "2026-12-31",
    requiredDocuments: ["Aadhaar Card", "Income Certificate", "Passport Photo", "Bank Account Details", "Swachh Bharat Mission (SBM) number"],
    eligibility: {
      minAge: 18,
      maxAge: 99,
      maxIncome: 600000,
      allowedOccupations: ["All"],
      allowedCategories: ["General", "OBC", "SC", "ST"],
      allowedStates: ["All"],
      allowedGenders: ["Male", "Female", "Other"]
    }
  },
  {
    title: "Lado Protsahan Yojana",
    description: "State-specific financial support program supporting the birth and education of girls in low-income families.",
    benefits: "Savings bond of ₹1 Lakh given to the girl child, with milestone cash payouts at standard school levels.",
    detailedDescription: "The Lado Protsahan Yojana is a flagship scheme by the State Government of Rajasthan aimed at addressing the declining child sex ratio and promoting the birth and education of the girl child. The scheme provides financial incentives to families to encourage them to educate their daughters and delay their marriages until the legal age.",
    detailedBenefits: "A total financial incentive of ₹1,00,000 is provided to the girl child in stages:\n\n| Milestone | Amount |\n| --- | --- |\n| At birth | ₹2,500 |\n| On completing 1 year with full immunization | ₹2,500 |\n| On admission to Class I | ₹4,000 |\n| On admission to Class VI | ₹5,000 |\n| On admission to Class X | ₹11,000 |\n| On admission to Class XII | ₹25,000 |\n| On attaining 21 years of age | ₹50,000 |",
    detailedEligibility: "1. Girls born in the state of Rajasthan after the scheme's notification date.\n2. Parents must be permanent residents of Rajasthan.\n3. The family's annual income should be less than ₹2,00,000.\n4. Maximum of two girl children per family can benefit from the scheme.\n5. The girl must be enrolled in an Anganwadi centre or recognized school.",
    applicationProcess: "### Application Steps\n1. Parents can apply at the nearest Anganwadi Centre, E-Mitra center, or Gram Panchayat office.\n2. Submit the prescribed application form along with the birth certificate and other required documents.\n3. Registration must be done within one year of the girl's birth for the first installment.\n4. Subsequent claims must be submitted upon reaching the specified educational milestones.\n5. Funds are transferred via Direct Benefit Transfer (DBT) to the bank account of the girl or her mother.",
    state: "Rajasthan",
    category: "All",
    deadline: "2026-09-30",
    requiredDocuments: ["Aadhaar Card", "Income Certificate", "Caste Certificate", "Birth Certificate of Girl Child", "Mother's Bank Account Details"],
    eligibility: {
      minAge: 0,
      maxAge: 21,
      maxIncome: 200000,
      allowedOccupations: ["All"],
      allowedCategories: ["General", "OBC", "SC", "ST"],
      allowedStates: ["Rajasthan"],
      allowedGenders: ["Female"]
    }
  },
  {
    title: "Atal Pension Yojana (APY)",
    description: "Pension scheme focused on the unorganized sector workers to provide post-retirement financial security.",
    benefits: "Guaranteed minimum pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000 or ₹5,000 per month after age 60 based on contribution.",
    detailedDescription: "Atal Pension Yojana (APY) addresses the old-age income security of the working poor and focuses on encouraging and enabling them to save for their retirement. To make the pension scheme more attractive, the Government guarantees a minimum monthly pension for the subscribers.",
    detailedBenefits: "1. Guaranteed minimum monthly pension ranging from ₹1,000 to ₹5,000 upon attaining the age of 60 years.\n2. In case of the subscriber's death, the spouse is guaranteed the same pension for life.\n3. Upon the death of both the subscriber and the spouse, the accumulated pension wealth is returned to the nominee.\n4. Tax benefits are available on contributions under Section 80CCD of the Income Tax Act.",
    detailedEligibility: "1. Must be a citizen of India.\n2. Age should be between 18 and 40 years.\n3. Should have a valid savings bank account or post office savings account.\n4. Should not be an income taxpayer (effective from October 1, 2022).\n5. Should not be a member of any statutory social security scheme (e.g., EPF, NPS).",
    applicationProcess: "### Application Steps\n1. Approach the bank branch or post office where you have a savings account.\n2. Fill up the APY registration form and provide your Aadhaar number and mobile number.\n3. Choose the desired monthly pension amount (₹1,000 to ₹5,000).\n4. Ensure sufficient balance in the savings account for the monthly/quarterly/half-yearly auto-debit of contribution.\n5. Upon successful registration, a Permanent Retirement Account Number (PRAN) is issued.",
    state: "Central",
    category: "All",
    deadline: "2026-11-30",
    requiredDocuments: ["Aadhaar Card", "Savings Bank Account Details", "Nominee Details"],
    eligibility: {
      minAge: 18,
      maxAge: 40,
      maxIncome: 800000,
      allowedOccupations: ["All"],
      allowedCategories: ["General", "OBC", "SC", "ST"],
      allowedStates: ["All"],
      allowedGenders: ["Male", "Female", "Other"]
    }
  },
  {
    title: "National Widow Pension Scheme (NWPS)",
    description: "Financial assistance provided to widows to ensure a dignified life and cover basic living expenses.",
    benefits: "Monthly pension of ₹3,000 transferred directly to the beneficiary's bank account.",
    detailedDescription: "The Indira Gandhi National Widow Pension Scheme (IGNWPS) under the National Social Assistance Programme (NSAP) provides financial assistance to widows living below the poverty line. The scheme aims to provide social protection to vulnerable widows and ensure they have a regular source of income to meet their basic needs.",
    detailedBenefits: "1. **Central Contribution**: The Government of India provides ₹300 per month.\n2. **State Contribution**: State governments top up the central contribution. The total pension amount varies by state, often reaching ₹1,500 to ₹3,000 per month (e.g., ₹3,000 in Delhi/Haryana).\n3. Funds are disbursed directly to the beneficiary's bank or post office account via Direct Benefit Transfer (DBT).",
    detailedEligibility: "1. The applicant must be a widow.\n2. Age must be between 40 and 79 years.\n3. The applicant must belong to a Below Poverty Line (BPL) household as per criteria prescribed by the Government of India.\n4. She must be a destitute with no regular source of financial support from family members.",
    applicationProcess: "### Application Steps\n1. Obtain the application form from the Gram Panchayat, Municipality, or local block development office.\n2. Fill in the details and attach a passport-size photograph.\n3. Attach the required documents including the husband's death certificate, BPL certificate, and age proof.\n4. Submit the form to the Social Welfare Department or local municipal office.\n5. The application is verified by field officers, and if approved, the pension is sanctioned.",
    state: "Central",
    category: "Widow",
    deadline: "2026-12-31",
    requiredDocuments: ["Aadhaar Card", "Death Certificate of Husband", "Income Certificate (BPL Proof)", "Age Proof", "Bank Account Details"],
    eligibility: {
      minAge: 18,
      maxAge: 99,
      maxIncome: 200000,
      allowedOccupations: ["All"],
      allowedCategories: ["General", "OBC", "SC", "ST"],
      allowedStates: ["All"],
      allowedGenders: ["Female"],
      targetSpecialCategories: ["Widow"]
    }
  },
  {
    title: "Shramik Kalyan Yojana",
    description: "Comprehensive welfare scheme for unorganized sector labourers, providing health coverage and tool kits.",
    benefits: "Free health insurance up to ₹5 Lakhs and a one-time grant of ₹10,000 for purchasing occupational tools.",
    detailedDescription: "The Shramik Kalyan Yojana is designed to safeguard the interests of workers in the unorganized sector. It provides a safety net encompassing health insurance, financial assistance for purchasing essential tools, and scholarships for the children of registered workers. The scheme aims to improve the living and working conditions of daily wagers and informal sector labourers.",
    detailedBenefits: "1. **Health Insurance**: Free cashless medical treatment up to ₹5 Lakhs per family per year in empanelled hospitals.\n2. **Tool Kit Grant**: A one-time financial grant of ₹10,000 to purchase tools and equipment necessary for their trade.\n3. **Maternity Benefit**: Financial assistance of ₹15,000 for female workers upon the birth of a child (up to two deliveries).\n4. **Accidental Insurance**: Coverage of ₹2 Lakhs in case of accidental death and ₹1 Lakh for permanent disability.",
    detailedEligibility: "1. The applicant must be a registered worker in the unorganized sector (e.g., construction worker, street vendor, domestic worker).\n2. Must possess a valid e-Shram card.\n3. Age should be between 18 and 60 years.\n4. The family's annual income should not exceed ₹1,50,000.\n5. Should not be a beneficiary of similar benefits under ESIC or EPFO.",
    applicationProcess: "### Application Steps\n1. Register on the e-Shram portal to obtain a 12-digit UAN card if not already registered.\n2. Visit the nearest Common Service Centre (CSC) or State Labour Department office.\n3. Fill out the Shramik Kalyan Yojana application form.\n4. Submit the form along with a copy of the e-Shram card, Aadhaar card, and bank account details.\n5. Upon verification, the benefits are activated and grants are transferred via DBT.",
    state: "Central",
    category: "Labour",
    deadline: "2026-10-31",
    requiredDocuments: ["Aadhaar Card", "e-Shram Card", "Income Certificate", "Bank Account Passbook"],
    eligibility: {
      minAge: 18,
      maxAge: 60,
      maxIncome: 150000,
      allowedOccupations: ["Labourer", "Daily Wager"],
      allowedCategories: ["General", "OBC", "SC", "ST"],
      allowedStates: ["All"],
      allowedGenders: ["Male", "Female", "Other"]
    }
  },
  {
    title: "Divyangjan Pension Scheme",
    description: "Financial support for persons with disabilities (Divyangjan) to help them lead an independent life.",
    benefits: "Monthly pension of ₹2,500 and free bus/train passes.",
    detailedDescription: "The Indira Gandhi National Disability Pension Scheme (IGNDPS) and complementary state-level Divyangjan pension schemes provide monthly financial assistance to persons with severe or multiple disabilities. The objective is to provide a social security net to empower them and help meet their daily living and medical expenses.",
    detailedBenefits: "1. **Monthly Pension**: Varies by state, ranging from ₹1,000 to ₹3,000 per month (e.g., ₹2,500 in many states). The central government contributes ₹300, and the rest is borne by the state.\n2. **Free Transport**: Concessional or free travel passes for state transport buses and Indian Railways.\n3. **Assistive Devices**: Eligibility for free or subsidized aids and appliances like wheelchairs, hearing aids, and artificial limbs under ADIP scheme.",
    detailedEligibility: "1. The applicant must have a benchmark disability of 40% or more (some states require 80% for IGNDPS, but state schemes cover 40%+).\n2. Must hold a valid disability certificate issued by a competent medical authority or a UDID card.\n3. Must belong to a Below Poverty Line (BPL) household or meet the state-specific income criteria (e.g., annual income below ₹2,50,000).\n4. Minimum age requirement varies (usually 18+ for central scheme, but many states cover minors as well).",
    applicationProcess: "### Application Steps\n1. Obtain a Unique Disability ID (UDID) card by registering on the Swavlamban Card portal.\n2. Apply online through the respective State Government's social security or pension portal (e.g., SSP Uttar Pradesh, e-District portals).\n3. Fill in the application form and upload the UDID card, Aadhaar, and income proof.\n4. Alternatively, submit the physical form to the District Social Welfare Officer or Block Development Officer.\n5. The pension amount is credited monthly via DBT.",
    state: "Central",
    category: "Disabled",
    deadline: "2027-03-31",
    requiredDocuments: ["Aadhaar Card", "UDID Card (Disability Certificate)", "Income Certificate", "Passport Photo", "Bank Passbook"],
    eligibility: {
      minAge: 0,
      maxAge: 99,
      maxIncome: 250000,
      allowedOccupations: ["All"],
      allowedCategories: ["General", "OBC", "SC", "ST"],
      allowedStates: ["All"],
      allowedGenders: ["Male", "Female", "Other"],
      targetSpecialCategories: ["Disabled"]
    }
  },
  {
    title: "Startup India Seed Fund Scheme",
    description: "Provides financial assistance to startups for proof of concept, prototype development, product trials, market entry, and commercialization.",
    benefits: "Seed funding of up to ₹50 Lakhs for eligible early-stage startups.",
    detailedDescription: "The Startup India Seed Fund Scheme (SISFS) aims to provide financial assistance to startups for proof of concept, prototype development, product trials, market entry, and commercialization. This enables these startups to graduate to a level where they will be able to raise investments from angel investors or venture capitalists, or seek loans from commercial banks or financial institutions.",
    detailedBenefits: "Startups can receive support through selected incubators:\n1. **Up to ₹20 Lakhs** as a grant for validation of Proof of Concept, or prototype development, or product trials.\n2. **Up to ₹50 Lakhs** of investment for market entry, commercialization, or scaling up through convertible debentures or debt or debt-linked instruments.",
    detailedEligibility: "1. A startup, recognized by DPIIT, incorporated not more than 2 years ago at the time of application.\n2. The startup must have a business idea to develop a product or a service with a market fit, viable commercialization, and scope of scaling.\n3. The startup should be using technology in its core product or service, or business model, or distribution model, or methodology to solve the problem being targeted.\n4. Preference is given to startups innovating in sectors such as social impact, waste management, water management, financial inclusion, education, agriculture, food processing, biotechnology, healthcare, energy, mobility, defence, space, railways, oil and gas, textiles, etc.\n5. The startup should not have received more than ₹10 lakh of monetary support under any other Central or State Government scheme.",
    applicationProcess: "### Application Steps\n1. Ensure the startup is registered and recognized by DPIIT on the Startup India portal.\n2. Visit the official SISFS portal (seedfund.startupindia.gov.in).\n3. Login using Startup India credentials.\n4. Fill out the application form specifying the funding requirement and purpose.\n5. Select up to 3 incubators from the provided list based on preference.\n6. The incubators evaluate the application and present it to the Incubator Seed Management Committee (ISMC) for approval.",
    state: "Central",
    category: "Startup",
    deadline: "2026-12-31",
    requiredDocuments: ["Aadhaar Card", "DPIIT Recognition Certificate", "Project Report / Pitch Deck", "Certificate of Incorporation / Registration"],
    eligibility: {
      minAge: 18,
      maxAge: 65,
      maxIncome: 9999999,
      allowedOccupations: ["Business Owner"],
      allowedCategories: ["General", "OBC", "SC", "ST"],
      allowedStates: ["All"],
      allowedGenders: ["Male", "Female", "Other"]
    }
  },
  {
    title: "PM Mudra Yojana (PMMY)",
    description: "Provides loans up to ₹10 Lakhs to non-corporate, non-farm small/micro enterprises.",
    benefits: "Collateral-free business loans up to ₹10 Lakhs at subsidized interest rates.",
    detailedDescription: "Pradhan Mantri Mudra Yojana (PMMY) is a scheme launched by the Hon'ble Prime Minister to provide loans up to ₹10 Lakhs to non-corporate, non-farm small/micro enterprises. These loans are classified as MUDRA loans under PMMY. These loans are given by Commercial Banks, RRBs, Small Finance Banks, MFIs, and NBFCs.",
    detailedBenefits: "Mudra loans are divided into three categories to signify the stage of growth and funding needs of the beneficiary micro unit:\n1. **Shishu**: Covering loans up to ₹50,000. Focused on entrepreneurs who are either in the very early stage or need small capital.\n2. **Kishor**: Covering loans above ₹50,000 and up to ₹5,00,000.\n3. **Tarun**: Covering loans above ₹5,00,000 and up to ₹10,00,000.\n4. Collateral-free loans with reasonable interest rates (rates vary by lending institution).",
    detailedEligibility: "1. Any Indian Citizen who has a business plan for a non-farm sector income-generating activity such as manufacturing, processing, trading, or service sector.\n2. The credit need should be less than ₹10 Lakhs.\n3. The applicant should not be a defaulter to any bank or financial institution.\n4. The applicant should possess the necessary skills/experience/knowledge to undertake the proposed activity.",
    applicationProcess: "### Application Steps\n1. Prepare a business plan outlining the nature of the business and fund requirements.\n2. Approach any commercial bank, RRB, or MFI that provides Mudra loans.\n3. Fill out the loan application form specific to the category (Shishu, Kishor, or Tarun).\n4. Submit necessary documents such as identity proof, address proof, passport size photographs, and proof of business identity/address.\n5. Wait for the bank to process and approve the loan.\n6. Alternatively, apply online via the Udyamimitra portal (udyamimitra.in).",
    state: "Central",
    category: "Startup",
    deadline: "2027-03-31",
    requiredDocuments: ["Aadhaar Card", "Business Plan", "Bank Statement", "Proof of Identity and Address", "Quotations for machinery/items to be purchased"],
    eligibility: {
      minAge: 18,
      maxAge: 65,
      maxIncome: 9999999,
      allowedOccupations: ["Business Owner"],
      allowedCategories: ["General", "OBC", "SC", "ST"],
      allowedStates: ["All"],
      allowedGenders: ["Male", "Female", "Other"]
    }
  }
];

const updateSeedJs = () => {
    let seedContent = fs.readFileSync('./seed.js', 'utf8');
    const importRegex = /const schemesData = \[.*?\];/s;
    const replacement = 'const schemesData = ' + JSON.stringify(schemesData, null, 2) + ';';
    
    seedContent = seedContent.replace(importRegex, replacement);
    fs.writeFileSync('./seed.js', seedContent);
    console.log('seed.js updated');
};

const updateAuthContext = () => {
    let authContent = fs.readFileSync('../frontend/src/context/AuthContext.jsx', 'utf8');
    
    const importRegex = /const DEFAULT_SCHEMES = \[.*?\];/s;
    
    // We need to map the JSON to add the _id fields that AuthContext needs
    const authSchemesData = schemesData.map((s, idx) => {
        let idStr = "scheme_" + s.title.toLowerCase().split(' ')[0].replace(/[^a-z]/g, '') + "_" + idx;
        return {
            _id: idStr,
            ...s
        };
    });
    
    const replacement = 'const DEFAULT_SCHEMES = ' + JSON.stringify(authSchemesData, null, 2) + ';';
    authContent = authContent.replace(importRegex, replacement);
    fs.writeFileSync('../frontend/src/context/AuthContext.jsx', authContent);
    console.log('AuthContext.jsx updated');
}

updateSeedJs();
updateAuthContext();
