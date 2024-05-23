import { FC } from "react";

interface Props {}

const Separator: FC<Props> = (props): JSX.Element => {
  return <div className="border-2 border-gray-300 w-[90%] my-6 mx-auto" />;
};

export default Separator;
