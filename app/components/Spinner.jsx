import React from 'react'
import { motion } from "framer-motion";
const Spinner = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-white">
        <motion.div
          className="relative flex items-center justify-center w-20 h-20"
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="absolute w-full h-full border-4 border-black rounded-full border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }}
          />
          <motion.div
            className="absolute w-8 h-8 bg-black rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [1, 0.6, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-16 h-16 border-2 border-black rounded-full"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
  )
}

export default Spinner