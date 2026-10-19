import { addTask, advanceTask, deleteTask, filterByStatus } from "./model.js";
let tasks = [];
let activeFilter = "all";
const titleInput = document.getElementById("title");
const addBtn = document.getElementById("add");
const chipsEl = document.getElementById("chips");
const listEl = document.getElementById("list");
const FILTERS = ["all", "todo", "in-progress", "done"];
const STATUS_LABEL = {
    todo: "To do",
    "in-progress": "In progress",
    done: "Done",
};
function visibleTasks() {
    return activeFilter === "all" ? tasks : filterByStatus(tasks, activeFilter);
}
function renderChips() {
    chipsEl.innerHTML = "";
    FILTERS.forEach((value) => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "chip" + (value === activeFilter ? " active" : "");
        chip.textContent = value === "all" ? "All" : STATUS_LABEL[value];
        chip.onclick = () => {
            activeFilter = value;
            render();
        };
        chipsEl.appendChild(chip);
    });
}
function renderList() {
    listEl.innerHTML = "";
    const visible = visibleTasks();
    if (visible.length === 0) {
        const empty = document.createElement("li");
        empty.className = "empty";
        empty.textContent = "No tasks here yet.";
        listEl.appendChild(empty);
        return;
    }
    visible.forEach((task) => {
        const item = document.createElement("li");
        item.className = "task";
        const badge = document.createElement("span");
        badge.className = "badge badge-" + task.status;
        badge.textContent = STATUS_LABEL[task.status];
        const label = document.createElement("span");
        label.className = "title";
        label.textContent = task.title;
        item.appendChild(badge);
        item.appendChild(label);
        if (task.status !== "done") {
            const advanceButton = document.createElement("button");
            advanceButton.type = "button";
            advanceButton.className = "advance";
            advanceButton.textContent = "advance →";
            advanceButton.onclick = () => {
                tasks = advanceTask(tasks, task.id);
                render();
            };
            item.appendChild(advanceButton);
        }
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete";
        deleteButton.textContent = "✕";
        deleteButton.onclick = () => {
            tasks = deleteTask(tasks, task.id);
            render();
        };
        item.appendChild(deleteButton);
        listEl.appendChild(item);
    });
}
function render() {
    renderChips();
    renderList();
}
addBtn.onclick = () => {
    const title = titleInput.value.trim();
    if (!title)
        return;
    tasks = addTask(tasks, title);
    titleInput.value = "";
    titleInput.focus();
    render();
};
titleInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter")
        addBtn.click();
});
render();
//# sourceMappingURL=app.js.map