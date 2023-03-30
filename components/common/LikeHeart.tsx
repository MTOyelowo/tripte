import { FC, useEffect, useRef, useState } from "react";
import { BiLoader } from "react-icons/bi";
import { RiHeartLine, RiHeartFill } from "react-icons/ri";

interface Props {
  busy?: boolean;
  selected?: boolean;
  label?: string;
  liked?: boolean;
  onClick?(): void;
}

const LikeHeart: FC<Props> = ({
  liked = false,
  label,
  onClick,
  busy,
  selected,
}): JSX.Element => {
  const [animateLike, setAnimateLike] = useState(false);
  const timerId: { current: NodeJS.Timeout | null } = useRef(null);

  const likeIcon = liked ? (
    <div className={animateLike ? "animate-bounce" : "animate-none"}>
      <RiHeartFill
        size={36}
        className={
          animateLike
            ? "hover:bg-[#F0607D] p-[5px] transition-colors rounded-full text-[#DC143C] hover:text-white animate-wiggle"
            : "hover:bg-[#F0607D] p-[5px] transition-colors rounded-full text-[#DC143C] hover:text-white animate-none"
        }
      />
    </div>
  ) : (
    <div className={animateLike ? "animate-bounce" : "animate-none"}>
      <RiHeartLine
        size={36}
        className={
          animateLike
            ? "animate-wiggle hover:bg-[#F0607D] p-[5px] hover:text-white rounded-full"
            : "animate-none hover:bg-[#F0607D] p-[5px] hover:text-white rounded-full"
        }
      />
    </div>
  );

  useEffect(() => {
    onClick && busy && setAnimateLike(true);
  }, [onClick, busy]);

  useEffect(() => {
    if (animateLike) {
      timerId.current = setTimeout(() => {
        setAnimateLike(false);
      }, 2000);
    }

    return () => {
      clearTimeout(timerId.current as NodeJS.Timeout);
    };
  }, [animateLike, onClick]);

  return (
    <button
      type="button"
      className="text-primary-dark dark:text-primary flex -space-x-2 outline-none "
      onClick={onClick}
    >
      {busy ? <BiLoader className="animate-spin" /> : likeIcon}

      <span className="p-2">{label}</span>
    </button>
  );
};

export default LikeHeart;
