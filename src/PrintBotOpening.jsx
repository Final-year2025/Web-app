import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Printer } from 'lucide-react';
import PrintBotLanding from './PrintBotLanding';

const PrintBotLogo = () => (
  <div className="relative">
    <Printer className="w-24 h-24 text-blue-600" />
    <motion.div
      className="absolute inset-0 border-4 border-blue-600 rounded-full"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    />
  </div>
);

export default function PrintBotOpening() {
  const [showLanding, setShowLanding] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLanding(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showLanding) {
    return <PrintBotLanding />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PrintBotLogo />
      </motion.div>
      <motion.h1
        className="text-4xl font-bold mt-4 text-blue-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        PrintBot
      </motion.h1>
      <motion.p
        className="text-xl text-gray-600 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        Your AI-powered printing assistant
      </motion.p>
    </div>
  );
}