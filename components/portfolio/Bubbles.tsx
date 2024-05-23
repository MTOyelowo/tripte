import { FC } from "react";

const Bubbles: FC = () => {
  return (
    <div className="relative">
      <div className="absolute w-[91px] h-[91px] rounded-full bg-gradient-to-b from-[rgba(89,30,214,0.31)] to-transparent opacity-20 rotate-[15deg] left-[72px] top-0" />
      <div className="hidden md:flex absolute w-[91px] h-[91px] rounded-full bg-gradient-to-b from-[rgba(89,30,214,0.31)] to-transparent opacity-20 rotate-[15deg] left-[51px] bottom-[200.73px]" />
      <div className="absolute w-[91px] h-[91px] rounded-full bg-gradient-to-b from-[rgba(89,30,214,0.31)] to-transparent opacity-20 rotate-[15deg] left-[5px] bottom-[10px] md:left-[38%] md:bottom-[100px]" />
      <div className="hidden md:flex absolute w-[162px] h-[162px] rounded-full bg-gradient-to-b from-[rgba(89,30,214,0.31)] to-transparent opacity-10 rotate-[-44.97deg] left-[44%] top-[150.7px]" />
      <div className="hidden md:flex absolute w-[162px] h-[162px] rounded-full bg-gradient-to-b from-[rgba(89,30,214,0.31)] to-transparent opacity-10 rotate-[-44.97deg] left-[58%] bottom-[40px]" />
      <div className="absolute w-[162px] h-[162px] rounded-full bg-gradient-to-b from-[rgba(89,30,214,0.31)] to-transparent opacity-10 rotate-[-44.97deg] right-[2.5rem] top-[145.06px]" />
      <div className="hidden md:flex absolute w-[91px] h-[91px] rounded-full bg-gradient-to-b from-[rgba(89,30,214,0.31)] to-transparent opacity-10 rotate-[-15deg] right-[300.43px] top-[20px]" />
      <div className="absolute w-[91px] h-[91px] rounded-full bg-gradient-to-b from-[rgba(89,30,214,0.31)] to-transparent opacity-10 rotate-[-15deg] left-[5%] top-[25%] md:right-[15.99%] md:bottom-[205.33px]" />
    </div>
  );
};

export default Bubbles;
