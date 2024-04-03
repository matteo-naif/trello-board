import { TrelloCard } from '@/models/trello.model';
import { FC } from 'react';

type Props = {
    card: TrelloCard
}

export const Card: FC<Props> = ({ card }) => {
    return <>
        <a title={card.name} href={card.url} target="_blank" className="block  w-full border rounded-2xl p-3 mb-2 text-sm hover:shadow-xl transition-shadow">
            {card.idMembers.map(member => <div>{member}</div>)}

            {card.name.length < 60 ? card.name : card.name.substring(0, 57) + "..."}
        </a>
    </>
}