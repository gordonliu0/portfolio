"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Blob1 from "./blobs/circle1.svg";
import Image from "next/image";
import background from "app/styles/background.module.css";

export const GradientBackground = () => {
  // use in cursor calculations
  const cursorSize = 10;
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

  useEffect(() => {
    window.addEventListener("mousemove", manageMouseMove);
    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
    };
  });

  return (
    <div className="absolute z-[1] w-screen h-screen overflow-hidden bg-gradient-to-b from-blue-400 to-blue-200">
      <div className="z-1 h-full w-full absolute">
        <motion.div
          className="fixed opacity-100"
          style={{ left: mouse.x, top: mouse.y }}
        >
          <div className="flex items-center justify-center">
            <div className="absolute mix-blend-exclusion w-10 h-10 rounded-full bg-white"></div>
          </div>
        </motion.div>
        <motion.div
          className="fixed opacity-100"
          style={{ left: smoothMouse.x, top: smoothMouse.y }}
        >
          <div className="flex items-center justify-center">
            <div className="absolute w-20 h-20 rounded-full border-2 border-white"></div>
          </div>
        </motion.div>
      </div>
      <div className={background.noise}></div>
    </div>
  );
};
