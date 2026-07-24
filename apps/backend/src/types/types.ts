import { WorkspaceMember } from "@repo/db";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
            workspaceMember?: WorkspaceMember;
        }
    }
}

export {};