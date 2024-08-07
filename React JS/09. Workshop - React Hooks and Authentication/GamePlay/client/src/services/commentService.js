import * as request from '../lib/request';

const baseUrl = 'http://localhost:3030/data/comments';

export const getById = async (gameId) => {
    const query = new URLSearchParams({
        where: `gameId="${gameId}"`,
        load: `owner=_ownerId:users`,
    });
    const comments = await request.get(`${baseUrl}?${query}`);

    // return comments.filter(comment => comment.gameId === gameId);
    return comments;
};

export const create = async (gameId, text) => {
    const newComment = await request.post(baseUrl, {
        gameId,
        text
    });

    return newComment;
};