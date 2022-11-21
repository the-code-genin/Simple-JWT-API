import { Response } from "express";

export function ApplicationError(res: Response, code: number, type: string, message: string) {
    return res.status(code).json({
        success: false,
        error: {
            code,
            type,
            message,
        },
    });
}

export function BadRequestError(res: Response, message = "Invalid form data!") {
    return ApplicationError(res, 400, "BadRequest", message);
}

export function AuthorizationError(res: Response, message = "User is not Authenticated!") {
    return ApplicationError(res, 401, "Authorization", message);
}

export function ForbiddenError(res: Response, message = "User is forbidden from accessing this resource!") {
    return ApplicationError(res, 403, "Forbidden", message);
}

export function NotFoundError(
    res: Response,
    message = "The resource you were looking for was not found on this server."
) {
    return ApplicationError(res, 404, "NotFound", message);
}

export function ConflictError(res: Response, message = "The resource you are trying to create already exists!") {
    return ApplicationError(res, 409, "Conflict", message);
}

export function ServerError(res: Response, message = "Server Error!") {
    return ApplicationError(res, 500, "ServerError", message);
}

export function SuccessResponse<T>(res: Response, payload: T, status = 200) {
    return res.status(status).json({
        success: true,
        payload: payload,
    });
}
