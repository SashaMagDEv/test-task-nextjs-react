import { usePostContext } from '../context/PostContext';
import PostItem from './PostItem';
import Loader from './Loader';

export default function PostList() {
    const { posts, loading } = usePostContext();

    if (loading) return <Loader />;
    if (!posts.length) return <p className="text-gray-500">Пости відсутні.</p>;

    return (
        <ul className="my-4 grid grid-cols-3 gap-4 p-0 list-none">
            {posts.map(post => (
                <PostItem key={post.id} post={post} />
            ))}
        </ul>
    );
}
