import { DashboardPage } from "@/components/pages/DashboardPage";
import { TrelloBoardView, TrelloMember, TrelloMemberSmall, TrelloTableView } from "@/models/trello.model";
import { getBoardCards, getBoardLists, getBoardMembers, getBoards, getPersonalData } from "@/services/trello.service";

export default async function Home() {

  let boardViewData: TrelloBoardView[] = [];
  let tableViewData: TrelloTableView[] = []
  let personalData: TrelloMember | null = null
  let memberList: TrelloMemberSmall[] = [];

  const apiKey = process.env.TRELLO_API || '';
  const token = process.env.TRELLO_TOKEN || '';

  try {

    // recupero i dati del mio profilo
    personalData = await getPersonalData(apiKey, token);

    // recupero le board
    let boards = await getBoards(apiKey, token);
    boards = boards.filter(board => !board.closed);

    // Ciclo le board per recuperare i relativi data
    for (const board of boards) {

      const lists = await getBoardLists(apiKey, token, board.id);
      const cards = await getBoardCards(apiKey, token, board.id);
      const members = await getBoardMembers(apiKey, token, board.id);

      // Tengo traccia univoca dei membri presenti nelle varie board
      members.forEach(member => {
        const memberFound = memberList.find(m => m.id === member.id);
        if (memberFound === undefined) memberList.push(member)
      })

      // popolo il field della dashboard tabella
      cards.forEach(card => {

        tableViewData.push({
          name: card.name,
          board: board.name,
          column: lists.find(list => list.id === card.idList)?.name || '',
          url: card.url,
          idMembers: card.idMembers,
          description: card.desc
        })

      })

      // popolo il field delle dashboard board
      boardViewData.push({ board, lists, cards })
    }

  } catch (error) {

    console.error("Errore nel recuperare le board: ", error);

  }

  return <DashboardPage personalData={personalData} tableViewData={tableViewData} boardViewData={boardViewData} memberList={memberList} />
}
