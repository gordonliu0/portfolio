"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import background from "app/styles/background.module.css";

export const GradientBackground = () => {
  // use in cursor calculations

  const [mouseInWindow, setMouseInWindow] = useState<boolean>(false);

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothMouse = {
    x: useSpring(mouse.x),
    y: useSpring(mouse.y),
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
    <div className="absolute z-[1] w-screen h-screen overflow-hidden bg-gradient-to-b from-blue-400 to-blue-200">
      <div className="z-1 h-full w-full absolute">
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
            <div className="absolute w-10 h-10 rounded-full bg-white"></div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: mouseInWindow ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="fixed"
          style={{ left: smoothMouse.x, top: smoothMouse.y }}
        >
          <div className="flex items-center justify-center">
            <div className="absolute w-16 h-16 rounded-full border-2 border-white"></div>
          </div>
        </motion.div>
      </div>
      <div className={background.noise}></div>
    </div>
  );
};
