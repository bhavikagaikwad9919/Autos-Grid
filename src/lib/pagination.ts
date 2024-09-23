export function getPaginationItems(
    currentPage: number,
    lastPage: number,
    maxLength: number
) {
    const res: Array<number> = [];
    // handle lastPage less than or equal to maxLength
    if (lastPage <= maxLength) {
        for (let i = 1; i <= lastPage; i++) {
            res.push(i);
        }
    }
    console.log(currentPage)
    return res;
}