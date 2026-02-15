import { TrelloCard } from "@/models/trello.model";

type Props = {
  card: TrelloCard;
};

export const Card = (props: Props) => {
  const { card } = props;

  return (
    <a
      title={card.name}
      href={card.url}
      target="_blank"
      className="block  w-full border rounded-2xl p-3 mb-2 text-sm hover:shadow-xl transition-shadow"
    >
      {card.name.length < 60 ? card.name : card.name.substring(0, 57) + "..."}
    </a>
  );
};
