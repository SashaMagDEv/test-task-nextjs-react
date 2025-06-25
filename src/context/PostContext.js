import { createContext, useContext, useState, useEffect } from 'react';
import { getPosts } from '../api/post';

const PostContext = createContext();

export const usePostContext = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiPosts = await getPosts();
                const localPosts = JSON.parse(localStorage.getItem('customPosts')) || [];
                console.log('localPosts:', localPosts);

                setPosts([...localPosts, ...apiPosts]);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const addPost = (newPost) => {
        setPosts(prev => [newPost, ...prev]);
        const existing = JSON.parse(localStorage.getItem('customPosts')) || [];
        localStorage.setItem('customPosts', JSON.stringify([newPost, ...existing]));
        console.log('Додаю пост:', newPost);
    };

    return (
        <PostContext.Provider value={{ posts, loading, addPost }}>
            {children}
        </PostContext.Provider>
    );
};
