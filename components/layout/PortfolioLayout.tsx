import { FC, ReactNode } from "react";
import AppHead from "../common/AppHead";
import CategoriesNav from "../common/nav/CategoriesNav";
import PortfolioNav from "../common/nav/PortfolioNav";
import Bubbles from "../portfolio/Bubbles";

interface Props {
  title?: string;
  desc?: string;
  children?: ReactNode;
}

export interface LItem {
  name: string;
  href: string;
}

const linkItems: LItem[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Work",
    href: "/",
  },
  {
    name: "About",
    href: "/",
  },
  {
    name: "Contact",
    href: "/",
  },
];

const PortfolioLayout: FC<Props> = ({ children, title, desc }): JSX.Element => {
  return (
    <>
      <AppHead title={title} desc={desc} />
      <div className="relative min-h-screen bg-primary dark:bg-primary-dark transition">
        <div className="sticky top-0 z-10">
          <PortfolioNav linkItems={linkItems} />
        </div>

        <div className="max-w-full">{children}</div>
      </div>
    </>
  );
};

export default PortfolioLayout;
