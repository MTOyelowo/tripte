import { FC, MouseEventHandler } from "react";

interface Props {
  onPrevClick?(): void;
  onNextClick?(): void;
}

const PageNavigator: FC<Props> = ({
  onPrevClick,
  onNextClick,
}): JSX.Element => {
  return (
    <div className="flex items-center space-x-3">
      <Button onClick={onPrevClick} title="Prev" />
      <Button onClick={onNextClick} title="Next" />
    </div>
  );
};

const Button: FC<{ title: string; onClick?: MouseEventHandler }> = ({
  title,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="text-primary-dark dark:text-primary hover:bg-[#DC143C] hover:text-white px-2 rounded-full transition"
    >
      {title}
    </button>
  );
};

export default PageNavigator;
