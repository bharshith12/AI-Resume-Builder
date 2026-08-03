import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ResumeProvider } from './context/ResumeContext';

import LandingPage from './pages/LandingPage';
import AuthPages from './pages/AuthPages';
import DashboardPage from './pages/DashboardPage';
import BuilderPage from './pages/BuilderPage';
import ATSPage from './pages/ATSPage';
import CoverLetterPage from './pages/CoverLetterPage';
import AdminPage from './pages/AdminPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ResumeProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPages />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/builder" element={<BuilderPage />} />
              <Route path="/ats" element={<ATSPage />} />
              <Route path="/cover-letter" element={<CoverLetterPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </Router>
        </ResumeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
