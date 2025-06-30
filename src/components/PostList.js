import { usePostContext } from '../context/PostContext';
import PostItem from './PostItem';
import Loader from './Loader';

export default function PostList() {
    const { posts, loading, error} = usePostContext();

    if (loading) return <Loader />;
    if (error) return <p className="text-red-500">{error}</p>
    if (!posts.length) return <p className="text-gray-500">Пости відсутні.</p>;

    return (
        <ul className="grid grid-cols-3 gap-4 auto-rows-fr mt-4">
            {posts.map(post => (
                <PostItem key={post.id} post={post} />
            ))}
        </ul>
    );
}