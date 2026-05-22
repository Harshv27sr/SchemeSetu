import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Chatbot from './components/Chatbot';

// Import Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Schemes from './pages/Schemes';
import SchemeDetail from './pages/SchemeDetail';
import ApplyScheme from './pages/ApplyScheme';
import AdminDashboard from './pages/AdminDashboard';

// RouteTranslator automatically triggers Google Translate when navigating to new pages
const RouteTranslator = () => {
  const location = useLocation();
  const { language } = useAuth();

  useEffect(() => {
    if (language === 'hi') {
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
      }, 400); // 400ms delay gives React time to render the new page's DOM elements
    }
  }, [location.pathname, language]);

  return null;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <RouteTranslator />
        <div className="flex flex-col min-h-screen bg-[#e8edf2] dark:bg-slate-950 transition-colors duration-300">
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
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['Citizen', 'Admin']}>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute allowedRoles={['Citizen', 'Admin']}>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/apply/:id" 
                element={
                  <ProtectedRoute allowedRoles={['Citizen', 'Admin']}>
                    <ApplyScheme />
                  </ProtectedRoute>
                } 
              />

              {/* Protected Admin Pages */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute allowedRoles={['Admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>

          <Chatbot />
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
