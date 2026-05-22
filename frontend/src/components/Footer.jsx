import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, HeartHandshake, PhoneCall, HelpCircle } from 'lucide-react';

const Footer = () => {
  const { t } = useAuth();
  
  return (
    <footer className="bg-govblue-950 text-slate-400 border-t border-govblue-900">

      {/* Top Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-300">
          {['eOffice', 'Downloads', 'OGD Portal', 'Hyperlink Policy', 'Terms of Use', 'Privacy Policy', 'Disclaimer', 'Site Map', 'Copyright', 'Feedback', 'Help', 'FAQS', 'Contact Us'].map((link) => (
            <div key={link} className="flex items-center space-x-1.5 hover:text-white cursor-pointer transition-colors">
              <span className="w-2.5 h-2.5 rounded-full border-[2px] border-[#D4A373] flex items-center justify-center">
                <span className="w-1 h-1 bg-[#D4A373] rounded-full"></span>
              </span>
              <span>{link}</span>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
