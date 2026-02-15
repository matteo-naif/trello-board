"use client";

import { useIsClient } from "@/hooks/useIsClient";
import {
  TrelloMember,
  TrelloMemberSmall,
  TrelloTableView,
} from "@/models/trello.model";
import { TableView } from "./TableView";

type Props = {
  tableViewData: TrelloTableView[];
  personalData: TrelloMember | null;
  memberList: TrelloMemberSmall[];
};

export const DashboardPage = (props: Props) => {
  const { tableViewData, personalData, memberList } = props;
  const isClient = useIsClient();

  if (!isClient) return <></>;

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <div className="mb-6 flex gap-2">
        <div className="mr-2 text-2xl">👋</div>
        <div>
          <h1 className="text-2xl font-bold">Ciao {personalData?.fullName}</h1>
          <a
            href={personalData?.url}
            target="_blank"
            className="underline text-sm"
          >
            Vai al mio profilo
          </a>
        </div>
      </div>

      {/* <div>
                <button onClick={() => setSectionActive('table')} className={'py-2 px-4 mr-2 mb-2 rounded-xl ' + (sectionActive === 'table' ? ' bg-white' : '')} >
                    Tabella
                </button>
                <button onClick={() => setSectionActive('boards')} className={'py-2 px-4 mr-2 mb-2 rounded-xl ' + (sectionActive === 'boards' ? ' bg-white' : '')} >
                    Tutte le board
                </button>
            </div> */}

      <TableView data={tableViewData} memberList={memberList} />
    </div>
  );
};
