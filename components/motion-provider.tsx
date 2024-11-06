'use client';

import { motion } from 'framer-motion';

const MotionProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className='h-full scroll-smooth px-6 pb-6 pt-6'
    >
      {children}
    </motion.div>
  );
};

export default MotionProvider;
