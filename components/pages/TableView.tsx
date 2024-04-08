"use client"

import { TrelloTableView } from '@/models/trello.model';
import { ColumnDef } from '@tanstack/react-table';
import { FC, useEffect, useMemo, useState } from 'react';
import { MdLaunch } from 'react-icons/md';
import { TableWrapper } from '../TableWrapper';

type Props = {
    data: TrelloTableView[]
}

export const TableView: FC<Props> = ({ data: dataProps }) => {

    const [data, setData] = useState<TrelloTableView[]>([...dataProps])
    const [status, setStatus] = useState<string[]>([])
    const [filterStatusApplied, setFilterStatusApplied] = useState<string[]>([])

    useEffect(() => {

        const statusLocal: string[] = [];

        dataProps.forEach(({ column }) => {
            if (!statusLocal.includes(column)) statusLocal.push(column)
        })

        setStatus(statusLocal)

    }, [dataProps])

    const columns = useMemo<ColumnDef<TrelloTableView>[]>(
        () => [
            {
                accessorKey: 'board',
                header: "Board",
            },
            {
                accessorKey: 'name',
                header: "Ticket",
            },
            {
                accessorKey: 'column',
                header: "Stato"
            },
            {
                accessorKey: 'url',
                header: "",
                cell: (info) => (
                    <a href={info.row.original.url} target="_blank" title='Vai al ticket' >
                        <MdLaunch className='h-6 w-6 hover:text-black' />
                    </a>
                )
            }
        ],
        []
    )

    return (
        <>

            <div className='my-6' >

                <label htmlFor='filter-status-multiple' className='block'>
                    Filtra per stato
                </label>

                {status.map(status => <label className='mr-6 inline-block'>
                    <input
                        type="checkbox"
                        value={status}
                        key={status}
                        onChange={(e) => {
                            // TODO - da controllare la tipizzazione
                            const newValue = e.target.value;
                            let filterStatusAppliedLocal = [...filterStatusApplied];

                            // Se nel filtro c'è già vuol dire che devo toglierlo
                            if (filterStatusApplied.includes(newValue)) {
                                // TODO - controllare come mai non si toglie
                                filterStatusAppliedLocal = filterStatusAppliedLocal.filter(status => status !== newValue)
                            } else {
                                // Se non c'è è vuol dire che devo aggiungerlo
                                filterStatusAppliedLocal.push(newValue)
                            }

                            // Aggiorno lo stato dei filtri applicati
                            setFilterStatusApplied(filterStatusAppliedLocal)

                            // Aggiorno i dati
                            if (filterStatusAppliedLocal.length > 0) {
                                setData(dataProps.filter(({ column }) => filterStatusAppliedLocal.includes(column)))
                            } else {
                                setData(dataProps)
                            }

                        }} />
                    <span className='ml-1'>{status}</span>
                </label>)}

            </div>

            <TableWrapper data={data} columns={columns} />
        </>

    )
};