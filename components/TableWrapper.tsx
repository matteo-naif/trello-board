import { ColumnDef, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md'

type Props<T> = {
	data: T[],
	columns: ColumnDef<T>[]
}

function TableWrapper<T>({ data, columns }: Props<T>) {

	const [sorting, setSorting] = useState<SortingState>([])

	const table = useReactTable<T>({
		data,
		columns,
		state: {
			sorting
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	})

	return (
		<>
			<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
				<table className='min-w-full divide-y divide-gray-300'>
					<thead className='bg-gray-50'>
						{table.getHeaderGroups().map(headerGroup => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map(header => (
									<th
										key={header.id}
										className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
										colSpan={header.colSpan}

									>
										{header.isPlaceholder
											? null
											: <div
												style={{ width: header.getSize() }}
												className={header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
												onClick={header.column.getToggleSortingHandler()}
												title={
													header.column.getCanSort()
														? header.column.getNextSortingOrder() === 'asc'
															? 'Sort ascending'
															: header.column.getNextSortingOrder() === 'desc'
																? 'Sort descending'
																: 'Clear sort'
														: undefined}
											>

												{flexRender(
													header.column.columnDef.header,
													header.getContext()
												)}
												{{
													asc: <MdArrowUpward className='inline-block w-4 h-4 opacity-50 ml-2' />,
													desc: <MdArrowDownward className='inline-block w-4 h-4 opacity-50 ml-2' />,
												}[header.column.getIsSorted() as string] ?? null}
											</div>
										}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody className='divide-y divide-gray-200 bg-white'>
						{table.getRowModel().rows.map(row => (
							<tr key={row.id} >
								{row.getVisibleCells().map(cell => (
									<td key={cell.id} className='px-3 py-4 text-sm text-black' >
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}

export { TableWrapper }
