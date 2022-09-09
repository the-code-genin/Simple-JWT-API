export default function calculatePageOffset(
    total: number,
    page: number,
    perPage: number,
): number {
    if (total == 0) return 0;

    if (perPage < 1) perPage = 10;
    let totalPages = Math.ceil(total / perPage);

    if (page > totalPages) page = totalPages;
    else if (page < 1) page = 1;

    let offset = ((page - 1) * perPage);
    return offset;
}