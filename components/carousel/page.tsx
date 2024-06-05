"use client";

import React, { useState } from "react";
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";

const MAX_VISIBILITY = 3;

const Carousel = ({ children }) => {
  const [active, setActive] = useState(2);

  const count = React.Children.count(children);

  const handlePrev = () => {
    setActive((prevActive) => (prevActive - 1 + count) % count);
  };

  const handleNext = () => {
    setActive((prevActive) => (prevActive + 1) % count);
  };

  return (
    <>
      <style jsx>{`
        .transform-complex {
          transform: rotateY(calc(var(--offset) * 0deg))
            scaleY(calc(1 + var(--abs-offset) * 0.1))
            translateZ(calc(var(--abs-offset) * -22rem))
            translateX(calc(var(--direction) * 20rem));
          filter: blur(calc(var(--abs-offset) * 0.2rem));
          transition: all 0.3s ease-out;
        }
      `}</style>
      <div className=" relative w-[800px] h-[30rem] perspective-500 preserve-3d">
        <button
          className=" text-gray-600 text-[5rem] absolute top-[50%] z-2 cursor-pointer select-none  transform -translate-x-[270px] -translate-y-1/2"
          onClick={handlePrev}
        >
          <TiChevronLeftOutline />
        </button>

        {React.Children.map(children, (child, i) => (
          <div
            key={i}
            className="absolute w-[100%] h-[100%] transform-complex filter-blur transition-all duration-300 ease-out"
            style={{
              "--active": i === active ? 1 : 0,
              "--offset": (active - i) / 3,
              "--direction": Math.sign(active - i),
              "--abs-offset": Math.abs(active - i) / 3,
              "pointer-events": active === i ? "auto" : "none",
              opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
              display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
            }}
          >
            {child}
          </div>
        ))}

        <button
          className="text-gray-600 text-[5rem] absolute top-[50%] z-2 cursor-pointer select-none bg-transparent border-transparent transform translate-x-[270px] -translate-y-1/2 right-0"
          onClick={handleNext}
        >
          <TiChevronRightOutline />
        </button>
      </div>
    </>
  );
};

export default Carousel;
