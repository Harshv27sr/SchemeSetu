import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import {
  FileText,
  Users,
  Plus,
  Edit,
  Trash2,
  Eye,
  Layers,
  ShieldCheck,
  X
} from 'lucide-react';

const AdminDashboard = () => {
  const {
    schemes,
    applications,
    tickets,
    createScheme,
    updateScheme,
    deleteScheme,
    updateApplicationStatus,
    replyToTicket,
    t
  } = useAuth();

  const [activeTab, setActiveTab] = useState('applications');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [editingId, setEditingId] = useState(null);

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  const [ticketReplyModalOpen, setTicketReplyModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replyStatus, setReplyStatus] = useState('Officer Responded');

  const handleSaveTicketReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicket) return;
    const res = await replyToTicket(selectedTicket._id, replyText, replyStatus);
    if (res.success) {
      setTicketReplyModalOpen(false);
      setReplyText('');
      alert('Officer reply submitted successfully!');
    } else {
      alert('Error submitting reply: ' + res.error);
    }
  };

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [benefits, setBenefits] = useState('');
  const [stateName, setStateName] = useState('Central');
  const [category, setCategory] = useState('All');
  const [deadline, setDeadline] = useState('2026-12-31');
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(65);
  const [maxIncome, setMaxIncome] = useState(300000);

  const [requiredDocs, setRequiredDocs] = useState([
    'Aadhaar Card',
    'Income Certificate'
  ]);

  const ALL_DOCUMENTS = [
    'Aadhaar Card',
    'Income Certificate',
    'Caste Certificate',
    'Marksheet',
    'Passport Photo'
  ];

  const handleDocCheckbox = (doc) => {
    if (requiredDocs.includes(doc)) {
      setRequiredDocs((prev) => prev.filter((d) => d !== doc));
    } else {
      setRequiredDocs((prev) => [...prev, doc]);
    }
  };

  const handleOpenAdd = () => {
    setModalMode('add');
    setTitle('');
    setDescription('');
    setBenefits('');
    setStateName('Central');
    setCategory('All');
    setDeadline('2026-12-31');
    setMinAge(18);
    setMaxAge(65);
    setMaxIncome(300000);
    setRequiredDocs(['Aadhaar Card', 'Income Certificate']);
    setModalOpen(true);
  };

  const handleOpenEdit = (sch) => {
    setModalMode('edit');
    setEditingId(sch._id);

    setTitle(sch.title);
    setDescription(sch.description);
    setBenefits(sch.benefits);
    setStateName(sch.state);
    setCategory(sch.category);
    setDeadline(sch.deadline);

    setMinAge(sch.eligibility?.minAge || 18);
    setMaxAge(sch.eligibility?.maxAge || 65);
    setMaxIncome(sch.eligibility?.maxIncome || 300000);

    setRequiredDocs(sch.requiredDocuments || []);

    setModalOpen(true);
  };

  const handleSaveScheme = async (e) => {
    e.preventDefault();

    const schemeData = {
      title,
      description,
      benefits,
      state: stateName,
      category,
      deadline,
      requiredDocuments: requiredDocs,
      eligibility: {
        minAge: parseInt(minAge),
        maxAge: parseInt(maxAge),
        maxIncome: parseInt(maxIncome),
        allowedOccupations: [
          'Student',
          'Farmer',
          'Business Owner',
          'Unemployed',
          'Retired',
          'Others'
        ],
        allowedCategories: ['General', 'OBC', 'SC', 'ST'],
        allowedStates: ['All'],
        allowedGenders: ['Male', 'Female', 'Other']
      }
    };

    let res;

    if (modalMode === 'add') {
      res = await createScheme(schemeData);
    } else {
      res = await updateScheme(editingId, schemeData);
    }

    if (res.success) {
      setModalOpen(false);

      alert(
        modalMode === 'add'
          ? '🎉 Scheme added successfully!'
          : '🎉 Scheme updated successfully!'
      );
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this scheme?')) {
      await deleteScheme(id);
    }
  };

  const handleReview = (app) => {
    setSelectedApp(app);
    setReviewModalOpen(true);
  };

  const handleStatusChange = async (appId, newStatus) => {
    const res = await updateApplicationStatus(appId, newStatus);

    if (res.success) {
      if (selectedApp && selectedApp._id === appId) {
        setSelectedApp((prev) => ({
          ...prev,
          status: newStatus
        }));
      }

      alert(`Status updated to ${newStatus}`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'text-govgreen-700 bg-govgreen-50 dark:bg-govgreen-950/30 border border-govgreen-200 dark:border-govgreen-900/30 dark:text-govgreen-400';
      case 'Rejected':
        return 'text-rose-700 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/30 dark:text-rose-455';
      case 'Verified':
        return 'text-indigo-700 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/30 dark:text-indigo-400';
      case 'Under Review':
        return 'text-amber-700 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/30 dark:text-amber-400';
      default:
        return 'text-govblue-700 bg-govblue-50 dark:bg-govblue-950/30 border border-govblue-200 dark:border-govblue-900/30 dark:text-govblue-400';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 transition-colors duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t('adminOpsConsole')}
          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            {t('adminOpsSubtitle')}
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-govblue-600 hover:bg-govblue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold shadow-md shadow-govblue-600/10 transition-all hover:-translate-y-0.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{t('addScheme')}</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 p-6 rounded-3xl shadow-sm dark:shadow-none transition-colors duration-300">
          <div className="flex justify-between items-center">
            <span className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">
              {t('totalUsers')}
            </span>

            <Users className="w-5 h-5 text-govblue-600 dark:text-govblue-400" />
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-3">
            128 Users
          </h2>
        </div>

        <div className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 p-6 rounded-3xl shadow-sm dark:shadow-none transition-colors duration-300">
          <div className="flex justify-between items-center">
            <span className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">
              {t('activeSchemes')}
            </span>

            <Layers className="w-5 h-5 text-govgreen-600 dark:text-govgreen-400" />
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-3">
            {schemes.length}
          </h2>
        </div>

        <div className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 p-6 rounded-3xl shadow-sm dark:shadow-none transition-colors duration-300">
          <div className="flex justify-between items-center">
            <span className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">
              {t('applicationsTab')}
            </span>

            <FileText className="w-5 h-5 text-amber-500" />
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-3">
            {applications.length}
          </h2>
        </div>

        <div className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 p-6 rounded-3xl shadow-sm dark:shadow-none transition-colors duration-300">
          <div className="flex justify-between items-center">
            <span className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider">
              {t('ocrAlertsRate')}
            </span>

            <ShieldCheck className="w-5 h-5 text-rose-500" />
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-3">
            8.4%
          </h2>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-white/10 mb-6">
        <button
          onClick={() => setActiveTab('applications')}
          className={`py-3.5 px-6 font-bold text-sm border-b-2 transition-all cursor-pointer ${
            activeTab === 'applications'
              ? 'border-govblue-600 text-govblue-700 dark:text-govblue-400 dark:border-govblue-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          {t('applicationsTab')} ({applications.length})
        </button>

        <button
          onClick={() => setActiveTab('schemes')}
          className={`py-3.5 px-6 font-bold text-sm border-b-2 transition-all cursor-pointer ${
            activeTab === 'schemes'
              ? 'border-govblue-600 text-govblue-700 dark:text-govblue-400 dark:border-govblue-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          {t('schemesTab')} ({schemes.length})
        </button>

        <button
          onClick={() => setActiveTab('grievances')}
          className={`py-3.5 px-6 font-bold text-sm border-b-2 transition-all cursor-pointer ${
            activeTab === 'grievances'
              ? 'border-govblue-600 text-govblue-700 dark:text-govblue-400 dark:border-govblue-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          🎧 Grievance Support Desk ({tickets.length})
        </button>
      </div>

      {/* Applications */}
      {activeTab === 'applications' && (
        <div className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-3xl shadow-sm dark:shadow-none overflow-hidden overflow-x-auto transition-colors duration-300">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800 text-left text-sm font-bold text-slate-500 dark:text-slate-300 border-b border-slate-100 dark:border-white/5 uppercase tracking-wider">
              <tr>
                <th className="p-4 font-bold">{t('tableHeaderId')}</th>
                <th className="p-4 font-bold">{t('tableHeaderCitizen')}</th>
                <th className="p-4 font-bold">{t('tableHeaderScheme')}</th>
                <th className="p-4 font-bold">{t('tableHeaderStatus')}</th>
                <th className="p-4 font-bold">{t('tableHeaderAction')}</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {applications.map((app) => (
                <tr
                  key={app._id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-350 transition-colors"
                >
                  <td className="p-4 text-sm font-mono font-bold text-slate-500 dark:text-slate-400">
                    #{app._id?.slice(-6)}
                  </td>

                  <td className="p-4 text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {app.validationResult?.extractedData?.name ||
                      'Rahul Sharma'}
                  </td>

                  <td className="p-4 text-sm font-semibold text-slate-800 dark:text-slate-200">
                    {app.scheme?.title || 'Gov Scheme'}
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => handleReview(app)}
                      className="bg-govblue-600 hover:bg-govblue-700 text-white px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 text-sm font-bold cursor-pointer transition-all shadow-sm hover:shadow"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t('reviewBtn')}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Schemes */}
      {activeTab === 'schemes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {schemes.map((sch) => (
            <div
              key={sch._id}
              className="bg-slate-50/90 hover:bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-white/5 rounded-3xl p-6 shadow-sm hover:shadow-lg dark:hover:border-white/10 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold text-govblue-600 dark:text-govblue-400 bg-govblue-50 dark:bg-govblue-950/30 px-2.5 py-0.5 rounded-full uppercase">
                    {sch.state === "Central" ? "Central Scheme" : `${sch.state} State`}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenEdit(sch)}
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-govblue-600 dark:hover:text-govblue-400 rounded-xl transition-all cursor-pointer"
                    >
                      <Edit className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(sch._id)}
                      className="p-2 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-slate-400 hover:text-rose-600 rounded-xl transition-all cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-extrabold text-slate-800 dark:text-white leading-tight mb-2">
                  {sch.title}
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {sch.description}
                </p>

                <div className="text-sm text-slate-400 dark:text-slate-500 font-medium">
                  <span className="font-bold text-slate-600 dark:text-slate-350">{t('requiredDocsLabel')}:</span>{' '}
                  {sch.requiredDocuments?.join(', ')}
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-white/5 mt-4 pt-4 text-sm text-slate-400 dark:text-slate-500 font-semibold flex justify-between">
                <span>
                  {t('maxIncomeLabel')}: ₹
                  {sch.eligibility?.maxIncome?.toLocaleString()}
                </span>

                <span>
                  Age: {sch.eligibility?.minAge} -{' '}
                  {sch.eligibility?.maxAge}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grievance Tickets */}
      {activeTab === 'grievances' && (
        <div className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-3xl shadow-sm dark:shadow-none overflow-hidden overflow-x-auto transition-colors duration-300">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800 text-left text-sm font-bold text-slate-500 dark:text-slate-300 border-b border-slate-100 dark:border-white/5 uppercase tracking-wider">
              <tr>
                <th className="p-4 font-bold">Ticket ID</th>
                <th className="p-4 font-bold">Citizen</th>
                <th className="p-4 font-bold">Query</th>
                <th className="p-4 font-bold">Date Filed</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {tickets.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-sm text-slate-400 dark:text-slate-505 font-semibold">
                    No citizen grievance support tickets filed yet.
                  </td>
                </tr>
              ) : (
                tickets.map((t) => (
                  <tr
                    key={t._id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-350 transition-colors"
                  >
                    <td className="p-4 text-sm font-mono font-bold text-slate-500 dark:text-slate-400">
                      {t.ticketId}
                    </td>

                    <td className="p-4 text-sm font-semibold text-slate-800 dark:text-slate-200">
                      <div>
                        <p className="font-bold">{t.userId?.name || 'Unknown Citizen'}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">{t.userId?.email || ''}</p>
                      </div>
                    </td>

                    <td className="p-4 text-sm max-w-xs font-medium text-slate-700 dark:text-slate-300 break-words">
                      <div>
                        <p className="font-bold">{t.query}</p>
                        {t.reply && (
                          <p className="text-xs text-indigo-650 dark:text-indigo-400 mt-1 pl-2 border-l border-indigo-450 font-medium animate-none">
                            <span className="font-bold">Reply: </span>{t.reply}
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="p-4 text-sm text-slate-500 dark:text-slate-400">
                      {new Date(t.createdAt || t.date).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                          t.status === 'Resolved'
                            ? 'text-govgreen-700 bg-govgreen-50 dark:bg-govgreen-950/30 border border-govgreen-200 dark:border-govgreen-900/30 dark:text-govgreen-450'
                            : t.status === 'Officer Responded'
                            ? 'text-indigo-700 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/30 dark:text-indigo-400'
                            : 'text-amber-700 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/30 dark:text-amber-450'
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => {
                          setSelectedTicket(t);
                          setReplyText(t.reply || '');
                          setReplyStatus(t.status || 'Officer Responded');
                          setTicketReplyModalOpen(true);
                        }}
                        className="bg-govblue-600 hover:bg-govblue-700 text-white px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 text-sm font-bold cursor-pointer transition-all shadow-sm hover:shadow"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Reply</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Review Modal */}
      {reviewModalOpen && selectedApp && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-50/95 dark:bg-slate-900 border border-slate-200/50 dark:border-white/10 rounded-3xl p-8 w-full max-w-xl relative shadow-2xl transition-colors duration-300"
          >
            <button
              onClick={() => setReviewModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-6 pr-6 leading-tight">
              {selectedApp.scheme?.title}
            </h2>

            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 rounded-2xl p-4 mb-6">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">
                Applicant Extraction Details
              </span>
              <div className="grid grid-cols-2 gap-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <div>
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 block">Name</span>
                  {selectedApp.validationResult?.extractedData?.name || 'Rahul Sharma'}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 block">Status</span>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs mt-0.5 ${selectedApp.validationResult?.status === "Success" ? 'bg-govgreen-50 text-govgreen-600 dark:bg-govgreen-950/20 dark:text-govgreen-400' : 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400'}`}>
                    {selectedApp.validationResult?.status || 'Verified'}
                  </span>
                </div>
              </div>
              {selectedApp.validationResult?.remarks && (
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/5 text-sm font-medium text-slate-500 dark:text-slate-400">
                  {selectedApp.validationResult.remarks}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                {t('changeStatus')}
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  'Under Review',
                  'Verified',
                  'Approved',
                  'Rejected'
                ].map((status) => (
                  <button
                    key={status}
                    onClick={() =>
                      handleStatusChange(selectedApp._id, status)
                    }
                    className={`px-4 py-2 text-sm font-bold rounded-xl cursor-pointer transition-all border ${getStatusColor(
                      status
                    )}`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-50/95 dark:bg-slate-900 border border-slate-200/50 dark:border-white/10 rounded-3xl p-8 w-full max-w-2xl relative shadow-2xl max-h-[90vh] overflow-y-auto transition-colors duration-300"
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6">
              {modalMode === 'add' ? t('addScheme') : t('editScheme')}
            </h2>

            <form
              onSubmit={handleSaveScheme}
              className="space-y-4"
            >
              <div>
                <label className="form-label">{t('schemeTitleLabel')}</label>
                <input
                  type="text"
                  placeholder="e.g. Pradhan Mantri Awas Yojana"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="form-label">{t('schemeDescLabel')}</label>
                <textarea
                  placeholder="Provide comprehensive details of the scheme..."
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  className="form-input h-24"
                  required
                />
              </div>

              <div>
                <label className="form-label">{t('schemeBenefitsLabel')}</label>
                <input
                  type="text"
                  placeholder="e.g. Financial support of ₹1.2 Lakhs"
                  value={benefits}
                  onChange={(e) => setBenefits(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">{t('schemeStateLabel')}</label>
                  <input
                    type="text"
                    placeholder="Central / Rajasthan"
                    value={stateName}
                    onChange={(e) =>
                      setStateName(e.target.value)
                    }
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">{t('schemeCategoryLabel')}</label>
                  <input
                    type="text"
                    placeholder="All / OBC / SC / ST"
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="form-label">{t('minAgeLabel')}</label>
                  <input
                    type="number"
                    placeholder="18"
                    value={minAge}
                    onChange={(e) =>
                      setMinAge(e.target.value)
                    }
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">{t('maxAgeLabel')}</label>
                  <input
                    type="number"
                    placeholder="65"
                    value={maxAge}
                    onChange={(e) =>
                      setMaxAge(e.target.value)
                    }
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">{t('maxIncomeLabel')}</label>
                  <input
                    type="number"
                    placeholder="300000"
                    value={maxIncome}
                    onChange={(e) =>
                      setMaxIncome(e.target.value)
                    }
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Deadline</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) =>
                    setDeadline(e.target.value)
                  }
                  className="form-input"
                />
              </div>

              <div>
                <h4 className="form-label mb-2">
                  {t('requiredDocsLabel')}
                </h4>

                <div className="flex flex-wrap gap-3">
                  {ALL_DOCUMENTS.map((doc) => (
                    <label
                      key={doc}
                      className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-350 cursor-pointer select-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/5 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={requiredDocs.includes(doc)}
                        onChange={() =>
                          handleDocCheckbox(doc)
                        }
                        className="accent-govblue-600 rounded"
                      />

                      <span>{doc}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold py-3 rounded-xl transition-all cursor-pointer"
                >
                  {t('cancelBtn')}
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-govblue-600 hover:bg-govblue-700 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-govblue-600/10 hover:-translate-y-0.5 cursor-pointer"
                >
                  {t('saveSchemeBtn')}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      {/* Ticket Reply Modal */}
      {ticketReplyModalOpen && selectedTicket && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-50/95 dark:bg-slate-900 border border-slate-200/50 dark:border-white/10 rounded-3xl p-8 w-full max-w-xl relative shadow-2xl transition-colors duration-300"
          >
            <button
              onClick={() => setTicketReplyModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer animate-none"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 leading-tight">
              Review Support Query
            </h2>
            <p className="text-sm text-slate-400 dark:text-slate-500 font-bold mb-4 font-mono">
              Ticket Ref: {selectedTicket.ticketId}
            </p>

            <div className="bg-slate-50 dark:bg-slate-955 border border-slate-100 dark:border-white/5 rounded-2xl p-4 mb-6">
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 space-y-2">
                <div>
                  <span className="text-xs font-bold text-slate-450 dark:text-slate-500 block">CITIZEN INFO</span>
                  <p className="font-extrabold text-slate-800 dark:text-slate-200">{selectedTicket.userId?.name || 'Unknown Citizen'} ({selectedTicket.userId?.email || 'N/A'})</p>
                </div>
                <div className="pt-2 border-t border-slate-100 dark:border-white/5">
                  <span className="text-xs font-bold text-slate-455 dark:text-slate-500 block">CITIZEN DESCRIPTION</span>
                  <p className="font-medium text-slate-800 dark:text-slate-200 italic mt-0.5">"{selectedTicket.query}"</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSaveTicketReply} className="space-y-4">
              <div>
                <label className="form-label font-bold text-sm">Officer Desk Reply Content</label>
                <textarea
                  placeholder="Provide detailed instructions or verification notes..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 text-slate-800 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-govblue-500 placeholder-slate-400 dark:placeholder-slate-600 resize-none h-24"
                  required
                />
              </div>

              <div>
                <label className="form-label font-bold text-sm">Update Status</label>
                <div className="flex gap-2.5 mt-1.5">
                  {['Officer Responded', 'Resolved'].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setReplyStatus(status)}
                      className={`px-4 py-2 text-sm font-bold rounded-xl cursor-pointer transition-all border ${
                        replyStatus === status
                          ? 'bg-govblue-600 border-govblue-600 text-white font-extrabold'
                          : 'border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setTicketReplyModalOpen(false)}
                  className="flex-1 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold py-3 rounded-xl transition-all cursor-pointer text-sm"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-govblue-600 hover:bg-govblue-700 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-govblue-600/10 hover:-translate-y-0.5 cursor-pointer text-sm"
                >
                  Submit Official Response
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;