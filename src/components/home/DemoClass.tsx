import { motion } from 'motion/react';
import { Play, Sparkles, Brain } from 'lucide-react';

export default function DemoClass() {
  return (
    <section className="py-24 px-4 bg-slate-950 overflow-hidden relative" id="live-demo">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(0,184,148,0.15),transparent)]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Column: Content */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 border border-primary/20 backdrop-blur-md">
                <Sparkles size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">Student Spotlight</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
                Real Results: <br />
                <span className="text-primary italic">Mental Math Mastery</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                Watch how our students at <span className="text-white font-bold">Madhura Abacus Star</span> perform complex calculations using visualization. These sessions demonstrate the peak of brain synchronization and focus.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                   { title: "Visual abacus", desc: "Solving without a physical tool." },
                   { title: "Super Mind-Tech", desc: "Scientific Success Key methodology." }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col space-y-3">
                    <div className="w-10 h-1 bg-primary rounded-full" />
                    <h4 className="text-white font-bold text-sm uppercase tracking-wide">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-12 bg-white text-slate-900 px-10 py-4 rounded-2xl font-black text-sm flex items-center space-x-3 shadow-2xl hover:bg-primary hover:text-white transition-all"
              >
                <span>View More Success Stories</span>
                <Play size={16} fill="currentColor" />
              </motion.button>
            </motion.div>
          </div>

          {/* Right Column: Video Grid/Side Layout */}
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="aspect-[9/16] bg-slate-800 rounded-3xl overflow-hidden shadow-2xl relative group border-4 border-slate-700/50"
            >
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2120" 
                alt="Student 1" 
                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl shadow-primary/40">
                    <Play size={24} className="ml-1" />
                 </div>
              </div>
              <div className="absolute bottom-4 left-4">
                <p className="text-[10px] font-black bg-slate-900/80 p-2 rounded text-white backdrop-blur">LEVEL 4 PERFORMANCE</p>
              </div>
            </motion.div>

            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="aspect-square bg-slate-800 rounded-3xl overflow-hidden shadow-2xl relative group border-2 border-slate-700/50"
              >
                <img 
                  src="https://images.unsplash.com/photo-1577891779192-e42129528d2d?auto=format&fit=crop&q=80&w=2070" 
                  alt="Student 2" 
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-10 h-10 bg-white/20 backdrop-blur text-white rounded-full flex items-center justify-center">
                      <Play size={16} className="ml-0.5" />
                   </div>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="aspect-square bg-primary/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center justify-center p-6 text-center border-2 border-primary/20"
              >
                <Brain className="text-primary mb-4" size={40} />
                <p className="text-xl font-black text-white">99%</p>
                <p className="text-[10px] uppercase font-bold text-primary tracking-widest">Focus Level</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
