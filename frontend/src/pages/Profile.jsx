import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Calendar, MapPin, Users, Briefcase, IndianRupee, GraduationCap, Accessibility, ShieldCheck, CheckCircle2, Heart, Target } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile, t } = useAuth();
  const navigate = useNavigate();
  
  // Local form states, prefilled from user profile
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [stateName, setStateName] = useState('');
  
  const [category, setCategory] = useState('');
  const [bpl, setBpl] = useState(false);
  const [minority, setMinority] = useState(false);
  const [locationType, setLocationType] = useState('');
  
  const [education, setEducation] = useState('');
  const [occupation, setOccupation] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  
  const [income, setIncome] = useState('');
  const [dependents, setDependents] = useState('');
  const [familyMembers, setFamilyMembers] = useState('');
  
  const [disabilityStatus, setDisabilityStatus] = useState(false);
  const [singleParent, setSingleParent] = useState(false);
  
  const [sectorPreference, setSectorPreference] = useState('');

  const [isAadhaarVerified, setIsAadhaarVerified] = useState(false);
  
  // Modal states
  const [showAadhaarModal, setShowAadhaarModal] = useState(false);
  const [aadhaarStep, setAadhaarStep] = useState(1);
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [aadhaarOTP, setAadhaarOTP] = useState('');
  const [verifyingOTP, setVerifyingOTP] = useState(false);

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const INDIAN_STATES = [
    "All", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Goa", 
    "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", 
    "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const CATEGORIES = ["General", "OBC", "SC", "ST"];
  const OCCUPATIONS = ["Student", "Farmer", "Business Owner", "Unemployed", "Retired", "Others"];
  const GENDERS = ["Male", "Female", "Other"];
  const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Self-employed", "Unemployed", "Daily Wager"];
  const SECTORS = ["Agriculture", "Education", "Healthcare", "Housing", "Women Empowerment", "Small Business"];

  // Populate data when user state loads
  useEffect(() => {
    if (user && user.profile) {
      const prof = user.profile;
      setFullName(prof.fullName || '');
      setDob(prof.dob || '');
      setAge(prof.age || '');
      setGender(prof.gender || '');
      setStateName(prof.state || '');
      
      setCategory(prof.category || '');
      setBpl(prof.bpl || false);
      setMinority(prof.minority || false);
      setLocationType(prof.locationType || '');
      
      setOccupation(prof.occupation || '');
      setEmploymentType(prof.employmentType || '');
      setEducation(prof.education || '');
      
      setIncome(prof.income || '');
      setDependents(prof.dependents || '');
      setFamilyMembers(prof.familyMembers || '');
      
      setDisabilityStatus(prof.disabilityStatus || false);
      setSingleParent(prof.singleParent || false);
      
      setSectorPreference(prof.sectorPreference || '');
      
      setIsAadhaarVerified(prof.isAadhaarVerified || false);
    }
  }, [user]);

  // Calculate completeness gauge (out of 100)
  const calculateCompleteness = () => {
    let filled = 0;
    const totalFields = 13; 
    if (fullName) filled++;
    if (dob) filled++;
    if (age) filled++;
    if (gender) filled++;
    if (stateName && stateName !== 'All') filled++;
    if (category) filled++;
    if (occupation) filled++;
    if (income !== '') filled++;
    if (education) filled++;
    if (locationType) filled++;
    if (employmentType) filled++;
    if (familyMembers !== '') filled++;
    if (sectorPreference) filled++;
    return Math.round((filled / totalFields) * 100);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');

    const profileData = {
      fullName,
      dob,
      age: parseInt(age) || 0,
      gender,
      state: stateName,
      category,
      bpl,
      minority,
      locationType,
      occupation,
      employmentType,
      income: parseInt(income) || 0,
      dependents: parseInt(dependents) || 0,
      familyMembers: parseInt(familyMembers) || 1,
      education,
      disabilityStatus,
      singleParent,
      sectorPreference,
      isAadhaarVerified
    };

    const res = await updateProfile(profileData);
    setSaving(false);
    if (res.success) {
      setSuccessMsg('✅ Profile parameters successfully saved to MERN database! Redirecting to Dashboard...');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        setSuccessMsg('');
        navigate('/dashboard');
      }, 1500);
    }
  };

  const simulateAadhaarFetch = () => {
    const randomNames = ["Ramesh Kumar", "Sita Devi", "Anil Sharma", "Pooja Verma", "Vikram Singh", "Sunita Patel", "Rajesh Gupta"];
    const randomGenders = ["Male", "Female", "Male", "Female", "Male", "Female", "Male"];
    const randomIndex = Math.floor(Math.random() * randomNames.length);
    
    const randomAge = Math.floor(Math.random() * 40) + 20; // 20 to 60
    const birthYear = 2024 - randomAge;
    const birthMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const birthDay = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    const randomDob = `${birthYear}-${birthMonth}-${birthDay}`;

    // Overwrites existing data automatically!
    setFullName(randomNames[randomIndex]);
    setDob(randomDob);
    setAge(randomAge);
    setGender(randomGenders[randomIndex]);
    setStateName(INDIAN_STATES[Math.floor(Math.random() * 20) + 1]); 
  };

  const completeness = Math.min(calculateCompleteness(), 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-colors duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{t('profileTitle')}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{t('profileSubtitle')}</p>
        </div>

        {/* Completeness Gauge */}
        <div className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 p-4 rounded-2xl shadow-sm dark:shadow-none w-full md:w-56 shrink-0">
          <div className="flex justify-between items-center mb-1 text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">Profile Completion</span>
            <span className={`font-extrabold ${completeness === 100 ? 'text-govgreen-600 dark:text-govgreen-400' : 'text-govblue-600 dark:text-govblue-400'}`}>{completeness}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 rounded-full ${
                completeness === 100 ? 'bg-govgreen-500' : 'bg-govblue-600'
              }`}
              style={{ width: `${completeness}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5 leading-normal">
            {completeness === 100 ? "🎉 Maximum matching precision enabled!" : "Fill parameters for better recommendation matching."}
          </p>
        </div>
      </div>

      {successMsg && (
        <motion.div 
          className="p-4 bg-govgreen-50 dark:bg-govgreen-950/20 border border-govgreen-200 dark:border-govgreen-800/30 text-govgreen-800 dark:text-govgreen-400 rounded-2xl text-sm font-semibold mb-6 flex items-center space-x-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </motion.div>
      )}

      {/* Main Profile Form */}
      <form onSubmit={handleSave} className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden space-y-0">
        
        {/* eKYC Simulation Banner */}
        <div className={`px-6 py-4 border-b ${isAadhaarVerified ? 'bg-govgreen-50 dark:bg-govgreen-950/20 border-govgreen-200 dark:border-govgreen-900/30' : 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/30'} flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4`}>
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-full mt-0.5 shrink-0 ${isAadhaarVerified ? 'bg-govgreen-100 dark:bg-govgreen-900/30 text-govgreen-600 dark:text-govgreen-450' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-450'}`}>
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-sm font-extrabold ${isAadhaarVerified ? 'text-govgreen-800 dark:text-govgreen-400' : 'text-amber-800 dark:text-amber-400'}`}>
                {isAadhaarVerified ? "Aadhaar eKYC Verified" : "Identity Not Verified"}
              </h3>
              <p className={`text-[11px] font-medium mt-0.5 leading-snug ${isAadhaarVerified ? 'text-govgreen-600 dark:text-govgreen-500' : 'text-amber-600 dark:text-amber-500'}`}>
                {isAadhaarVerified 
                  ? "Your core details (Name, Age, Gender, State) have been securely fetched from UIDAI and locked." 
                  : "Please verify your Aadhaar to prevent fraudulent applications and auto-fill your profile details."}
              </p>
            </div>
          </div>
          {!isAadhaarVerified && (
            <button 
              type="button"
              onClick={() => { setShowAadhaarModal(true); setAadhaarStep(1); setAadhaarOTP(''); setAadhaarNumber(''); }}
              className="shrink-0 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
            >
              Verify via Aadhaar
            </button>
          )}
        </div>

        {/* 1. Personal Info */}
        <div className="px-6 py-4 bg-slate-100 dark:bg-slate-950 border-b border-slate-250 dark:border-white/5 flex items-center space-x-2">
          <User className="w-5 h-5 text-govblue-600 dark:text-govblue-400" />
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-200">Personal Info</h2>
        </div>
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="form-label flex items-center space-x-1">
              <User className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span>{t('fullName')}</span>
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`form-input ${isAadhaarVerified ? 'opacity-60 cursor-not-allowed bg-slate-100 dark:bg-slate-800' : ''}`}
              placeholder="Rahul Sharma"
              readOnly={isAadhaarVerified}
            />
          </div>
          <div className="space-y-1.5">
            <label className="form-label flex items-center space-x-1">
              <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span>Date of Birth</span>
            </label>
            <input
              type="date"
              required
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className={`form-input ${isAadhaarVerified ? 'opacity-60 cursor-not-allowed bg-slate-100 dark:bg-slate-800' : 'cursor-pointer'}`}
              readOnly={isAadhaarVerified}
            />
          </div>
          <div className="space-y-1.5">
            <label className="form-label flex items-center space-x-1">
              <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span>{t('age')}</span>
            </label>
            <input
              type="number"
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className={`form-input ${isAadhaarVerified ? 'opacity-60 cursor-not-allowed bg-slate-100 dark:bg-slate-800' : ''}`}
              placeholder="e.g. 24"
              min="0"
              max="120"
              readOnly={isAadhaarVerified}
            />
          </div>
          <div className="space-y-1.5">
            <label className="form-label flex items-center space-x-1">
              <Users className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span>{t('gender')}</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {GENDERS.map(g => (
                <button
                  key={g}
                  type="button"
                  onClick={() => !isAadhaarVerified && setGender(g)}
                  disabled={isAadhaarVerified}
                  className={`py-2 px-3 border rounded-xl text-xs font-bold transition-all ${isAadhaarVerified ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'} ${
                    gender === g
                      ? 'border-govblue-600 dark:border-govblue-400 bg-govblue-50 dark:bg-govblue-900/30 text-govblue-700 dark:text-govblue-300'
                      : 'border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {t(g.toLowerCase()) || g}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="form-label flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span>{t('state')}</span>
            </label>
            <select
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
              disabled={isAadhaarVerified}
              className={`form-input ${isAadhaarVerified ? 'opacity-60 cursor-not-allowed bg-slate-100 dark:bg-slate-800' : 'cursor-pointer'}`}
            >
              <option value="">Select State</option>
              {INDIAN_STATES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 2. Social Status */}
        <div className="px-6 py-4 bg-slate-100 dark:bg-slate-950 border-y border-slate-250 dark:border-white/5 flex items-center space-x-2">
          <Users className="w-5 h-5 text-govblue-600 dark:text-govblue-400" />
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-200">Social Status</h2>
        </div>
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5 md:col-span-2 lg:col-span-1">
            <label className="form-label flex items-center space-x-1">
              <Users className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span>{t('category')}</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-2 px-1 border rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                    category === cat
                      ? 'border-govblue-600 dark:border-govblue-400 bg-govblue-50 dark:bg-govblue-900/30 text-govblue-700 dark:text-govblue-300'
                      : 'border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {t(cat.toLowerCase()) || cat}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="form-label flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span>Location Type</span>
            </label>
            <div className="flex space-x-2">
              {['Rural', 'Urban'].map(loc => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => setLocationType(loc)}
                  className={`flex-1 py-2 px-3 border rounded-xl text-xs font-bold transition-all cursor-pointer text-center ${
                    locationType === loc
                      ? 'border-govblue-600 dark:border-govblue-400 bg-govblue-50 dark:bg-govblue-900/30 text-govblue-700 dark:text-govblue-300'
                      : 'border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <label className="inline-flex items-center space-x-2 text-sm font-bold text-slate-700 dark:text-slate-350 cursor-pointer">
              <input type="checkbox" checked={bpl} onChange={(e) => setBpl(e.target.checked)} className="w-4 h-4 accent-govblue-600 rounded cursor-pointer" />
              <span>Below Poverty Line (BPL)</span>
            </label>
            <label className="inline-flex items-center space-x-2 text-sm font-bold text-slate-700 dark:text-slate-350 cursor-pointer">
              <input type="checkbox" checked={minority} onChange={(e) => setMinority(e.target.checked)} className="w-4 h-4 accent-govblue-600 rounded cursor-pointer" />
              <span>Minority Status</span>
            </label>
          </div>
        </div>

        {/* 3. Education & Job */}
        <div className="px-6 py-4 bg-slate-100 dark:bg-slate-950 border-y border-slate-250 dark:border-white/5 flex items-center space-x-2">
          <Briefcase className="w-5 h-5 text-govblue-600 dark:text-govblue-400" />
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-200">Education & Job</h2>
        </div>
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <label className="form-label flex items-center space-x-1">
              <GraduationCap className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span>{t('education')}</span>
            </label>
            <select value={education} onChange={(e) => setEducation(e.target.value)} className="form-input cursor-pointer">
              <option value="">Select Education Level</option>
              <option value="Primary School">Primary School</option>
              <option value="High School">High School (10th/12th)</option>
              <option value="College Student">College Student / Diploma</option>
              <option value="Graduate">Graduate</option>
              <option value="Post-Graduate">Post-Graduate</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="form-label flex items-center space-x-1">
              <Briefcase className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span>{t('occupation')}</span>
            </label>
            <select value={occupation} onChange={(e) => setOccupation(e.target.value)} className="form-input cursor-pointer">
              <option value="">Select Occupation</option>
              {OCCUPATIONS.map(occ => (
                <option key={occ} value={occ}>{t(occ.toLowerCase()) || occ}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="form-label flex items-center space-x-1">
              <Briefcase className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span>Employment Type</span>
            </label>
            <select value={employmentType} onChange={(e) => setEmploymentType(e.target.value)} className="form-input cursor-pointer">
              <option value="">Select Type</option>
              {EMPLOYMENT_TYPES.map(emp => (
                <option key={emp} value={emp}>{emp}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 4. Financial */}
        <div className="px-6 py-4 bg-slate-100 dark:bg-slate-950 border-y border-slate-250 dark:border-white/5 flex items-center space-x-2">
          <IndianRupee className="w-5 h-5 text-govblue-600 dark:text-govblue-400" />
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-200">Financial</h2>
        </div>
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <label className="form-label flex items-center space-x-1">
              <IndianRupee className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span>{t('annualIncome')}</span>
            </label>
            <input type="number" required value={income} onChange={(e) => setIncome(e.target.value)} className="form-input" placeholder="e.g. 150000" min="0" />
          </div>
          <div className="space-y-1.5">
            <label className="form-label flex items-center space-x-1">
              <Users className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span>Dependents</span>
            </label>
            <input type="number" value={dependents} onChange={(e) => setDependents(e.target.value)} className="form-input" placeholder="e.g. 2" min="0" />
          </div>
          <div className="space-y-1.5">
            <label className="form-label flex items-center space-x-1">
              <Users className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span>Family Members</span>
            </label>
            <input type="number" value={familyMembers} onChange={(e) => setFamilyMembers(e.target.value)} className="form-input" placeholder="e.g. 4" min="1" />
          </div>
        </div>

        {/* 5. Special Conditions */}
        <div className="px-6 py-4 bg-slate-100 dark:bg-slate-950 border-y border-slate-250 dark:border-white/5 flex items-center space-x-2">
          <Heart className="w-5 h-5 text-govblue-600 dark:text-govblue-400" />
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-200">Special Conditions</h2>
        </div>
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5 rounded-2xl flex items-start space-x-3.5">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl text-indigo-600 dark:text-indigo-400 mt-0.5">
              <Accessibility className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">{t('disabilityStatus')}</h3>
              <p className="text-xs text-slate-400 dark:text-slate-400 leading-normal mb-3">
                Check this box if you possess a government Disability ID (UDID) certificate.
              </p>
              <label className="inline-flex items-center space-x-2 text-xs font-bold text-slate-700 dark:text-slate-350 cursor-pointer select-none">
                <input type="checkbox" checked={disabilityStatus} onChange={(e) => setDisabilityStatus(e.target.checked)} className="w-4 h-4 accent-govblue-600 rounded cursor-pointer" />
                <span>{t('disabled')}</span>
              </label>
            </div>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5 rounded-2xl flex items-start space-x-3.5">
            <div className="p-2 bg-rose-50 dark:bg-rose-950/20 rounded-xl text-rose-600 dark:text-rose-400 mt-0.5">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">Single Parent Status</h3>
              <p className="text-xs text-slate-400 dark:text-slate-400 leading-normal mb-3">
                Check this box if you are a single parent supporting dependents. This may unlock specific assistance.
              </p>
              <label className="inline-flex items-center space-x-2 text-xs font-bold text-slate-700 dark:text-slate-350 cursor-pointer select-none">
                <input type="checkbox" checked={singleParent} onChange={(e) => setSingleParent(e.target.checked)} className="w-4 h-4 accent-govblue-600 rounded cursor-pointer" />
                <span>I am a Single Parent</span>
              </label>
            </div>
          </div>
        </div>

        {/* 6. Interests */}
        <div className="px-6 py-4 bg-slate-100 dark:bg-slate-950 border-y border-slate-250 dark:border-white/5 flex items-center space-x-2">
          <Target className="w-5 h-5 text-govblue-600 dark:text-govblue-400" />
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-200">Interests</h2>
        </div>
        <div className="p-6 md:p-8">
          <div className="space-y-1.5 md:w-1/2">
            <label className="form-label flex items-center space-x-1">
              <Target className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              <span>Sector Preference (Optional)</span>
            </label>
            <select value={sectorPreference} onChange={(e) => setSectorPreference(e.target.value)} className="form-input cursor-pointer">
              <option value="">-- Any Sector --</option>
              {SECTORS.map(sec => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer save action */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 dark:text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-govgreen-600" />
            <span>Encrypted transmission. Mapped directly inside MongoDB.</span>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-govblue-600 hover:bg-govblue-700 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50 flex items-center space-x-1.5"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>{t('saveProfile')}</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Aadhaar Verification Simulation Modal */}
      {showAadhaarModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            className="bg-slate-50/95 dark:bg-slate-900 rounded-3xl p-6 md:p-8 max-w-sm w-full border border-slate-200/50 dark:border-white/10 shadow-2xl space-y-5"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-govblue-50 dark:bg-govblue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-2 text-3xl">
                🇮🇳
              </div>
              <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">Aadhaar eKYC</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {aadhaarStep === 1 
                  ? "Enter your 12-digit Aadhaar number to verify your identity and auto-fill core details." 
                  : "An OTP has been sent to your Aadhaar linked mobile number ending in ******4829."}
              </p>
            </div>
            
            {aadhaarStep === 1 ? (
              <input 
                type="text" 
                maxLength="12"
                placeholder="XXXX XXXX XXXX" 
                value={aadhaarNumber}
                onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-4 text-center tracking-[0.2em] font-mono text-xl font-bold border-2 border-slate-200 dark:border-white/10 rounded-2xl bg-white dark:bg-slate-950 focus:ring-2 focus:ring-govblue-500 focus:border-govblue-500 focus:outline-none dark:text-white shadow-inner"
              />
            ) : (
              <input 
                type="text" 
                maxLength="6"
                placeholder="000000" 
                value={aadhaarOTP}
                onChange={(e) => setAadhaarOTP(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-4 text-center tracking-[0.5em] font-mono text-2xl font-bold border-2 border-slate-200 dark:border-white/10 rounded-2xl bg-white dark:bg-slate-950 focus:ring-2 focus:ring-govblue-500 focus:border-govblue-500 focus:outline-none dark:text-white shadow-inner"
              />
            )}

            <div className="flex space-x-3 pt-2">
              <button 
                type="button" 
                onClick={() => { setShowAadhaarModal(false); setAadhaarStep(1); }}
                className="flex-1 py-3 text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              
              {aadhaarStep === 1 ? (
                <button 
                  type="button" 
                  onClick={() => {
                    if(aadhaarNumber.length === 12) {
                      setAadhaarStep(2);
                    } else {
                      alert("Please enter a valid 12-digit Aadhaar number");
                    }
                  }}
                  disabled={aadhaarNumber.length !== 12}
                  className="flex-1 py-3 text-xs font-bold text-white bg-govblue-600 hover:bg-govblue-700 rounded-xl disabled:opacity-50 transition-colors flex justify-center items-center cursor-pointer shadow-md"
                >
                  Send OTP
                </button>
              ) : (
                <button 
                  type="button" 
                  onClick={() => {
                    if(aadhaarOTP.length === 6) {
                      setVerifyingOTP(true);
                      setTimeout(() => {
                        simulateAadhaarFetch();
                        setIsAadhaarVerified(true);
                        setShowAadhaarModal(false);
                        setVerifyingOTP(false);
                        setSuccessMsg('✅ Aadhaar Verified successfully! Random data auto-filled from UIDAI database.');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }, 1500);
                    } else {
                      alert("Please enter a 6 digit OTP");
                    }
                  }}
                  disabled={verifyingOTP || aadhaarOTP.length !== 6}
                  className="flex-1 py-3 text-xs font-bold text-white bg-govgreen-600 hover:bg-govgreen-700 rounded-xl disabled:opacity-50 transition-colors flex justify-center items-center cursor-pointer shadow-md"
                >
                  {verifyingOTP ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "Verify OTP"}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Profile;
