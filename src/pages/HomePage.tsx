import { motion } from 'motion/react';
import Hero from '../components/home/Hero';
import Benefits from '../components/home/Benefits';
import Courses from '../components/home/Courses';
import Stats from '../components/home/Stats';
import Testimonials from '../components/home/Testimonials';
import Contact from '../components/home/Contact';
import Franchise from '../components/home/Franchise';

import Teacher from '../components/home/Teacher';
import Gallery from '../components/home/Gallery';
export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-x-hidden"
    >
      <Hero />
      <Stats />
      <Benefits />

      <div id="courses">
        <Courses />
      </div>
      <Teacher />
      <Gallery />
      <Testimonials />
      <div id="franchise">
        <Franchise />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </motion.div>
  );
}
