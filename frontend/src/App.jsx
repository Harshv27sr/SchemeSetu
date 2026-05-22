import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
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

function App() {
  return (
    <Router>
      <AuthProvider>
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
