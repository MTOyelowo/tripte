import { FC, SetStateAction, useEffect, useRef, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

interface Props {
  selectCategory: (category: string) => void;
}

const unselectedClasses =
  "last:p-2 cursor-pointer transition text-sm duration-100 transform mx-2 hover:scale-90 border-[0.5px] dark:border-gray-700 text-center shadow-md rounded-lg transition";

const selectedClasses =
  "last:p-2 cursor-pointer transition text-sm duration-100 transform mx-2 hover:scale-90 border-[0.5px] dark:border-gray-700 text-center shadow-md rounded-lg transition bg-[#DC143C] text-white";

const categories = [
  { name: "All", value: "All" },
  { name: "Poems", value: "Poetry" },
  { name: "Articles", value: "Article" },
  { name: "Podcasts", value: "Podcast" },
  { name: "Pictures", value: "Picture" },
  { name: "Essays", value: "Essay" },
  { name: "Opinions", value: "Opinion" },
  { name: "Stories", value: "Story" },
  { name: "Plays", value: "Play" },
  { name: "Thoughts", value: "Thought" },
];

const ScrollNav: FC<Props> = ({ selectCategory }): JSX.Element => {
  let scrl = useRef<HTMLUListElement>(null);

  const [activeCategory, setActiveCategory] = useState<string>("All");

  const [scrollX, setscrollX] = useState<number>(0);
  const [scrollEnd, setscrollEnd] = useState<boolean>(false);

  const onCategoryClick = (category: any) => {
    selectCategory(category);
    setActiveCategory(category);
  };

  //Slide click
  const slide = (shift: number) => {
    if (scrl.current) {
      scrl.current.scrollLeft += shift;
      setscrollX(scrollX + shift);

      if (
        Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
        scrl.current.offsetWidth
      ) {
        setscrollEnd(true);
      } else {
        setscrollEnd(false);
      }
    }
  };

  const scrollCheck = () => {
    if (scrl.current) {
      setscrollX(scrl.current.scrollLeft);

      if (
        Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
        scrl.current.offsetWidth
      ) {
        setscrollEnd(true);
      } else {
        setscrollEnd(false);
      }
    }
  };

  useEffect(() => {
    function handleResize() {
      scrollCheck();
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full">
      {scrollX !== 0 && (
        <div className="absolute left-1 flex items-center justify-center w-7 h-7 text-[#DC143C] dark:text-primary hover:rounded-full hover:bg-gray-200 dark:hover:text-primary-dark z-10 pb-3">
          <button onClick={() => slide(-50)} className="pt-3 hover:scale-90">
            <BsChevronCompactLeft size={12} />
          </button>
        </div>
      )}

      <div className="relative w-[90%] sm:w-full">
        <ul
          ref={scrl}
          onScroll={scrollCheck}
          className="text-[#DC143C] dark:text-primary flex items-center sm:justify-center text-xs whitespace-nowrap overflow-x-scroll scrollbar-hide mx-6"
        >
          {categories?.map((category, index) => {
            return (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => {
                    onCategoryClick(category.value);
                  }}
                  className={
                    activeCategory === category.name
                      ? selectedClasses
                      : unselectedClasses
                  }
                >
                  {category.name}
                </button>
              </li>
            );
          })}
          <div className="absolute -top-[48px] -left-1 mt-12 bg-gradient-to-r from-white dark:from-primary-dark h-12 w-[9%]" />
          <div className="absolute -top-[48px] -right-1 mt-12 bg-gradient-to-l from-white dark:from-primary-dark h-12 w-[9%]" />
        </ul>
      </div>

      {!scrollEnd && (
        <div className="absolute right-1 flex items-center justify-center w-7 h-7 text-[#DC143C] dark:text-primary hover:rounded-full hover:bg-gray-200 dark:hover:text-primary-dark dark:hover:bg z-10 pb-3 group">
          <button
            onClick={() => slide(+50)}
            className="pt-3 group-hover:scale-90"
          >
            <BsChevronCompactRight size={12} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ScrollNav;
