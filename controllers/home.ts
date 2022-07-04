import { Request, Response } from "express";
import SuccessResponse from "../lib/responses/success-response";

export default class HomeController {
    static async index(req: Request, res: Response) {
        return SuccessResponse(res, {});
    }
}