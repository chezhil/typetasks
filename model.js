let nextId = 1;
// Add a new task — always starts as "todo".
export function addTask(tasks, title) {
    const newTask = { id: nextId++, title, status: "todo" };
    return [...tasks, newTask];
}
// Mark a task done by id.
export function completeTask(tasks, id) {
    return tasks.map((t) => (t.id === id ? { ...t, status: "done" } : t));
}
// Return only the tasks matching a given status.
export function filterByStatus(tasks, status) {
    return tasks.filter((t) => t.status === status);
}
// Remove a task by id.
export function deleteTask(tasks, id) {
    return tasks.filter((t) => t.id !== id);
}
// Move a task one step forward: todo -> in-progress -> done.
export function advanceTask(tasks, id) {
    const nextStatus = {
        todo: "in-progress",
        "in-progress": "done",
        done: "done",
    };
    return tasks.map((t) => (t.id === id ? { ...t, status: nextStatus[t.status] } : t));
}
// --- Lines below prove the compiler rejects invalid shapes. ---
// Uncomment any one to see tsc fail, then re-comment before compiling clean.
// const missingStatus: Task = { id: 3, title: "Broken" }; // Error: property 'status' is missing
// const wrongIdType: Task = { id: "3", title: "Broken", status: "todo" }; // Error: string is not assignable to number
// filterByStatus(tasks, "finished"); // Error: "finished" is not assignable to TaskStatus
//# sourceMappingURL=model.js.map