export function getActivePage(offset: number, limit: number) {
    return (offset - (offset % limit)) / limit + 1;
}
