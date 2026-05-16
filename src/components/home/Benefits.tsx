import { motion } from 'motion/react';
import { 
  Brain, Zap, Target, Award, TrendingUp, 
  Smile, ShieldCheck, Microscope 
} from 'lucide-react';

const benefits = [
  {
    title: "Improves Concentration",
    desc: "Scientific methods to help children focus on complex tasks for longer durations.",
    icon: Target,
    color: "bg-blue-500",
  },
  {
    title: "Sharpens Memory",
    desc: "Visualization techniques that enhance photographic memory and recall capacity.",
    icon: Brain,
    color: "bg-primary",
  },
  {
    title: "Boosts Confidence",
    desc: "Mastering mental math gives children a sense of achievement and self-belief.",
    icon: Smile,
    color: "bg-secondary",
  },
  {
    title: "Faster Calculations",
    desc: "Perform complex operations like multiplication and division at lightning speed.",
    icon: Zap,
    color: "bg-orange-500",
  },
  {
    title: "Creative Thinking",
    desc: "Activates the right brain, responsible for creativity and imagination.",
    icon: Microscope,
    color: "bg-purple-500",
  },
  {
    title: "Validated Progress",
    desc: "Regular tests and detailed analytics to track every small improvement.",
    icon: TrendingUp,
    color: "bg-pink-500",
  }
];

export default function Benefits() {
  return (
    <section className="py-24 px-4 bg-white dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-primary font-bold uppercase tracking-widest text-sm mb-4"
          >
            Why Choose Us
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            Developing the Leaders <br /> of Tomorrow
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            className="h-1.5 bg-primary mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="p-8 rounded-[2rem] glass hover:shadow-2xl hover:shadow-primary/10 transition-all group"
            >
              <div className={`w-14 h-14 ${item.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:rotate-12 transition-transform`}>
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
