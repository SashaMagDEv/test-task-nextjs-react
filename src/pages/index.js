import {getPosts} from "../api/post.js";
import PostList from "../components/PostList";

export default function Home({ posts }) {

    return  <PostList initialPosts={posts} />;
}
export async function getServerSideProps() {
    const posts = await getPosts()

    return {
        props: {
            posts,
        },
    };
}