import { motion } from 'motion/react';
import { 
  Bot, ChartBar, Mic, Clock, 
  Sparkles, ListChecks, Zap, UserPlus
} from 'lucide-react';

const features = [
  {
    title: "AI Mental Math Trainer",
    desc: "Adaptive questions that evolve with your child's accuracy and speed.",
    icon: Zap,
    tag: "Real-time AI",
  },
  {
    title: "AI Performance Analyzer",
    desc: "Visualizes concentration levels and identifies weak areas using deep learning.",
    icon: ChartBar,
    tag: "Predictive",
  },
  {
    title: "AI Voice Practice",
    desc: "Speak the answers and let our AI check accuracy with speech recognition.",
    icon: Mic,
    tag: "Speech AI",
  },
  {
    title: "AI Chat Assistant",
    desc: "Friendly companion for parents to track progress and inquire about courses.",
    icon: Bot,
    tag: "Support",
  }
];

export default function AIFeatures() {
  return (
    <section className="py-24 px-4 bg-slate-50 dark:bg-slate-800/20 relative overflow-hidden">
      {/* Abstract AI Decorations */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-1/2">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-primary font-bold uppercase tracking-widest text-sm mb-4"
          >
            The Future of Education
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight"
          >
            Empowering Brains with <br />
            <span className="text-primary">Advanced AI</span>
          </motion.h2>
          <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-xl">
            We don't just teach abacus; we build a cognitive foundation using technology. Our AI platform tracks over 50 data points per session to provide the most personalized learning experience in India.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-3xl glass shadow-sm hover:shadow-xl hover:shadow-primary/5 border border-white/50"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-primary/10 text-primary rounded-xl">
                    <f.icon size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-tighter bg-primary text-white px-2 py-1 rounded">
                    {f.tag}
                  </span>
                </div>
                <h4 className="font-bold mb-2">{f.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:w-1/2 relative">
          <div className="relative z-10 w-full h-[500px] bg-slate-900 rounded-[3rem] p-4 shadow-2xl overflow-hidden group">
            {/* Mock Dashboard UI */}
            <div className="h-full w-full bg-slate-800 rounded-[2.5rem] p-6 space-y-6 overflow-hidden">
               <div className="flex justify-between items-center">
                 <div className="flex items-center space-x-2">
                   <div className="w-8 h-8 rounded-full bg-slate-700" />
                   <div className="w-24 h-3 bg-slate-700 rounded-full" />
                 </div>
                 <div className="w-12 h-6 bg-primary/20 rounded-full text-primary text-[10px] flex items-center justify-center font-bold">LIVE AI</div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <motion.div 
                   animate={{ scale: [1, 1.05, 1] }}
                   transition={{ repeat: Infinity, duration: 3 }}
                   className="h-32 bg-slate-700/50 rounded-3xl p-4"
                  >
                   <p className="text-[10px] text-slate-400 uppercase font-bold">Accuracy</p>
                   <p className="text-3xl font-black text-white mt-1">94%</p>
                   <div className="w-full h-1 bg-slate-600 mt-4 rounded-full overflow-hidden">
                     <div className="w-[94%] h-full bg-primary" />
                   </div>
                 </motion.div>
                 <div className="h-32 bg-slate-700/50 rounded-3xl p-4">
                   <p className="text-[10px] text-slate-400 uppercase font-bold">Focus</p>
                   <p className="text-3xl font-black text-white mt-1">82/100</p>
                   <div className="flex space-x-1 mt-4">
                     {[...Array(8)].map((_, i) => <div key={i} className="h-2 w-1 bg-secondary rounded-full" />)}
                   </div>
                 </div>
               </div>

               <div className="bg-slate-700/30 rounded-3xl p-6 h-40">
                 <div className="flex items-center space-x-2 mb-4">
                   <Bot size={16} className="text-primary" />
                   <span className="text-[10px] font-bold text-slate-400">AI RECOMMENDATION</span>
                 </div>
                 <p className="text-sm text-slate-200 italic">"Rahul is struggling with double-digit subtraction involving 9. We suggest 15 minutes of level 2 visual practice."</p>
               </div>
            </div>
            
            {/* Pulse Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/20 rounded-full blur-[100px] -z-10 group-hover:scale-110 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </section>
  );
}
