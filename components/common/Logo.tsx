import Image from "next/image";
import { FC } from "react";

interface Props {
  className?: string;
}
const Logo: FC<Props> = ({ className }) => (
  <Image src="/tripte.svg" height={40} width={40} alt="" />
);

export default Logo;
