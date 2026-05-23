import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';  // AuthProvider import hatao
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Chatbot from './components/Chatbot';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Schemes from './pages/Schemes';
import SchemeDetail from './pages/SchemeDetail';
import ApplyScheme from './pages/ApplyScheme';
import AdminDashboard from './pages/AdminDashboard';

const RouteTranslator = () => {
  const location = useLocation();
  const { language } = useAuth();

  useEffect(() => {
    if (language === 'hi') {
      document.body.classList.add('lang-hi');
      setTimeout(() => {
        try {
          const select = document.querySelector('.goog-te-combo');
          if (select) {
            select.value = 'hi';
            select.dispatchEvent(new Event('change'));
          }
        } catch (e) {
          console.error("Translation trigger error:", e);
        }
      }, 400);
    } else {
      document.body.classList.remove('lang-hi');
    }
  }, [location.pathname, language]);

  return null;
};

// ✅ Loading screen — token verify hone tak rukta hai
const AppContent = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f8f6] dark:bg-slate-950">
        <div className="w-8 h-8 border-4 border-govblue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f8f6] dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/schemes/:id" element={<SchemeDetail />} />

          {/* Protected Citizen Pages */}
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={['Citizen', 'Admin']}>
              <Dashboard />
            </ProtectedRoute>
          }/>
          <Route path="/profile" element={
            <ProtectedRoute allowedRoles={['Citizen', 'Admin']}>
              <Profile />
            </ProtectedRoute>
          }/>
          <Route path="/apply/:id" element={
            <ProtectedRoute allowedRoles={['Citizen', 'Admin']}>
              <ApplyScheme />
            </ProtectedRoute>
          }/>

          {/* Protected Admin Pages */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['Admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }/>
        </Routes>
      </main>
      <Chatbot />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <RouteTranslator />
      <AppContent />  {/* ← loading check yahan hoga */}
    </Router>
  );
}

export default App;