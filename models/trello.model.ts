export type TrelloBoard = {
    id: string
    name: string
    closed: boolean
    url: string
}

export type TrelloCard = {
    id: string
    name: string
    url: string
    isTemplate: boolean
    idList: string
    idMembers: string[]
}

export type TrelloList = {
    id: string
    name: string
}

export type TrelloMember = {
    id: string,
    avatarUrl: string,
    bio: string,
    fullName: string // 'matteo.tortelli',
    memberType: string // 'normal',
    url: string // 'https://trello.com/matteotortelli1',
    username: string // 'matteotortelli1',
    email: string // 'matteo.tortelli@evoluzione.agency',
    idBoards: string[],
    idOrganizations: string[],
}

export type TrelloTableView = {
    name: string
    board: string
    column: string
    url: string
}

export type TrelloBoardView = {
    board: TrelloBoard,
    cards: TrelloCard[],
    lists: TrelloList[]
}