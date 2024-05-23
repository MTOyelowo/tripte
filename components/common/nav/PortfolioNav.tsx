import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { FC, useState } from "react";
import { APP_NAME } from "../AppHead";
import { HiLightBulb } from "react-icons/hi";
import Logo from "../Logo";
import { GoogleAuthButton } from "../../button";
import ProfileHead from "../ProfileHead";
import DropdownOptions, { dropDownOptions } from "../DropdownOptions";
import { useRouter } from "next/router";
import { UserProfile } from "../../../utils/types";
import useDarkMode from "../../../hooks/useDarkMode";
import { LItem } from "@/components/layout/PortfolioLayout";
import { IoIosMenu, IoIosClose } from "react-icons/io";

interface Props {
  linkItems: LItem[];
}

const defaultOptions: dropDownOptions = [
  {
    label: "Logout",
    async onClick() {
      await signOut();
    },
  },
];

const PortfolioNav: FC<Props> = ({ linkItems }): JSX.Element => {
  const router = useRouter();
  const { data, status } = useSession();

  const [showMobileNav, setShowMobileNav] = useState(false);

  const isAuth = status === "authenticated";
  const profile = data?.user as UserProfile | undefined;

  const isAdmin = profile && profile.role === "admin";

  const { toggleTheme } = useDarkMode();

  const dropDownOptions: dropDownOptions = isAdmin
    ? [
        {
          label: "Dashboard",
          onClick() {
            router.push("/admin");
          },
        },
        {
          label: "Profile",
          onClick() {
            router.push("/admin/myprofile");
          },
        },
        ...defaultOptions,
      ]
    : defaultOptions;

  const handleMenuPress = () => {
    setShowMobileNav(true);
  };

  const handleMenuClose = () => {
    setShowMobileNav(false);
  };

  return (
    <div className="flex flex-col items-center justify-between bg-primary-dark p-3 h-24">
      <nav className="flex w-full md:w-[95%] justify-between h-full">
        <Link href="/">
          <div className="flex space-x-2 text-highlight-dark items-center h-full">
            <Logo className="md:w-20 md:h-20 w-15 h-15" />
          </div>
        </Link>
        <div className="hidden md:flex flex-row space-x-4 mr-4">
          {linkItems?.map((linkItem, index) => {
            const { name, href } = linkItem;
            return (
              <div
                key={href + index}
                className="flex items-center hover:scale-90"
              >
                <Link href={href}>
                  <span className="text-[#DC143C] cursor-pointer hover:rounded-full px-2 text-lg">
                    {name}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="flex items-center space-x-5">
          <button
            onClick={toggleTheme}
            className="dark:text-secondary-dark text-secondary-light"
          >
            <HiLightBulb size={34} />
          </button>
          <div className="hidden md:flex">
            {isAuth ? (
              <DropdownOptions
                options={dropDownOptions}
                head={
                  <ProfileHead
                    nameInitial={profile?.name[0].toUpperCase()}
                    image={profile?.image}
                    lightOnly
                  />
                }
              />
            ) : (
              <GoogleAuthButton lightOnly />
            )}
          </div>
          <div className="flex md:hidden items-center justify-center text-[#DC143C]">
            {!showMobileNav ? (
              <button
                className="hover:bg-[#DC143C] p-2 hover:rounded-full hover:text-white"
                onClick={handleMenuPress}
              >
                <IoIosMenu size={28} />
              </button>
            ) : (
              <button
                className="hover:bg-[#DC143C] p-2 hover:rounded-full hover:text-white"
                onClick={handleMenuClose}
              >
                <IoIosClose size={32} />
              </button>
            )}
          </div>
        </div>
        {showMobileNav && (
          <div className="md:hidden flex flex-col absolute top-24 right-0 z-10 bg-primary-dark space-y-4 h-[calc(100vh_-_96px)] w-64 p-4 transition duration-1500">
            <div className="flex flex-col w-full group">
              {linkItems?.map((linkItem, index) => {
                const { name, href } = linkItem;
                return (
                  <div
                    key={href + index}
                    className="flex items-center justify-end w-full hover:scale-90 border-b border-b-gray-600 py-6"
                  >
                    <Link href={href} className="">
                      <span className="text-white cursor-pointer hover:rounded-full text-lg p-2">
                        {name}
                      </span>
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end text-white w-full pt-4">
              {isAuth ? (
                <DropdownOptions
                  options={dropDownOptions}
                  head={
                    <ProfileHead nameInitial={profile?.name[0]} lightOnly />
                  }
                />
              ) : (
                <GoogleAuthButton lightOnly />
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default PortfolioNav;
