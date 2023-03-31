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
        size={26}
        className={
          animateLike
            ? "transition-colors rounded-full text-[#DC143C] animate-wiggle hover:scale-90"
            : "transition-colors rounded-full text-[#DC143C] animate-none hover:scale-90"
        }
      />
    </div>
  ) : (
    <div className={animateLike ? "animate-bounce" : "animate-none"}>
      <RiHeartLine
        size={26}
        className={
          animateLike
            ? "animate-wiggle rounded-full hover:scale-90"
            : "animate-none hover:scale-90"
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
      }, 3000);
    }

    return () => {
      clearTimeout(timerId.current as NodeJS.Timeout);
    };
  }, [animateLike, onClick]);

  return (
    <button
      type="button"
      className="text-primary-dark dark:text-primary flex -space-x-1 outline-none "
      onClick={onClick}
    >
      {likeIcon}

      <span className="p-2">{label}</span>
    </button>
  );
};

export default LikeHeart;
