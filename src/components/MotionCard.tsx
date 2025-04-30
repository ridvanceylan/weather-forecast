import React from "react";
import { motion } from "framer-motion";

type MotionCardProps = {
  children: React.ReactNode;
  className: string;
};

const MotionCard: React.FC<MotionCardProps> = ({ children, className }) => {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: 20, 
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default MotionCard;