import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, XCircle, FileText, ArrowLeft, Calendar, IndianRupee, ShieldCheck, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SchemeDetail = () => {
  const { id } = useParams();
  const { schemes, calculateEligibility, user } = useAuth();

  const scheme = schemes.find(s => s._id === id);

  if (!scheme) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Scheme Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">The requested policy could not be found or has expired.</p>
        <Link to="/schemes" className="mt-4 inline-block text-sm font-bold text-govblue-600 hover:underline">
          &larr; Return to Catalog
        </Link>
      </div>
    );
  }

  // Calculate customized eligibility breakdown
  const el = calculateEligibility(scheme);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Back button */}
      <Link 
        to="/schemes" 
        className="inline-flex items-center space-x-1 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-govblue-600 dark:hover:text-govblue-400 mb-6 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Catalog</span>
      </Link>

      <div className="space-y-8">
        
        {/* Core Header Card */}
        <div className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200/60 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-sm dark:shadow-none flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-1">
              <span className="text-xs font-bold text-govgreen-600 dark:text-govgreen-400 bg-govgreen-50 dark:bg-govgreen-950/20 px-2.5 py-0.5 rounded-full uppercase border border-govgreen-200 dark:border-govgreen-900">
                {scheme.state === "Central" ? "Central Scheme" : `${scheme.state} State Policy`}
              </span>
              <span className="text-xs font-bold text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/20 px-2.5 py-0.5 rounded-full uppercase border border-pink-200 dark:border-pink-900">
                Active
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">{scheme.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400 font-medium pt-1">
              <div className="flex items-center space-x-1.5">
                <Calendar className="w-4 h-4" />
                <span>Deadline: {new Date(scheme.deadline).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <IndianRupee className="w-4 h-4" />
                <span>Income Cap: ₹{scheme.eligibility.maxIncome.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits & Description panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Details & Criteria */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Description Box */}
            <div className="bg-slate-50/90 dark:bg-[#252525] border border-slate-200/60 dark:border-[#383838] rounded-3xl p-6 shadow-sm dark:shadow-none space-y-4">
              <h2 className="text-lg font-extrabold text-slate-800 dark:text-white">Scheme Overview & Description</h2>
              <div className="markdown-content text-slate-500 dark:text-slate-300">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {scheme.detailedDescription || scheme.description}
                </ReactMarkdown>
              </div>
            </div>

            {/* Benefits Box */}
            <div className="bg-slate-50/90 dark:bg-[#252525] border border-slate-200/60 dark:border-[#383838] rounded-3xl p-6 shadow-sm dark:shadow-none space-y-4">
              <h2 className="text-lg font-extrabold text-slate-800 dark:text-white">Direct Citizen Benefits</h2>
              <div className="p-4 bg-govgreen-50/50 dark:bg-[#2c2727] border border-govgreen-100 dark:border-[#3f3131] rounded-2xl text-slate-700 dark:text-slate-300">
                <div className="markdown-content">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {scheme.detailedBenefits || `💰 ${scheme.benefits}`}
                  </ReactMarkdown>
                </div>
              </div>
            </div>

            {/* Eligibility Criteria Breakdown & Detailed Eligibility */}
            <div className="bg-slate-50/90 dark:bg-[#252525] border border-slate-200/60 dark:border-[#383838] rounded-3xl p-6 shadow-sm dark:shadow-none space-y-6">
              <div>
                <h2 className="text-lg font-extrabold text-slate-800 dark:text-white mb-4">Eligibility Criteria Breakdown</h2>
                
                {!user?.profile?.fullName ? (
                  <div className="p-5 bg-slate-100/80 dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#2a2a2a] rounded-2xl text-center space-y-3">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Sign in and set up your citizen profile variables to review the matching score breakdown.</p>
                    <Link to="/login" className="text-sm text-govgreen-600 dark:text-govgreen-400 font-bold hover:underline inline-flex items-center">
                      Log In & Check Profile <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3.5">
                    {el.reasons.map((reason, idx) => (
                      <div 
                        key={idx}
                        className={`p-3.5 border rounded-2xl flex items-start justify-between gap-4 transition-all ${
                          reason.matched 
                            ? 'bg-govgreen-50 dark:bg-govgreen-950/10 border-govgreen-200 dark:border-govgreen-900/40 text-slate-800 dark:text-slate-200' 
                            : 'bg-rose-50 dark:bg-rose-950/10 border-rose-200 dark:border-rose-900/40 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <div className="flex items-start space-x-2.5">
                          <span className="mt-0.5 shrink-0">
                            {reason.matched ? (
                              <CheckCircle2 className="w-5 h-5 text-govgreen-600 dark:text-govgreen-500" />
                            ) : (
                              <XCircle className="w-5 h-5 text-rose-500 dark:text-rose-400" />
                            )}
                          </span>
                          <div className="text-sm font-semibold">
                            <p>{reason.text}</p>
                          </div>
                        </div>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          reason.matched ? 'bg-govgreen-100 dark:bg-govgreen-900/30 text-govgreen-700 dark:text-govgreen-400' : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400'
                        }`}>
                          {reason.matched ? 'Match' : 'Mismatch'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Detailed Guidelines */}
              <div className="border-t border-slate-200 dark:border-[#383838] pt-6">
                <h3 className="text-base font-bold text-slate-800 dark:text-white mb-3">Detailed Guidelines</h3>
                <div className="markdown-content text-slate-600 dark:text-slate-300">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {scheme.detailedEligibility || "Please refer to the general guidelines."}
                  </ReactMarkdown>
                </div>
              </div>
            </div>

            {/* Application Process Box */}
            <div className="bg-slate-50/90 dark:bg-[#252525] border border-slate-200/60 dark:border-[#383838] rounded-3xl p-6 shadow-sm dark:shadow-none space-y-4">
              <h2 className="text-lg font-extrabold text-slate-800 dark:text-white">Application Process</h2>
              <div className="markdown-content text-slate-600 dark:text-slate-300">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {scheme.applicationProcess || "Apply via the official portal or your local CSC."}
                </ReactMarkdown>
              </div>
            </div>

          </div>

          {/* Right Column: Required files checklist & Apply trigger */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Required Documents checklist */}
            <div className="bg-slate-50/90 dark:bg-[#252525] border border-slate-200/60 dark:border-[#383838] rounded-3xl p-6 shadow-sm dark:shadow-none space-y-4">
              <h2 className="text-lg font-extrabold text-slate-800 dark:text-white">Required Documents</h2>
              <div className="space-y-2.5">
                {scheme.requiredDocuments.map((doc, idx) => (
                  <div key={idx} className="flex items-center space-x-3 p-3 bg-slate-100/80 dark:bg-[#1f1f1f] border border-slate-200 dark:border-[#2f2f2f] rounded-xl">
                    <FileText className="w-5 h-5 text-govgreen-600 dark:text-govgreen-500 shrink-0" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-tight">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA Panel */}
            <div className="bg-[#3b3a38] text-white rounded-3xl p-6 shadow-xl dark:shadow-none space-y-5 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
              
              <div>
                <h3 className="text-lg font-black">Guided Multi-step Application</h3>
                <p className="text-xs text-slate-300 leading-relaxed mt-2 px-2">
                  Submit details, upload certifications, run automatic OCR checks, and send file to the Admin desk.
                </p>
              </div>

              {el.score === 100 ? (
                <Link
                  to={`/apply/${scheme._id}`}
                  className="w-full py-3.5 bg-govgreen-500 hover:bg-govgreen-600 text-white font-black rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer text-sm uppercase tracking-wider"
                >
                  <span>Apply Online Now</span>
                  <ChevronRight className="w-5 h-5" />
                </Link>
              ) : el.score >= 50 ? (
                <div className="space-y-3">
                  <Link
                    to={`/apply/${scheme._id}`}
                    className="w-full py-3.5 bg-[#ffa400] hover:bg-[#e69400] text-slate-900 font-black rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer text-sm uppercase tracking-wider"
                  >
                    <span>Proceed Application</span>
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                  <p className="text-[11px] text-[#ffa400] leading-snug px-2">
                    ⚠️ Mismatches detected. You may still apply, but officers might request clarification.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    disabled
                    className="w-full py-3.5 bg-[#2a2a2a] text-slate-500 font-black rounded-xl cursor-not-allowed text-sm uppercase tracking-wider border border-slate-600/30"
                  >
                    Locked / Not Eligible
                  </button>
                  <p className="text-[11px] text-slate-400 leading-snug px-2">
                    You do not meet core requirements. Please update your profile parameters if they were entered incorrectly.
                  </p>
                </div>
              )}

              <div className="border-t border-white/10 pt-4 flex items-center justify-center space-x-2 text-xs text-slate-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#ffa400]" />
                <span>Government Secure Portal Link</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetail;
