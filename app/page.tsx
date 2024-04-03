import { Accordion } from "@/components/Accordion";
import axios from "axios";

type TrelloBoard = {
  id: string
  name: string
  closed: boolean
  url: string
}

type TrelloCard = {
  id: string
  name: string
  url: string
  isTemplate: boolean
  idList: string
}

type TrelloList = {
  id: string
  name: string
}

export default async function Home() {

  let items: { board: TrelloBoard, cards: TrelloCard[], lists: TrelloList[] }[] = [];

  const apiKey = process.env.TRELLO_API;
  const token = process.env.TRELLO_TOKEN;
  try {

    let { data: boards } = await axios.get<TrelloBoard[]>(`https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${token}`);

    boards = boards.filter(board => !board.closed);


    for (const board of boards) {
      let { data: lists } = await axios.get<TrelloList[]>(`https://api.trello.com/1/boards/${board.id}/lists?key=${apiKey}&token=${token}`);
      const { data: cards } = await axios.get<TrelloCard[]>(`https://api.trello.com/1/boards/${board.id}/cards?key=${apiKey}&token=${token}`);
      items.push({ board, lists, cards })
    }

  } catch (error) {

    console.error("Errore nel recuperare le board: ", error);

  }

  return (
    <div className="grid grid-cols-12 gap-6 m-6">
      {items.map(({ board, cards, lists }) => {
        return <div className="col-span-12 lg:col-span-4" key={board.id} >
          <div className="p-6 block border">

            {/* Nome della board */}
            <a href={board.url} target="_blank" >
              <h2 className="text-2xl font-bold mb-6">
                {board.name}
              </h2>
            </a>

            {lists.map(list => (
              <div key={list.id}>

                <Accordion title={<>
                  {/* Nome della lista */}
                  <p className="text-lg m-0">
                    {list.name}

                    <span className="ml-3 inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-inset ring-gray-200">
                      {cards.filter(card => card.idList === list.id).length}
                    </span>

                  </p>
                </>}>


                  {/* Cards della lista */}
                  <ul className="list-disc space-y-2">
                    {cards
                      .filter(card => card.idList === list.id)
                      .map(card => <li key={card.id} className="ml-6 text-sm"><a href={card.url} target="_blank">{card.name}</a></li>)}
                  </ul>

                </Accordion>


              </div>
            ))}

          </div>
        </div>
      })}
    </div>

  )
}
