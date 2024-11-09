"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { CheckCircle, XCircle } from "lucide-react";

export default function FinalDetailsScreen({
  score = 8,
  total = 10,
  passed = 8,
  failed = 2,
}) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (showConfetti) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [showConfetti]);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold text-gray-800 mb-4"
        >
          Congratulations!
        </motion.h1>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-6xl font-bold text-purple-600 mb-6"
        >
          {score}/{total}
        </motion.div>
        <div className="flex justify-center space-x-8 mb-8">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <CheckCircle className="w-12 h-12 text-green-500 mb-2" />
            <span className="text-2xl font-semibold text-gray-700">
              {passed}
            </span>
            <span className="text-sm text-gray-500">Passed</span>
          </motion.div>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <XCircle className="w-12 h-12 text-red-500 mb-2" />
            <span className="text-2xl font-semibold text-gray-700">
              {failed}
            </span>
            <span className="text-sm text-gray-500">Failed</span>
          </motion.div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r bg-gray-800 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-300"
        >
          Play again
        </motion.button>
      </motion.div>
    </div>
  );
}
