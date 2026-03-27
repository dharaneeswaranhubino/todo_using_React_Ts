import getDB from "../config/db.js";
export const getAllTaskList = async () => {
    const db = await getDB();
    const [rows] = await db.query("SELECT * FROM users ORDER BY createdAt DESC");
    return rows;
};
export const getSingleTaskList = async (id) => {
    const db = await getDB();
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows.length ? rows[0] : null;
};
export const addTasks = async (userData) => {
    const db = await getDB();
    const [result] = await db.query("INSERT INTO users (name, email, phone) VALUES (?, ?, ?)", [userData.name, userData.email, userData.phone]);
    return result;
};
export const editTask = async (userData, userId) => {
    const db = await getDB();
    const [result] = await db.query("UPDATE users SET name=?, email=?, phone=?, updatedAt=NOW() WHERE id=?", [userData.name, userData.email, userData.phone, userId]);
    return result;
};
export const deleteTasks = async (userId) => {
    const db = await getDB();
    const [result] = await db.query("DELETE FROM users WHERE id=?", [userId]);
    return result;
};
//# sourceMappingURL=taskService.js.map