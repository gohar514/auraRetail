import React from "react";
import { motion } from "framer-motion";

const Spinner = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-cream">
      <motion.div
        className="w-10 h-10 border-4 border-gray-300 border-t-darkGreen rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
      />
    </div>
  );
};

export default Spinner;
