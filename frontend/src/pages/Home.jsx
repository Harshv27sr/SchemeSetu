import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Search, ShieldCheck, HeartHandshake, FileText, ArrowRight, CheckCircle2, ChevronRight, Activity, Bot } from 'lucide-react';

const Home = () => {
  const { user, t } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="bg-[#e8edf2] dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-b from-slate-50 to-[#e8edf2]/30 dark:bg-slate-950 border-b border-slate-200/50 dark:border-white/5">
        {/* Soft background glow circles */}
        <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-govblue-100/40 dark:bg-govblue-900/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-govgreen-100/30 dark:bg-govgreen-950/10 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Text content */}
            <motion.div 
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-govblue-50 dark:bg-govblue-900/20 border border-govblue-200/50 dark:border-govblue-500/20 rounded-full text-govblue-700 dark:text-govblue-400 font-bold text-xs uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-govblue-600 animate-ping"></span>
                <span>Bridging Digital Access Gap</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Find Government Schemes <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-govblue-600 to-govblue-800 dark:from-govblue-400 dark:to-govblue-600">Tailored For You</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto lg:mx-0">
                {t('heroSubtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to={user ? "/dashboard" : "/register"}
                  className="w-full sm:w-auto px-8 py-3.5 bg-govblue-600 hover:bg-govblue-700 text-white font-bold rounded-xl shadow-lg shadow-govblue-200/50 dark:shadow-none transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>{t('getStarted')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/schemes"
                  className="w-full sm:w-auto px-8 py-3.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 font-bold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Explore Schemes</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Right Hero Visuals Mockup */}
            <motion.div 
              className="lg:col-span-5 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative mx-auto max-w-[400px] lg:max-w-none p-6 bg-slate-50/95 dark:bg-slate-900/90 dark:backdrop-blur-md rounded-3xl border border-slate-200/60 dark:border-white/10 shadow-xl shadow-slate-300/30 dark:shadow-none">
                {/* Embedded Visual Interactive widget */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/10">
                  <div className="flex items-center space-x-2">
                    <div className="w-3.5 h-3.5 bg-rose-500 rounded-full"></div>
                    <div className="w-3.5 h-3.5 bg-amber-500 rounded-full"></div>
                    <div className="w-3.5 h-3.5 bg-govgreen-500 rounded-full"></div>
                  </div>
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-400">SchemeSetu Digital Analyzer</span>
                </div>

                <div className="mt-4 space-y-4">
                  {/* Matching Engine status item */}
                  <div className="p-3 bg-govblue-50/50 dark:bg-govblue-950/30 border border-govblue-100/50 dark:border-govblue-900/30 rounded-2xl flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-govblue-500 flex items-center justify-center text-white font-bold">
                      <Search className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Engine Matching...</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Student + Farmer Family → Match!</p>
                    </div>
                    <span className="text-xs font-bold text-govgreen-600 dark:text-govgreen-450 bg-govgreen-50 dark:bg-govgreen-950/40 px-2.5 py-0.5 rounded-full">98% Match</span>
                  </div>

                  {/* OCR mismatch detector item */}
                  <div className="p-3 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-2xl flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center text-white font-bold">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">OCR Validation Scan</h4>
                      <p className="text-[10px] text-rose-600 dark:text-rose-400 font-medium">Aadhaar (Rahul) ≠ Income (Rahul S.)</p>
                    </div>
                    <span className="text-[10px] font-bold text-rose-700 dark:text-rose-450 bg-rose-100/60 dark:bg-rose-950/30 px-2 py-0.5 rounded-full">Mismatch</span>
                  </div>

                  {/* Dynamic tracking panel */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-950/80 border border-slate-200/50 dark:border-white/10 rounded-2xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Application Tracking</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">Updated 2m ago</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-xs text-slate-600 dark:text-slate-300 mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-govgreen-500" />
                      <span>Submitted</span>
                      <ChevronRight className="w-2.5 h-2.5 text-slate-300 dark:text-slate-600" />
                      <CheckCircle2 className="w-3.5 h-3.5 text-govgreen-500" />
                      <span>Verified</span>
                      <ChevronRight className="w-2.5 h-2.5 text-slate-300 dark:text-slate-600" />
                      <Activity className="w-3.5 h-3.5 text-govblue-600 dark:text-govblue-400 animate-spin-slow" />
                      <span className="text-govblue-600 dark:text-govblue-400 font-semibold">In Review</span>
                    </div>
                  </div>

                  {/* Setu Doot Assistant Callout */}
                  <div className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-2xl flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
                      <Bot className="w-5 h-5 text-govgreen-200" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">सेतु दूत / Setu Doot Assistant</h4>
                      <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">Bilingual Interactive Scheme Guide Assistant active!</p>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0"></span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 lg:py-28 bg-transparent dark:bg-slate-950/40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-bold text-govblue-600 dark:text-govblue-400 tracking-widest uppercase">Core Capabilities</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Powerful Features Made for Citizens
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Eliminating barriers of red tape, confusion, and complexity. Find, check, and track your claims instantly.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Feature 1 */}
            <motion.div className="bg-slate-50/90 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-white/5 shadow-sm hover:shadow-md dark:hover:border-white/10 transition-all duration-300" variants={itemVariants}>
              <div className="w-12 h-12 rounded-xl bg-govblue-50 dark:bg-govblue-900/20 text-govblue-600 dark:text-govblue-400 flex items-center justify-center mb-6 font-bold">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Recommendation Engine</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Matches your profile filters (age, income, state, category) directly to active state and central benefits in real-time.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div className="bg-slate-50/90 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-white/5 shadow-sm hover:shadow-md dark:hover:border-white/10 transition-all duration-300" variants={itemVariants}>
              <div className="w-12 h-12 rounded-xl bg-govgreen-50 dark:bg-govgreen-900/20 text-govgreen-600 dark:text-govgreen-400 flex items-center justify-center mb-6 font-bold">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Eligibility Checker</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Calculates a transparent eligibility score based on dynamic parameter checks, with detailed explanations.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div className="bg-slate-50/90 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-white/5 shadow-sm hover:shadow-md dark:hover:border-white/10 transition-all duration-300" variants={itemVariants}>
              <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-6 font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">OCR Document Validation</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Harnesses OCR validation to read certificates and proactively alert users on critical spelling or birthdate mismatches.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div className="bg-slate-50/90 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-white/5 shadow-sm hover:shadow-md dark:hover:border-white/10 transition-all duration-300" variants={itemVariants}>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 font-bold">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Application Tracking</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Keeps application statuses updated with a comprehensive timeline UI mapping each verification stage.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How it Works / Steps Section */}
      <section className="py-20 lg:py-28 bg-slate-50/60 dark:bg-slate-900/30 border-y border-slate-200/60 dark:border-white/5 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
            <h2 className="text-xs font-bold text-govgreen-600 dark:text-govgreen-400 tracking-widest uppercase">Simplifying Bureaucracy</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              A 5-Step Digital Assistance Flow
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Applying for benefits has never been this direct. We guide you through verification, file uploads, and approval.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-14 h-14 bg-govblue-600 text-white rounded-full flex items-center justify-center font-extrabold text-lg shadow-lg shadow-govblue-200/40 dark:shadow-none mb-6 relative">
                1
                <div className="hidden lg:block absolute left-full top-1/2 w-[70%] h-[2px] bg-slate-200 dark:bg-slate-800 -z-10 transform -translate-y-1/2"></div>
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-2">Register Securely</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Sign up and protect your credentials with JWT authorization.</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-14 h-14 bg-govblue-600 text-white rounded-full flex items-center justify-center font-extrabold text-lg shadow-lg shadow-govblue-200/40 dark:shadow-none mb-6 relative">
                2
                <div className="hidden lg:block absolute left-full top-1/2 w-[70%] h-[2px] bg-slate-200 dark:bg-slate-800 -z-10 transform -translate-y-1/2"></div>
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-2">Fill Citizen Profile</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Enter age, state, caste, and income parameters for automated matching.</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-14 h-14 bg-govblue-600 text-white rounded-full flex items-center justify-center font-extrabold text-lg shadow-lg shadow-govblue-200/40 dark:shadow-none mb-6 relative">
                3
                <div className="hidden lg:block absolute left-full top-1/2 w-[70%] h-[2px] bg-slate-200 dark:bg-slate-800 -z-10 transform -translate-y-1/2"></div>
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-2">Review Schemes</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Compare customized score recommendations and check match explanations.</p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-14 h-14 bg-govblue-600 text-white rounded-full flex items-center justify-center font-extrabold text-lg shadow-lg shadow-govblue-200/40 dark:shadow-none mb-6 relative">
                4
                <div className="hidden lg:block absolute left-full top-1/2 w-[70%] h-[2px] bg-slate-200 dark:bg-slate-800 -z-10 transform -translate-y-1/2"></div>
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-2">OCR Mismatch Scan</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Upload documents and let OCR detect any typos before submission.</p>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-14 h-14 bg-govgreen-600 text-white rounded-full flex items-center justify-center font-extrabold text-lg shadow-lg shadow-govgreen-200/40 dark:shadow-none mb-6">
                5
              </div>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-2">Track & Succeed</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Submit to the Admin desk and monitor the timeline status dynamically.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Schemes Callout */}
      <section className="py-20 lg:py-28 bg-transparent dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">{t('popularSchemes')}</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">High-impact active central schemes providing immense citizen benefits.</p>
            </div>
            <Link 
              to="/schemes" 
              className="mt-4 md:mt-0 text-sm font-bold text-govblue-600 dark:text-govblue-400 hover:text-govblue-700 dark:hover:text-govblue-300 flex items-center space-x-1 hover:underline"
            >
              <span>{t('viewAllSchemes')}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* PM-Kisan */}
            <div className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200/60 dark:border-white/5 p-6 rounded-2xl shadow-sm hover:shadow-md dark:hover:border-white/10 transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-govgreen-700 dark:text-govgreen-440 bg-govgreen-50 dark:bg-govgreen-950/40 px-2 py-0.5 rounded-full uppercase">Agriculture</span>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mt-2 mb-1">PM Kisan Samman Nidhi</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">₹6,000 yearly income support paid in three equal installments directly into farmer bank accounts.</p>
              </div>
              <div className="border-t border-slate-100 dark:border-white/10 mt-4 pt-4 flex justify-between items-center text-xs animate-none">
                <span className="text-slate-400 dark:text-slate-505 font-medium">Deadline: 15 Aug 2026</span>
                <Link to="/schemes" className="text-govblue-600 dark:text-govblue-400 font-bold hover:underline flex items-center">
                  <span>Details</span>
                  <ChevronRight className="w-3 h-3 ml-0.5" />
                </Link>
              </div>
            </div>

            {/* Scholarship */}
            <div className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200/60 dark:border-white/5 p-6 rounded-2xl shadow-sm hover:shadow-md dark:hover:border-white/10 transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-govblue-700 dark:text-govblue-400 bg-govblue-50 dark:bg-govblue-900/40 px-2 py-0.5 rounded-full uppercase">Education</span>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mt-2 mb-1">Post Matric Scholarship</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">Reimbursement of tuition fees and monthly allowances up to ₹1,200 for SC/ST students.</p>
              </div>
              <div className="border-t border-slate-100 dark:border-white/10 mt-4 pt-4 flex justify-between items-center text-xs">
                <span className="text-slate-400 dark:text-slate-550 font-medium">Deadline: 31 Jul 2026</span>
                <Link to="/schemes" className="text-govblue-600 dark:text-govblue-400 font-bold hover:underline flex items-center">
                  <span>Details</span>
                  <ChevronRight className="w-3 h-3 ml-0.5" />
                </Link>
              </div>
            </div>

            {/* APY */}
            <div className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200/60 dark:border-white/5 p-6 rounded-2xl shadow-sm hover:shadow-md dark:hover:border-white/10 transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/40 px-2 py-0.5 rounded-full uppercase">Pension</span>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mt-2 mb-1">Atal Pension Yojana (APY)</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">Guaranteed minimum pension of ₹1,000 to ₹5,000 per month after age 60 for unorganized workers.</p>
              </div>
              <div className="border-t border-slate-100 dark:border-white/10 mt-4 pt-4 flex justify-between items-center text-xs">
                <span className="text-slate-400 dark:text-slate-550 font-medium">Deadline: 30 Nov 2026</span>
                <Link to="/schemes" className="text-govblue-600 dark:text-govblue-400 font-bold hover:underline flex items-center">
                  <span>Details</span>
                  <ChevronRight className="w-3 h-3 ml-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action CTA */}
      <section className="bg-gradient-gov py-16 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Ready to Discover Your Eligible Benefits?</h2>
          <p className="text-sm sm:text-base text-govblue-100 max-w-lg mx-auto">
            Take 2 minutes to fill your parameters. Find your matching schemes and secure your eligible assistance today.
          </p>
          <div className="pt-2">
            <Link
              to="/register"
              className="inline-block px-8 py-3.5 bg-govgreen-500 hover:bg-govgreen-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 cursor-pointer"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
