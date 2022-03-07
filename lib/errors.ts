import { Response } from "express";

export function ApplicationError(res: Response, code: number, type: string, message: string) {
    return res.status(code).json({
        success: false,
        error: {
            code,
            type,
            message
        }
    });
}

export function InvalidFormDataError(res: Response, message: string = 'Invalid form data!') {
    return ApplicationError(res, 400, 'InvalidFormData', message);
}

export function AuthenticationError(res: Response, message: string = 'User is not Authenticated!') {
    return ApplicationError(res, 401, 'AuthenticationError', message);
}

export function ForbiddenError(res: Response, message: string = 'User is forbidden from accessing this resource!') {
    return ApplicationError(res, 403, 'ForbiddenError', message);
}

export function NotFoundError(res: Response, message: string = 'The resource you were looking for was not found on this server.') {
    return ApplicationError(res, 404, 'NotFoundError', message);
}

export function ConflictError(res: Response, message: string = 'The resource you are trying to create already exists!') {
    return ApplicationError(res, 409, 'Conflict', message);
}

export function ServerError(res: Response, message: string = 'Server Error!') {
    return ApplicationError(res, 500, 'ServerError', message);
}