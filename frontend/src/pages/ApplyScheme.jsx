import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, CheckCircle2, User, Calendar, MapPin, Users, Briefcase, 
  IndianRupee, Upload, ShieldCheck, AlertTriangle, FileText, ChevronRight, Play, Sparkles
} from 'lucide-react';

const ApplyScheme = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { schemes, user, calculateEligibility, runLocalOCRValidation, applyToScheme, t } = useAuth();

  const scheme = schemes.find(s => s._id === id);

  // Core wizard step state (1 to 5)
  const [step, setStep] = useState(1);
  const [loadingOCR, setLoadingOCR] = useState(false);
  const [ocrCompleted, setOcrCompleted] = useState(false);
  
  // Document uploaded state variables
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [ocrResult, setOcrResult] = useState(null);

  // Demo selector to simulate perfect vs mismatch OCR checks
  const [ocrScenario, setOcrScenario] = useState('mismatch'); // 'success' or 'mismatch'
  const [nameOnAadhaar, setNameOnAadhaar] = useState('Rahul Sharma');
  const [nameOnIncome, setNameOnIncome] = useState(user?.profile?.fullName || 'Rahul S.');
  const [dobOnAadhaar, setDobOnAadhaar] = useState('15/08/1992');
  const [dobOnIncome, setDobOnIncome] = useState('15/08/1992');

  const [submitting, setSubmitting] = useState(false);

  if (!scheme) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Scheme Not Found</h2>
        <Link to="/schemes" className="text-sm text-govblue-600 font-bold hover:underline">&larr; Return</Link>
      </div>
    );
  }

  const el = calculateEligibility(scheme);

  const handleFileUpload = (docType, fileName) => {
    setUploadedFiles(prev => ({
      ...prev,
      [docType]: {
        name: fileName || "scanned_doc.png",
        size: "1.4 MB",
        url: "https://via.placeholder.com/150",
        uploadedAt: new Date().toLocaleDateString()
      }
    }));
  };

  // Simulates or processes Tesseract OCR
  const handleRunOCR = () => {
    setLoadingOCR(true);
    setOcrCompleted(false);

    // Simulate OCR scanner progress animation
    setTimeout(() => {
      // Run comparison
      const name2Compare = ocrScenario === 'success' ? nameOnAadhaar : nameOnIncome;
      const res = runLocalOCRValidation(
        "Aadhaar Card", 
        "Income Certificate", 
        nameOnAadhaar, 
        dobOnAadhaar, 
        name2Compare, 
        dobOnIncome
      );

      setOcrResult(res);
      setLoadingOCR(false);
      setOcrCompleted(true);
    }, 2500);
  };

  const handleFinalSubmit = async () => {
    setSubmitting(true);
    
    // Format files array
    const docsArray = Object.keys(uploadedFiles).map(key => ({
      type: key,
      name: uploadedFiles[key].name,
      url: uploadedFiles[key].url
    }));

    const res = await applyToScheme(scheme._id, docsArray, ocrResult);
    setSubmitting(false);
    
    if (res.success) {
      alert("🎉 Application submitted successfully to SchemeSetu database!");
      navigate('/dashboard');
    } else {
      alert("Submission error: " + res.error);
    }
  };

  const isAllDocsUploaded = () => {
    return scheme.requiredDocuments.every(doc => !!uploadedFiles[doc]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Back button */}
      <Link 
        to={`/schemes/${scheme._id}`} 
        className="inline-flex items-center space-x-1 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-govblue-600 dark:hover:text-govblue-400 mb-6 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Cancel & Exit Wizard</span>
      </Link>

      {/* Title bar */}
      <div className="mb-8">
        <span className="text-xs font-bold text-govblue-600 dark:text-govblue-400 bg-govblue-50 dark:bg-govblue-950/30 px-2.5 py-0.5 rounded-full uppercase">
          Guided Application Flow
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{scheme.title}</h1>
      </div>

      {/* Guided Progress Indicators header */}
      <div className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-3xl p-5 shadow-sm dark:shadow-none mb-8">
        <div className="flex justify-between items-center relative">
          
          {/* Progress connectors background line */}
          <div className="hidden sm:block absolute left-[8%] right-[8%] top-[18px] h-[3px] bg-slate-100 dark:bg-slate-800 -z-10"></div>
          {/* Active progress color indicator line */}
          <div 
            className="hidden sm:block absolute left-[8%] top-[18px] h-[3px] bg-govblue-600 dark:bg-govblue-500 -z-10 transition-all duration-500"
            style={{ width: `${(step - 1) * 21}%` }}
          ></div>

          {/* Step 1 */}
          <button 
            disabled={step < 1}
            onClick={() => setStep(1)}
            className="flex flex-col items-center space-y-1.5 focus:outline-none shrink-0"
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border transition-all ${
              step === 1 
                ? 'bg-govblue-600 dark:bg-govblue-500 text-white border-govblue-600 dark:border-govblue-500 shadow-md shadow-govblue-100 dark:shadow-none scale-110' 
                : step > 1 
                ? 'bg-govgreen-100 dark:bg-govgreen-950/30 border-govgreen-200 dark:border-govgreen-800/30 text-govgreen-700 dark:text-govgreen-400' 
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500'
            }`}>
              {step > 1 ? "✓" : "1"}
            </div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase hidden sm:block">Details Check</span>
          </button>

          {/* Step 2 */}
          <button 
            disabled={step < 2}
            onClick={() => setStep(2)}
            className="flex flex-col items-center space-y-1.5 focus:outline-none shrink-0"
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border transition-all ${
              step === 2 
                ? 'bg-govblue-600 dark:bg-govblue-500 text-white border-govblue-600 dark:border-govblue-500 shadow-md shadow-govblue-100 dark:shadow-none scale-110' 
                : step > 2 
                ? 'bg-govgreen-100 dark:bg-govgreen-950/30 border-govgreen-200 dark:border-govgreen-800/30 text-govgreen-700 dark:text-govgreen-400' 
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500'
            }`}>
              {step > 2 ? "✓" : "2"}
            </div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase hidden sm:block">Eligibility Match</span>
          </button>

          {/* Step 3 */}
          <button 
            disabled={step < 3}
            onClick={() => setStep(3)}
            className="flex flex-col items-center space-y-1.5 focus:outline-none shrink-0"
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border transition-all ${
              step === 3 
                ? 'bg-govblue-600 dark:bg-govblue-500 text-white border-govblue-600 dark:border-govblue-500 shadow-md shadow-govblue-100 dark:shadow-none scale-110' 
                : step > 3 
                ? 'bg-govgreen-100 dark:bg-govgreen-950/30 border-govgreen-200 dark:border-govgreen-800/30 text-govgreen-700 dark:text-govgreen-400' 
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500'
            }`}>
              {step > 3 ? "✓" : "3"}
            </div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase hidden sm:block">Upload Files</span>
          </button>

          {/* Step 4 */}
          <button 
            disabled={step < 4}
            onClick={() => setStep(4)}
            className="flex flex-col items-center space-y-1.5 focus:outline-none shrink-0"
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border transition-all ${
              step === 4 
                ? 'bg-govblue-600 dark:bg-govblue-500 text-white border-govblue-600 dark:border-govblue-500 shadow-md shadow-govblue-100 dark:shadow-none scale-110' 
                : step > 4 
                ? 'bg-govgreen-100 dark:bg-govgreen-950/30 border-govgreen-200 dark:border-govgreen-800/30 text-govgreen-700 dark:text-govgreen-400' 
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500'
            }`}>
              {step > 4 ? "✓" : "4"}
            </div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase hidden sm:block">OCR Validation</span>
          </button>

          {/* Step 5 */}
          <button 
            disabled={step < 5}
            onClick={() => setStep(5)}
            className="flex flex-col items-center space-y-1.5 focus:outline-none shrink-0"
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border transition-all ${
              step === 5 
                ? 'bg-govblue-600 dark:bg-govblue-500 text-white border-govblue-600 dark:border-govblue-500 shadow-md shadow-govblue-100 dark:shadow-none scale-110' 
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500'
            }`}>
              5
            </div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase hidden sm:block">Review & Submit</span>
          </button>
        </div>
      </div>

      {/* Main step container */}
      <div className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/40 dark:shadow-none">
        
        {/* Step 1: Personal Details Check */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="space-y-1.5 border-b border-slate-100 dark:border-white/5 pb-4">
              <h2 className="text-lg font-extrabold text-slate-800 dark:text-white">Step 1: Personal Demographic Check</h2>
              <p className="text-sm text-slate-400 dark:text-slate-500">Please review your profile parameters. These will be linked directly to your application.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl flex items-center space-x-3">
                <User className="w-5 h-5 text-govblue-600 dark:text-govblue-400 shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase block">Full Name</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{user?.profile?.fullName || user?.name || "Not Filled"}</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-govblue-600 dark:text-govblue-400 shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase block">Age</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{user?.profile?.age || "Not Filled"} years</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-govblue-600 dark:text-govblue-400 shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase block">Residency State</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{user?.profile?.state || "Not Filled"}</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl flex items-center space-x-3">
                <Users className="w-5 h-5 text-govblue-600 dark:text-govblue-400 shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase block">Social Category (Caste)</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{user?.profile?.category || "Not Filled"}</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl flex items-center space-x-3">
                <Briefcase className="w-5 h-5 text-govblue-600 dark:text-govblue-400 shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase block">Occupation</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{user?.profile?.occupation || "Not Filled"}</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl flex items-center space-x-3">
                <IndianRupee className="w-5 h-5 text-govblue-600 dark:text-govblue-400 shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase block">Annual Income</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">₹{user?.profile?.income?.toLocaleString() || "0"}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-govblue-50/5 dark:bg-govblue-950/10 border border-govblue-100/50 dark:border-govblue-900/20 rounded-2xl text-sm text-slate-500 dark:text-slate-400 font-medium">
              💡 Need to change any parameters? Go back to <Link to="/profile" className="text-govblue-600 dark:text-govblue-400 font-bold hover:underline">My Profile</Link> to edit your central dashboard database before submitting.
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-govblue-600 hover:bg-govblue-700 dark:bg-govblue-600 dark:hover:bg-govblue-700 text-white font-bold rounded-xl shadow-md dark:shadow-none flex items-center space-x-1 cursor-pointer text-sm uppercase"
              >
                <span>Check Eligibility</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Eligibility Match Checklist */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="space-y-1.5 border-b border-slate-100 dark:border-white/5 pb-4">
              <h2 className="text-lg font-extrabold text-slate-800 dark:text-white">Step 2: Eligibility Criteria Calculator</h2>
              <p className="text-sm text-slate-400 dark:text-slate-500">Verifying that your parameters satisfy this scheme's official criteria.</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm font-bold text-slate-700 dark:text-slate-300">
                <span>Verification Checklist</span>
                <span className="text-govgreen-600 dark:text-govgreen-400">{el.score}% Score Match</span>
              </div>

              <div className="space-y-3">
                {el.reasons.map((reason, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3.5 border rounded-2xl flex items-center justify-between text-sm font-semibold ${
                      reason.matched ? 'bg-govgreen-50/10 dark:bg-govgreen-950/10 border-govgreen-100 dark:border-govgreen-900/20 text-slate-800 dark:text-slate-200' : 'bg-rose-50/5 dark:bg-rose-950/10 border-rose-100 dark:border-rose-900/20 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{reason.matched ? "✅" : "❌"}</span>
                      <span>{reason.text}</span>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      reason.matched ? 'bg-govgreen-50 dark:bg-govgreen-950/20 text-govgreen-700 dark:text-govgreen-400' : 'bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-400'
                    }`}>
                      {reason.matched ? 'Match' : 'Mismatch'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2.5 bg-govgreen-600 hover:bg-govgreen-700 dark:bg-govgreen-600 dark:hover:bg-govgreen-700 text-white font-bold rounded-xl shadow-md dark:shadow-none cursor-pointer text-sm uppercase"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-govblue-600 hover:bg-govblue-700 dark:bg-govblue-600 dark:hover:bg-govblue-700 text-white font-bold rounded-xl shadow-md dark:shadow-none flex items-center space-x-1 cursor-pointer text-sm uppercase"
              >
                <span>Upload Documents</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Document Upload System */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="space-y-1.5 border-b border-slate-100 dark:border-white/5 pb-4">
              <h2 className="text-lg font-extrabold text-slate-800 dark:text-white">Step 3: Document Upload Center</h2>
              <p className="text-sm text-slate-400 dark:text-slate-500">Please upload digital copies of your credentials for OCR name checks.</p>
            </div>

            <div className="space-y-4">
              {scheme.requiredDocuments.map((docType) => {
                const isUploaded = !!uploadedFiles[docType];
                return (
                  <div 
                    key={docType}
                    className={`p-5 border rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all ${
                      isUploaded ? 'bg-govgreen-50/5 dark:bg-govgreen-950/5 border-govgreen-200 dark:border-govgreen-800/30' : 'bg-slate-50 dark:bg-slate-950 border-slate-200/60 dark:border-white/5'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2.5 rounded-xl ${isUploaded ? 'bg-govgreen-50 dark:bg-govgreen-950/20 text-govgreen-600 dark:text-govgreen-400' : 'bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500'} shadow-sm border dark:border-white/5`}>
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight">{docType}</h4>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Required format: PDF, JPG, PNG (Max 5MB)</p>
                        {isUploaded && (
                          <p className="text-xs text-govgreen-600 dark:text-govgreen-400 font-bold mt-1">
                            ✓ {uploadedFiles[docType].name} • Uploaded
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 w-full sm:w-auto">
                      {isUploaded ? (
                        <button
                          onClick={() => setUploadedFiles(prev => {
                            const copy = { ...prev };
                            delete copy[docType];
                            return copy;
                          })}
                          className="w-full sm:w-auto px-4 py-2 border border-slate-200 dark:border-white/5 bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:text-rose-600 dark:hover:text-rose-400 text-slate-700 dark:text-slate-300 rounded-xl text-sm font-bold transition-all cursor-pointer"
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          onClick={() => handleFileUpload(docType, `${docType.toLowerCase().replace(/\s+/g, '_')}_scanned.png`)}
                          className="w-full sm:w-auto px-4.5 py-2 bg-govblue-600 hover:bg-govblue-700 dark:bg-govblue-600 dark:hover:bg-govblue-700 text-white font-bold rounded-xl shadow-md dark:shadow-none text-sm flex items-center justify-center space-x-1 transition-all cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Simulate Upload</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-govgreen-600 hover:bg-govgreen-700 dark:bg-govgreen-600 dark:hover:bg-govgreen-700 text-white font-bold rounded-xl shadow-md dark:shadow-none cursor-pointer text-sm uppercase"
              >
                Back
              </button>
              <button
                disabled={!isAllDocsUploaded()}
                onClick={() => setStep(4)}
                className="px-6 py-2.5 bg-govblue-600 hover:bg-govblue-700 dark:bg-govblue-600 dark:hover:bg-govblue-700 text-white font-bold rounded-xl shadow-md dark:shadow-none flex items-center space-x-1 cursor-pointer text-sm uppercase disabled:opacity-50"
              >
                <span>Run OCR Scan</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: OCR Verification & Mismatch scan */}
        {step === 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="space-y-1.5 border-b border-slate-100 dark:border-white/5 pb-4">
              <h2 className="text-lg font-extrabold text-slate-800 dark:text-white">Step 4: OCR Document Mismatch Scanner</h2>
              <p className="text-sm text-slate-400 dark:text-slate-500">Securely analyzing uploaded certifications (Aadhaar & Income) for spelling differences.</p>
            </div>

            {/* Hackathon Demo control box */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5 rounded-2xl space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-govblue-800 dark:text-govblue-300 flex items-center space-x-1">
                  <Sparkles className="w-4 h-4 text-govblue-600 dark:text-govblue-400 animate-pulse" />
                  <span>Interactive Demonstration Scenarios:</span>
                </span>
                <div className="flex space-x-1.5">
                  <button
                    onClick={() => {
                      setOcrScenario('mismatch');
                      setOcrCompleted(false);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      ocrScenario === 'mismatch' ? 'bg-rose-600 text-white' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    ⚠ TYPO MISMATCH
                  </button>
                  <button
                    onClick={() => {
                      setOcrScenario('success');
                      setOcrCompleted(false);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      ocrScenario === 'success' ? 'bg-govgreen-600 text-white' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    ✓ SUCCESS MATCH
                  </button>
                </div>
              </div>

              {/* Editable simulation inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-semibold">
                <div className="space-y-2 bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200/60 dark:border-white/5">
                  <h4 className="font-extrabold text-slate-700 dark:text-slate-350">Aadhaar Card Extraction:</h4>
                  <div className="space-y-1 text-slate-500 dark:text-slate-400">
                    <p>Name: <input type="text" className="px-1.5 py-0.5 border rounded border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-950" value={nameOnAadhaar} onChange={(e) => setNameOnAadhaar(e.target.value)} /></p>
                    <p>DOB: <input type="text" className="px-1.5 py-0.5 border rounded border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-950 w-24" value={dobOnAadhaar} onChange={(e) => setDobOnAadhaar(e.target.value)} /></p>
                  </div>
                </div>

                <div className="space-y-2 bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200/60 dark:border-white/5">
                  <h4 className="font-extrabold text-slate-700 dark:text-slate-350">Income Certificate Extraction:</h4>
                  <div className="space-y-1 text-slate-500 dark:text-slate-400">
                    <p>Name: <input type="text" className="px-1.5 py-0.5 border rounded border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-950" value={ocrScenario === 'success' ? nameOnAadhaar : nameOnIncome} onChange={(e) => setNameOnIncome(e.target.value)} disabled={ocrScenario === 'success'} /></p>
                    <p>DOB: <input type="text" className="px-1.5 py-0.5 border rounded border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-950 w-24" value={dobOnIncome} onChange={(e) => setDobOnIncome(e.target.value)} /></p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scanning radar indicator */}
            {!ocrCompleted && !loadingOCR && (
              <div className="text-center py-6">
                <button
                  onClick={handleRunOCR}
                  className="px-6 py-3 bg-govblue-600 hover:bg-govblue-700 dark:bg-govblue-600 dark:hover:bg-govblue-700 text-white font-extrabold rounded-xl shadow-lg dark:shadow-none flex items-center space-x-1.5 mx-auto cursor-pointer text-sm uppercase"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Initialize OCR Validation Analysis</span>
                </button>
              </div>
            )}

            {loadingOCR && (
              <div className="p-8 bg-slate-50 dark:bg-slate-950 rounded-2xl text-center space-y-4 border dark:border-white/5">
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 border-4 border-govblue-200 dark:border-govblue-900/30 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-govblue-600 dark:border-govblue-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white animate-pulse">Running Tesseract.js Engine...</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-medium">Extracting names & dates of birth via optical character recognition scanner.</p>
                </div>
              </div>
            )}

            {ocrCompleted && ocrResult && (
              <motion.div 
                className={`p-5 rounded-2xl border ${
                  ocrResult.status === "Success" 
                    ? 'bg-govgreen-50 dark:bg-govgreen-950/10 border-govgreen-200 dark:border-govgreen-800/30 text-govgreen-800 dark:text-govgreen-400' 
                    : 'bg-rose-50 dark:bg-rose-950/10 border-rose-200 dark:border-rose-800/30 text-rose-800 dark:text-rose-400'
                } space-y-4`}
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <div className="flex items-start space-x-2.5 text-sm font-semibold">
                  <span className="text-base">{ocrResult.status === "Success" ? "✅" : "⚠️"}</span>
                  <div>
                    <h3 className="font-extrabold text-sm">{ocrResult.status === "Success" ? "OCR Validation Verified" : "OCR Validation Mismatch Warning"}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-350 mt-1 leading-normal font-medium">{ocrResult.remarks}</p>
                  </div>
                </div>

                {/* Diagnostics details */}
                <div className="bg-white/60 dark:bg-slate-900/60 p-3 rounded-xl border border-white dark:border-white/5 text-sm text-slate-500 dark:text-slate-400 font-semibold space-y-1">
                  <p className="font-bold text-slate-700 dark:text-slate-300 mb-1">Diagnostic Log:</p>
                  <p>• Scanned: Aadhaar Card name extraction: <code className="bg-slate-100 dark:bg-slate-950 px-1 py-0.5 rounded">"{ocrResult.extractedData.doc1.name}"</code></p>
                  <p>• Scanned: Income Certificate name extraction: <code className="bg-slate-100 dark:bg-slate-950 px-1 py-0.5 rounded">"{ocrResult.extractedData.doc2.name}"</code></p>
                  <p>• Result: {ocrResult.status === "Success" ? "100% strict match found." : "Difference detected. Human administrator bypass required."}</p>
                </div>
              </motion.div>
            )}

            <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex justify-between">
              <button
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-govgreen-600 hover:bg-govgreen-700 dark:bg-govgreen-600 dark:hover:bg-govgreen-700 text-white font-bold rounded-xl shadow-md dark:shadow-none cursor-pointer text-sm uppercase"
              >
                Back
              </button>
              <button
                disabled={!ocrCompleted}
                onClick={() => setStep(5)}
                className="px-6 py-2.5 bg-govblue-600 hover:bg-govblue-700 dark:bg-govblue-600 dark:hover:bg-govblue-700 text-white font-bold rounded-xl shadow-md dark:shadow-none flex items-center space-x-1 cursor-pointer text-sm uppercase disabled:opacity-50"
              >
                <span>Review Summary</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 5: Review & Submit */}
        {step === 5 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="space-y-1.5 border-b border-slate-100 dark:border-white/5 pb-4">
              <h2 className="text-lg font-extrabold text-slate-800 dark:text-white">Step 5: Review & Submit Application</h2>
              <p className="text-sm text-slate-400 dark:text-slate-500">Final review before official record submission to government office.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Application Summary</h3>
              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5 p-4 rounded-2xl text-sm font-semibold text-slate-600 dark:text-slate-400 space-y-2">
                <p><strong className="text-slate-800 dark:text-slate-200">Applied Scheme:</strong> {scheme.title}</p>
                <p><strong className="text-slate-800 dark:text-slate-200">Applicant:</strong> {user?.name} (Age: {user?.profile?.age})</p>
                <p><strong className="text-slate-800 dark:text-slate-200">Income Profile:</strong> ₹{user?.profile?.income?.toLocaleString()} / year</p>
                <p><strong className="text-slate-800 dark:text-slate-200">Caste Category:</strong> {user?.profile?.category}</p>
                <p><strong className="text-slate-800 dark:text-slate-200">Eligibility Score:</strong> {el.score}% ({el.status})</p>
                <p>
                  <strong className="text-slate-800 dark:text-slate-200">OCR Diagnostic:</strong>{" "}
                  <span className={ocrResult?.status === "Success" ? "text-govgreen-700 dark:text-govgreen-400 font-bold" : "text-amber-600 dark:text-amber-400 font-bold"}>
                    {ocrResult?.status === "Success" ? "Clear Match" : "Mismatch flag raised"}
                  </span>
                </p>
                <p><strong className="text-slate-800 dark:text-slate-200">Uploaded Attachments:</strong> {Object.keys(uploadedFiles).join(', ')}</p>
              </div>

              {/* Consent check */}
              <label className="flex items-start space-x-2.5 p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-white/5 rounded-2xl cursor-pointer">
                <input
                  type="checkbox"
                  required
                  defaultChecked
                  className="w-4.5 h-4.5 accent-govblue-600 dark:accent-govblue-400 rounded mt-0.5 cursor-pointer"
                />
                <span className="text-sm text-slate-500 dark:text-slate-400 leading-normal font-semibold">
                  I hereby declare that all uploaded certifications represent genuine records. I authorize SchemeSetu to run auto validation matching on my demographic data in compliance with digital policies.
                </span>
              </label>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex justify-between">
              <button
                onClick={() => setStep(4)}
                className="px-6 py-2.5 bg-govgreen-600 hover:bg-govgreen-700 dark:bg-govgreen-600 dark:hover:bg-govgreen-700 text-white font-bold rounded-xl shadow-md dark:shadow-none cursor-pointer text-sm uppercase"
              >
                Back
              </button>
              <button
                onClick={handleFinalSubmit}
                disabled={submitting}
                className="px-8 py-3 bg-govgreen-600 hover:bg-govgreen-700 dark:bg-govgreen-600 dark:hover:bg-govgreen-700 text-white font-extrabold rounded-xl shadow-lg shadow-govgreen-100 dark:shadow-none transition-all flex items-center space-x-1.5 cursor-pointer text-sm uppercase disabled:opacity-50"
              >
                {submitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Submit to Desk Officer</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default ApplyScheme;
