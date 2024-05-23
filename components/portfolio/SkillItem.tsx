import { FC, useState } from "react";
import { GoChevronDown } from "react-icons/go";

interface Props {
  label: string;
  options: string[];
}

const SkillItem: FC<Props> = ({ label, options }): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className="relative flex text-left items-center justify-end w-fit md:w-full"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <p className="inline-flex items-center cursor-pointer">{label}</p>
      <div className="h-full flex items-center pt-1">
        <GoChevronDown />
      </div>
      {isOpen ? (
        <ul className="absolute right-0 md:right-2 top-5 md:top-9 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default SkillItem;
