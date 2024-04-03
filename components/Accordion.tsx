"use client"

import { FC, ReactNode, useState } from 'react';

type Props = { children: ReactNode, title: ReactNode }

export const Accordion: FC<Props> = ({ children, title }) => {
    const [open, setOpen] = useState(false);

    return <div className='mb-6'>
        <div className="mb-2 cursor-pointer flex items-center gap-3" onClick={() => setOpen(!open)}>
            <span className='text-xs w-6 h-3'>
                {open ? "▼" : "▶"}
            </span>
            <h3 className="text-2xl font-bold">{title}</h3>
        </div>
        {open && children}
    </div>
};