export default interface ResponsePayload<T> {
    data?: T,
    total?: number,
    per_page?: number,
    current_page?: number,
    prev_page?: number|null,
    next_page?: number|null,
    from?: number,
    to?: number,
    [key: string]: any
}