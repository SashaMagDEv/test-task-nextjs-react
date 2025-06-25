import Link from 'next/link';

export default function PostItem({ post }) {
    return (
        <li className="mb-2 bg-white dark:bg-gray-800 p-3 rounded">
            <Link href={`/posts/${post.id}`} className="text-black dark:text-white">
                {post.title}
            </Link>
        </li>
    );
}