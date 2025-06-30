import Header from '@/components/Header';
import '@/styles/globals.css';
import { PostProvider } from '@/context/PostContext';
import Head from 'next/head';
import {useRouter} from "next/router";
import {getTitleByPath} from "../utils/getTitleByPath";

export default function MyApp({ Component, pageProps }) {

    const router = useRouter();
    const title = getTitleByPath(router.pathname);
    return (
        <PostProvider>
            <Head>
                <title>{title}</title>
            </Head>
            <Header />
            <div className="max-w-4xl mx-auto px-4">
                <Component {...pageProps} />
            </div>
        </PostProvider>

    );
}