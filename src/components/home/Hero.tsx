import { motion } from 'motion/react';
import { Sparkles, Play, ArrowRight, Brain, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-[40%] left-[20%] w-4 h-4 bg-primary rounded-full animate-bounce" />
        <div className="absolute top-[60%] right-[15%] w-6 h-6 bg-secondary rounded-full animate-ping" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 border border-primary/20 backdrop-blur-sm">
            <Sparkles size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">AI-Powered Learning Academy</span>
          </div>
          
          <div className="mb-4 inline-block bg-red-500 text-white px-6 py-1 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-red-500/20">
            Admission Open 2025-26
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] mb-6">
            Unlock Your Child's <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-dark to-accent">Brain Power</span>
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-lg leading-relaxed">
            Madhura Abacus Star combines ancient mathematical wisdom with cutting-edge AI technology to develop concentration, memory, and superior mental math skills.
          </p>

          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/login"
              className="w-full sm:w-auto bg-primary text-white px-10 py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-xl shadow-primary/25 hover:bg-primary-dark hover:-translate-y-1 transition-all"
            >
              <span>Book Free Demo</span>
              <ArrowRight size={20} />
            </Link>
            
            <button className="w-full sm:w-auto flex items-center justify-center space-x-3 group">
              <div className="w-12 h-12 rounded-full border-2 border-primary/30 flex items-center justify-center group-hover:bg-primary transition-all group-hover:text-white">
                <Play size={20} className="ml-1" />
              </div>
              <span className="font-bold text-sm tracking-tight">Watch Demo Class</span>
            </button>
          </div>

          <div className="mt-12 flex items-center space-x-8">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="Student" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-primary text-white flex items-center justify-center text-[10px] font-bold">
                10k+
              </div>
            </div>
            <div className="text-sm">
              <p className="font-bold">Trusted by 10,000+ Parents</p>
              <div className="flex text-secondary">
                {[...Array(5)].map((_, i) => <Zap key={i} size={12} fill="currentColor" />)}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-900/20 border-8 border-white dark:border-slate-800">
            <img 
              src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=2070" 
              alt="Happy Kid with Abacus" 
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Floating AI Widgets */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 glass p-5 rounded-3xl shadow-xl z-20 hidden md:block"
          >
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-primary/20 text-primary rounded-2xl">
                <Brain size={24} />
              </div>
              <div>
                <p className="text-xs font-bold opacity-50">Brain Activity</p>
                <p className="text-lg font-extrabold text-primary">High (98%)</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-10 -left-10 glass p-5 rounded-3xl shadow-xl z-20 hidden md:block"
          >
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-secondary/20 text-secondary rounded-2xl">
                <Zap size={24} />
              </div>
              <div>
                <p className="text-xs font-bold opacity-50">Calculation Speed</p>
                <p className="text-lg font-extrabold text-slate-800 dark:text-white">0.02s <span className="text-xs text-primary">+25%</span></p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
