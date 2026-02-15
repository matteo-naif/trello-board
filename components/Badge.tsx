import { ReactNode } from "react";

type Props = {
  text: ReactNode;
};

export const Badge = (props: Props) => {
  const { text } = props;

  return (
    <span className="ml-3 inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
      {text}
    </span>
  );
};
