import { FC } from "react";
import SkillItem from "./SkillItem";
import HeroPoem from "./HeroPoem";
import Bubbles from "./Bubbles";

interface Props {}

const skillItems = [
  {
    label: "Frontend Engineering",
    options: ["JavaScript", "TypeScript", "React", "React native", "NextJS"],
  },
  { label: "Backend Engineering", options: ["NodeJS", "GoLang"] },
  {
    label: "Writing",
    options: [
      "Poetry",
      "Short stories",
      "Plays",
      "Articles",
      "Content writing",
    ],
  },
  { label: "Fashion design", options: ["African Male Wears"] },
];

const PortfolioHero: FC<Props> = (props): JSX.Element => {
  return (
    <div className="flex flex-col w-full md:w-[95%] md:mx-auto">
      <Bubbles />
      {/* Name */}
      <div className="flex flex-col items-center justify-center place-self-center w-full overflow-hidden">
        <div className="translate-y-8  lg:translate-y-24 md:translate-y-16 w-full flex justify-end px-4">
          <h4 className="font-freeman text-responsiveSideline text-primary-dark dark:text-secondary-light">
            MAYOWA TAOFEEQ
          </h4>
        </div>
        <div className="">
          <h1 className="font-freeman text-responsiveHeadline text-primary-dark dark:text-secondary-light">
            OYELOWO
          </h1>
        </div>
      </div>
      {/* Biobrief and Skills */}
      <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-4 text-primary-dark h-fit dark:text-secondary-light">
        <p className="text-center md:text-left font-poetsen text-responsiveParagraph md:w-[45%]">
          A Nomad of Dreams, seeking to bring about positive change through
          Software, Writing, and Fashion
        </p>
        <div className="flex h-full ">
          <div className="flex flex-row flex-wrap md:flex-col gap-2 h-full font-poetsen text-responsiveListItem">
            {skillItems.map((item, index) => (
              <SkillItem
                key={index}
                label={item.label}
                options={item.options}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Poem */}
      <HeroPoem />
    </div>
  );
};

export default PortfolioHero;
