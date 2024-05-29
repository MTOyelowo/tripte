import Link from "next/link";
import { FC } from "react";
import { GoPaperclip } from "react-icons/go";

interface Props {}

const details = [
  {
    label: "Address",
    info: "NO 20 Inukan Avenue, Moniya, Ibadan, Oyo State, Nigeria",
  },
  { label: "Email", info: "oyelowomayowa@gmail.com" },
  { label: "Phone", info: "+2348103894074" },
  {
    label: "Github",
    info: "https://github.com/MTOyelowo",
    href: "https://github.com/MTOyelowo",
  },
  { label: "Phone", info: "+2348103894074" },
];

const AboutMe: FC<Props> = (props): JSX.Element => {
  return (
    <div className="flex flex-col md:flex-row gap-4 my-8 font-freeman mx-auto w-full items-center justify-center px-4">
      <div className="">
        <h2 className="text-4xl lg:text-6xl text-left text-[#40424A] dark:text-[#808181] md:transform md:-rotate-90">
          Info
        </h2>
      </div>
      <div className="flex flex-col gap-8">
        <ul className="list-none flex flex-col gap-4">
          {details.map((detail, index) => {
            return (
              <li
                key={index}
                className="flex flex-col md:flex-row text-1xl lg:text-2xl text-[#707171] gap-0 md:gap-4"
              >
                <span className="text-[#40424A] dark:text-[#808181] inline-block">
                  {detail.label}
                </span>
                {detail.href ? (
                  <Link href={detail.href}>{detail.href}</Link>
                ) : (
                  detail.info
                )}
              </li>
            );
          })}
        </ul>
        <div className="flex gap-2 w-full items-center justify-center mx-auto font-poetsen dark:text-white cursor-pointer">
          <a
            href="/cv/mayowa-taofeeq-oyelowo-resume.pdf"
            className="flex gap-2 items-center justify-center cursor-pointer"
            download
          >
            <GoPaperclip size={24} />
            Download my CV
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
