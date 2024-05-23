import { FC } from "react";

interface Props {}

const PostSkeleton: FC<Props> = (props): JSX.Element => {
  return (
    <div className="bg-gray-200 dark:bg-gray-900 w-[300px] aspect-video animate-pulse rounded-lg" />
  );
};

export default PostSkeleton;
