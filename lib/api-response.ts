interface ApiResponseSuccess {
    success: true,
    payload: {
        [key: string]: any
    }
}

interface ApiResponseFailure {
    success: false,
    error: {
        code: number,
        type: string,
        message: string
    }
}

type ApiResponse = |ApiResponseSuccess|ApiResponseFailure
export default ApiResponse;