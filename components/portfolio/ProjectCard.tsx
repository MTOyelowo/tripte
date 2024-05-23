import Link from "next/link";
import React, { FC, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Image from "next/image";

export type GithublinkTypes = {
  label: "Frontend" | "Backend" | "Mobile" | "Frontend & Backend";
  href: string;
};

export type TechStackTypes = {
  href: string;
  label: string;
};

export interface ProjectCardProps {
  imageSrc: string;
  title: string;
  githubLinks: GithublinkTypes[];
  liveLink: string;
  description: string;
  techStack: TechStackTypes[];
  contributor?: boolean;
}

const ProjectCard: FC<ProjectCardProps> = ({
  imageSrc,
  title,
  githubLinks,
  liveLink,
  description,
  techStack,
  contributor,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col w-[300px] md:w-[400px] bg-white dark:bg-primary-dark rounded-lg shadow-lg dark:shadow-gray-500 font-freeman text-secondary-dark dark:text-secondary-light">
      <div className="relative w-full aspect-video object-scale-down rounded-t-lg">
        <Image src={imageSrc} alt={title} fill className="rounded-t-lg" />
      </div>
      <div className="p-3">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <div className="mt-2 flex items-center w-full gap-4 text-sm">
          <LinkItem
            isOpen={isOpen}
            label="Github"
            options={githubLinks}
            setIsOpen={setIsOpen}
          />
          <Link href={liveLink}>Live ↗</Link>
          {contributor ? (
            <p className="w-fit p-1 px-2 border border-[#DC143C] text-[#DC143C] rounded-full text-xs">
              Contributor
            </p>
          ) : null}
        </div>
        <p className="mt-4 text-sm">{description}</p>
        {techStack.length > 0 ? (
          <div className="mt-4">
            <h4 className="text-sm font-medium">Tech stack used:</h4>
            <div className="flex gap-4 mt-2">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className={`relative w-5  ${
                    tech.label === "Tailwind css" ? "h-3 mt-1" : "aspect-square"
                  }`}
                >
                  <Image src={tech.href} alt={tech.label} fill />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProjectCard;

interface Props {
  label: string;
  options: GithublinkTypes[];
  isOpen: boolean;
  setIsOpen(arg: boolean): void;
}

const LinkItem: FC<Props> = ({
  label,
  options,
  isOpen,
  setIsOpen,
}): JSX.Element => {
  return (
    <div
      className="relative flex text-left items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <p className="inline-flex items-center cursor-pointer">{label}</p>
      <div className="h-full flex items-center mt-[2px] ml-1 font-bold">
        {options.length > 0 && isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {options.length > 0 && isOpen ? (
        <ul className="absolute right-0 md:right-2 md:top-3 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          {options
            ? options?.map((option, index) => (
                <li
                  key={index}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer hover:rounded-lg"
                >
                  <Link href={option.href}>{option.label}</Link>
                </li>
              ))
            : null}
        </ul>
      ) : null}
    </div>
  );
};
