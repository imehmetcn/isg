"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const AuroraBackground = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveBackground = (e: MouseEvent) => {
      if (!backgroundRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPercentage = (clientX / innerWidth) * 100;
      const yPercentage = (clientY / innerHeight) * 100;

      backgroundRef.current.style.setProperty("--x-percentage", `${xPercentage}%`);
      backgroundRef.current.style.setProperty("--y-percentage", `${yPercentage}%`);
    };

    window.addEventListener("mousemove", moveBackground);
    return () => window.removeEventListener("mousemove", moveBackground);
  }, []);

  return (
    <motion.div
      ref={backgroundRef}
      className="fixed inset-0 -z-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100/10 to-blue-900/5" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(at var(--x-percentage, 50%) var(--y-percentage, 50%), 
            rgba(29, 78, 216, 0.3) 0%,
            transparent 50%),
            radial-gradient(at calc(100% - var(--x-percentage, 50%)) var(--y-percentage, 50%), 
            rgba(37, 99, 235, 0.3) 0%,
            transparent 50%),
            radial-gradient(at var(--x-percentage, 50%) calc(100% - var(--y-percentage, 50%)), 
            rgba(59, 130, 246, 0.3) 0%,
            transparent 50%)
          `,
          transform: "translate(0px, 0px)",
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
        }}
      />
      <div className="absolute inset-0 opacity-20 mix-blend-overlay">
        <div
          className="absolute inset-0 animate-aurora"
          style={{
            backgroundImage: `
              radial-gradient(at var(--x-percentage, 50%) var(--y-percentage, 50%), 
              rgba(255, 255, 255, 0.3) 0%,
              transparent 50%)
            `,
          }}
        />
      </div>
    </motion.div>
  );
}; 