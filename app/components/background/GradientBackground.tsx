"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Blob1 from "./blobs/blob1.svg";
import Blob2 from "./blobs/blob2.svg";
import Blob3 from "./blobs/circle1.svg";
import Image from "next/image";
import background from "app/styles/background.module.css";

export const GradientBackground = () => {
  return (
    <div className="absolute z-[1] w-screen h-screen overflow-hidden">
      <div className="z-1 h-full w-full absolute">
        <motion.div
          className="absolute"
          animate={{ x: -400, y: 600, opacity: 0.5 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
        >
          <Image
            className="blur-[256px] opacity-100 relative top-[200%] left-[120%]"
            src={Blob3}
            height={1500}
            width={1500}
            alt={"hello"}
          />
        </motion.div>
        <motion.div
          className="absolute"
          animate={{ x: 200, y: -200, opacity: 0.5 }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
        >
          <Image
            className="blur-[256px] relative right-full opacity-100"
            src={Blob3}
            height={1000}
            width={1000}
            alt={"hello"}
          />
        </motion.div>
      </div>
      <div className={background.noise}></div>
    </div>
  );
};
