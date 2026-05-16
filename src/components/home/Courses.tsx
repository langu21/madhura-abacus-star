import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

import course1Video from '../../assets/videos/course1.mp4';
import course2Video from '../../assets/videos/course2.mp4';
import course3Video from '../../assets/videos/course3.mp4';
import course4Video from '../../assets/videos/course4.mp4';

const courses = [
  {
    title: "Junior Abacus",
    desc: "Foundational course focusing on single-digit operations and visualization.",
    age: "4-7 Years",
    duration: "3 Months",
    price: "₹2,500",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=2072",
    video: course1Video,
    tag: "Ages 4-7"
  },
  {
    title: "Vedic Maths",
    desc: "Ancient Indian mathematical techniques for rapid mental calculation.",
    age: "10+ Years",
    duration: "6 Months",
    price: "₹4,000",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=2132",
    video: course2Video,
    tag: "Ages 10+"
  },
  {
    title: "Senior Abacus",
    desc: "Advanced multi-digit operations, decimals, and complex mental arithmetic.",
    age: "8-14 Years",
    duration: "1 Year",
    price: "₹7,500",
    image: "https://images.unsplash.com/photo-1627555011164-3b2c65961e67?auto=format&fit=crop&q=80&w=2070",
    video: course3Video,
    tag: "Ages 8-14"
  },
  {
    title: "Brain Gym",
    desc: "Exercises to synchronize left and right brain hemispheres for peak mental poise.",
    age: "All Ages",
    duration: "1 Month",
    price: "₹1,500",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2120",
    video: course4Video,
    tag: "Mixed Age"
  }
];

function CourseCard({ course, index }: { course: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all h-[450px]">
        <video 
          src={course.video} 
          controls
          playsInline
          className="w-full h-full object-contain"
        />
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-primary pointer-events-none">
          {course.title}
        </div>
      </div>
    </motion.div>
  );
}

export default function Courses() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-primary font-bold uppercase tracking-widest text-sm mb-4"
            >
              Our Curriculum
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold"
            >
              Empower Through Learning
            </motion.h2>
          </div>
          <button className="text-primary font-bold flex items-center space-x-2 group">
            <span>View All Programs</span>
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, i) => (
            <CourseCard key={i} course={course} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
