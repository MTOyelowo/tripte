import React, { FC } from "react";
import Separator from "./Separator";
import {
  FaGithubSquare,
  FaFacebookSquare,
  FaInstagramSquare,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IconType } from "react-icons";

interface SocialLink {
  href: string;
  icon: IconType;
}

const socialLinks: SocialLink[] = [
  { href: "", icon: FaGithubSquare },
  { href: "", icon: FaFacebookSquare },
  { href: "", icon: FaInstagramSquare },
  { href: "", icon: FaSquareXTwitter },
];

const SocialSection: FC = () => {
  return (
    <div className="bg-gray-100 dark:bg-zinc-900 py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="relative w-full max-w-5xl">
            <div className="flex justify-between gap-10 items-center relative bg-gray-100 dark:bg-zinc-900">
              <div className="flex items-center justify-center md:justify-between gap-10 w-full">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-gray-700 dark:text-gray-300 text-3xl"
                  >
                    <link.icon size={36} />
                  </a>
                ))}
              </div>
              <div className="hidden md:flex border-2 border-gray-300 w-full" />
              <div className="flex items-end justify-end whitespace-nowrap">
                <h2 className="hidden md:flex font-freeman text-4xl text-gray-700 dark:text-gray-300 font-normal relative break text-right">
                  My Profiles
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialSection;
