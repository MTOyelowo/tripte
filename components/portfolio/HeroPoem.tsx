import { FC, useRef, useState, useEffect } from "react";

interface Props {}

const HeroPoem: FC<Props> = (props): JSX.Element => {
  const [focusedLines, setFocusedLines] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const lines = container.querySelectorAll<HTMLSpanElement>(".line");
    const viewHeight = window.innerHeight;
    const focusAreaStart = viewHeight * 0.3;
    const focusAreaEnd = viewHeight * 0.7;

    const newFocusedLines: number[] = [];

    Array.from(lines).forEach((line, index) => {
      const lineRect = line.getBoundingClientRect();
      const lineCenterY = lineRect.top + lineRect.height / 2;

      if (lineCenterY >= focusAreaStart && lineCenterY <= focusAreaEnd) {
        newFocusedLines.push(index);
      }
    });

    setFocusedLines(newFocusedLines);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call to set focus on load

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures this effect runs once on mount

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center text-responsivePoem font-poetsen mt-10"
    >
      <p className="text-center">
        {[
          "I am like bamboo. I am like gold. I am like diamond",
          "I am like the rock underneath the waterfall",
          "I am a dreamer just like everyone else",
          "But I dream not for myself",
          "I dream for those around me",
          "For I know that in the realization of their dreams",
          "lies the realization of my dreams and a fulfilment of my potential",
          "And proudly, I am...",
          "A Nomad of Dreams",
        ].map((line, index) => (
          <span
            key={index}
            className={`line text-[#DBDBDB] dark:text-[#3F3F3F] ${
              focusedLines.includes(index)
                ? "text-[#373737] dark:text-[#AFAFAF]"
                : ""
            }`}
          >
            {line}
            <br />
          </span>
        ))}
      </p>
    </div>
  );
};

export default HeroPoem;
