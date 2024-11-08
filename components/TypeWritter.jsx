"use client";

import React from "react";

import Typewriter from "typewriter-effect";

import styles from "./TypeWritter.module.css"

const WelcomeWritter = () => {
  return (
    <div className={styles.title}>
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString("Welcome to Next Notes")
            .pauseFor(2500)
            .start();
        }}
      />
    </div>
  );
};

export default WelcomeWritter;
