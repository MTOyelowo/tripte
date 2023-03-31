import Image from "next/image";
import { FC } from "react";

export interface AuthorProfile {
  id: string;
  name: string;
  image: string;
  message: string;
  facebook: string;
  twitter: string;
}

interface Props {
  profile: AuthorProfile;
}

const AuthorInfo: FC<Props> = ({ profile }): JSX.Element => {
  const { name, message, image, facebook, twitter } = profile;
  return (
    <div className="bg-white dark:bg-primary-dark border border-gray-50 dark:border-gray-800 dark:shadow-slate-800 shadow-md p-4 flex justify-center rounded-lg transition text-primary-dark dark:text-gray-200">
      {/*Profile Icons*/}
      <div className="w-12">
        <div className="aspect-square relative">
          <Image src={image} alt={name} fill className="rounded-full" />
        </div>
      </div>
      {/*Profile Name Message*/}
      <div className="ml-2 flex-1">
        <h4 className="font-semibold">{name}</h4>
        <p className="">{message}</p>
        <p className="">
          You can find {name.split(" ")[0]} on{" "}
          <a className="font-semibold text-blue-700" href={twitter}>
            twitter
          </a>{" "}
          or{" "}
          <a className="font-semibold text-blue-700" href={facebook}>
            facebook
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default AuthorInfo;
