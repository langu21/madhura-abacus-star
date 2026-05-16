/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, BookOpen, Brain, TrendingUp, Users, 
  MessageSquare, LayoutDashboard, LogIn, LogOut,
  Moon, Sun, PhoneCall
} from 'lucide-react';
import { auth, db } from './lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

// Components (Lazy or direct import)
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import AIChatAssistant from './components/ai/AIChatAssistant';

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-slate-900 text-white' : 'bg-background text-accent'}`}>
        <Navbar user={user} darkMode={darkMode} setDarkMode={setDarkMode} />
        
        <main>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage user={user} />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
        <AIChatAssistant />
      </div>
    </Router>
  );
}

