export function getTitleByPath(pathname) {
    if (pathname === '/') return 'Список постів';
    if (pathname.startsWith('/posts/new')) return 'Створення поста';
    if (pathname.startsWith('/posts')) return 'Пост';
    return 'Додаток';
}