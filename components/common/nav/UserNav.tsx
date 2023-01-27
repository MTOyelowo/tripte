import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { FC } from "react";
import { APP_NAME } from "../AppHead";
import { HiLightBulb } from "react-icons/hi";
import Logo from "../Logo";
import { GoogleAuthButton } from "../../button";
import ProfileHead from "../ProfileHead";
import DropdownOptions, { dropDownOptions } from "../DropdownOptions";
import { useRouter } from "next/router";
import { UserProfile } from "../../../utils/types";
import useDarkMode from "../../../hooks/useDarkMode";
import CategoriesNav from "./CategoriesNav";

interface Props {}

const defaultOptions: dropDownOptions = [
  {
    label: "Logout",
    async onClick() {
      await signOut();
    },
  },
];

const UserNav: FC<Props> = (props): JSX.Element => {
  const router = useRouter();
  const { data, status } = useSession();
  const isAuth = status === "authenticated";
  const profile = data?.user as UserProfile | undefined;

  const isAdmin = profile && profile.role === "admin";

  const { toggleTheme } = useDarkMode();

  const handleLoginWithGoogle = async () => {
    await signIn("google");
  };

  const dropDownOptions: dropDownOptions = isAdmin
    ? [
        {
          label: "Dashboard",
          onClick() {
            router.push("/admin");
          },
        },
        ...defaultOptions,
      ]
    : defaultOptions;

  return (
    <div className="flex flex-col items-center justify-between bg-primary-dark p-3">
      <nav className="flex w-full justify-between">
        <Link href="/">
          <div className="flex space-x-2 text-highlight-dark items-center">
            <Logo className="" />
          </div>
        </Link>
        <div className="flex items-center space-x-5">
          <button
            onClick={toggleTheme}
            className="dark:text-secondary-dark text-secondary-light"
          >
            <HiLightBulb size={34} />
          </button>
          {isAuth ? (
            <DropdownOptions
              options={dropDownOptions}
              head={<ProfileHead nameInitial="M" lightOnly />}
            />
          ) : (
            <GoogleAuthButton lightOnly onClick={handleLoginWithGoogle} />
          )}
        </div>
      </nav>
    </div>
  );
};

export default UserNav;
