"use client";

import React from "react";

import Typewriter from "typewriter-effect";

const WelcomeWritter = () => {
  return (
    <div>
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
