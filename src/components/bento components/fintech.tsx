import React from "react";
import { motion, useAnimation } from "framer-motion";

// Animated Chart for FinTech
const FinTechVisual = () => {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Animated line chart background */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <motion.path
          d="M0,50 Q25,40 50,60 T100,50"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          className="text-green-500/20"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.path
          d="M0,60 Q25,50 50,70 T100,60"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
          className="text-blue-500/20"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
        />
      </svg>

      {/* Glowing dots representing data points */}
      <div className="absolute inset-0 flex items-center justify-around">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-green-500 rounded-full"
            initial={{ scale: 0.5, opacity: 0.5 }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </div>
    </div>
  );
};

// Export both components to use in your Bento grid
export default FinTechVisual;
