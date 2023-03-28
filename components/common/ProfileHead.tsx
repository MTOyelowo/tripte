import classNames from "classnames";
import Image from "next/legacy/image";
import { FC, useCallback } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import ProfileIcon from "./ProfileIcon";

interface Props {
  lightOnly?: boolean;
  image?: string;
  nameInitial?: string;
}

const ProfileHead: FC<Props> = ({
  lightOnly,
  image,
  nameInitial,
}): JSX.Element => {
  return (
    <div className="flex items-center">
      <ProfileIcon image={image} nameInitial={nameInitial} lightOnly />
      <AiFillCaretDown
        className={
          lightOnly ? "text-primary" : "text-primary-dark dark:text-primary"
        }
      />
    </div>
  );
};

export default ProfileHead;
