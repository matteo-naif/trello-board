"use client";

type Props = {
  onClick: () => void;
};

export const ButtonRemoveFilter = (props: Props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="text-gray-400 font-normal underline ml-2"
    >
      Rimuovi filtro
    </button>
  );
};
