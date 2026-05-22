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
