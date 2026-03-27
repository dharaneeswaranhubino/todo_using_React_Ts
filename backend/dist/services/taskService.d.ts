import type { RowDataPacket, ResultSetHeader } from "mysql2/promise";
export interface User extends RowDataPacket {
    id: number;
    name: string;
    email: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const getAllTaskList: () => Promise<User[]>;
export declare const getSingleTaskList: (id: string) => Promise<User | null>;
export declare const addTasks: (userData: {
    name: string;
    email: string;
    phone: string;
}) => Promise<ResultSetHeader>;
export declare const editTask: (userData: {
    name: string;
    email: string;
    phone: string;
}, userId: string) => Promise<ResultSetHeader>;
export declare const deleteTasks: (userId: string) => Promise<ResultSetHeader>;
//# sourceMappingURL=taskService.d.ts.map