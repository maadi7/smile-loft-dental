"use client";
import {
  useScroll,
  useTransform,
  motion,
  MotionValue,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

const TimelineItem = ({ 
  item, 
  index, 
  scrollYProgress, 
  totalItems 
}: { 
  item: TimelineEntry; 
  index: number; 
  scrollYProgress: MotionValue<number>;
  totalItems: number;
}) => {
  const circleProgress = useTransform(
    scrollYProgress,
    [index / totalItems, (index + 1) / totalItems],
    [0, 1]
  );
  const circleColor = useTransform(
    circleProgress,
    [0, 1],
    ["#ffffff", "#747474"]
  );

  return (
    <div className="flex flex-col sm:flex-row justify-between pt-10 sm:pt-20 md:pt-32 lg:pt-40 md:gap-10">
      <div className="flex items-center sm:hidden mb-4">
        <div className="relative flex items-center justify-center mr-4">
          <motion.div 
            className="h-6 w-6 rounded-full border-4 border-neutral-300 dark:border-[#747474] flex items-center justify-center z-10 ml-[6px] md:ml-0"
            style={{
              backgroundColor: circleColor
            }}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-playfair leading-tight text-primary uppercase">
            {item.title} - {item.content}
          </h3>
        </div>
      </div>

      <div className="hidden sm:block w-1/2 text-right pr-2">
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair leading-tight sm:leading-snug md:leading-normal lg:leading-relaxed mb-3 sm:mb-5 md:mb-8 lg:mb-10 text-primary uppercase">
          {item.title}
        </h3>
      </div>
      
      <div className="hidden sm:flex relative items-center justify-center w-1/4">
        <motion.div 
          className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full border-4 border-neutral-300 dark:border-[#747474] flex items-center justify-center z-10 mb-10"
          style={{
            backgroundColor: circleColor
          }}
        />
      </div>

      <div className="hidden sm:block w-1/2 pl-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair leading-tight sm:leading-snug md:leading-normal lg:leading-relaxed mb-3 sm:mb-5 md:mb-8 lg:mb-10 text-primary uppercase">
        {item.content}
      </div>
    </div>
  );
};

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const lineColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["#747474", "#747474"]
  );

  return (
    <div
      className="w-full flex items-center md:pr-16 lg:pr-20 py-10 sm:py-16 md:py-20"
      ref={containerRef}
    >
      <div ref={ref} className="relative w-full mx-auto pb-10 sm:pb-16 md:pb-20">
        {data.map((item, index) => (
          <TimelineItem 
            key={index} 
            item={item} 
            index={index} 
            scrollYProgress={scrollYProgress}
            totalItems={data.length}
          />
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 top-0 w-1 bg-[#E7E4DA]"
        >
          <motion.div
            style={{
              height: heightTransform,
              backgroundColor: lineColor,
            }}
            className="absolute inset-x-0 top-0 w-full"
          />
        </div>
      </div>
    </div>
  );
};