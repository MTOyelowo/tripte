import { FC, ReactNode } from "react";
import AppHead from "../common/AppHead";
import CategoriesNav from "../common/nav/CategoriesNav";
import UserNav from "../common/nav/UserNav";

interface Props {
  title?: string;
  desc?: string;
  children?: ReactNode;
}

const DefaultLayout: FC<Props> = ({ children, title, desc }): JSX.Element => {
  return (
    <>
      <AppHead title={title} desc={desc} />
      <div className="min-h-screen bg-primary dark:bg-primary-dark transition">
        <div className="font-serif">
          <UserNav />
          {/* <CategoriesNav /> */}
        </div>
        <div className="max-w-4xl mx-auto font-serif mt-2">{children}</div>
      </div>
    </>
  );
};

export default DefaultLayout;
