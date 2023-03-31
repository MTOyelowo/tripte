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
    <div className="bg-gradient-to-tr from-[#8D0D27]  to-[#FACAD4] p-4 flex justify-center rounded-lg">
      <div className="p-2 bg-white rounded-2xl flex font-serif transition backdrop-blur-sm w-[90%] sm-w-[95%] shadow-md backdrop:filter border-l-[0.5px] border-b-[0.5px] border-l-slate-50 border-gray-200 bg-opacity-30">
        {/*Profile Icons*/}
        <div className="w-12">
          <div className="aspect-square relative">
            <Image src={image} alt={name} fill className="rounded-full" />
          </div>
        </div>
        {/*Profile Name Message*/}
        <div className="ml-2 flex-1 text-gray-900">
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
    </div>
  );
};

export default AuthorInfo;
