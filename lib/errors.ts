import ApiResponse from "./api-response";

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

export function InvalidFormDataError(message: string = 'Invalid form data!') {
    return ApplicationError(400, 'InvalidFormData', message);
}

export function AuthenticationError(message: string = 'User is not Authenticated!') {
    return ApplicationError(401, 'AuthenticationError', message);
}

export function ForbiddenError(message: string = 'User is forbidden from accessing this resource!') {
    return ApplicationError(403, 'ForbiddenError', message);
}

export function NotFoundError(message: string = 'The resource you were looking for was not found on this server.') {
    return ApplicationError(404, 'NotFoundError', message);
}

export function ConflictError(message: string = 'The resource you are trying to create already exists!') {
    return ApplicationError(409, 'Conflict', message);
}

export function ServerError(message: string = 'Server Error!') {
    return ApplicationError(500, 'ServerError', message);
}