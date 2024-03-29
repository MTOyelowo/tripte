import Link from "next/link";
import { FC, ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  seeAllRoute: string;
}

const ContentWrapper: FC<Props> = ({
  title,
  children,
  seeAllRoute,
}): JSX.Element => {
  return (
    <div className="flex flex-col min-w-[300px] bg-[#FDEDF1] dark:bg-[#2c050d] p-2 rounded-xl">
      <h3 className="text-xl dark:text-primary text-primary-dark font-semibold py-2 transition">
        {title}
      </h3>
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div className="space-y-5">{children}</div>

        <div className="mt-2 text-right self-end">
          <Link href={seeAllRoute}>
            <div className="text-primary-dark dark:text-primary hover:underline transition text-sm">
              See all
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContentWrapper;
