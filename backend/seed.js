import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Scheme from './models/Scheme.js';
import User from './models/User.js';

dotenv.config();

const schemesData = [
  {
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

const seedDB = async () => {
  try {
    // Connect to database
    await connectDB();

    // 1. Seed Schemes
    await Scheme.deleteMany({});
    console.log('🗑 Schemes cleared from database.');
    
    const seededSchemes = await Scheme.insertMany(schemesData);
    console.log(`✅ Seeded ${seededSchemes.length} Government Schemes successfully.`);

    // 2. Seed Default Admin User
    const adminEmail = 'admin@schemesetu.gov.in';
    const adminExists = await User.findOne({ email: adminEmail });
    
    if (adminExists) {
      await User.deleteOne({ email: adminEmail });
    }

    const adminUser = await User.create({
      name: "Chief Admin Officer",
      email: adminEmail,
      password: "admin123", // Encrypted pre-save PreHook
      role: "Admin",
      profile: {
        fullName: "Chief Admin Officer",
        age: 45,
        gender: "Male",
        state: "Delhi",
        category: "General",
        occupation: "Others",
        income: 1200000,
        education: "Post-Graduate",
        disabilityStatus: false
      }
    });

    const citizenEmail = "rahul@gmail.com";
    const citizenExists = await User.findOne({ email: citizenEmail });
    if (citizenExists) {
      await User.deleteOne({ email: citizenEmail });
    }

    const citizenUser = await User.create({
      name: "Rahul Citizen",
      email: citizenEmail,
      password: "password123",
      role: "Citizen",
      profile: {
        fullName: "Rahul Kumar",
        age: 22,
        gender: "Male",
        state: "Rajasthan",
        category: "SC",
        occupation: "Student",
        income: 150000,
        education: "Graduate",
        disabilityStatus: false
      }
    });
    console.log(`👤 Seeded Default Administrator successfully:`);
    console.log(`   - Email: ${adminUser.email}`);
    console.log(`   - Password: admin123`);

    console.log('🌱 Database Seeding Completed Successfully.');
    process.exit(0);
  } catch (error) {
    console.error(`💥 Database Seeding Failed: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
