import { AppError } from "./appError";

export class UnauthroizedError extends AppError {
    constructor(message = "Unauthorized"){
        super(message, 402)
    }
}