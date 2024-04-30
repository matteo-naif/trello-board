import { TrelloBoard, TrelloCard, TrelloList, TrelloMember, TrelloMemberSmall } from "@/models/trello.model";
import axios from "axios";

export const getPersonalData = async (apiKey: string, token: string): Promise<TrelloMember | null> => {
    try {
        // https://developer.atlassian.com/cloud/trello/rest/api-group-members/#api-members-me-get
        let { data } = await axios.get<TrelloMember>(`https://api.trello.com/1/members/me?key=${apiKey}&token=${token}`);
        return data
    } catch (error) {
        console.error('[getPersonalData]', error);
        return null;
    }
}

export const getBoards = async (apiKey: string, token: string): Promise<TrelloBoard[]> => {
    try {
        // https://developer.atlassian.com/cloud/trello/rest/api-group-members/#api-members-id-boards-get
        let { data } = await axios.get<TrelloBoard[]>(`https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${token}`);
        return data;
    } catch (error) {
        console.error('[getBoards]', error);
        return [];
    }
}

export const getBoardLists = async (apiKey: string, token: string, boardId: string): Promise<TrelloList[]> => {
    try {
        // https://developer.atlassian.com/cloud/trello/rest/api-group-boards/#api-boards-id-lists-get
        let { data } = await axios.get<TrelloList[]>(`https://api.trello.com/1/boards/${boardId}/lists?key=${apiKey}&token=${token}`);
        return data
    } catch (error) {
        console.error('[getBoardLists]', error);
        return [];
    }
}

export const getBoardCards = async (apiKey: string, token: string, boardId: string) => {
    try {
        // https://developer.atlassian.com/cloud/trello/rest/api-group-boards/#api-boards-id-cards-get
        let { data } = await axios.get<TrelloCard[]>(`https://api.trello.com/1/boards/${boardId}/cards?key=${apiKey}&token=${token}`);
        return data
    } catch (error) {
        console.error('[getBoardCards]', error);
        return [];
    }
}

export const getBoardMembers = async (apiKey: string, token: string, boardId: string) => {
    try {
        // https://developer.atlassian.com/cloud/trello/rest/api-group-boards/#api-boards-id-members-get
        let { data } = await axios.get<TrelloMemberSmall[]>(`https://api.trello.com/1/boards/${boardId}/members?key=${apiKey}&token=${token}`);
        return data;
    } catch (error) {
        console.error('[getBoardMembers]', error);
        return [];
    }
}