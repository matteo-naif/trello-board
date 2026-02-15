import { endpointConfig } from "@/config/endpoint.config";
import { TrelloBoard, TrelloCard, TrelloList, TrelloMember, TrelloMemberSmall } from "@/models/trello.model";
import { trelloGet } from "@/utils/trelloClient";

export const getPersonalData = async (): Promise<TrelloMember | null> => {
    try {
        return await trelloGet<TrelloMember>(endpointConfig.personalData, {
            logContext: "getPersonalData",
        });
    } catch {
        return null;
    }
}

export const getBoards = async (): Promise<TrelloBoard[]> => {
    try {
        return await trelloGet<TrelloBoard[]>(endpointConfig.boards, {
            logContext: "getBoards",
        });
    } catch {
        return [];
    }
}

export const getBoardLists = async (boardId: string): Promise<TrelloList[]> => {
    try {
        return await trelloGet<TrelloList[]>(endpointConfig.boardLists(boardId), {
            logContext: "getBoardLists",
        });
    } catch {
        return [];
    }
}

export const getBoardCards = async (boardId: string): Promise<TrelloCard[]> => {
    try {
        return await trelloGet<TrelloCard[]>(endpointConfig.boardCards(boardId), {
            logContext: "getBoardCards",
        });
    } catch {
        return [];
    }
}

export const getBoardMembers = async (boardId: string): Promise<TrelloMemberSmall[]> => {
    try {
        return await trelloGet<TrelloMemberSmall[]>(endpointConfig.boardMembers(boardId), {
            logContext: "getBoardMembers",
        });
    } catch {
        return [];
    }
}