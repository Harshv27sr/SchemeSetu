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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
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
              <span className="text-xs font-bold text-govblue-600 dark:text-govblue-400 bg-govblue-50 dark:bg-govblue-950/30 px-2.5 py-0.5 rounded-full uppercase">
                {scheme.state === "Central" ? "Central Scheme" : `${scheme.state} State Policy`}
              </span>
              <span className="text-xs font-bold text-govgreen-600 dark:text-govgreen-400 bg-govgreen-50 dark:bg-govgreen-950/20 px-2.5 py-0.5 rounded-full uppercase">
                Active
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">{scheme.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-slate-400 dark:text-slate-500 font-medium pt-1">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4 text-slate-300 dark:text-slate-500" />
                <span>Deadline: {new Date(scheme.deadline).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <IndianRupee className="w-4 h-4 text-slate-300 dark:text-slate-500" />
                <span>Income Cap: ₹{scheme.eligibility.maxIncome.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Big Eligibility match score */}
          {user?.profile?.fullName && (
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5 p-4 rounded-2xl w-full md:w-44 shrink-0 text-center space-y-1">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">Your Eligibility</span>
              <span className={`text-3xl font-extrabold block ${
                el.score === 100 ? 'text-govgreen-600 dark:text-govgreen-400' : el.score >= 50 ? 'text-amber-500 dark:text-amber-400' : 'text-slate-400 dark:text-slate-500'
              }`}>{el.score}%</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block mt-1 ${
                el.status === 'Eligible' 
                  ? 'bg-govgreen-50 dark:bg-govgreen-950/20 text-govgreen-700 dark:text-govgreen-400' 
                  : el.status === 'Partially Eligible' 
                  ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}>
                {el.status === 'Eligible' ? 'Fully Eligible' : el.status === 'Partially Eligible' ? 'Partially Eligible' : 'Not Eligible'}
              </span>
            </div>
          )}
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Extensive Details */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Details Section */}
            <div className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200/60 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-sm dark:shadow-none">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-4">Details</h2>
              <div className="markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {scheme.detailedDescription || scheme.description}
                </ReactMarkdown>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200/60 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-sm dark:shadow-none">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-4">Benefits</h2>
              <div className="markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {scheme.detailedBenefits || scheme.benefits}
                </ReactMarkdown>
              </div>
            </div>

            {/* Eligibility Section */}
            <div className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200/60 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-sm dark:shadow-none">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-4">Eligibility</h2>
              
              {/* Automated Eligibility Matcher */}
              {user?.profile?.fullName ? (
                <div className="mb-6 space-y-3.5 p-4 bg-slate-100/50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5 rounded-2xl">
                  <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Your Automated Match Results</h3>
                  {el.reasons.map((reason, idx) => (
                    <div 
                      key={idx}
                      className={`p-3 border rounded-xl flex items-start justify-between gap-4 transition-all ${
                        reason.matched 
                          ? 'bg-govgreen-50/10 dark:bg-govgreen-950/10 border-govgreen-100/50 dark:border-govgreen-900/20 text-slate-700 dark:text-slate-300' 
                          : 'bg-rose-50/5 dark:bg-rose-950/10 border-rose-100/50 dark:border-rose-900/20 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <div className="flex items-start space-x-2.5">
                        <span className="mt-0.5 shrink-0">
                          {reason.matched ? (
                            <CheckCircle2 className="w-4 h-4 text-govgreen-600 dark:text-govgreen-400" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-500 dark:text-rose-400" />
                          )}
                        </span>
                        <div className="text-sm font-medium">
                          <p className={reason.matched ? "text-slate-800 dark:text-slate-200" : "text-slate-700 dark:text-slate-300"}>{reason.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mb-6 p-4 bg-slate-100/50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5 rounded-2xl flex items-center justify-between">
                  <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Sign in to automatically check your eligibility.</span>
                  <Link to="/login" className="text-sm text-govblue-600 dark:text-govblue-400 font-bold hover:underline">Log In &rarr;</Link>
                </div>
              )}

              {/* Detailed Markdown Eligibility */}
              <div className="markdown-content border-t border-slate-200 dark:border-white/10 pt-6">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {scheme.detailedEligibility || "Please refer to the general guidelines."}
                </ReactMarkdown>
              </div>
            </div>

            {/* Application Process Section */}
            <div className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200/60 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-sm dark:shadow-none">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-4">Application Process</h2>
              <div className="markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {scheme.applicationProcess || "Apply via the official portal or your local CSC."}
                </ReactMarkdown>
              </div>
            </div>
            
            {/* Documents Required */}
            <div className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200/60 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-sm dark:shadow-none space-y-4">
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-4">Documents Required</h2>
              <div className="markdown-content">
                <ol>
                  {scheme.requiredDocuments.map((doc, idx) => (
                    <li key={idx}><strong>{doc}</strong></li>
                  ))}
                </ol>
              </div>
            </div>

          </div>

          {/* Right Column: Action Panel */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            
            {/* Action CTA Panel */}
            <div className="bg-gradient-gov dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-800 text-white rounded-3xl p-6 shadow-xl dark:shadow-none border dark:border-white/5 space-y-4 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
              <h3 className="text-xl font-extrabold">Ready to Apply?</h3>
              <p className="text-sm text-govblue-100 dark:text-slate-400 leading-normal">
                Submit details, upload certifications, run automatic OCR checks, and send file to the Admin desk.
              </p>

              {el.score === 100 ? (
                <Link
                  to={`/apply/${scheme._id}`}
                  className="w-full py-3 bg-govgreen-500 hover:bg-govgreen-600 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer text-sm uppercase"
                >
                  <span>Apply Online Now</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : el.score >= 50 ? (
                <div className="space-y-2">
                  <Link
                    to={`/apply/${scheme._id}`}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer text-sm uppercase"
                  >
                    <span>Proceed Application</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <p className="text-xs text-amber-200 dark:text-amber-400 leading-snug">
                    ⚠️ Mismatches detected. You may still apply, but officers might request clarification.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    disabled
                    className="w-full py-3 bg-slate-800 text-slate-500 font-bold rounded-xl cursor-not-allowed text-sm uppercase border border-slate-700"
                  >
                    Locked / Not Eligible
                  </button>
                  <p className="text-xs text-slate-400 dark:text-slate-500 leading-snug">
                    You do not meet core requirements. Please update your profile parameters if they were entered incorrectly.
                  </p>
                </div>
              )}

              <div className="border-t border-white/10 dark:border-white/5 pt-3 flex items-center justify-center space-x-1.5 text-xs text-govblue-200 dark:text-slate-400">
                <ShieldCheck className="w-4 h-4 text-govgreen-400" />
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
