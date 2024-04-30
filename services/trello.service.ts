import { TrelloBoard, TrelloCard, TrelloList, TrelloMemberSmall } from "@/models/trello.model";
import axios from "axios";

export const getPersonalData = async (apiKey: string, token: string) => {
    // https://developer.atlassian.com/cloud/trello/rest/api-group-members/#api-members-me-get
    let { data } = await axios.get(`https://api.trello.com/1/members/me?key=${apiKey}&token=${token}`);
    return data
}

export const getBoards = async (apiKey: string, token: string) => {
    // https://developer.atlassian.com/cloud/trello/rest/api-group-members/#api-members-id-boards-get
    let { data } = await axios.get<TrelloBoard[]>(`https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${token}`);
    return data;
}

export const getBoardLists = async (apiKey: string, token: string, boardId: string) => {
    // https://developer.atlassian.com/cloud/trello/rest/api-group-boards/#api-boards-id-lists-get
    let { data } = await axios.get<TrelloList[]>(`https://api.trello.com/1/boards/${boardId}/lists?key=${apiKey}&token=${token}`);
    return data
}

export const getBoardCards = async (apiKey: string, token: string, boardId: string) => {
    // https://developer.atlassian.com/cloud/trello/rest/api-group-boards/#api-boards-id-cards-get
    let { data } = await axios.get<TrelloCard[]>(`https://api.trello.com/1/boards/${boardId}/cards?key=${apiKey}&token=${token}`);
    return data
}

export const getBoardMembers = async (apiKey: string, token: string, boardId: string) => {
    // https://developer.atlassian.com/cloud/trello/rest/api-group-boards/#api-boards-id-members-get
    let { data } = await axios.get<TrelloMemberSmall[]>(`https://api.trello.com/1/boards/${boardId}/members?key=${apiKey}&token=${token}`);
    return data;
}