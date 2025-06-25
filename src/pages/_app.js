import Header from '@/components/Header';
import '@/styles/globals.css';
import { PostProvider } from '@/context/PostContext';

export default function MyApp({ Component, pageProps }) {
    return (
        <PostProvider>
            <Header />
            <div className="max-w-4xl mx-auto px-4">
                <Component {...pageProps} />
            </div>
        </PostProvider>

    );
}