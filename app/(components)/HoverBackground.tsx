"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import background from "app/(styles)/background.module.css";

export const GradientBackground = () => {
  const [mouseInWindow, setMouseInWindow] = useState<boolean>(false);

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const manageMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX);
    mouse.y.set(clientY);
  };

  const manageMouseLeave = (e: MouseEvent) => {
    setMouseInWindow(false);
  };

  const manageMouseEnter = (e: MouseEvent) => {
    setMouseInWindow(true);
  };

  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove);
    document.addEventListener("mouseleave", manageMouseLeave);
    document.addEventListener("mouseenter", manageMouseEnter);
    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      document.removeEventListener("mouseleave", manageMouseLeave);
      document.removeEventListener("mouseenter", manageMouseEnter);
    };
  });

  return (
    <div className="fixed inset-0 z-[1] bg-gradient-to-b from-blue-400 to-blue-200">
      {/* Dot */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: mouseInWindow ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className={"fixed"}
        style={{
          left: mouse.x,
          top: mouse.y,
        }}
      >
        <div className="flex items-center justify-center">
          <div className={"absolute w-10 h-10 rounded-full bg-white"} />
        </div>
      </motion.div>
      {/* Noise */}
      <div className={background.noise}></div>
    </div>
  );
};
