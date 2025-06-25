import { useRouter } from "next/router";
import { useEffect, useState} from "react";
import Loader from "../../components/Loader";
import {getCommentsByPostId, getPostById} from "../../api/post";

export default function PostDetail() {
    const { query } = useRouter();
    const router = useRouter();
    const { id } = query;
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const [postData, commentsData] = await Promise.all([
                    getPostById(id),
                    getCommentsByPostId(id),
                ]);
                setPost(postData);
                setComments(commentsData);
            } catch (error) {
                console.error('Помилка завантаження даних:', error);
            } finally {
                setLoader(false);
            }
        };
        fetchData();
    }, [id]);

    if (loader) return <Loader/>;
    if (!post) return <p>пост не знайдено</p>;

    return (

        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow max-w-3xl mx-auto mt-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {post.title}
            </h1>

            <p className="text-gray-700 dark:text-gray-300 mb-6">
                {post.body}
            </p>

            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Коментарі:
            </h3>

            <ul className="space-y-4">
                {comments.map(comment => (
                    <li
                        key={comment.id}
                        className="bg-gray-100 dark:bg-gray-700 p-4 rounded"
                    >
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                            {comment.email}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">{comment.body}</p>
                    </li>
                ))}
            </ul>
            <button
                onClick={() => router.back()}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
                ← Назад
            </button>
        </div>
    )
}