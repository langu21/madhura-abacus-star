import { motion } from 'motion/react';
import { Users, School, Award, Heart } from 'lucide-react';

const stats = [
  { label: "Students Trained", value: "10k+", icon: Users, color: "text-blue-500" },
  { label: "Partner Centers", value: "50+", icon: School, color: "text-primary" },
  { label: "National Awards", value: "500+", icon: Award, color: "text-secondary" },
  { label: "Parent Satisfaction", value: "98%", icon: Heart, color: "text-red-500" },
];

export default function Stats() {
  return (
    <section className="py-20 relative px-4">
      <div className="max-w-7xl mx-auto glass rounded-[3rem] p-12 grid grid-cols-2 lg:grid-cols-4 gap-12 border border-white/40">
        {stats.map((s, i) => (
          <div key={i} className="text-center space-y-4">
            <div className={`w-12 h-12 ${s.color} bg-white dark:bg-slate-800 rounded-2xl mx-auto flex items-center justify-center shadow-lg`}>
              <s.icon size={24} />
            </div>
            <div>
              <motion.h3 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-4xl font-extrabold"
              >
                {s.value}
              </motion.h3>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
