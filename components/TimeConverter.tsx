"use client"

import { FC, useEffect, useState } from 'react';
import { MdHourglassEmpty } from 'react-icons/md';

type Props = {}

export const TimeConverter: FC<Props> = () => {

    const [timeDecimal, setTimeDecimal] = useState(0)

    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {

        // Devo convertire i minuti in decimali
        const minuteDecimal = (minutes || 0) / 60
        const totalHours = (hours || 0) + minuteDecimal

        setTimeDecimal(totalHours)

    }, [hours, minutes])

    return <>

        <div className={'fixed block top-2 transition-transform right-0 z-10' + (isVisible && ' translate-x-96')}>

            <div className='flex gap-0 items-center'>

                <button className='w-12 h-12 bg-gray-900 rounded-l-3xl flex items-center justify-center' onClick={() => setIsVisible(!isVisible)}>
                    <div className='rounded-full w-10 h-10 bg-gray-400 flex items-center justify-center'>
                        <MdHourglassEmpty className='w-6 h-6 ' />
                    </div>
                </button>

                <div className='bg-gray-900 p-6 rounded-l-3xl w-96'>

                    <label className='w-full block'>
                        <span className='text-white w-12 inline-block mr-3'>Ore</span>
                        <input
                            type='number'
                            name='hours'
                            placeholder='Ore'
                            value={hours}
                            onChange={(e) => setHours(parseInt(e.target.value))}
                            className='border h-6 inline-block p-2 w-1/2 m-1' />
                    </label>

                    <label className='w-full block'>
                        <span className='text-white w-12 inline-block mr-3'>Minuti</span>
                        <input
                            type='number'
                            name='minutes'
                            placeholder='Minuti'
                            value={minutes}
                            onChange={(e) => setMinutes(parseInt(e.target.value))}
                            className='border h-6 inline-block p-2 w-1/2 m-1' />
                    </label>

                    <p className='text-white mt-6'>{timeDecimal.toFixed(2).replace('.', ',')} ore</p>
                </div>
            </div>

        </div>
    </>
}