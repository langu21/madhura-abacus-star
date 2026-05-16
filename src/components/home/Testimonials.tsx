import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Priyanka Sharma",
    role: "Parent of 2 Students",
    content: "The AI performance analyzer is a game changer. I can finally see clearly where my son is struggling and how he's improving every week. Highly recommended!",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priyanka"
  },
  {
    name: "Dr. Arvind Mehta",
    role: "Educational Consultant",
    content: "Madhura Star's approach to abacus is scientific and modern. The integration of AI for mental math practice makes it far superior to traditional classes.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arvind"
  },
  {
    name: "Sneha Kapur",
    role: "Mother of Junior Student",
    content: "My daughter loves the interactive AI questions. It feels like a game to her, but her calculation speed has tripled in just 2 months!",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha"
  }
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 px-4 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Happy Parents</p>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Success Stories</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="max-w-4xl mx-auto glass p-10 md:p-16 rounded-[3rem] border-white/50 shadow-2xl relative"
            >
              <Quote className="absolute top-10 left-10 text-primary/10 w-24 h-24 -z-10" />
              
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full border-4 border-primary p-1 mb-8">
                  <img src={testimonials[active].avatar} alt={testimonials[active].name} className="w-full h-full rounded-full bg-slate-100" />
                </div>
                
                <div className="flex text-secondary mb-6">
                  {[...Array(testimonials[active].rating)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                </div>

                <p className="text-xl md:text-2xl font-medium italic mb-8 leading-relaxed">
                  "{testimonials[active].content}"
                </p>

                <div>
                  <h4 className="text-lg font-bold">{testimonials[active].name}</h4>
                  <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">{testimonials[active].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-12 space-x-6">
            <button onClick={prev} className="p-4 rounded-full glass hover:bg-primary hover:text-white transition-all shadow-xl">
              <ChevronLeft size={24} />
            </button>
            <button onClick={next} className="p-4 rounded-full glass hover:bg-primary hover:text-white transition-all shadow-xl">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
