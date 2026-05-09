import React, { useEffect } from "react";
import { motion } from "motion/react";
import { HandHeart } from "lucide-react";

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="h-full bg-[#F97316] flex flex-col items-center justify-center text-white">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mb-4"
      >
        <div className="bg-white p-6 rounded-3xl shadow-2xl">
          <HandHeart size={80} className="text-[#F97316]" />
        </div>
      </motion.div>
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-4xl font-bold tracking-tight"
      >
        NGOConnect
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1 }}
        className="mt-2 text-lg font-light"
      >
        Digitalizing Compassion
      </motion.p>
    </div>
  );
};

export default SplashScreen;
