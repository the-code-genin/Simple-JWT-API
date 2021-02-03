// Declare interfaces

interface ApiResponse {
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

interface Serializable {
    toJSON(): {[key: string]: any};
}