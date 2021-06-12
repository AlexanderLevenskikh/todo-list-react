export function getPagesCount(count: number, limit: number) {
    const floor = (count - (count % limit)) / limit;

    return count % limit > 0 ? floor + 1 : floor;
}
