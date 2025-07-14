import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import Loader from "./Loader";
import PostItem from "./PostItem";
import { usePostContext } from "../context/PostContext";

const POSTS_PER_PAGE = 15;

export default function PostList() {
    const { posts, loading, error } = usePostContext();
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const pageFromQuery = parseInt(router.query.page) || 1;
        setCurrentPage(pageFromQuery - 1);
    }, [router.query.page]);

    const pageCount = Math.ceil(posts.length / POSTS_PER_PAGE);
    const startOffset = currentPage * POSTS_PER_PAGE;
    const currentPosts = posts.slice(startOffset, startOffset + POSTS_PER_PAGE);

    const handlePageClick = ({ selected }) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page: selected + 1 },
        });
    };

    if (loading) return <Loader />;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!posts.length) return <p className="text-gray-500">Пости відсутні.</p>;

    return (
        <div className="min-h-screen flex flex-col">
            <ul className="grid grid-cols-3 gap-4 auto-rows-fr mt-4">
                {currentPosts.map((post) => (
                    <PostItem key={post.id} post={post} />
                ))}
            </ul>

            <div className="mt-3 border-t border-gray-200">
                <ReactPaginate
                    previousLabel="←"
                    nextLabel="→"
                    breakLabel="..."
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    forcePage={currentPage}
                    containerClassName="flex justify-center gap-2 mt-3 items-center"
                    pageClassName="px-3 py-1 border rounded"
                    activeClassName="bg-blue-600 text-white"
                />
            </div>
        </div>
    );
}
