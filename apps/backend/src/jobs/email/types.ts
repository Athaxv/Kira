export type sendEmailJob = 
    | { type: "Welcome", userId: string }
    | { type: "Issue_assigned", assigneeId: string, issueId: string }