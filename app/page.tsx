import { Accordion } from "@/components/Accordion";
import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { TrelloBoard, TrelloCard, TrelloList, TrelloMember } from "@/models/trello.model";
import axios from "axios";

export default async function Home() {

  let items: { board: TrelloBoard, cards: TrelloCard[], lists: TrelloList[] }[] = [];
  let personalData: TrelloMember | null = null

  const apiKey = process.env.TRELLO_API;
  const token = process.env.TRELLO_TOKEN;
  try {

    let { data: member } = await axios.get(`https://api.trello.com/1/members/me?key=${apiKey}&token=${token}`);
    personalData = member;

    let { data: boards } = await axios.get<TrelloBoard[]>(`https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${token}`);

    boards = boards.filter(board => !board.closed);


    for (const board of boards) {
      let { data: lists } = await axios.get<TrelloList[]>(`https://api.trello.com/1/boards/${board.id}/lists?key=${apiKey}&token=${token}`);
      let { data: cards } = await axios.get<TrelloCard[]>(`https://api.trello.com/1/boards/${board.id}/cards?key=${apiKey}&token=${token}`);

      // Filtro le card che non sono assegnate a me
      cards = cards.filter(card => card.idMembers.includes(member.id));

      items.push({ board, lists, cards })
    }

  } catch (error) {

    console.error("Errore nel recuperare le board: ", error);

  }

  return (
    <div className="bg-gray-100 p-6 min-h-screen">

      <div className="mb-6 flex gap-2">
        <div className="mr-2 text-2xl">👋</div>
        <div>
          <h1 className="text-2xl font-bold">
            Ciao {personalData?.fullName}
          </h1>
          <a href={personalData?.url} target="_blank" className="underline text-sm">Vai al mio profilo</a>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {items.map(({ board, cards, lists }) => {
          return <div className="col-span-12 lg:col-span-6 bg-white" key={board.id} >
            <div className="p-6 block">

              {/* Nome della board */}
              <a href={board.url} target="_blank" >
                <h2 className="text-2xl font-bold mb-6">
                  {board.name}
                </h2>
              </a>

              <div className="grid grid-cols-12 gap-6">
                {lists.map(list => {

                  const count = cards.filter(card => card.idList === list.id).length;

                  if (!count) return null;

                  return (
                    <div className="col-span-4" key={list.id}>

                      <Accordion title={<>
                        {/* Nome della lista */}
                        <p className="text-lg m-0">
                          {list.name} <Badge text={count} />
                        </p>
                      </>}>

                        {/* Cards della lista */}
                        {cards.length > 0
                          ? cards
                            .filter(card => card.idList === list.id)
                            .map(card => <Card key={card.id} card={card} />)
                          : <p className="text-sm">Nessuna card</p>
                        }
                      </Accordion>
                    </div>
                  )
                })}
              </div>

            </div>
          </div>
        })}
      </div>
    </div>

  )
}
