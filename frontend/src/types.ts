export interface todoTypes {
    id: number;
    tasks: string;
    taskStatus: "pending" | "complete" | "rejecte";
    statusCode: number;
    createdAt: Date;
    updatedAt: Date | null;
    completedAt: Date | null;
}