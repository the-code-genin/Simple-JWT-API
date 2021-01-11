export default interface ApiResponse {
    success: boolean,
    payload?: {
        [key: string]: any
    },
    error?: {
        code: number,
        type: string,
        message: string
    }
}