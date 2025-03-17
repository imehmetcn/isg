"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient Blur */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-50 to-purple-50 opacity-70" />
      
      {/* Animated Gradient Blobs */}
      <motion.div
        className="absolute top-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      <motion.div
        className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] rounded-full bg-gradient-to-r from-green-400/20 to-blue-400/20 blur-3xl"
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      <motion.div
        className="absolute top-[30%] left-[10%] w-[25%] h-[25%] rounded-full bg-gradient-to-r from-purple-400/10 to-pink-400/10 blur-3xl"
        animate={{
          x: [0, 15, 0],
          y: [0, 15, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      {/* Dot Pattern */}
      <div className="absolute inset-0 bg-[url('/dot-pattern.svg')] bg-repeat opacity-10" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5" />
    </div>
  );
};

export default AnimatedBackground; 