import { motion } from 'motion/react';
import { Building2, PieChart, Users, CheckCircle, ArrowRight } from 'lucide-react';

const benefits = [
  "Comprehensive Curriculum",
  "AI Learning Management System",
  "National Branding & Marketing Support",
  "Teacher Training & Certification",
  "High Return on Investment",
  "Territory Exclusivity"
];

export default function Franchise() {
  return (
    <section className="py-24 px-4 relative">
       <div className="max-w-7xl mx-auto bg-slate-900 rounded-[4rem] p-12 md:p-20 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/20 blur-[120px] -z-0" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 items-center">
            <div>
              <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Partner With Us</p>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8">Start Your Own <br /> Educational Center</h2>
              <p className="text-slate-400 mb-10 leading-relaxed">
                Join India's fastest-growing AI-powered educational network. Empower your community with world-class abacus training while building a profitable business.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <CheckCircle size={18} className="text-primary shrink-0" />
                    <span className="text-sm font-medium text-slate-200">{b}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                 <div className="flex items-center space-x-4 glass p-4 px-6 rounded-2xl border-white/5">
                    <PieChart size={24} className="text-secondary" />
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-50">Estimated ROI</p>
                      <p className="text-xl font-bold">12-18 Months</p>
                    </div>
                 </div>
                 <div className="flex items-center space-x-4 glass p-4 px-6 rounded-2xl border-white/5">
                    <Users size={24} className="text-blue-400" />
                    <div>
                      <p className="text-[10px] uppercase font-bold opacity-50">Support</p>
                      <p className="text-xl font-bold">24/7 Dedicated</p>
                    </div>
                 </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="glass p-8 md:p-12 rounded-[3rem] border-white/10"
            >
              <h3 className="text-2xl font-bold mb-8">Franchise Inquiry</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-primary focus:outline-none transition-all placeholder:text-slate-500" />
                <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-primary focus:outline-none transition-all placeholder:text-slate-500" />
                <input type="tel" placeholder="Phone Number" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-primary focus:outline-none transition-all placeholder:text-slate-500" />
                <input type="text" placeholder="City/Location" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 focus:ring-2 focus:ring-primary focus:outline-none transition-all placeholder:text-slate-500" />
                <button className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
                  <span>Inquire Now</span>
                  <ArrowRight size={18} />
                </button>
              </form>
              <p className="text-[10px] text-center mt-6 text-slate-500 uppercase tracking-widest font-black">
                AI Growth Predictor Available on Inquiry
              </p>
            </motion.div>
          </div>
       </div>
    </section>
  );
}
