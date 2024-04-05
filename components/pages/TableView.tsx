"use client"

import { TrelloTableView } from '@/models/trello.model';
import { ColumnDef } from '@tanstack/react-table';
import { FC, useMemo } from 'react';
import { TableWrapper } from '../TableWrapper';

type Props = {
    data: TrelloTableView[]
}

export const TableView: FC<Props> = ({ data }) => {

    const columns = useMemo<ColumnDef<TrelloTableView>[]>(
        () => [
            {
                accessorKey: 'name',
            },
            {
                accessorKey: 'board',
            },
            {
                accessorKey: 'column',
            },
        ],
        []
    )

    return <TableWrapper data={data} columns={columns} />;
};