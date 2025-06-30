import {useRouter} from "next/router";

import AddPostButton from "./AddPostButton";
import {getTitleByPath} from "../utils/getTitleByPath";

export default function Header() {

    const router = useRouter();
    const { pathname } = router
    const title = getTitleByPath(pathname);

    return (
        <header className="bg-white flex items-center justify-between px-6 py-4 shadow">
            <h1 className="text-black text-3xl font-bold text-center flex-grow">
                {title}
            </h1>
            <AddPostButton />
        </header>
    )
}