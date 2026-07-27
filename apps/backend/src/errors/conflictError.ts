import { AppError } from "./appError";

export class ConflictError extends AppError {
    constructor(message = "already there"){
        super(message, 403)
    }
}