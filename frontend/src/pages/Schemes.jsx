import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, Filter, RefreshCw, ChevronRight, Calendar, Sparkles } from 'lucide-react';

const Schemes = () => {
  const { schemes, calculateEligibility, user } = useAuth();

  // Search and Filter local states
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState('All');
  const [casteFilter, setCasteFilter] = useState('All');

  const FILTER_CATEGORIES = ["All", "Student", "Farmer", "Women", "Pension", "Startup"];
  const FILTER_STATES = ["All", "Central", "Rajasthan", "Uttar Pradesh", "Maharashtra"];
  const FILTER_CASTES = ["All", "SC", "ST", "OBC", "General"];

  // Filter schemes catalog
  const filteredSchemes = schemes.filter(scheme => {
    // 1. Search Query
    const titleMatch = scheme.title.toLowerCase().includes(searchQuery.toLowerCase());
    const descMatch = scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const searchMatch = titleMatch || descMatch;

    // 2. Category / Occupation check
    let categoryMatch = true;
    if (categoryFilter !== 'All') {
      const allowedOcc = scheme.eligibility?.allowedOccupations || [];
      if (categoryFilter === 'Women') {
        categoryMatch = scheme.eligibility?.allowedGenders?.includes('Female');
      } else if (categoryFilter === 'Pension') {
        categoryMatch = scheme.title.toLowerCase().includes('pension') || allowedOcc.includes('Retired');
      } else {
        categoryMatch = allowedOcc.includes(categoryFilter) || allowedOcc.includes("All");
      }
    }

    // 3. State check
    // If user picks a specific state (e.g. Rajasthan), they should see Central schemes AND Rajasthan schemes.
    // If they pick Central, they should see only Central schemes.
    let stateMatch = true;
    if (stateFilter !== 'All') {
      const allowedSt = scheme.eligibility?.allowedStates || [];
      if (stateFilter === 'Central') {
        stateMatch = scheme.state === 'Central';
      } else {
        stateMatch = scheme.state === stateFilter || scheme.state === 'Central' || allowedSt.includes(stateFilter) || allowedSt.includes('All');
      }
    }

    // 4. Social Category (Caste) check
    let casteMatch = true;
    if (casteFilter !== 'All') {
      const allowedCats = scheme.eligibility?.allowedCategories || [];
      casteMatch = allowedCats.includes(casteFilter) || allowedCats.includes("All") ||
        (allowedCats.includes("SC/ST") && (casteFilter === "SC" || casteFilter === "ST"));
    }

    return searchMatch && categoryMatch && stateMatch && casteMatch;
  });

  const handleReset = () => {
    setSearchQuery('');
    setCategoryFilter('All');
    setStateFilter('All');
    setCasteFilter('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Catalog Title */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Government Schemes Explorer</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Search and narrow down the official Indian Central and State government programs with precise parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Filters Sidebar Control panel */}
        <div className="lg:col-span-3 bg-slate-50/95 dark:bg-slate-900 border border-slate-200/60 dark:border-white/5 rounded-3xl p-6 shadow-sm dark:shadow-none space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-200/50 dark:border-white/5">
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1.5">
              <Filter className="w-4.5 h-4.5 text-govblue-600 dark:text-govblue-400" />
              <span>Search Filters</span>
            </span>
            <button
              onClick={handleReset}
              className="text-sm text-govblue-600 dark:text-govblue-400 hover:text-govblue-700 dark:hover:text-govblue-300 font-bold flex items-center space-x-0.5 cursor-pointer transition-all"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Search text input */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Keyword Search</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 dark:text-slate-500">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Kisan, scholarship..."
                className="form-input pl-9 py-2 text-sm"
              />
            </div>
          </div>

          {/* Category Dropdown/Selector */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Citizen Focus Group</label>
            <div className="flex flex-wrap gap-1.5">
              {FILTER_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 border rounded-xl text-sm font-bold transition-all cursor-pointer ${categoryFilter === cat
                      ? 'border-govblue-600 dark:border-govblue-400 bg-govblue-50 dark:bg-govblue-950/30 text-govblue-700 dark:text-govblue-300'
                      : 'border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* State selector dropdown */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Residency Region</label>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="form-input py-2 text-sm cursor-pointer"
            >
              {FILTER_STATES.map(st => (
                <option key={st} value={st} className="dark:bg-slate-900">{st === "All" ? "All States / Central" : st}</option>
              ))}
            </select>
          </div>

          {/* Social Caste filters */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Social Category (Caste)</label>
            <select
              value={casteFilter}
              onChange={(e) => setCasteFilter(e.target.value)}
              className="form-input py-2 text-sm cursor-pointer"
            >
              {FILTER_CASTES.map(c => (
                <option key={c} value={c} className="dark:bg-slate-900">{c === "All" ? "All Categories" : c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="lg:col-span-9 space-y-6">
          <div className="flex justify-between items-center text-sm font-semibold text-slate-400 dark:text-slate-500">
            <span>Showing {filteredSchemes.length} of {schemes.length} Active Schemes</span>
            <span>Sort by: Popularity</span>
          </div>

          {filteredSchemes.length === 0 ? (
            <div className="bg-slate-50/70 dark:bg-slate-900 border border-slate-200/60 dark:border-white/5 rounded-3xl p-12 text-center text-slate-500 dark:text-slate-400 space-y-2">
              <p className="text-base font-bold text-slate-800 dark:text-slate-200">No schemes match selected filters.</p>
              <p className="text-sm text-slate-400 dark:text-slate-500">Try resetting keyword strings or checking "All States / Central" categories.</p>
              <button
                onClick={handleReset}
                className="mt-4 px-4 py-2 bg-govblue-50 dark:bg-govblue-950/20 text-govblue-600 dark:text-govblue-400 rounded-xl text-sm font-bold cursor-pointer hover:bg-govblue-100 dark:hover:bg-govblue-900/30 transition-all"
              >
                Clear Search Parameters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSchemes.map(scheme => {
                // Calculate score if profile exists
                const el = calculateEligibility(scheme);
                return (
                  <div
                    key={scheme._id}
                    className="bg-slate-50/90 dark:bg-slate-900 border border-slate-200/60 dark:border-white/5 rounded-3xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 dark:shadow-none hover:shadow-slate-300/20 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Top banner categories */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex flex-wrap gap-1">
                          <span className="text-sm font-bold text-govblue-700 dark:text-govblue-400 bg-govblue-50 dark:bg-govblue-950/30 px-2 py-0.5 rounded-full uppercase">
                            {scheme.state === "Central" ? "Central Scheme" : `${scheme.state} State`}
                          </span>
                          <span className="text-sm font-bold text-govgreen-700 dark:text-govgreen-450 bg-govgreen-50 dark:bg-govgreen-950/20 px-2 py-0.5 rounded-full uppercase">
                            ₹{scheme.eligibility.maxIncome.toLocaleString()} Limit
                          </span>
                        </div>

                        {/* Match Indicator */}
                        {user?.profile?.fullName && (
                          <div className={`flex items-center space-x-1 text-sm font-bold px-2 py-0.5 rounded-full ${el.score === 100
                              ? 'bg-govgreen-50 dark:bg-govgreen-950/20 text-govgreen-700 dark:text-govgreen-400 border border-govgreen-200 dark:border-govgreen-800/30'
                              : el.score >= 50
                                ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/30'
                                : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-white/5'
                            }`}>
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            <span>{el.score}% Match</span>
                          </div>
                        )}
                      </div>

                      <h3 className="text-lg font-extrabold text-slate-800 dark:text-white leading-tight mb-2 hover:text-govblue-600 dark:hover:text-govblue-400 transition-all">
                        <Link to={`/schemes/${scheme._id}`}>{scheme.title}</Link>
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-6">{scheme.description}</p>
                    </div>

                    {/* Footer Actions */}
                    <div className="border-t border-slate-100 dark:border-white/5 pt-4 mt-2 flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-sm text-slate-400 dark:text-slate-500">
                        <Calendar className="w-4 h-4" />
                        <span>Deadline: {new Date(scheme.deadline).toLocaleDateString()}</span>
                      </div>
                      <Link
                        to={`/schemes/${scheme._id}`}
                        className="px-4.5 py-2 text-sm font-bold text-govblue-600 dark:text-govblue-400 hover:text-white bg-slate-50 dark:bg-slate-800 hover:bg-govblue-600 dark:hover:bg-govblue-600 rounded-xl transition-all flex items-center cursor-pointer"
                      >
                        <span>View Requirements</span>
                        <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Schemes;
