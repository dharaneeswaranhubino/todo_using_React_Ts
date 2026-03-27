import type { Request, Response, NextFunction } from "express";
export declare const getAllTask: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getSingleTask: (req: Request<{
    id: string;
}>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createTask: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateTask: (req: Request<{
    id: string;
}>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteTask: (req: Request<{
    id: string;
}>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=taskController.d.ts.map