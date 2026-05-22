import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, HeartHandshake, PhoneCall, HelpCircle } from 'lucide-react';

const Footer = () => {
  const { t } = useAuth();
  
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      {/* Visual Support Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-slate-800 rounded-xl text-govblue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white leading-tight">Secure Platform</h4>
              <p className="text-xs text-slate-500 mt-0.5">JWT Encrypted & Verified</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-slate-800 rounded-xl text-govgreen-400">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white leading-tight">Citizen Centric</h4>
              <p className="text-xs text-slate-500 mt-0.5">Connecting Rights to You</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-slate-800 rounded-xl text-amber-500">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white leading-tight">Guided Help</h4>
              <p className="text-xs text-slate-500 mt-0.5">Toll-Free Support</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-slate-800 rounded-xl text-indigo-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white leading-tight">OCR Validation</h4>
              <p className="text-xs text-slate-500 mt-0.5">Mismatch Detector System</p>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Footer Directories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-govblue-600 flex items-center justify-center text-white font-bold text-base">
                SS
              </div>
              <span className="text-lg font-bold text-white tracking-tight">SchemeSetu</span>
            </div>
            <p className="text-sm text-slate-500 max-w-sm">
              Connecting Citizens to the Right Government Schemes. Improving digital accessibility, transparency, and eligibility awareness for all Indian citizens.
            </p>
          </div>

          {/* Scheme Quick Directories */}
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-4">Scheme Categories</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><span className="hover:text-govblue-400 cursor-pointer transition-all">For Students & Scholarships</span></li>
              <li><span className="hover:text-govblue-400 cursor-pointer transition-all">Agricultural & Farmers Support</span></li>
              <li><span className="hover:text-govblue-400 cursor-pointer transition-all">Housing & Infrastructure Benefits</span></li>
              <li><span className="hover:text-govblue-400 cursor-pointer transition-all">Pension & Senior Citizens Security</span></li>
            </ul>
          </div>

          {/* Legal / Gov links */}
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-4">Official Links</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="https://www.india.gov.in" target="_blank" rel="noreferrer" className="hover:text-govblue-400 transition-all">National Portal of India</a></li>
              <li><a href="https://www.myscheme.gov.in" target="_blank" rel="noreferrer" className="hover:text-govblue-400 transition-all">myScheme Portal</a></li>
              <li><span className="hover:text-govblue-400 cursor-pointer transition-all">Privacy Policy & Terms</span></li>
              <li><span className="hover:text-govblue-400 cursor-pointer transition-all">Helpdesk: 1800-110-120</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copy & Tricolor bottom accents */}
      <div className="bg-slate-950 py-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-600">
          <p>© 2026 SchemeSetu. Developed with pride to support the Digital India initiative.</p>
          <p className="mt-2 md:mt-0 flex items-center space-x-2">
            <span>Designed for Hackathons & Social Impact</span>
            <span className="text-slate-700">|</span>
            <span className="flex space-x-1">
              <span className="w-2.5 h-1.5 bg-[#FF9933] rounded-sm"></span>
              <span className="w-2.5 h-1.5 bg-white rounded-sm"></span>
              <span className="w-2.5 h-1.5 bg-[#138808] rounded-sm"></span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
