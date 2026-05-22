import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Search, FileText, CheckCircle2, AlertCircle, Clock, ArrowRight, Upload, Sparkles, Calendar, ChevronRight, Activity, X, Trash2 } from 'lucide-react';

const Dashboard = () => {
  const { user, getRecommendedSchemes, applications, tickets, uploadDocument, deleteDocument, raiseTicket, t } = useAuth();
  const vaultDocs = user?.documents || [];
  const [activeTab, setActiveTab] = useState('recommendations');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState('');
  
  // Premium Features States
  const [certificateApp, setCertificateApp] = useState(null);
  const [ticketQuery, setTicketQuery] = useState('');
  const [submittingQuery, setSubmittingQuery] = useState(false);

  const handleRaiseTicket = async (e) => {
    e.preventDefault();
    if (!ticketQuery.trim()) return;
    setSubmittingQuery(true);
    const res = await raiseTicket(ticketQuery);
    setSubmittingQuery(false);
    if (res.success) {
      setTicketQuery('');
    } else {
      alert("Error submitting ticket: " + res.error);
    }
  };

  const recommended = getRecommendedSchemes();
  const activeApps = applications;

  const handleUploadSimulate = async (e) => {
    e.preventDefault();
    if (!selectedDocType) return;
    setSubmittingQuery(true);
    const fileName = `certificate_${selectedDocType.toLowerCase().replace(/\s+/g, '_')}_scanned.png`;
    const res = await uploadDocument(selectedDocType, fileName);
    setSubmittingQuery(false);
    if (res.success) {
      setUploadModalOpen(false);
      setSelectedDocType('');
    } else {
      alert("Upload failed: " + res.error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'text-govgreen-700 bg-govgreen-50 dark:bg-govgreen-950/30 border-govgreen-200 dark:border-govgreen-900/30 dark:text-govgreen-400';
      case 'Rejected': return 'text-rose-700 bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/30 dark:text-rose-400';
      case 'Verified': return 'text-indigo-700 bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-900/30 dark:text-indigo-400';
      case 'Under Review': return 'text-amber-700 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/30 dark:text-amber-400';
      default: return 'text-govblue-700 bg-govblue-50 dark:bg-govblue-950/30 border-govblue-200 dark:border-govblue-900/30 dark:text-govblue-400';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors duration-300">
      {/* Greetings bar */}
      <div className="bg-gradient-gov text-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-govgreen-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI recommendation engine active</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Namaste, {user?.name || "Citizen"}!
          </h1>
          <p className="text-xs md:text-sm text-govblue-100 max-w-xl">
            Welcome to your SchemeSetu portal. We've matched your profile parameters against 10+ central and state policies to recommend the highest matching payouts.
          </p>
        </div>
      </div>

      {/* Highlights metrics cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 p-6 rounded-2xl shadow-sm dark:shadow-none flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Perfect Scheme Matches</h3>
            <p className="text-3xl font-extrabold text-govblue-900 dark:text-white mt-1">{recommended.filter(s => s.eligibilityResult?.score === 100).length} Schemes</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">100% eligibility met</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-govblue-50 dark:bg-govblue-900/20 text-govblue-600 dark:text-govblue-450 flex items-center justify-center font-bold text-lg">
            ✓
          </div>
        </div>

        <div className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 p-6 rounded-2xl shadow-sm dark:shadow-none flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Active Claims</h3>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">{activeApps.length} Submitted</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">In official verification process</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-govgreen-50 dark:bg-govgreen-900/20 text-govgreen-600 dark:text-govgreen-450 flex items-center justify-center font-bold text-lg">
            📝
          </div>
        </div>

        <div className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 p-6 rounded-2xl shadow-sm dark:shadow-none flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Verified Files</h3>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">{vaultDocs.filter(d => d.status === "Verified").length} Saved</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Stored securely inside MongoDB</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-lg">
            📂
          </div>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Dynamic tabs panel */}
        <div className="lg:col-span-8 space-y-6">
          {/* Tab Navigation header */}
          <div className="flex border-b border-slate-200 dark:border-white/10">
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`py-3.5 px-6 font-bold text-sm border-b-2 transition-all cursor-pointer ${
                activeTab === 'recommendations'
                  ? 'border-govblue-600 text-govblue-700 dark:text-govblue-400 dark:border-govblue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              🎯 {t('recommendedTitle')}
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`py-3.5 px-6 font-bold text-sm border-b-2 transition-all cursor-pointer ${
                activeTab === 'applications'
                  ? 'border-govblue-600 text-govblue-700 dark:text-govblue-400 dark:border-govblue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              🔄 {t('applicationStatusTitle')} ({activeApps.length})
            </button>
            <button
              onClick={() => setActiveTab('dbt')}
              className={`py-3.5 px-6 font-bold text-sm border-b-2 transition-all cursor-pointer ${
                activeTab === 'dbt'
                  ? 'border-govblue-600 text-govblue-700 dark:text-govblue-400 dark:border-govblue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              💰 DBT Payouts
            </button>
          </div>

          {/* Recommendations Tab Content */}
          {activeTab === 'recommendations' && (
            <div className="space-y-6">
              {!user?.profile?.fullName ? (
                <div className="p-8 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-3xl text-center space-y-4">
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto text-lg font-bold">⚠</div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">{t('noMatches')}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    Fill out your age, occupation, caste category, and state of residency to unlock high-fidelity government matching algorithms.
                  </p>
                  <Link 
                    to="/profile" 
                    className="inline-flex items-center space-x-1.5 px-6 py-2.5 bg-govblue-600 hover:bg-govblue-700 text-white font-bold rounded-xl shadow-md cursor-pointer"
                  >
                    <span>{t('completeProfileBtn')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recommended.map(scheme => {
                    const el = scheme.eligibilityResult || { score: 100, status: 'Eligible', reasons: [] };
                    return (
                      <div 
                        key={scheme._id}
                        className="bg-slate-50/90 hover:bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-white/5 rounded-3xl p-6 shadow-sm hover:shadow-lg dark:hover:border-white/10 transition-all flex flex-col justify-between"
                      >
                        <div>
                          {/* Top badge */}
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] font-bold text-govblue-600 dark:text-govblue-400 bg-govblue-50 dark:bg-govblue-900/30 px-2.5 py-0.5 rounded-full uppercase">
                              {scheme.state === "Central" ? "Central Scheme" : `${scheme.state} State`}
                            </span>
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                              el.score === 100 
                                ? 'bg-govgreen-50 dark:bg-govgreen-950/30 text-govgreen-700 dark:text-govgreen-450' 
                                : el.score >= 50 
                                ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-450' 
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                            }`}>
                              {el.score}% Match
                            </span>
                          </div>

                          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 leading-tight mb-2 line-clamp-1">{scheme.title}</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">{scheme.description}</p>

                          {/* Matching scorecard progress */}
                          <div className="space-y-1.5 mb-4">
                            <div className="flex justify-between text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                              <span>Match Score</span>
                              <span>{el.score}% Eligibility</span>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-300 ${
                                  el.score === 100 ? 'bg-govgreen-500' : 'bg-govblue-600'
                                }`}
                                style={{ width: `${el.score}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        {/* Apply card CTA */}
                        <div className="border-t border-slate-100 dark:border-white/5 pt-4 flex items-center justify-between">
                          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                            Deadline: {new Date(scheme.deadline).toLocaleDateString()}
                          </div>
                          <Link
                            to={`/schemes/${scheme._id}`}
                            className="px-4.5 py-2 text-xs font-bold text-white bg-govblue-600 hover:bg-govblue-700 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center cursor-pointer"
                          >
                            <span>Check & Apply</span>
                            <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Active Applications Tab Content */}
          {activeTab === 'applications' && (
            <div className="space-y-6">
              {activeApps.length === 0 ? (
                <div className="p-8 bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-white/5 rounded-3xl text-center text-slate-500 dark:text-slate-400">
                  <p className="text-sm font-medium">{t('noApplications')}</p>
                  <Link to="/schemes" className="text-xs text-govblue-600 dark:text-govblue-400 font-bold hover:underline mt-2 inline-block">
                    Explore active schemas catalog and submit your first claim &rarr;
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {activeApps.map(app => (
                    <div 
                      key={app._id}
                      className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-3xl p-6 shadow-sm dark:shadow-none space-y-6"
                    >
                      {/* App header bar */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-100 dark:border-white/5 gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Application Reference #{app._id.substring(app._id.length - 8)}</span>
                          <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">{app.scheme?.title || "Indian Government Scheme"}</h3>
                        </div>
                        <span className={`px-3 py-1 text-xs font-bold rounded-xl border uppercase tracking-wider ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </div>

                      {/* Document scans status summary */}
                      {app.validationResult && (
                        <div className={`p-4 rounded-2xl border ${
                          app.validationResult.status === "Success" 
                            ? 'bg-govgreen-50 dark:bg-govgreen-950/20 border-govgreen-100 dark:border-govgreen-900/30 text-govgreen-800 dark:text-govgreen-400' 
                            : 'bg-rose-50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/30 text-rose-800 dark:text-rose-455'
                        } text-xs font-semibold flex items-start space-x-2`}>
                          <span className="text-sm">{app.validationResult.status === "Success" ? "✅" : "⚠"}</span>
                          <div>
                            <p className="font-bold">{app.validationResult.status === "Success" ? "OCR Validation Verified" : "OCR Verification Mismatch Notice"}</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium leading-relaxed">{app.validationResult.remarks}</p>
                          </div>
                        </div>
                      )}

                      {/* Real-time application flow timeline tracker */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Claim Processing Timeline</h4>
                        <div className="relative pl-6 space-y-6 border-l-2 border-slate-100 dark:border-white/5">
                          {/* Stage 1 */}
                          <div className="relative">
                            <span className="absolute -left-9.5 top-0.5 w-6 h-6 rounded-full bg-govgreen-100 dark:bg-govgreen-950/30 text-govgreen-600 dark:text-govgreen-400 flex items-center justify-center font-bold text-xs">✓</span>
                            <div className="flex justify-between text-xs">
                              <span className="font-bold text-slate-800 dark:text-slate-200">Application Submitted</span>
                              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">{new Date(app.submittedAt).toLocaleDateString()}</span>
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Files uploaded successfully to official secure vault.</p>
                          </div>

                          {/* Stage 2 */}
                          <div className="relative">
                            <span className={`absolute -left-9.5 top-0.5 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                              ['Under Review', 'Verified', 'Approved', 'Rejected'].includes(app.status)
                                ? 'bg-govgreen-100 dark:bg-govgreen-950/30 text-govgreen-600 dark:text-govgreen-400'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 animate-pulse'
                            }`}>
                              {['Under Review', 'Verified', 'Approved', 'Rejected'].includes(app.status) ? '✓' : '2'}
                            </span>
                            <div className="flex justify-between text-xs">
                              <span className={`font-bold ${['Under Review', 'Verified', 'Approved', 'Rejected'].includes(app.status) ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500'}`}>
                                OCR & Schema Verified
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Auto validation comparing parameters against criteria completed.</p>
                          </div>

                          {/* Stage 3 */}
                          <div className="relative">
                            <span className={`absolute -left-9.5 top-0.5 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                              ['Verified', 'Approved', 'Rejected'].includes(app.status)
                                ? 'bg-govgreen-100 dark:bg-govgreen-950/30 text-govgreen-600 dark:text-govgreen-400'
                                : app.status === 'Under Review'
                                ? 'bg-govblue-100 dark:bg-govblue-900/30 text-govblue-600 dark:text-govblue-400 pulse-glow'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                            }`}>
                              {['Verified', 'Approved', 'Rejected'].includes(app.status) ? '✓' : '3'}
                            </span>
                            <div className="flex justify-between text-xs">
                              <span className={`font-bold ${['Under Review', 'Verified', 'Approved', 'Rejected'].includes(app.status) ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500'}`}>
                                Under Official Desk Review
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">District Officer verifying Caste and Income details.</p>
                          </div>

                          {/* Stage 4 */}
                          <div className="relative">
                            <span className={`absolute -left-9.5 top-0.5 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                              app.status === 'Approved'
                                ? 'bg-govgreen-600 text-white'
                                : app.status === 'Rejected'
                                ? 'bg-rose-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                            }`}>
                              {app.status === 'Approved' ? '✓' : app.status === 'Rejected' ? '✗' : '4'}
                            </span>
                            <div className="flex justify-between text-xs">
                              <span className={`font-bold ${['Approved', 'Rejected'].includes(app.status) ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400 dark:text-slate-500'}`}>
                                Payout Disbursement
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Sanction letter issuance and direct bank benefit release.</p>
                            {app.status === 'Approved' && (
                              <button
                                onClick={() => setCertificateApp(app)}
                                className="mt-3 inline-flex items-center space-x-1.5 px-3 py-1.5 bg-govgreen-50 dark:bg-govgreen-950/30 hover:bg-govgreen-100 dark:hover:bg-govgreen-900/40 text-govgreen-700 dark:text-govgreen-450 text-[11px] font-bold rounded-xl border border-govgreen-200 dark:border-govgreen-900/30 transition-all cursor-pointer"
                              >
                                📄 View Official Sanction Letter
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* DBT Payouts Tab Content */}
          {activeTab === 'dbt' && (
            <div className="space-y-6">
              {activeApps.filter(app => app.status === 'Approved').length === 0 ? (
                <div className="space-y-6">
                  {/* Educational banner */}
                  <div className="p-6 bg-slate-50/90 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-3xl space-y-4">
                    <div className="flex items-start space-x-3.5">
                      <div className="w-10 h-10 rounded-xl bg-govblue-50 dark:bg-govblue-900/30 text-govblue-600 dark:text-govblue-450 flex items-center justify-center font-bold text-lg shrink-0">
                        ℹ
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Aadhaar Payment Bridge System (APBS)</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          Your payouts are processed using the Aadhaar Payment Bridge System (APBS) in compliance with the National Payments Corporation of India (NPCI). Once an administrative desk officer approves your application, benefits will be credited directly to your Aadhaar-linked active bank account.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 bg-slate-50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-white/5 rounded-3xl text-center text-slate-500 dark:text-slate-400">
                    <p className="text-sm font-medium">No active DBT payouts found.</p>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                      Direct benefits will appear here automatically once your application has successfully passed the officer review and changed status to "Approved".
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="p-4 bg-govgreen-50 dark:bg-govgreen-950/20 border border-govgreen-100 dark:border-govgreen-900/30 rounded-2xl flex items-center space-x-3">
                    <span className="text-lg">💰</span>
                    <div>
                      <h4 className="text-xs font-bold text-govgreen-800 dark:text-govgreen-400">Active Direct Benefit Transfer (DBT) Payouts</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Funds are disbursed directly via NPCI bridge routing to your Aadhaar-linked accounts.</p>
                    </div>
                  </div>

                  {activeApps.filter(app => app.status === 'Approved').map(app => {
                    // Generate nice mock details
                    const isKisan = app.scheme?.title?.includes("Kisan") || app.schemeId === "scheme_pm_kisan";
                    const isScholar = app.scheme?.title?.includes("Scholarship") || app.schemeId === "scheme_post_matric";
                    const isAwas = app.scheme?.title?.includes("Awas") || app.schemeId === "scheme_pmay";
                    const isLado = app.scheme?.title?.includes("Lado") || app.schemeId === "scheme_lado_protsahan";
                    
                    let payoutAmount = "₹12,000";
                    if (isKisan) payoutAmount = "₹6,000 (Installment: ₹2,000)";
                    else if (isScholar) payoutAmount = "₹15,000";
                    else if (isAwas) payoutAmount = "₹1,20,000";
                    else if (isLado) payoutAmount = "₹1,00,000";

                    const txId = `NPCI-APBS-${app._id.substring(app._id.length - 6).toUpperCase()}-9817`;
                    
                    return (
                      <div key={app._id} className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-3xl p-6 shadow-sm dark:shadow-none space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">TRANSACTION SECURE LEDGER</span>
                            <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">{app.scheme?.title}</h3>
                          </div>
                          <span className="px-2.5 py-0.5 text-[10px] font-bold bg-govgreen-100 dark:bg-govgreen-950/30 text-govgreen-755 dark:text-govgreen-455 border border-govgreen-200 dark:border-govgreen-900/30 rounded-full uppercase tracking-wider">
                            Disbursed
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-3 border-t border-b border-slate-100 dark:border-white/5 text-xs">
                          <div>
                            <p className="text-slate-400 dark:text-slate-500 font-semibold uppercase text-[9px]">Sanctioned Payout</p>
                            <p className="font-extrabold text-govgreen-700 dark:text-govgreen-455 mt-0.5 text-sm">{payoutAmount}</p>
                          </div>
                          <div>
                            <p className="text-slate-400 dark:text-slate-500 font-semibold uppercase text-[9px]">Linked Bank Bridge</p>
                            <p className="font-bold text-slate-700 dark:text-slate-300 mt-0.5">State Bank of India (*******3928)</p>
                          </div>
                          <div>
                            <p className="text-slate-400 dark:text-slate-500 font-semibold uppercase text-[9px]">APBS Reference Ref</p>
                            <p className="font-mono text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">{txId}</p>
                          </div>
                          <div>
                            <p className="text-slate-400 dark:text-slate-500 font-semibold uppercase text-[9px]">Disbursal Timestamp</p>
                            <p className="font-bold text-slate-700 dark:text-slate-350 mt-0.5">{new Date(app.submittedAt).toLocaleDateString()}</p>
                          </div>
                        </div>

                        <div className="flex space-x-2.5 pt-1">
                          <button
                            onClick={() => setCertificateApp(app)}
                            className="flex-1 py-2 text-xs font-bold text-govgreen-700 dark:text-govgreen-450 bg-govgreen-50 dark:bg-govgreen-950/30 hover:bg-govgreen-100 dark:hover:bg-govgreen-900/40 border border-govgreen-200 dark:border-govgreen-900/30 rounded-xl cursor-pointer transition-all text-center"
                          >
                            📄 View Sanction Order
                          </button>
                          <a
                            href={`https://local-dbt-gateway.gov.in/track/${txId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => { e.preventDefault(); alert(`Redirecting to Secure NPCI Direct Benefit Transfer portal for Reference: ${txId}. Gateway response: SUCCESS.`); }}
                            className="flex-1 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-all text-center"
                          >
                            🔗 Track on PFMS Portal
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Document Center & Reminders */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Document center panel */}
          <div className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-3xl p-6 shadow-sm dark:shadow-none space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-extrabold text-slate-800 dark:text-white">{t('uploadedDocumentsTitle')}</h3>
              <button
                onClick={() => setUploadModalOpen(true)}
                className="p-1.5 bg-govblue-50 dark:bg-govblue-900/20 text-govblue-600 dark:text-govblue-400 hover:bg-govblue-100 dark:hover:bg-govblue-900/40 rounded-lg text-xs font-bold flex items-center space-x-1 cursor-pointer transition-all"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload</span>
              </button>
            </div>

            <div className="space-y-3.5">
              {user?.documents?.length === 0 ? (
                <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-4">No documents uploaded yet. Upload certificates to verify eligibility.</p>
              ) : (
                user?.documents?.map((doc, idx) => (
                  <div 
                    key={doc._id || idx}
                    className="p-3 bg-slate-50/50 dark:bg-slate-950 hover:bg-slate-100/80 dark:hover:bg-slate-900/60 border border-slate-200/50 dark:border-white/5 rounded-xl transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2.5 max-w-[70%]">
                      <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm dark:shadow-none text-lg shrink-0">
                        📁
                      </div>
                      <div className="truncate">
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight truncate" title={doc.type}>{doc.type}</h4>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium truncate" title={doc.name}>{doc.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 shrink-0">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        doc.status === 'Verified' 
                          ? 'bg-govgreen-50 dark:bg-govgreen-950/30 text-govgreen-600 dark:text-govgreen-450' 
                          : 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-450'
                      }`}>
                        {doc.status}
                      </span>
                      <button
                        onClick={() => deleteDocument(doc._id)}
                        className="p-1 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-500 hover:text-rose-700 rounded transition-colors cursor-pointer"
                        title="Delete document"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Deadline reminders panel */}
          <div className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-3xl p-6 shadow-sm dark:shadow-none space-y-4">
            <h3 className="text-base font-extrabold text-slate-800 dark:text-white flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-amber-500" />
              <span>{t('deadlineReminder')}</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100/50 dark:border-rose-900/30 rounded-xl flex justify-between items-center animate-none">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">Post Matric Scholarship</h4>
                  <p className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold mt-0.5">Closes July 31, 2026</p>
                </div>
                <span className="text-[10px] font-extrabold text-rose-700 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/30 px-2 py-0.5 rounded-full shrink-0">
                  Closing Soon
                </span>
              </div>

              <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100/50 dark:border-amber-900/30 rounded-xl flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200">PM Kisan Payouts</h4>
                  <p className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold mt-0.5">Closes Aug 15, 2026</p>
                </div>
                <span className="text-[10px] font-extrabold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/30 px-2 py-0.5 rounded-full shrink-0">
                  2 Months Left
                </span>
              </div>
            </div>
          </div>

          {/* Grievance Redressal Support Desk Widget */}
          <div className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-3xl p-6 shadow-sm dark:shadow-none space-y-4">
            <h3 className="text-base font-extrabold text-slate-800 dark:text-white flex items-center space-x-2">
              <span>🎧 Helpdesk & Grievance desk</span>
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
              Have doubts about documents or eligibility rules? Raise a ticket below. Our simulated regional desk officer will review it.
            </p>

            <form onSubmit={handleRaiseTicket} className="space-y-2.5">
              <textarea
                rows="2"
                required
                value={ticketQuery}
                onChange={(e) => setTicketQuery(e.target.value)}
                placeholder="Ask a question about scheme documents or status..."
                className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-govblue-500 placeholder-slate-400 dark:placeholder-slate-600 resize-none"
              ></textarea>
              <button
                type="submit"
                disabled={submittingQuery}
                className="w-full py-2 bg-govblue-600 hover:bg-govblue-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all flex items-center justify-center space-x-1"
              >
                <span>{submittingQuery ? "Filing Ticket..." : "⚡ Raise Support Query"}</span>
              </button>
            </form>

            <div className="border-t border-slate-100 dark:border-white/5 pt-3.5 space-y-3 max-h-56 overflow-y-auto pr-1">
              {tickets.length === 0 ? (
                <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-4">No support queries filed yet.</p>
              ) : (
                tickets.map((t) => (
                  <div key={t._id} className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5 rounded-xl space-y-2">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-mono text-slate-400 font-bold">{t.ticketId}</span>
                      <span className={`px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wider text-[9px] ${
                        t.status === 'Resolved'
                          ? 'bg-govgreen-50 dark:bg-govgreen-950/20 text-govgreen-600 dark:text-govgreen-450'
                          : t.status === 'Officer Responded'
                          ? 'bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400'
                          : 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400'
                      }`}>
                        {t.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-350 font-bold leading-snug">{t.query}</p>
                    {t.reply && (
                      <div className="pl-2 border-l-2 border-indigo-400 dark:border-indigo-650 bg-indigo-50/20 dark:bg-indigo-950/10 p-2 rounded-r-lg space-y-1">
                        <p className="text-[9px] text-indigo-600 dark:text-indigo-455 font-extrabold flex items-center space-x-1">
                          <span>👮 Desk Officer Reply:</span>
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">{t.reply}</p>
                      </div>
                    )}
                    <p className="text-[9px] text-slate-400 dark:text-slate-500 text-right">{new Date(t.createdAt || t.date).toLocaleDateString()}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Upload Document Modal Panel (Interactive Simulation) */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div 
            className="bg-slate-50/95 dark:bg-slate-900 rounded-3xl p-6 max-w-sm w-full border border-slate-200/50 dark:border-white/10 shadow-2xl dark:shadow-none relative space-y-4"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <button
              onClick={() => setUploadModalOpen(false)}
              className="absolute top-4 right-4 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-extrabold text-slate-800 dark:text-white">Upload to Document Vault</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
              Upload credentials in PDF, JPG, or PNG formats. Files will be parsed securely for validation.
            </p>

            <form onSubmit={handleUploadSimulate} className="space-y-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-350">Select Document Type</label>
                <select
                  required
                  value={selectedDocType}
                  onChange={(e) => setSelectedDocType(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-white rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-govblue-500 focus:border-transparent cursor-pointer"
                >
                  <option value="">-- Choose Type --</option>
                  <option value="Aadhaar Card">Aadhaar Card</option>
                  <option value="Income Certificate">Income Certificate</option>
                  <option value="Caste Certificate">Caste Certificate</option>
                  <option value="Marksheet">Academic Marksheet</option>
                  <option value="Passport Photo">Passport Size Photo</option>
                </select>
              </div>

              {/* Fake file select box */}
              <div className="border-2 border-dashed border-slate-200 dark:border-white/10 hover:border-govblue-500 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100/40 rounded-2xl p-6 text-center transition-all cursor-pointer">
                <Upload className="w-8 h-8 text-slate-300 dark:text-slate-650 mx-auto mb-2" />
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 block">Click or Drag Certificate here</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-1">PDF, JPG, PNG (Max 5MB)</span>
              </div>

              <div className="pt-2 flex space-x-2">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="flex-1 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-bold text-white bg-govblue-600 hover:bg-govblue-700 rounded-xl shadow-md cursor-pointer text-center"
                >
                  Simulate Upload
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Official Government Sanction Certificate Modal (Download/Printable Overlay) */}
      {certificateApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto print:p-0">
          <motion.div 
            className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-3xl p-6 md:p-8 max-w-2xl w-full border-4 border-double border-govblue-600 dark:border-govblue-450 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto print:p-0 print:border-none print:shadow-none print:max-h-none"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {/* Close button (Hidden during Print) */}
            <button
              onClick={() => setCertificateApp(null)}
              className="absolute top-4 right-4 p-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-slate-400 dark:text-slate-350 cursor-pointer print:hidden"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Print Friendly Certificate Container */}
            <div id="sanction-order-print-area" className="space-y-6">
              {/* Official Crest Header */}
              <div className="text-center border-b-2 border-slate-250 dark:border-white/10 pb-4 space-y-1 relative">
                {/* Ashoka Emblem Vector representation using beautiful CSS layout */}
                <div className="w-12 h-14 bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/30 rounded-lg flex flex-col items-center justify-center mx-auto mb-1 shrink-0">
                  <span className="text-xl">🦁</span>
                  <span className="text-[7px] font-extrabold text-amber-600 dark:text-amber-450 uppercase tracking-tighter -mt-1">सत्यमेव जयते</span>
                </div>
                
                <h2 className="text-base font-extrabold tracking-widest text-slate-900 dark:text-white uppercase">GOVERNMENT OF INDIA</h2>
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-455 uppercase tracking-wider">Department of Welfare & Direct Benefit Transfer</h3>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">Reference Code: SANCTION-ORD-{certificateApp._id.substring(certificateApp._id.length - 8).toUpperCase()}-2026</p>
              </div>

              {/* Sanction Statement */}
              <div className="space-y-4 text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                <p>
                  This is to officially certify and record that the claim application submitted by Citizen <strong>{user?.profile?.fullName || user?.name || "Beneficiary"}</strong> has successfully matched all eligibility criteria and passed rigorous multi-level administrative checks.
                </p>
                <p>
                  Under the guidelines of the <strong>{certificateApp.scheme?.title}</strong>, the competent sanctioning authority hereby releases the financial benefits directly through Aadhaar seeded bank mapping.
                </p>
              </div>

              {/* Beneficiary Parameters Table */}
              <div className="border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden text-xs">
                <div className="bg-slate-50 dark:bg-slate-950 px-4 py-2 border-b border-slate-200 dark:border-white/10 flex justify-between font-bold text-slate-900 dark:text-white">
                  <span>PARAMETER</span>
                  <span>RECORDED CREDENTIALS</span>
                </div>
                
                <div className="divide-y divide-slate-200 dark:divide-white/10">
                  <div className="px-4 py-2 flex justify-between">
                    <span className="font-semibold text-slate-400 dark:text-slate-500">Beneficiary Name</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{user?.profile?.fullName || user?.name}</span>
                  </div>
                  <div className="px-4 py-2 flex justify-between">
                    <span className="font-semibold text-slate-400 dark:text-slate-500">Scheme Sanctioned</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{certificateApp.scheme?.title}</span>
                  </div>
                  <div className="px-4 py-2 flex justify-between">
                    <span className="font-semibold text-slate-400 dark:text-slate-500">Disbursed Amount</span>
                    <span className="font-extrabold text-govgreen-600 dark:text-govgreen-455">
                      {certificateApp.schemeId === "scheme_pm_kisan" ? "₹6,000 / Year" : certificateApp.schemeId === "scheme_post_matric" ? "₹15,000 Compulsory Fees" : certificateApp.schemeId === "scheme_pmay" ? "₹1,20,000 Construction Grant" : "₹1,00,000 Savings Bond"}
                    </span>
                  </div>
                  <div className="px-4 py-2 flex justify-between">
                    <span className="font-semibold text-slate-400 dark:text-slate-500">Payment Gateway</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">NPCI Aadhaar Payment Bridge (APBS)</span>
                  </div>
                  <div className="px-4 py-2 flex justify-between">
                    <span className="font-semibold text-slate-400 dark:text-slate-500">Assigned Reference</span>
                    <span className="font-mono text-slate-850 dark:text-slate-200">{certificateApp._id}</span>
                  </div>
                </div>
              </div>

              {/* Stamp Signatures & Barcode */}
              <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-slate-100 dark:border-white/5 gap-4">
                {/* Barcode Simulator */}
                <div className="space-y-1 text-center sm:text-left">
                  <div className="h-8 bg-slate-900 dark:bg-slate-700 flex items-center justify-center p-1 rounded-sm w-36 overflow-hidden">
                    {/* Simulated barcode bars */}
                    <div className="w-full h-full flex space-x-[2px] items-stretch justify-center opacity-70">
                      {[2,4,1,3,2,1,4,2,3,1,2,4,1,2,3,2,1,4,2,3].map((w, i) => (
                        <div key={i} className="bg-white" style={{ width: `${w}px` }}></div>
                      ))}
                    </div>
                  </div>
                  <p className="text-[9px] font-mono text-slate-400 dark:text-slate-500 text-center uppercase tracking-widest">NPCI-SECURE-2026</p>
                </div>

                {/* Digital Stamp Seal */}
                <div className="flex items-center space-x-2">
                  <div className="w-14 h-14 rounded-full border-2 border-dashed border-govgreen-500/50 flex flex-col items-center justify-center text-center p-1 font-bold text-[7px] text-govgreen-600 dark:text-govgreen-450 uppercase tracking-tighter shrink-0 rotate-12">
                    <span>DIGITALLY</span>
                    <span>APPROVED</span>
                    <span>2026-05-22</span>
                  </div>
                  
                  <div className="text-right text-[10px]">
                    <p className="font-bold text-slate-800 dark:text-slate-200">Signature Not Required</p>
                    <p className="text-slate-400 dark:text-slate-500 mt-0.5 leading-tight">This is an officially generated, digitally encrypted certificate under DBT APBS guidelines.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Download/Print Action Sheet */}
            <div className="pt-2 flex space-x-3.5 print:hidden">
              <button
                onClick={() => setCertificateApp(null)}
                className="flex-1 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-all text-center"
              >
                Close Certificate
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-2.5 text-xs font-bold text-white bg-govblue-600 hover:bg-govblue-700 rounded-xl shadow-md hover:shadow-lg cursor-pointer transition-all text-center"
              >
                🖨 Print Sanction Order
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

