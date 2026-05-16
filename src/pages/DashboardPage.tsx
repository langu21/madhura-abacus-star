import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, TrendingUp, Clock, Brain, 
  Target, Zap, Play, ChevronRight,
  MessageCircle, History, Sparkles, Bot, Award
} from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, getDoc, collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import PerformanceCharts from '../components/dashboard/PerformanceCharts';
import AIMentalMathTrainer from '../components/ai/AIMentalMathTrainer';
import { AnimatePresence } from 'motion/react';

export default function DashboardPage({ user }: any) {
  const [profile, setProfile] = useState<any>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTrainer, setShowTrainer] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) setProfile(userDoc.data());

        const sessionsQuery = query(
          collection(db, 'mentalMathSessions'),
          where('studentId', '==', user.uid),
          orderBy('timestamp', 'desc'),
          limit(10)
        );
        const sessionsSnap = await getDocs(sessionsQuery);
        setSessions(sessionsSnap.docs.map(d => d.data()));
      } catch (error) {
        console.error("Dashboard Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center bg-white dark:bg-slate-800 p-12 rounded-[3rem] shadow-2xl max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Please log in</h2>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-28 pb-20 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-3xl md:text-5xl font-black mb-2">
                Hello, <span className="text-primary italic">{user.displayName?.split(' ')[0]}!</span>
              </h1>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs flex items-center">
                <Target size={12} className="mr-1 text-primary" /> Level {profile?.studentProfile?.level || 1} Student • Madhura Abacus Star
              </p>
            </motion.div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowTrainer(true)}
            className="w-full md:w-auto bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center space-x-3 shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all"
          >
            <Play size={20} className="fill-current" />
            <span>Start Practice Session</span>
          </motion.button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Avg. Accuracy", val: "92%", icon: Target, color: "text-primary" },
            { label: "Brain Points", val: "2,450", icon: Trophy, color: "text-secondary" },
            { label: "Global Rank", val: "#142", icon: Zap, color: "text-blue-500" },
            { label: "Practice Time", val: "12.5 hrs", icon: Clock, color: "text-purple-500" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-[2rem] border-white/50 flex items-center space-x-4"
            >
              <div className={`w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold opacity-50 tracking-widest leading-none mb-1">{stat.label}</p>
                <p className="text-2xl font-black tracking-tight">{stat.val}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Performance Chart */}
            <div className="glass p-8 rounded-[3rem] border-white/50">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold">Progress Analytics</h3>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Accuracy vs Response Time</p>
                </div>
                <div className="flex space-x-2">
                  <div className="flex items-center space-x-1 text-[10px] font-bold">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Accuracy</span>
                  </div>
                  <div className="flex items-center space-x-1 text-[10px] font-bold">
                    <div className="w-2 h-2 bg-secondary rounded-full" />
                    <span>Speed</span>
                  </div>
                </div>
              </div>
              <div className="h-[300px] w-full">
                <PerformanceCharts data={sessions} />
              </div>
            </div>

            {/* History Table */}
            <div className="glass p-8 rounded-[3rem] border-white/50">
               <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold">Recent Sessions</h3>
                <button className="text-primary text-xs font-bold uppercase tracking-widest">View All</button>
              </div>
              <div className="space-y-4">
                {sessions.length > 0 ? sessions.map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-white/10">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-primary/10 text-primary rounded-xl">
                         <Zap size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{s.difficulty || 'Normal'} Mode</p>
                        <p className="text-[10px] text-slate-500 font-medium">{new Date(s.timestamp?.toDate()).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                       <p className="text-lg font-black text-primary">{s.score}/100</p>
                       <p className="text-[10px] font-bold opacity-50">{s.accuracy}% Accuracy</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-center text-slate-500 py-10">No sessions recorded yet. Start practicing!</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* AI Insights Card */}
            <div className="bg-slate-900 text-white p-8 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 blur-3xl -z-0" />
              <div className="relative z-10">
                 <div className="flex items-center space-x-3 mb-6">
                   <div className="p-2 bg-primary text-white rounded-xl">
                      <Bot size={20} />
                   </div>
                   <h3 className="font-bold">AI Insights</h3>
                 </div>
                 
                 <div className="space-y-4">
                   <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <p className="text-xs italic text-slate-300">"Your speed on level 2 subtraction is improving! Keep focusing on carry-over operations."</p>
                   </div>
                   
                   <div className="space-y-3">
                     <p className="text-[10px] uppercase font-bold opacity-50 tracking-widest">Weak Areas</p>
                     <div className="flex flex-wrap gap-2">
                       <span className="text-[10px] bg-red-500/20 text-red-300 px-3 py-1 rounded-full border border-red-500/20 font-bold">Multiplication x9</span>
                       <span className="text-[10px] bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full border border-orange-500/20 font-bold">Visualization</span>
                     </div>
                   </div>

                   <button className="w-full bg-primary py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 text-sm hover:bg-primary-dark transition-all">
                     <span>Get Detailed Advice</span>
                     <Sparkles size={16} />
                   </button>
                 </div>
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="glass p-8 rounded-[3rem] border-white/50">
               <h3 className="font-bold mb-6">Achievements</h3>
               <div className="grid grid-cols-3 gap-4">
                 {[1, 2, 3].map(i => (
                   <motion.div 
                    key={i}
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="aspect-square bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center p-3"
                   >
                     <div className="w-full h-full bg-slate-100 dark:bg-slate-900 rounded-xl flex items-center justify-center text-primary/30">
                        <Award size={24} />
                     </div>
                   </motion.div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mental Math Trainer Modal */}
      <AnimatePresence>
        {showTrainer && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTrainer(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              <AIMentalMathTrainer onClose={() => setShowTrainer(false)} studentId={user.uid} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
