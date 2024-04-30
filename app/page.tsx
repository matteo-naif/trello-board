import { DashboardPage } from "@/components/pages/DashboardPage";
import { TrelloBoardView, TrelloMemberSmall, TrelloTableView } from "@/models/trello.model";
import { getBoardCards, getBoardLists, getBoardMembers, getBoards, getPersonalData } from "@/services/trello.service";

export default async function Home() {

  let boardViewData: TrelloBoardView[] = [];
  let tableViewData: TrelloTableView[] = []
  let memberList: TrelloMemberSmall[] = [];

  const apiKey = process.env.TRELLO_API || '';
  const token = process.env.TRELLO_TOKEN || '';

  // Recupero i dati del profilo personale e le board in parallelo
  const [currentMember, boards] = await Promise.all([
    getPersonalData(apiKey, token),
    getBoards(apiKey, token).then(boards => boards.filter(board => !board.closed))
  ]);

  // Ciclo le board per recuperare i relativi data
  for (const board of boards) {

    const [lists, cards, members] = await Promise.all([
      getBoardLists(apiKey, token, board.id),
      getBoardCards(apiKey, token, board.id),
      getBoardMembers(apiKey, token, board.id)
    ]);

    // Aggiorna la lista dei membri unica
    members.forEach(member => {
      if (!memberList.some(m => m.id === member.id)) {
        memberList.push(member);
      }
    });

    // Preparo i dati per la dashboard
    const tableViewDataEntries = cards.map(card => ({
      name: card.name,
      board: board.name,
      column: lists.find(list => list.id === card.idList)?.name || '',
      url: card.url,
      idMembers: card.idMembers,
      description: card.desc
    }));

    tableViewData.push(...tableViewDataEntries);

    // Aggiungi dati alla vista della board
    boardViewData.push({ board, lists, cards })
  }

  return <DashboardPage
    personalData={currentMember}
    tableViewData={tableViewData}
    boardViewData={boardViewData}
    memberList={memberList}
  />
}
