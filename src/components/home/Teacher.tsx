import { motion } from 'motion/react';
import { User, Award, BookOpen, BrainCircuit } from 'lucide-react';
import madhuraFendarkar from '../../assets/images/madhura-fendarkar.jpeg';

export default function Teacher() {
  return (
    <section className="py-24 px-4 bg-white dark:bg-slate-900" id="teacher">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/20 max-w-md mx-auto">
              <img 
                src={madhuraFendarkar} 
                alt="Madhura Fendarkar" 
                className="w-full h-auto object-contain bg-slate-100 dark:bg-slate-800"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-8">
                <p className="text-primary font-black uppercase tracking-widest text-[10px] mb-2">Director & Lead Trainer</p>
                <h3 className="text-white font-bold text-2xl">Madhura Fendarkar</h3>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-5 py-2 rounded-full mb-6">
              <User size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Our Guiding Light</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Meet Your <span className="text-primary italic">Teacher Guide</span>
            </h2>
            
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              With years of experience in child brain development, Madhura Fendarkar has transformed the learning journey of countless students. Her innovative approach combines traditional abacus techniques with modern educational practices.
            </p>

            <div className="space-y-6">
              {[
                { icon: Award, title: "Expert Certified", desc: "Certified Abacus and Vedic Maths trainer" },
                { icon: BrainCircuit, title: "Brain Development Specialist", desc: "Focuses on cognitive enhancement" },
                { icon: BookOpen, title: "Passionate Educator", desc: "Dedicated to student success" }
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 text-primary">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
