import { FC } from 'react';

type Props = {
    onClick: () => void
}

export const RemoveFilterButton: FC<Props> = ({ onClick: onClickProps }) => {
    return (
        <button
            onClick={() => onClickProps()}
            className='text-gray-400 font-normal underline ml-2'>
            Rimuovi filtro
        </button>
    )
}