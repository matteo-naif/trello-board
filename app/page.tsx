import { PageDashboard } from "@/components/PageDashboard";
import { TrelloMemberSmall, TrelloTableView } from "@/models/trello.model";
import {
  getBoardCards,
  getBoardLists,
  getBoardMembers,
  getBoards,
  getPersonalData,
} from "@/services/trello.service";

export default async function Home() {
  let tableViewData: TrelloTableView[] = [];
  let memberList: TrelloMemberSmall[] = [];

  // Recupero i dati del profilo personale e le board in parallelo
  const [currentMember, boards] = await Promise.all([
    getPersonalData(),
    getBoards().then((boards) => boards.filter((board) => !board.closed)),
  ]);

  // Ciclo le board per recuperare i relativi dati
  for (const board of boards) {
    const [lists, cards, members] = await Promise.all([
      getBoardLists(board.id),
      getBoardCards(board.id),
      getBoardMembers(board.id),
    ]);

    // Aggiorna la lista dei membri unica
    members.forEach((member) => {
      if (!memberList.some((m) => m.id === member.id)) {
        memberList.push(member);
      }
    });

    // Preparo i dati per la dashboard
    const tableViewDataEntries = cards.map((card) => ({
      name: card.name,
      board: board.name,
      column: lists.find((list) => list.id === card.idList)?.name || "",
      url: card.url,
      idMembers: card.idMembers,
      description: card.desc,
    }));

    tableViewData.push(...tableViewDataEntries);
  }

  return (
    <PageDashboard
      personalData={currentMember}
      tableViewData={tableViewData}
      memberList={memberList}
    />
  );
}
