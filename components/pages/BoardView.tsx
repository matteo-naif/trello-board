import { TrelloBoardView } from '@/models/trello.model';
import { FC } from 'react';
import { Accordion } from '../Accordion';
import { Badge } from '../Badge';
import { Card } from '../Card';

type Props = {
    data: TrelloBoardView[]
}

export const BoardView: FC<Props> = ({ data }) => {
    return <>

        <div className="grid grid-cols-12 gap-6">
            {data.map(({ board, cards, lists }) => {
                return <div className="col-span-12 lg:col-span-6 bg-white" key={board.id} >
                    <div className="p-6 block">

                        {/* Nome della board */}
                        <a href={board.url} target="_blank" >
                            <h2 className="text-2xl font-bold mb-6">
                                {board.name}
                            </h2>
                        </a>

                        <div className="grid grid-cols-12 gap-6">
                            {lists.map(list => {

                                const count = cards.filter(card => card.idList === list.id).length;

                                if (!count) return null;

                                return (
                                    <div className="col-span-4" key={list.id}>

                                        <Accordion title={<>
                                            {/* Nome della lista */}
                                            <p className="text-lg m-0">
                                                {list.name} <Badge text={count} />
                                            </p>
                                        </>}>

                                            {/* Cards della lista */}
                                            {cards.length > 0
                                                ? cards
                                                    .filter(card => card.idList === list.id)
                                                    .map(card => <Card key={card.id} card={card} />)
                                                : <p className="text-sm">Nessuna card</p>
                                            }
                                        </Accordion>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </div>
            })}
        </div>
    </>;
};