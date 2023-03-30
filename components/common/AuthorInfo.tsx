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
    <div className="p-2 bg-[#FDEDF1] dark:bg-[#DC143C] rounded-2xl flex font-serif transition">
      {/*Profile Icons*/}
      <div className="w-12">
        <div className="aspect-square relative">
          <Image src={image} alt={name} fill className="rounded-full" />
        </div>
      </div>
      {/*Profile Name Message*/}
      <div className="ml-2 flex-1">
        <h4 className="font-semibold text-primary-dark dark:text-primary">
          {name}
        </h4>
        <p className="text-primary-dark dark:text-primary opacity-90">
          {message}
        </p>
        <p className="text-primary-dark dark:text-primary opacity-90">
          You can find {name.split(" ")[0]} on{" "}
          <a className="font-semibold text-blue-400" href={twitter}>
            twitter
          </a>{" "}
          or{" "}
          <a className="font-semibold text-blue-400" href={facebook}>
            facebook
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default AuthorInfo;
