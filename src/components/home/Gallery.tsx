import { motion } from 'motion/react';
import { Camera, Sparkles, Play } from 'lucide-react';

import admissionPoster from '../../assets/images/real-admission-poster.jpeg';
import demoVideo from '../../assets/videos/demo-video.mp4';

const mediaItems = [
  { type: 'image', url: admissionPoster, title: "Admission Open" },
  { type: 'video', url: demoVideo, title: "Classroom Demo" },
];

export default function Gallery() {
  return (
    <section className="py-24 px-4 bg-slate-50 dark:bg-slate-900/20" id="gallery">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-5 py-2 rounded-full mb-6"
          >
            <Camera size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Our Visual Journey</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">Capturing <span className="text-primary italic">Excellence</span></h2>
          <p className="text-slate-500 max-w-lg mx-auto text-sm leading-relaxed">
            From daily brain gym activities to national level competitions, explore the vibrant life at Madhura Abacus Star.
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {mediaItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-xl shadow-slate-900/5 ring-1 ring-slate-200 dark:ring-slate-800"
            >
              {item.type === 'video' ? (
                <video 
                  src={item.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              ) : (
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                 <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-primary font-black uppercase tracking-widest text-[10px] mb-2 flex items-center">
                      <Sparkles size={12} className="mr-2" /> Madhura Star
                    </p>
                    <h4 className="text-white font-bold text-lg flex items-center">
                      {item.type === 'video' && <Play size={16} className="mr-2 fill-white" />}
                      {item.title}
                    </h4>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
