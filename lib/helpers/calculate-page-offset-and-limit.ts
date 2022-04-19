export default function calculatePageOffsetAndLimit(
    total: number,
    page: number,
    perPage: number,
): { offset: number, limit: number } {
    if (total == 0) { // No results
        return {
            offset: 0,
            limit: perPage
        };
    }

    // Fix per page variable
    if (perPage < 1) perPage = 10;

    // Get the total number of pages
    let totalPages = Math.ceil(total / perPage);

    // Fix the page variable
    if (page > totalPages) page = totalPages;
    else if (page < 1) page = 1;

    // Calculate the offset to start fetching records from.
    let offset = ((page - 1) * perPage);

    // Response
    return {
        offset,
        limit: perPage,
    };
}