import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Compass, ShieldCheck, Search, FileText, ChevronRight, Play } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const About = () => {
  const { t } = useAuth();

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
    <div className="bg-[#0b1120] text-slate-100 min-h-screen font-sans overflow-x-hidden transition-colors duration-300">
      
      {/* 1. Header & Breadcrumbs Banner */}
      <section className="relative py-12 border-b border-slate-800 bg-[#0f172a]/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <motion.h1 
            className="text-4xl sm:text-5xl font-black text-white tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            About Us
          </motion.h1>
          <motion.div 
            className="flex items-center justify-center space-x-2 text-sm text-slate-400 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link to="/" className="hover:text-govgreen-400 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-govgreen-400">About Us</span>
          </motion.div>
        </div>
      </section>

      {/* 2. Vision and Mission Section */}
      <section className="py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Image/Video Thumbnail with offset borders */}
          <motion.div 
            className="relative w-full max-w-xl mx-auto"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Offset shadow layers exactly matching screenshot */}
            <div className="absolute -bottom-4 -left-4 w-full h-full border border-slate-700/60 rounded-2xl rounded-tl-none rounded-br-none -z-10"></div>
            <div className="absolute -bottom-2 -left-2 w-full h-full border border-slate-600/40 rounded-2xl rounded-tl-none rounded-br-none -z-10"></div>
            
            {/* Video container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black border-[3px] border-slate-800 group cursor-default">
              <img 
                src="/overview-video.png" 
                alt="Farmers on boat using smartphone" 
                className="w-full h-[320px] object-cover opacity-85 group-hover:scale-102 transition-transform duration-500"
              />
              
              {/* Green Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <div className="w-16 h-16 rounded-full bg-govgreen-500 hover:bg-govgreen-600 flex items-center justify-center text-white shadow-xl shadow-govgreen-500/30 transform group-hover:scale-110 transition-all duration-300">
                  <Play className="w-7 h-7 text-white fill-white translate-x-0.5" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Our Vision & Our Mission */}
          <motion.div 
            className="space-y-12"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Our Vision */}
            <div className="flex items-start space-x-5 group">
              <div className="w-12 h-12 rounded-xl bg-govblue-900/40 border border-govblue-700/30 flex items-center justify-center text-govblue-400 group-hover:text-govblue-300 group-hover:bg-govblue-900/60 shadow-md transition-all duration-300 flex-shrink-0">
                <Eye className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center">
                  Our Vision
                </h3>
                <p className="text-slate-350 text-base leading-relaxed font-medium">
                  Our vision is to make citizens life easier
                </p>
              </div>
            </div>

            {/* Our Mission */}
            <div className="flex items-start space-x-5 group">
              <div className="w-12 h-12 rounded-xl bg-govgreen-900/35 border border-govgreen-700/30 flex items-center justify-center text-govgreen-400 group-hover:text-govgreen-300 group-hover:bg-govgreen-900/50 shadow-md transition-all duration-300 flex-shrink-0">
                <Compass className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  Our Mission
                </h3>
                <p className="text-slate-355 text-base leading-relaxed font-medium">
                  Our mission is to streamline the government - user interface for government schemes and benefits.
                </p>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">
                  Reduce time and effort required to find and avail a government scheme
                </p>
              </div>
            </div>

          </motion.div>

        </div>
      </section>

      {/* 3. Detailed Overview/Description (Centered Full-Width Content) */}
      <section className="py-20 lg:py-24 border-t border-slate-900 bg-[#0f172a]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            className="space-y-6 text-slate-300 text-[17px] leading-relaxed font-medium text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p>
              SchemeSetu is a National Platform that aims to offer one-stop search and discovery of the Government schemes.
            </p>
            <p>
              It provides an innovative, technology-based solution to discover scheme information based upon the eligibility of the citizen.
            </p>
            <p>
              The platform helps the citizen to find the right Government schemes for them. It also guides on how to apply for different Government schemes. Thus no need to visit multiple Government websites.
            </p>
            <div className="max-w-2xl mx-auto text-slate-400 text-sm border-t border-slate-800 pt-6 mt-8">
              SchemeSetu platform is Developed, Managed, and Operated by National e-Governance Division (NeGD), with the Support of Ministry of Electronics and Information Technology (MeitY), Department of Administrative Reforms and Public Grievances (DARPG) and in partnership with other Central and State Ministries/Departments.
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. Three Column Feature Cards Section (No Images, Modern Styled Icon Badges) */}
      <section className="py-20 lg:py-28 border-t border-slate-900 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            
            {/* Column 1: Eligibility Check */}
            <motion.div 
              className="flex flex-col items-center text-center space-y-5 group p-8 rounded-2xl bg-slate-900/10 hover:bg-slate-900/30 border border-slate-800/40 hover:border-slate-800 transition-all duration-300 shadow-sm"
              variants={itemVariants}
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 group-hover:scale-105 shadow-md shadow-emerald-950/30 transition-all duration-300">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-white tracking-tight mt-2">
                Eligibility Check
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-semibold">
                You can check your eligibility for schemes using different criteria and personal attribute
              </p>
            </motion.div>

            {/* Column 2: Scheme Finder */}
            <motion.div 
              className="flex flex-col items-center text-center space-y-5 group p-8 rounded-2xl bg-slate-900/10 hover:bg-slate-900/30 border border-slate-800/40 hover:border-slate-800 transition-all duration-300 shadow-sm"
              variants={itemVariants}
            >
              <div className="w-16 h-16 rounded-2xl bg-govblue-500/10 border border-govblue-500/20 flex items-center justify-center text-govblue-400 group-hover:bg-govblue-500/20 group-hover:scale-105 shadow-md shadow-govblue-950/30 transition-all duration-300">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-white tracking-tight mt-2">
                Scheme Finder
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-semibold">
                Fast and easy searching with filter based drill downs for various Government Schemes
              </p>
            </motion.div>

            {/* Column 3: Scheme in Detail */}
            <motion.div 
              className="flex flex-col items-center text-center space-y-5 group p-8 rounded-2xl bg-slate-900/10 hover:bg-slate-900/30 border border-slate-800/40 hover:border-slate-800 transition-all duration-300 shadow-sm"
              variants={itemVariants}
            >
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-450 group-hover:bg-indigo-500/20 group-hover:scale-105 shadow-md shadow-indigo-950/30 transition-all duration-300">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-white tracking-tight mt-2">
                Scheme in detail
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-semibold">
                Deep dive into dedicated scheme pages for fine grained scheme details before you apply
              </p>
            </motion.div>

          </motion.div>

        </div>
      </section>

    </div>
  );
};

export default About;
