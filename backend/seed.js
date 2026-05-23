import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Scheme from './models/Scheme.js';
import User from './models/User.js';

dotenv.config();

const schemesData = [
  {
    title: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    description: "Income support scheme for all landholding farmer families across the country to enable them to take care of agricultural expenses.",
    benefits: "Financial benefit of ₹6,000 per year, paid in three equal installments of ₹2,000 directly into bank accounts.",
    state: "Central",
    category: "All",
    deadline: new Date("2026-08-15"),
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
    title: "Post Matric Scholarship Scheme for SC/ST Students",
    description: "Financial assistance to students belonging to scheduled castes and tribes studying at post-matriculation or post-secondary stages.",
    benefits: "100% compulsory non-refundable fees reimbursement and monthly maintenance allowances up to ₹1,200.",
    state: "Central",
    category: "SC/ST",
    deadline: new Date("2026-07-31"),
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
    title: "Pradhan Mantri Awas Yojana (PMAY-Gramin)",
    description: "Housing for All mission aiming to provide pucka houses with basic amenities to all homeless and households living in dilapidated houses.",
    benefits: "Financial assistance of ₹1.2 Lakhs in plains and ₹1.3 Lakhs in hilly/difficult areas for house construction.",
    state: "Central",
    category: "All",
    deadline: new Date("2026-12-31"),
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
    title: "Lado Protsahan Yojana",
    description: "State-specific financial support program supporting the birth and education of girls in low-income families.",
    benefits: "Savings bond of ₹1 Lakh given to the girl child, with milestone cash payouts at standard school levels.",
    state: "Rajasthan",
    category: "All",
    deadline: new Date("2026-09-30"),
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
    title: "Atal Pension Yojana (APY)",
    description: "Pension scheme focused on the unorganized sector workers to provide post-retirement financial security.",
    benefits: "Guaranteed minimum pension of ₹1,00,00 to ₹5,000 per month after age 60 based on contribution.",
    state: "Central",
    category: "All",
    deadline: new Date("2026-11-30"),
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
  },
  {
    title: "National Widow Pension Scheme (NWPS)",
    description: "Financial assistance provided to widows to ensure a dignified life and cover basic living expenses.",
    benefits: "Monthly pension of ₹3,000 transferred directly to the beneficiary's bank account.",
    state: "Central",
    category: "Widow",
    deadline: new Date("2026-12-31"),
    requiredDocuments: ["Aadhaar Card", "Death Certificate of Husband", "Income Certificate"],
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
    state: "Central",
    category: "Labour",
    deadline: new Date("2026-10-31"),
    requiredDocuments: ["Aadhaar Card", "e-Shram Card", "Income Certificate"],
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
    state: "Central",
    category: "Disabled",
    deadline: new Date("2027-03-31"),
    requiredDocuments: ["Aadhaar Card", "UDID Card (Disability Certificate)", "Income Certificate"],
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
    state: "Central",
    category: "Startup",
    deadline: new Date("2026-12-31"),
    requiredDocuments: ["Aadhaar Card", "DPIIT Recognition Certificate", "Project Report", "Company Registration"],
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
    state: "Central",
    category: "Startup",
    deadline: new Date("2027-03-31"),
    requiredDocuments: ["Aadhaar Card", "Business Plan", "Bank Statement"],
    eligibility: {
      minAge: 18,
      maxAge: 65,
      maxIncome: 9999999,
      allowedOccupations: ["Business Owner", "Farmer", "Unemployed", "Others"],
      allowedCategories: ["General", "OBC", "SC", "ST"],
      allowedStates: ["All"],
      allowedGenders: ["Male", "Female", "Other"]
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
