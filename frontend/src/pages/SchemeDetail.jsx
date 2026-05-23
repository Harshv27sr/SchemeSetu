import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Calendar, IndianRupee, ChevronRight, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SchemeDetail = () => {
  const { id } = useParams();
  const { schemes, calculateEligibility, user } = useAuth();
  const [activeSection, setActiveSection] = useState('details');

  const scheme = schemes.find(s => s._id === id);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['details', 'benefits', 'eligibility', 'application-process', 'documents'];
      
      let currentSection = sections[0];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!scheme) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Scheme Not Found</h2>
        <Link to="/schemes" className="mt-4 inline-block text-sm font-bold text-govblue-600 hover:underline">
          &larr; Return to Catalog
        </Link>
      </div>
    );
  }

  const el = calculateEligibility(scheme);

  const scrollTo = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'details', label: 'Details' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'application-process', label: 'Application Process' },
    { id: 'documents', label: 'Documents Required' }
  ];

  return (
    <div className="bg-[#f3f4f6] dark:bg-slate-950 min-h-screen pb-20">
      {/* Top Header matching myScheme style */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start space-x-4">
              <Link 
                to="/schemes" 
                className="mt-1 p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 hover:text-govblue-600 dark:hover:text-govblue-400 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                  {scheme.title}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400 font-medium mt-2">
                  <span className="bg-govgreen-100 text-govgreen-700 dark:bg-govgreen-900/30 dark:text-govgreen-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    {scheme.state === "Central" ? "Central Ministry" : `${scheme.state} State`}
                  </span>
                  <div className="flex items-center space-x-1 mt-1">
                    <Calendar className="w-4 h-4" />
                    <span>Valid Upto: {new Date(scheme.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="text-center px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-white/5">
                <span className="block text-xs font-semibold text-slate-500 uppercase">Match Score</span>
                <span className={`text-xl font-black ${
                  el.score === 100 ? 'text-govgreen-600 dark:text-govgreen-400' : el.score >= 50 ? 'text-amber-500 dark:text-amber-400' : 'text-slate-400'
                }`}>{el.score}%</span>
              </div>
              <Link
                to={`/apply/${scheme._id}`}
                className="w-full sm:w-auto px-6 py-3 bg-govgreen-600 hover:bg-govgreen-700 text-white font-bold rounded-xl shadow transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Check Eligibility / Apply</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar (Sticky Menu) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/5 p-4 shadow-sm">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-xl transition-colors ${
                      activeSection === item.id 
                        ? 'bg-govblue-50 text-govblue-700 dark:bg-govblue-900/30 dark:text-govblue-400 border-l-4 border-govblue-600' 
                        : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50 border-l-4 border-transparent'
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && <ChevronRight className="w-4 h-4" />}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Automated Match Status Box */}
            {user?.profile?.fullName && el.score < 100 && (
              <div className={`p-4 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  el.score >= 50 ? 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/30' : 'bg-rose-50 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/30'
                }`}>
                <div>
                  <h3 className={`font-bold ${el.score >= 50 ? 'text-amber-800 dark:text-amber-400' : 'text-rose-800 dark:text-rose-400'}`}>
                    {el.score >= 50 ? 'Partially Eligible' : 'Not Eligible'}
                  </h3>
                  <p className="text-sm mt-1 text-slate-700 dark:text-slate-300">
                    Your profile doesn't perfectly match the core requirements. Check the eligibility section below to see why.
                  </p>
                </div>
                <Link to="/profile" className="shrink-0 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg text-sm font-bold shadow-sm border border-slate-200 dark:border-slate-700">
                  Update Profile
                </Link>
              </div>
            )}

            {/* Details */}
            <div id="details" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-white/5">Details</h2>
              <div className="markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {scheme.detailedDescription || scheme.description}
                </ReactMarkdown>
              </div>
            </div>

            {/* Benefits */}
            <div id="benefits" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-white/5">Benefits</h2>
              <div className="markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {scheme.detailedBenefits || scheme.benefits}
                </ReactMarkdown>
              </div>
            </div>

            {/* Eligibility */}
            <div id="eligibility" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-white/5">Eligibility</h2>
              
              {user?.profile?.fullName && (
                <div className="mb-8 space-y-3 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-white/5">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2">Automated Matcher Results</h3>
                  {el.reasons.map((reason, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <span className="mt-0.5 shrink-0">
                        {reason.matched ? <CheckCircle2 className="w-5 h-5 text-govgreen-500" /> : <XCircle className="w-5 h-5 text-rose-500" />}
                      </span>
                      <p className={`text-sm font-medium ${reason.matched ? "text-slate-800 dark:text-slate-200" : "text-rose-600 dark:text-rose-400"}`}>
                        {reason.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {scheme.detailedEligibility || "Please refer to the general guidelines."}
                </ReactMarkdown>
              </div>
            </div>

            {/* Application Process */}
            <div id="application-process" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-white/5">Application Process</h2>
              <div className="markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {scheme.applicationProcess || "Apply via the official portal or your local CSC."}
                </ReactMarkdown>
              </div>
            </div>

            {/* Documents Required */}
            <div id="documents" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b border-slate-100 dark:border-white/5">Documents Required</h2>
              <div className="markdown-content">
                <ol>
                  {scheme.requiredDocuments.map((doc, idx) => (
                    <li key={idx}><strong>{doc}</strong></li>
                  ))}
                </ol>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetail;
