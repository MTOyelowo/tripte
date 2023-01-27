import Link from "next/link";
import { FC } from "react";

interface Props {}

const categories = [
  {
    name: "Poetry",
    slug: "/",
  },
  {
    name: "Articles",
    slug: "/",
  },
  {
    name: "Pictures",
    slug: "/",
  },
  {
    name: "Essays",
    slug: "/",
  },
  {
    name: "Opinions",
    slug: "/",
  },
  {
    name: "Stories",
    slug: "/",
  },
  {
    name: "Plays",
    slug: "/",
  },
  {
    name: "Collections",
    slug: "/",
  },
  {
    name: "Thoughts",
    slug: "/",
  },
];

const CategoriesNav: FC<Props> = (props): JSX.Element => {
  return (
    <nav className="relative pt-2 w-full bg-white">
      <div className="flex px-10 sm:px-20 text-xl whitespace-nowrap pb-3 sm:space-x-10 overflow-x-scroll scrollbar-hide">
        {categories.map((category) => (
          <div key={category.slug}>
            <Link key={category.slug} href={category.slug}>
              <div className="last:pr-20 cursor-pointer transition text-[#DC143C] text-sm duration-100 transform hover:scale-125 hover:text-[#6E0A1E]">
                {category.name}
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
