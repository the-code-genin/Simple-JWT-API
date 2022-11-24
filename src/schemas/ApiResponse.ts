interface ApiResponseSuccess<Payload> {
    success: true;
    payload: Payload;
}

interface ApiResponseFailure {
    success: false;
    error: {
        code: number;
        type: string;
        message: string;
    };
}

type ApiResponse<Payload> = ApiResponseSuccess<Payload> | ApiResponseFailure;
export default ApiResponse;
