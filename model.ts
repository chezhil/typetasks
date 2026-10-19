// A task's status can only ever be one of these three exact values.
type TaskStatus = "todo" | "in-progress" | "done";

// Every Task must have exactly this shape.
interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

let nextId = 1;

// Add a new task — always starts as "todo".
function addTask(tasks: Task[], title: string): Task[] {
  const newTask: Task = { id: nextId++, title, status: "todo" };
  return [...tasks, newTask];
}

// Mark a task done by id.
function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((t) => (t.id === id ? { ...t, status: "done" } : t));
}

// Return only the tasks matching a given status.
function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((t) => t.status === status);
}

// Remove a task by id.
function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter((t) => t.id !== id);
}

// Move a task one step forward: todo -> in-progress -> done.
function advanceTask(tasks: Task[], id: number): Task[] {
  const nextStatus: Record<TaskStatus, TaskStatus> = {
    todo: "in-progress",
    "in-progress": "done",
    done: "done",
  };
  return tasks.map((t) => (t.id === id ? { ...t, status: nextStatus[t.status] } : t));
}

// --- A quick smoke test, exercising every operation above ---
let tasks: Task[] = [];
tasks = addTask(tasks, "Write the model");
tasks = addTask(tasks, "Wire up the UI");
tasks = advanceTask(tasks, 1);
tasks = completeTask(tasks, 2);
tasks = deleteTask(tasks, 2);
const todoTasks = filterByStatus(tasks, "todo");
console.log(tasks, todoTasks);

// --- Lines below prove the compiler rejects invalid shapes. ---
// Uncomment any one to see tsc fail, then re-comment before compiling clean.

// const missingStatus: Task = { id: 3, title: "Broken" }; // Error: property 'status' is missing
// const wrongIdType: Task = { id: "3", title: "Broken", status: "todo" }; // Error: string is not assignable to number
// filterByStatus(tasks, "finished"); // Error: "finished" is not assignable to TaskStatus
