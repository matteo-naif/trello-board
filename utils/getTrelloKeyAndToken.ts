export const getTrelloKeyAndToken = () => {
    const apiKey = process.env.TRELLO_API || '';
    const token = process.env.TRELLO_TOKEN || '';
    if (!apiKey || !token) throw new Error('Missing TRELLO_API or TRELLO_TOKEN environment variable');
    return { apiKey, token };
};
