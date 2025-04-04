import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const phrases = [
  'Your Health, Our Priority',
  'Expert Care, When You Need It',
  'Healthcare Made Simple',
  'Professional Medical Solutions',
  'Caring For Your Wellbeing'
];

const AnimatedHeadline = () => {
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="animated-headline">
      <AnimatePresence mode="wait">
        <motion.h1
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="display-4 fw-bold mb-3"
        >
          {phrases[index]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedHeadline; 