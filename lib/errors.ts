import ApiResponse from "./interfaces/api-response";

export function ApplicationError(code: number, type: string, message: string): ApiResponse {
    return {
        success: false,
        error: {
            code,
            type,
            message
        }
    }
}

export function NotFoundError(message: string = 'The resource you were looking for was not found on this server.') {
    return ApplicationError(404, 'NotFoundError', message);
}

export function AuthenticationError(message: string = 'User is not Authenticated!') {
    return ApplicationError(401, 'AuthenticationError', message);
}

export function InvalidFormDataError(message: string = 'Invalid form data!') {
    return ApplicationError(401, 'InvalidFormData', message);
}

export function ServerError(message: string = 'Server Error!') {
    return ApplicationError(500, 'ServerError', message);
}