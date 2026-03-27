import { getAllTaskList, getSingleTaskList, addTasks, editTask, deleteTasks, } from "../services/taskService.js";
export const getAllTask = async (req, res, next) => {
    try {
        const data = await getAllTaskList();
        res.status(200).json({ data });
    }
    catch (err) {
        next(err);
    }
};
export const getSingleTask = async (req, res, next) => {
    try {
        const data = await getSingleTaskList(req.params.id);
        if (!data)
            return res.status(404).json({ message: "User not found" });
        res.json(data);
    }
    catch (err) {
        next(err);
    }
};
export const createTask = async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone)
            return res.status(400).json({ error: "name, email and phone are required" });
        const result = await addTasks({ name, email, phone });
        res.status(201).json({ message: "User created", id: result.insertId });
    }
    catch (err) {
        next(err);
    }
};
export const updateTask = async (req, res, next) => {
    try {
        const result = await editTask(req.body, req.params.id);
        if (!result.affectedRows)
            return res.status(404).json({ message: "User not found" });
        res.json({ message: "User updated successfully" });
    }
    catch (err) {
        next(err);
    }
};
export const deleteTask = async (req, res, next) => {
    try {
        const result = await deleteTasks(req.params.id);
        if (!result.affectedRows)
            return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted successfully" });
    }
    catch (err) {
        next(err);
    }
};
//# sourceMappingURL=taskController.js.map