import React from 'react';
import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  isLoading: boolean; 
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    </motion.div>
  );
};

export default LoadingSpinner;
