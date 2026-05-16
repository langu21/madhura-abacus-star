import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Youtube } from 'lucide-react';

export default function Contact() {
  return (
    <section className="py-24 px-4 bg-slate-50 dark:bg-slate-800/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-primary font-bold uppercase tracking-widest text-sm mb-4"
          >
            Get In Touch
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold mb-8"
          >
            Let's Talk About Your <br />
            <span className="text-primary">Child's Future</span>
          </motion.h2>
          
          <div className="space-y-8 mt-12">
            {[
              { icon: Mail, label: "Email Us", val: "info@madhurastar.com" },
              { icon: Phone, label: "Call Us", val: "+91 97306 85898" },
              { icon: MapPin, label: "Visit Us", val: "Kabir Nagar, Nandanvan, Nagpur" },
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-md text-primary">
                  <item.icon size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold opacity-50 uppercase tracking-widest">{item.label}</p>
                  <p className="text-lg font-bold">{item.val}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <p className="font-bold mb-4">Follow Us</p>
            <div className="flex space-x-4">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[3rem] shadow-2xl relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-xs font-bold opacity-50 ml-2">FULL NAME</label>
              <input type="text" placeholder="John Doe" className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary transition-all focus:outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold opacity-50 ml-2">EMAIL ADDRESS</label>
              <input type="email" placeholder="john@example.com" className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary transition-all focus:outline-none" />
            </div>
          </div>
          <div className="space-y-2 mb-8">
            <label className="text-xs font-bold opacity-50 ml-2">MESSAGE</label>
            <textarea placeholder="How can we help?" rows={4} className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary transition-all focus:outline-none resize-none"></textarea>
          </div>
          <button className="w-full bg-primary text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 shadow-xl shadow-primary/30 hover:bg-primary-dark hover:-translate-y-1 transition-all">
            <span>Send Message</span>
            <Send size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
