import { FC, useState } from "react";
import ProjectCard, { ProjectCardProps } from "./ProjectCard";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const projects: ProjectCardProps[] = [
  {
    imageSrc: "/images/topratehero.png",
    title: "TopRate Transfer",
    githubLinks: [],
    liveLink: "https://topratetransfer.com.au/",
    description:
      "TopRate Transfer is a financial technology startup domiciled in Australia. The company facilites the transfer of money across borders.",
    techStack: [
      { label: "Typescript", href: "/images/typescript.webp" },
      { label: "React", href: "/images/react.webp" },
      { label: "NextJS", href: "/images/next-js.webp" },
      { label: "Tailwind css", href: "/images/tailwind.webp" },
    ],
  },
  {
    imageSrc: "/images/spheresed.png",
    title: "SpheresED Junior",
    githubLinks: [
      {
        label: "Frontend & Backend",
        href: "https://github.com/SpheresED/spheres_ed_junior",
      },
    ],
    liveLink: "https://spheres-ed-junior.vercel.app/",
    description:
      "SpheresED Junior is an innovative web application aimed at enhancing students' learning experiences. Leveraging images and audio recordings, it provides an immersive platform for educational content delivery. Additionally, students can test their knowledge through quizzes on various subjects, making learning both engaging and effective.",
    techStack: [
      { label: "Typescript", href: "/images/typescript.webp" },
      { label: "React", href: "/images/react.webp" },
      { label: "NextJS", href: "/images/next-js.webp" },
      { label: "MongoDB", href: "/images/mongodb.webp" },
      { label: "Tailwind css", href: "/images/tailwind.webp" },
    ],
  },
  {
    imageSrc: "/images/tripte.png",
    title: "Tripte Media",
    githubLinks: [
      {
        label: "Frontend & Backend",
        href: "https://github.com/MTOyelowo/tripte",
      },
    ],
    liveLink: "http://triptemedia.vercel.app/",
    description:
      "Tripte Media is a dynamic blog site designed to engage readers through interactive features such as liking posts and leaving comments. Built with Next.js and Tailwind CSS, the frontend offers a seamless user experience. The backend APIs, developed using Next.js server features, ensure smooth communication and data management with MongoDB.",
    techStack: [
      { label: "Typescript", href: "/images/typescript.webp" },
      { label: "React", href: "/images/react.webp" },
      { label: "NextJS", href: "/images/next-js.webp" },
      { label: "MongoDB", href: "/images/mongodb.webp" },
      { label: "Tailwind css", href: "/images/tailwind.webp" },
    ],
  },
  {
    imageSrc: "/images/zheeta.png",
    title: "Zheeta",
    githubLinks: [],
    liveLink: "https://zheeta.com/",
    description:
      "Integrated Social Networking Platform, touted as Africa's first integrated social networking platform with affiliate, classified, dating, fundraising, messaging, social feeds, gifting and more.",
    techStack: [
      { label: "Typescript", href: "/images/typescript.webp" },
      { label: "React", href: "/images/react.webp" },
      { label: "Vue React", href: "/images/vue.png" },
      { label: "SCSS", href: "/images/scss.png" },
    ],
    contributor: true,
  },
];

interface Props {}

const Projects: FC<Props> = (props): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative flex flex-col gap-8 md:gap-10 py-16 px-4 md:px-0 w-full md:w-[70%] mx-auto ">
      <div className="border-b-2 border-gray-700 dark:border-gray-300 w-fit font-poetsen">
        <h2 className="text-left text-4xl leading-6 text-gray-700 dark:text-gray-300 mb-3">
          Projects
        </h2>
      </div>
      <div className="flex items-center justify-between w-full pl-4 pr-2 mt-16 md:mt-10 text-gray-800 dark:text-primary ">
        <button
          onClick={handlePrev}
          className="p-2 md:p-3 bg-gray-700 dark:bg-slate-400 text-white text-lg md:text-xl rounded-xl"
        >
          <HiChevronLeft />
        </button>
        <div className="flex justify-center w-full">
          <ProjectCard {...projects[currentIndex]} />
        </div>
        <button
          onClick={handleNext}
          className="p-2 md:p-3 bg-gray-700 dark:bg-slate-400 text-white text-lg md:text-xl rounded-xl"
        >
          <HiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Projects;
