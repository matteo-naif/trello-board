import { DashboardPage } from "@/components/pages/DashboardPage";
import { TrelloBoard, TrelloBoardView, TrelloCard, TrelloList, TrelloMember, TrelloMemberSmall, TrelloTableView } from "@/models/trello.model";
import axios from "axios";

export default async function Home() {

  let items: TrelloBoardView[] = [];
  let personalData: TrelloMember | null = null
  let tableRows: TrelloTableView[] = []
  let memberList: TrelloMemberSmall[] = [];

  const apiKey = process.env.TRELLO_API;
  const token = process.env.TRELLO_TOKEN;
  try {

    // recupero i dati del mio profilo
    let { data: member } = await axios.get(`https://api.trello.com/1/members/me?key=${apiKey}&token=${token}`);
    personalData = member;

    // recupero le board
    // https://developer.atlassian.com/cloud/trello/rest/api-group-members/#api-members-id-boards-get
    let { data: boards } = await axios.get<TrelloBoard[]>(`https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${token}`);
    boards = boards.filter(board => !board.closed);

    // Ciclo le board per recuperare le liste e le card
    for (const board of boards) {

      // https://developer.atlassian.com/cloud/trello/rest/api-group-boards/#api-boards-id-lists-get
      let { data: lists } = await axios.get<TrelloList[]>(`https://api.trello.com/1/boards/${board.id}/lists?key=${apiKey}&token=${token}`);

      // https://developer.atlassian.com/cloud/trello/rest/api-group-boards/#api-boards-id-cards-get
      let { data: cards } = await axios.get<TrelloCard[]>(`https://api.trello.com/1/boards/${board.id}/cards?key=${apiKey}&token=${token}`);

      let { data: members } = await axios.get<TrelloMemberSmall[]>(`https://api.trello.com/1/boards/${board.id}/members?key=${apiKey}&token=${token}`);

      // Tengo traccia univoca dei membri presenti nelle varie board
      members.forEach(member => {
        const memberFound = memberList.find(m => m.id === member.id);
        if (memberFound === undefined) memberList.push(member)
      })

      // Filtro le card che non sono assegnate a me
      // cards = cards.filter(card => card.idMembers.includes(member.id));

      // popolo il field della dashboard tabella
      cards.forEach(card => {

        tableRows.push({
          name: card.name,
          board: board.name,
          column: lists.find(list => list.id === card.idList)?.name || '',
          url: card.url,
          idMembers: card.idMembers,
          description: card.desc
        })

      })

      // popolo il field delle dashboard board
      items.push({ board, lists, cards })
    }

  } catch (error) {

    console.error("Errore nel recuperare le board: ", error);

  }

  return <DashboardPage personalData={personalData} tableRows={tableRows} items={items} memberList={memberList} />
}
