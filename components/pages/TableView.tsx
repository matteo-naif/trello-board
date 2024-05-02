"use client"

import useLocalStorage from '@/hooks/useLocalStorage';
import { TrelloMemberSmall, TrelloTableView } from '@/models/trello.model';
import { getStatusColor } from '@/utils/color.util';
import { ColumnDef } from '@tanstack/react-table';
import { FC, useEffect, useMemo, useState } from 'react';
import { MdLaunch } from 'react-icons/md';
import { RemoveFilterButton } from '../RemoveFilterButton';
import { TableWrapper } from '../TableWrapper';

type Props = {
    data: TrelloTableView[],
    memberList: TrelloMemberSmall[]
}

export const TableView: FC<Props> = ({ data: dataProps, memberList }) => {

    const [data, setData] = useState<TrelloTableView[]>([...dataProps])

    const [status, setStatus] = useState<string[]>([])
    const [filterStatusApplied, setFilterStatusApplied] = useLocalStorage<string[]>('filterStatusApplied', [])

    const [filterMembersApplied, setFilterMembersApplied] = useLocalStorage<string[]>('filterMembersApplied', [])

    const [boardList, setBoardList] = useState<string[]>([])
    const [filterBoardApplied, setFilterBoardApplied] = useLocalStorage<string>('filterBoardApplied', "")

    useEffect(() => {

        const statusLocal: string[] = [];
        const boardLocal: string[] = [];

        dataProps.forEach(({ column, board }) => {
            if (!statusLocal.includes(column)) statusLocal.push(column)
            if (!boardLocal.includes(board)) boardLocal.push(board)
        })

        setStatus(statusLocal)
        setBoardList(boardLocal)

    }, [dataProps])

    const applyFilters = (type: 'board' | 'status' | 'member', value: string) => {

        if (type === 'status') {

            let filterStatusAppliedLocal = [...filterStatusApplied];

            if (filterStatusApplied.includes(value)) {
                // Se nel filtro c'è già vuol dire che devo toglierlo
                filterStatusAppliedLocal = filterStatusAppliedLocal.filter(status => status !== value)
            } else {
                // Se non c'è è vuol dire che devo aggiungerlo
                filterStatusAppliedLocal.push(value)
            }

            // Aggiorno lo stato dei filtri applicati
            setFilterStatusApplied(filterStatusAppliedLocal)

        }

        if (type === 'member') {

            let filterMembersAppliedLocal = [...filterMembersApplied];

            if (filterMembersApplied.includes(value)) {
                // Se nel filtro c'è più vuol dire che devo toglierlo
                filterMembersAppliedLocal = filterMembersAppliedLocal.filter(member => member !== value)
            } else {
                // Se non c'è più vuol dire che devo aggiungerlo
                filterMembersAppliedLocal.push(value)
            }

            // Aggiorno lo stato dei filtri applicati
            setFilterMembersApplied(filterMembersAppliedLocal)
        }

        if (type === 'board') {
            setFilterBoardApplied(value)
        }

    }

    // Al cambio dei filtri aggiorno la lista dei ticket in base ai nuovi valori
    useEffect(() => {

        // Filtra i dati
        let data = [...dataProps];


        // Aggiorno i dati
        if (filterStatusApplied.length > 0) {
            data = data.filter(({ column }) => filterStatusApplied.includes(column))
        }

        if (filterMembersApplied.length > 0) {
            data = data.filter(({ idMembers }) => idMembers.some(member => filterMembersApplied.includes(member)))
        }

        if (filterBoardApplied !== "") {
            data = data.filter(({ board }) => filterBoardApplied.includes(board))
        }

        setData(data)

    }, [filterBoardApplied, filterStatusApplied, filterMembersApplied])

    const columns = useMemo<ColumnDef<TrelloTableView>[]>(
        () => [
            {
                accessorKey: 'board',
                header: "Board",
                size: 50,
            },
            {
                accessorKey: 'name',
                header: "Ticket",
                cell: (info) => (<>
                    <p title={info.row.original.description}>{info.row.original.name}</p>
                    {/* Visualizzo i member assegnati */}
                    <small>{info.row.original.idMembers.map((member) => memberList.find(m => m.id === member)?.fullName).join(', ')}</small>
                </>
                )
            },
            {
                accessorKey: 'column',
                header: "Stato",
                size: 150,
                cell: (info) => (
                    <span
                        style={{ backgroundColor: getStatusColor(info.row.original.column) }}
                        className='px-2 py-1 inline-block rounded-2xl text-white'
                    >
                        <div
                        >
                            {info.row.original.column}

                        </div>
                    </span>
                )
            },
            {
                accessorKey: 'url',
                header: "",
                enableSorting: false,
                size: 20,
                cell: (info) => (
                    <div className='text-right w-full'>
                        <a href={info.row.original.url} target="_blank" title='Vai al ticket' className='inline-block' >
                            <MdLaunch className='h-6 w-6 hover:text-black' />
                        </a>
                    </div>
                )
            }
        ],
        []
    )

    return (
        <>


            <div className='grid grid-cols-12 gap-12'>

                <div className="col-span-12 lg:col-span-9">
                    {data.length > 0
                        ? <TableWrapper data={data} columns={columns} />
                        : <div className='w-full bg-white px-6 py-12 rounded-2xl text-center'>
                            <p className="mb-6 text-xl">
                                Non ci sono ticket
                            </p>
                            <button
                                className='px-4 py-2 border rounded-xl'
                                onClick={() => {
                                    setFilterBoardApplied('')
                                    setFilterStatusApplied([])
                                }}>
                                Togli tutti i filtri
                            </button>
                        </div>
                    }
                </div>

                <div className="col-span-12 lg:col-span-3">

                    <div className='sticky top-6'>

                        {/* Status */}
                        <div className='my-6' >
                            <p className='font-bold mb-2'>
                                Stato ticket
                                {filterStatusApplied.length > 0 && <RemoveFilterButton onClick={() => setFilterStatusApplied([])} />}
                            </p>
                            {status.map(status => <div className='block' key={status}>
                                <label className='flex gap-2 py-1 items-center cursor-pointer'>
                                    <input
                                        type="checkbox"
                                        checked={filterStatusApplied.includes(status)}
                                        value={status}
                                        onChange={(e) => applyFilters('status', e.target.value)}
                                    />
                                    <div className='h-2 w-2 rounded-full' style={{ backgroundColor: getStatusColor(status) }} />
                                    <span>{status}</span>
                                </label>
                            </div>
                            )}

                        </div>

                        {/* Board */}
                        <div className='my-6' >
                            <p className='font-bold mb-2'>
                                Board
                                {filterBoardApplied && <RemoveFilterButton onClick={() => setFilterBoardApplied("")} />}
                            </p>
                            <select className='min-w-52' onChange={e => applyFilters('board', e.target.value)} value={filterBoardApplied}>
                                <option value={""}>Tutte le board</option>
                                {boardList.map(board => <option key={board} value={board} >{board}</option>)}
                            </select>
                        </div>

                        {/* members */}
                        <div className='my-6'>
                            <p className='font-bold mb-2'>
                                Utenti
                                {filterMembersApplied.length > 0 && <RemoveFilterButton onClick={() => setFilterMembersApplied([])} />}
                            </p>
                            {memberList.map(member => <div className='block' key={member.id}>
                                <label className='flex gap-2 py-1 items-center'>
                                    <input
                                        type="checkbox"
                                        checked={filterMembersApplied.includes(member.id)}
                                        value={member.id}
                                        onChange={(e) => applyFilters('member', e.target.value)}
                                    />
                                    <span>{member.fullName}</span>
                                </label>
                            </div>
                            )}
                        </div>

                    </div>

                </div>

            </div>

        </>

    )
};