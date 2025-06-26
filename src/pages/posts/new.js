import { useRouter } from 'next/router';
import { useState } from 'react';
import PostForm from "../../components/PostForm";
import { createPost } from "../../api/post";
import {usePostContext} from "../../context/PostContext";

export default function NewPost() {
    const router = useRouter();
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { addPost } = usePostContext();

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const newPost = await createPost(data);

            addPost(newPost);
            setSuccess(true);

            setTimeout(() => {
                router.push('/');
            }, 2000);


        } catch (error) {
            console.error('Помилка створення поста', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="my-4">
            {success && <p style={{ color: 'green' }}>✅ Пост успішно створено!</p>}
            <PostForm onSubmit={onSubmit} isLoading={isLoading} />
        </div>
    );
}