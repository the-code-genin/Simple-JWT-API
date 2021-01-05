export function ApplicationError(code: number, type: string, message: string) {
    return {
        success: false,
        error: {
            code,
            type,
            message
        }
    }
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