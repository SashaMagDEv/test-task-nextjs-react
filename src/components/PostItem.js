import Link from 'next/link';

export default function PostItem({ post }) {
    return (
        <li className="mb-2">
            <Link
                href={`/posts/${post.id}`}
                className="block h-full p-3 bg-white dark:bg-gray-800 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white"
            >
                {post.title}
            </Link>
        </li>
    );
}