export const endpointConfig = {
    // https://developer.atlassian.com/cloud/trello/rest/api-group-members/#api-members-me-get
    personalData: "https://api.trello.com/1/members/me",

    // https://developer.atlassian.com/cloud/trello/rest/api-group-members/#api-members-id-boards-get
    boards: "https://api.trello.com/1/members/me/boards",

    // https://developer.atlassian.com/cloud/trello/rest/api-group-boards/#api-boards-id-lists-get
    boardLists: (boardId: string) => `https://api.trello.com/1/boards/${boardId}/lists`,

    // https://developer.atlassian.com/cloud/trello/rest/api-group-boards/#api-boards-id-cards-get
    boardCards: (boardId: string) => `https://api.trello.com/1/boards/${boardId}/cards`,

    // https://developer.atlassian.com/cloud/trello/rest/api-group-boards/#api-boards-id-members-get
    boardMembers: (boardId: string) => `https://api.trello.com/1/boards/${boardId}/members`,

}