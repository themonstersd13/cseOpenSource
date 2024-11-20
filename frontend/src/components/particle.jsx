// src/components/Bubbles.js

import React, { useEffect } from 'react';
import './bubble.css';

const Bubbles = () => {
  useEffect(() => {
    const bubblesContainer = document.querySelector("#bubbles");

    const createBubble = () => {
      const bubble = document.createElement("div");
      bubble.classList.add("bubble");

      // Randomly generate the x position of the bubble
      const viewportWidth = window.innerWidth;
      const randomX = Math.floor(Math.random() * viewportWidth);
      bubble.style.left = `${randomX}px`;

      // Set the y position below the window
      bubble.style.top = `calc(100vh + 50px)`;

      // Randomly delay the animation of the bubble (between 0 and 2s)
      const randomDelay = Math.random() * 2;
      bubble.style.animationDelay = `${randomDelay}s`;

      // Randomize the animation duration to make bubbles float at different speeds (between 5 and 10s)
      const randomDuration = 5 + Math.random() * 5;
      bubble.style.animationDuration = `${randomDuration}s`;

      // Randomize the bubble size (between 0.5 and 2.5em)
      const randomSize = 0.5 + Math.random() * 2;
      bubble.style.width = `${randomSize}em`;
      bubble.style.height = `${randomSize}em`;

      // Ensure no text is inside the bubble element
      bubble.textContent = "";  // Explicitly remove any text that may be added

      // Remove the bubble from the DOM after the animation ends
      bubble.addEventListener("animationend", () => {
        bubble.remove();
      });

      bubblesContainer.appendChild(bubble);
    };

    const intervalId = setInterval(createBubble, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <div id="bubbles"></div>;
};

export default Bubbles;
