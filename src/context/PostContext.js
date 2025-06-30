import { createContext, useContext, useState, useEffect } from "react";

import { getPosts } from "../api/post";

const PostContext = createContext();

export const usePostContext = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiPosts = await getPosts();
                const localPosts = JSON.parse(localStorage.getItem("customPosts")) || [];

                setPosts([...localPosts, ...apiPosts]);
            } catch (error) {
                setError("Не вдалося завантажити пости. Спробуйте ще раз.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const addPost = (newPost) => {
        const id = `local-${Date.now()}`;
        const postWithId = { ...newPost, id};

        setPosts(prev => [postWithId, ...prev]);

        const existing = JSON.parse(localStorage.getItem("customPosts")) || [];
        localStorage.setItem("customPosts", JSON.stringify([postWithId, ...existing]));
    };

    return (
        <PostContext.Provider value={{ posts, loading, error, addPost }}>
            {children}
        </PostContext.Provider>
    );
};