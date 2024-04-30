import { TrelloBoard, TrelloCard, TrelloList, TrelloMember, TrelloMemberSmall } from "@/models/trello.model";
import axios from "axios";

const getTrelloKeyAndToken = () => {
    const apiKey = process.env.TRELLO_API || '';
    const token = process.env.TRELLO_TOKEN || '';
    if (!apiKey || !token) throw new Error('Missing TRELLO_API or TRELLO_TOKEN environment variable');
    return { apiKey, token };
}

export const getPersonalData = async (): Promise<TrelloMember | null> => {
    try {
        const { apiKey, token } = getTrelloKeyAndToken();
        // https://developer.atlassian.com/cloud/trello/rest/api-group-members/#api-members-me-get
        let { data } = await axios.get<TrelloMember>(`https://api.trello.com/1/members/me?key=${apiKey}&token=${token}`);
        return data
    } catch (error) {
        console.error('[getPersonalData]', error);
        return null;
    }
}

export const getBoards = async (): Promise<TrelloBoard[]> => {
    try {
        const { apiKey, token } = getTrelloKeyAndToken();
        // https://developer.atlassian.com/cloud/trello/rest/api-group-members/#api-members-id-boards-get
        let { data } = await axios.get<TrelloBoard[]>(`https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${token}`);
        return data;
    } catch (error) {
        console.error('[getBoards]', error);
        return [];
    }
}

export const getBoardLists = async (boardId: string): Promise<TrelloList[]> => {
    try {
        const { apiKey, token } = getTrelloKeyAndToken();
        // https://developer.atlassian.com/cloud/trello/rest/api-group-boards/#api-boards-id-lists-get
        let { data } = await axios.get<TrelloList[]>(`https://api.trello.com/1/boards/${boardId}/lists?key=${apiKey}&token=${token}`);
        return data
    } catch (error) {
        console.error('[getBoardLists]', error);
        return [];
    }
}

export const getBoardCards = async (boardId: string) => {
    try {
        const { apiKey, token } = getTrelloKeyAndToken();
        // https://developer.atlassian.com/cloud/trello/rest/api-group-boards/#api-boards-id-cards-get
        let { data } = await axios.get<TrelloCard[]>(`https://api.trello.com/1/boards/${boardId}/cards?key=${apiKey}&token=${token}`);
        return data
    } catch (error) {
        console.error('[getBoardCards]', error);
        return [];
    }
}

export const getBoardMembers = async (boardId: string) => {
    try {
        const { apiKey, token } = getTrelloKeyAndToken();
        // https://developer.atlassian.com/cloud/trello/rest/api-group-boards/#api-boards-id-members-get
        let { data } = await axios.get<TrelloMemberSmall[]>(`https://api.trello.com/1/boards/${boardId}/members?key=${apiKey}&token=${token}`);
        return data;
    } catch (error) {
        console.error('[getBoardMembers]', error);
        return [];
    }
}