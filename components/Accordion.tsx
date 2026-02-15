"use client";

import { ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
  title: ReactNode;
};

export const Accordion = (props: Props) => {
  const { children, title } = props;
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-6">
      <button
        className="mb-2 cursor-pointer flex items-center gap-2"
        onClick={() => setOpen(!open)}
      >
        <span className="text-xs w-6 h-3">{open ? "▼" : "▶"}</span>
        <h3 className="text-2xl font-bold">{title}</h3>
      </button>
      {open && children}
    </div>
  );
};
