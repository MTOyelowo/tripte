import classNames from "classnames";
import { signIn } from "next-auth/react";
import { FC, useCallback } from "react";
import { AiFillGoogleCircle } from "react-icons/ai";

interface Props {
  lightOnly?: boolean;
}

const commonClasses =
  " flex items-center justify-center space-x-1 px-1 py-1 rounded hover:scale-[0.97] transition duration-100";

export const GoogleAuthButton: FC<Props> = ({ lightOnly }): JSX.Element => {
  const getStyle = useCallback(() => {
    if (lightOnly) return "text-primary bg-[#DC143C]";
    return "dark:text-primary-dark text-primary";
  }, [lightOnly]);

  const handleClick = async () => {
    await signIn("google");
  };

  return (
    <button
      onClick={handleClick}
      className={classNames(commonClasses, getStyle())}
    >
      <span className="text-xs">Continue with</span>
      <AiFillGoogleCircle size={20} />
    </button>
  );
};

export default GoogleAuthButton;
