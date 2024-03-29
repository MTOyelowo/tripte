import Link from "next/link";
import { FC } from "react";

interface Props {}

const categories = [
  "Poetry",
  "Articles",
  "Pictures",
  "Essays",
  "Opinions",
  "Stories",
  "Plays",
  "Thoughts",
];

const CategoriesNav: FC<Props> = (props): JSX.Element => {
  return (
    <nav className="relative pt-2 w-full bg-white dark:bg-primary-dark group">
      <div className="flex px-10 sm:px-20 text-xl whitespace-nowrap pb-3 sm:space-x-10 overflow-x-scroll scrollbar-hide group-hover:scrollbar-default">
        {categories.map((category, index) => (
          <div key={category + index}>
            <Link
              href={{
                pathname: "/category/" + category.toLowerCase(),
                query: category,
              }}
            >
              <div className="last:pr-20 cursor-pointer transition text-[#DC143C] text-sm duration-100 transform hover:scale-125 hover:text-[#6E0A1E] dark:hover:text-[#EF4E6E]">
                {category}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="absolute top-0 right-0 bg-gradient-to-l from-white dark:from-primary-dark h-10 w-1/12" />
    </nav>
  );
};

export default CategoriesNav;
