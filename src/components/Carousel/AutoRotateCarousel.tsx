import React, { useEffect, useState } from "react";

type AutoRotateCarouselProps = {
  items: React.ReactElement[];
  timeToAutoRotateInMs: number;
};

const AutoRotateCarousel = ({
  items,
  timeToAutoRotateInMs,
}: AutoRotateCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const next = (currentSlide + 1) % items.length;
    const timeoutId = setTimeout(() => {
      setCurrentSlide(next);
    }, timeToAutoRotateInMs);

    return () => clearTimeout(timeoutId);
  }, [currentSlide]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center md:pt-16 md:bg-[var(--primary-blue)] rounded-l-xl">
      {items[currentSlide]}
      <div className="flex justify-center gap-2.5 mt-5">
        {items.map((el, idx) => (
          <button
            aria-label="trocar etapa"
            type="button"
            key={el.key}
            onClick={() => setCurrentSlide(idx)}
            className="hover:brightness-125"
          >
            <div
              className={`h-1 w-9 ${
                currentSlide === idx ? "bg-white" : "bg-[#84abe1]"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default AutoRotateCarousel;
