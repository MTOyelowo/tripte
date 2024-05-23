import React from "react";

export interface ResumeItemProps {
  dateRange: string;
  company: string;
  position: string;
  descriptions: string[];
}

const ExperienceItem: React.FC<ResumeItemProps> = ({
  dateRange,
  company,
  position,
  descriptions,
}) => {
  return (
    <li className="relative">
      <div className="hidden md:flex md:absolute w-4 h-4 border-2 border-gray-700 dark:border-gray-300 bg-gray-300 dark:bg-gray-700 rounded-full -left-[121px] top-3" />
      <h2 className="text-2xl md:text-4xl mb-4 text-gray-700 dark:text-gray-300">
        {dateRange}
      </h2>
      <h3 className="text-2xl text-gray-700 dark:text-gray-300">{company}</h3>
      <h4 className="text-lg uppercase text-gray-500 dark:text-gray-200 mt-2 mb-6">
        {position}
      </h4>
      {descriptions.map((description, index) => (
        <p
          key={index}
          className="w-full md:w-[80%] text-gray-500 dark:text-gray-200 leading-8"
        >
          • {description}
        </p>
      ))}
    </li>
  );
};

export default ExperienceItem;
