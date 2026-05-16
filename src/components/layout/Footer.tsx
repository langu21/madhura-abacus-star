import { motion } from 'motion/react';
import { 
  Instagram, Facebook, Twitter, Youtube, 
  MapPin, Phone, Mail, ChevronRight 
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-20 pb-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center space-x-2 text-white">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold">M</div>
            <span className="text-xl font-bold tracking-tighter">MADHURA STAR</span>
          </div>
          <p className="text-sm leading-relaxed">
            Leading Abacus training institute dedicated to unlocking the potential of young brains through scientific methods and AI-powered learning.
          </p>
          <div className="flex space-x-4">
            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4">
            {['About Us', 'AI Features', 'Courses', 'Franchise', 'Student Dashboard'].map((link) => (
              <li key={link}>
                <a href="#" className="text-sm hover:text-primary flex items-center group">
                  <ChevronRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Top Courses</h4>
          <ul className="space-y-4">
            {['Junior Abacus', 'Vedic Maths', 'Senior Abacus', 'Handwriting', 'Rubik’s Cube'].map((link) => (
              <li key={link}>
                <a href="#" className="text-sm hover:text-primary flex items-center group">
                  <ChevronRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Contact Us</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start space-x-3">
              <MapPin size={18} className="text-primary mt-1 shrink-0" />
              <span>Kabir Nagar, Nandanvan, Nagpur</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={18} className="text-primary shrink-0" />
              <span>+91 97306 85898</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={18} className="text-primary shrink-0" />
              <span>info@madhurastar.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs space-y-4 md:space-y-0">
        <p>© 2026 Madhura Abacus Star. All rights reserved.</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
}
