"use client"

import { TrelloBoardView, TrelloMember, TrelloTableView } from '@/models/trello.model';
import { FC, useState } from 'react';

import { TimeConverter } from '../TimeConverter';
import { BoardView } from './BoardView';
import { TableView } from './TableView';

type SectionTypeModel = 'boards' | 'table'

type Props = {
    tableRows: TrelloTableView[],
    personalData: TrelloMember | null,
    items: TrelloBoardView[]
}

export const DashboardPage: FC<Props> = ({ tableRows, personalData, items }) => {
    const [sectionActive, setSectionActive] = useState<SectionTypeModel>('table');

    return <>

        <TimeConverter />

        <div className="bg-gray-100 p-6 min-h-screen">

            <div className="mb-6 flex gap-2">
                <div className="mr-2 text-2xl">👋</div>
                <div>
                    <h1 className="text-2xl font-bold">
                        Ciao {personalData?.fullName}
                    </h1>
                    <a href={personalData?.url} target="_blank" className="underline text-sm">Vai al mio profilo</a>
                </div>
            </div>

            <div>
                <button onClick={() => setSectionActive('table')} className={'py-2 px-4 mr-2 mb-2 rounded-xl ' + (sectionActive === 'table' ? ' bg-white' : '')} >
                    Tabella
                </button>
                <button onClick={() => setSectionActive('boards')} className={'py-2 px-4 mr-2 mb-2 rounded-xl ' + (sectionActive === 'boards' ? ' bg-white' : '')} >
                    Tutte le board
                </button>
            </div>

            {sectionActive === 'table' && <TableView data={tableRows} />}
            {sectionActive === 'boards' && <BoardView items={items} />}

        </div>


    </>;
};