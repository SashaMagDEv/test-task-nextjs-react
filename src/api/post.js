import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export const getPosts = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

export const getPostById = async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
};

export const getCommentsByPostId = async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}/comments`);
    return response.data;
};

export const createPost = async (data) => {
    const response = await axios.post(BASE_URL, {
        id: Date.now(),
        title: data.title,
        body: data.body,
        userId: 1,
    });

    return response.data;
};