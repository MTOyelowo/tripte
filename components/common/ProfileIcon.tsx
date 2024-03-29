import classNames from "classnames";
import Image from "next/image";
import { FC, useCallback } from "react";

interface Props {
  image?: string;
  nameInitial?: string;
  lightOnly?: boolean;
}

const commonClasses =
  "relative flex items-center justify-center rounded-full overflow-hidden w-8 h-8 select-none";

const ProfileIcon: FC<Props> = ({
  nameInitial,
  image,
  lightOnly,
}): JSX.Element => {
  const getStyle = useCallback(() => {
    return lightOnly
      ? "text-white bg-[#DC143C]"
      : "dark:text-primary-dark text-primary bg-primary-dark dark:bg-primary";
  }, [lightOnly]);

  return (
    <div className={classNames(commonClasses, getStyle())}>
      {image ? <Image src={image} layout="fill" alt="Profile" /> : nameInitial}
    </div>
  );
};

export default ProfileIcon;
