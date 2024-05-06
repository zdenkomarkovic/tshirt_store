"use client";

import React, { useState } from "react";
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";

const MAX_VISIBILITY = 5;

const Carousel = ({ children }) => {
  const [active, setActive] = useState(2);
  const count = React.Children.count(children);

  return (
    <>
      <style jsx>{`
        .transform-complex {
          transform: rotateY(calc(var(--offset) * 5deg))
            scaleY(calc(1 + var(--abs-offset) * -0.4))
            translateZ(calc(var(--abs-offset) * -10rem))
            translateX(calc(var(--direction) * 20rem));
          filter: blur(calc(var(--abs-offset) * 0.3rem));
          transition: all 0.3s ease-out;
        }
      `}</style>
      <div className=" relative w-[43rem] h-[43rem] perspective-500 preserve-3d">
        {active > 0 && (
          <button
            className="text-white  text-[5rem] absolute flex items-center justify-center top-[50%] z-2 cursor-pointer select-none bg-transparent border-transparent transform -translate-x-full -translate-y-1/2 "
            onClick={() => setActive((i) => i - 1)}
          >
            <TiChevronLeftOutline />
          </button>
        )}
        {React.Children.map(children, (child, i) => (
          <div
            className=" absolute w-[100%] h-[100%] transform-complex filter-blur transition-all duration-300 ease-out "
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
        {active < count - 1 && (
          <button
            className="text-white  text-[5rem] absolute flex items-center justify-center top-[50%] z-2 cursor-pointer select-none bg-transparent border-transparent transform translate-x-full -translate-y-1/2 right-0 "
            onClick={() => setActive((i) => i + 1)}
          >
            <TiChevronRightOutline />
          </button>
        )}
      </div>
    </>
  );
};

export default Carousel;
