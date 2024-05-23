import Link from "next/link";
import { FC } from "react";

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
    <div className="flex gap-4 my-8 font-freeman mx-auto w-full items-center justify-center">
      <div className="">
        <h2 className="text-4xl lg:text-6xl text-left text-[#40424A] dark:text-[#808181] transform -rotate-90">
          Info
        </h2>
      </div>
      <ul className="list-none flex flex-col gap-4">
        {details.map((detail, index) => {
          return (
            <li key={index} className="text-1xl lg:text-2xl text-[#707171]">
              <span className="text-[#40424A] dark:text-[#808181] inline-block min-w-[220px]">
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
    </div>
  );
};

export default AboutMe;
