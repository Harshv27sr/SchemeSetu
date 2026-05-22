import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Calendar, MapPin, Users, Briefcase, IndianRupee, GraduationCap, Accessibility, ShieldCheck, CheckCircle2 } from 'lucide-react';

const Profile = () => {
  const { user, updateProfile, t } = useAuth();
  const navigate = useNavigate();
  
  // Local form states, prefilled from user profile
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [stateName, setStateName] = useState('All');
  const [category, setCategory] = useState('General');
  const [occupation, setOccupation] = useState('Student');
  const [income, setIncome] = useState('');
  const [education, setEducation] = useState('');
  const [disabilityStatus, setDisabilityStatus] = useState(false);

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

  // Populate data when user state loads
  useEffect(() => {
    if (user && user.profile) {
      const prof = user.profile;
      setFullName(prof.fullName || user.name || '');
      setAge(prof.age || '');
      setGender(prof.gender || 'Male');
      setStateName(prof.state || 'All');
      setCategory(prof.category || 'General');
      setOccupation(prof.occupation || 'Student');
      setIncome(prof.income || '');
      setEducation(prof.education || '');
      setDisabilityStatus(prof.disabilityStatus || false);
    }
  }, [user]);

  // Calculate completeness gauge (out of 100)
  const calculateCompleteness = () => {
    let filled = 0;
    const totalFields = 8; // fullName, age, gender, stateName, category, occupation, income, education
    if (fullName) filled++;
    if (age) filled++;
    if (gender) filled++;
    if (stateName && stateName !== 'All') filled++;
    if (category) filled++;
    if (occupation) filled++;
    if (income) filled++;
    if (education) filled++;
    return Math.round((filled / totalFields) * 100);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');

    const profileData = {
      fullName,
      age: parseInt(age) || 0,
      gender,
      state: stateName,
      category,
      occupation,
      income: parseInt(income) || 0,
      education,
      disabilityStatus
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

  const completeness = calculateCompleteness();

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
            {completeness === 100 ? "🎉 Maximum matching precision enabled!" : "Fill parameters for 100% recommendation matching."}
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
      <form onSubmit={handleSave} className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden">
        {/* Section divider */}
        <div className="px-6 py-4 bg-slate-100 dark:bg-slate-950 border-b border-slate-250 dark:border-white/5 flex items-center space-x-2">
          <User className="w-5 h-5 text-govblue-600 dark:text-govblue-400" />
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-200">Demographic & Educational Metrics</h2>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
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
                className="form-input"
                placeholder="Rahul Sharma"
              />
            </div>

            {/* Age */}
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
                className="form-input"
                placeholder="e.g. 24"
                min="0"
                max="120"
              />
            </div>

            {/* Gender Selection */}
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
                    onClick={() => setGender(g)}
                    className={`py-2 px-3 border rounded-xl text-xs font-bold transition-all cursor-pointer ${
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

            {/* State selection */}
            <div className="space-y-1.5">
              <label className="form-label flex items-center space-x-1">
                <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                <span>{t('state')}</span>
              </label>
              <select
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                className="form-input cursor-pointer"
              >
                {INDIAN_STATES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Social Category dropdown */}
            <div className="space-y-1.5">
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

            {/* Occupation Selector */}
            <div className="space-y-1.5">
              <label className="form-label flex items-center space-x-1">
                <Briefcase className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                <span>{t('occupation')}</span>
              </label>
              <select
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="form-input cursor-pointer"
              >
                {OCCUPATIONS.map(occ => (
                  <option key={occ} value={occ}>{t(occ.toLowerCase()) || occ}</option>
                ))}
              </select>
            </div>

            {/* Annual Income */}
            <div className="space-y-1.5">
              <label className="form-label flex items-center space-x-1">
                <IndianRupee className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                <span>{t('annualIncome')}</span>
              </label>
              <input
                type="number"
                required
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="form-input"
                placeholder="e.g. 150000"
                min="0"
              />
            </div>

            {/* Highest Education */}
            <div className="space-y-1.5">
              <label className="form-label flex items-center space-x-1">
                <GraduationCap className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                <span>{t('education')}</span>
              </label>
              <select
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="form-input cursor-pointer"
              >
                <option value="">Select Education Level</option>
                <option value="Primary School">Primary School</option>
                <option value="High School">High School (10th/12th)</option>
                <option value="College Student">College Student / Diploma</option>
                <option value="Graduate">Graduate</option>
                <option value="Post-Graduate">Post-Graduate</option>
              </select>
            </div>
          </div>

          {/* Disability status */}
          <div className="border-t border-slate-100 dark:border-white/5 pt-5 mt-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5 rounded-2xl flex items-start space-x-3.5">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl text-indigo-600 dark:text-indigo-400 mt-0.5 animate-none">
                <Accessibility className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">{t('disabilityStatus')}</h3>
                <p className="text-xs text-slate-400 dark:text-slate-400 leading-normal mb-3">
                  Check this box if you possess a government Disability ID (UDID) certificate. This unlocks specialized social assistance benefits.
                </p>
                <label className="inline-flex items-center space-x-2 text-xs font-bold text-slate-700 dark:text-slate-350 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={disabilityStatus}
                    onChange={(e) => setDisabilityStatus(e.target.checked)}
                    className="w-4 h-4 accent-govblue-600 rounded cursor-pointer"
                  />
                  <span>{t('disabled')}</span>
                </label>
              </div>
            </div>
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
    </div>
  );
};

export default Profile;
