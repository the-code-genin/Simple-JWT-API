import { Response } from "express";

export default function generateSuccessResponse<T>(res: Response, payload: T, status: number = 200) {
    return res.status(status).json({
        success: true,
        payload: payload
    });
};