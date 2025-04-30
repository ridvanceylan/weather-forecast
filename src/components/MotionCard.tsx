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
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default MotionCard;
