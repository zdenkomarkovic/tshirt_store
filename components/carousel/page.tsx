"use client";

import React, { ReactNode, useState } from "react";
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";

const MAX_VISIBILITY = 3;

interface CarouselProps {
  children: ReactNode;
}

const Carousel = ({ children }: CarouselProps) => {
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
      <div className="perspective-500 preserve-3d relative h-[30rem] w-[800px]">
        <button
          className="absolute top-1/2 z-10 -translate-y-1/2 translate-x-[-270px] cursor-pointer select-none text-[5rem] text-gray-600"
          onClick={handlePrev}
        >
          <TiChevronLeftOutline />
        </button>

        {React.Children.map(children, (child, i) => (
          <div
            key={i}
            className="absolute size-full transition-all duration-300 ease-out"
            style={
              {
                "--active": i === active ? 1 : 0,
                "--offset": (active - i) / 3,
                "--direction": Math.sign(active - i),
                "--abs-offset": Math.abs(active - i) / 3,
                pointerEvents: active === i ? "auto" : "none",
                opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
                display:
                  Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
              } as React.CSSProperties
            }
          >
            {child}
          </div>
        ))}

        <button
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-[270px] cursor-pointer select-none border-transparent bg-transparent text-[5rem] text-gray-600"
          onClick={handleNext}
        >
          <TiChevronRightOutline />
        </button>
      </div>
    </>
  );
};

export default Carousel;
