const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


const renderTasks = () => {
    taskList.innerHTML = tasks.map((task, index) => `
        <li draggable="true" data-index="${index}">
            ${task}
            <button class="delete-btn" data-index="${index}">Delete</button>
        </li>
    `).join("");


    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(button => {
        button.addEventListener("click", () => deleteTask(button.dataset.index));
    });
};


const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};


addTaskButton.addEventListener("click", () => {
    const task = taskInput.value.trim();
    if (task) {
        tasks.push(task);
        taskInput.value = "";
        renderTasks();
        saveTasks();
    }
});


const deleteTask = (index) => {
    tasks.splice(index, 1);
    renderTasks();
    saveTasks();
};


taskList.addEventListener("dragstart", (e) => {
    if (e.target.tagName === "LI") {
        e.dataTransfer.setData("text/plain", e.target.dataset.index);
    }
});

taskList.addEventListener("dragover", (e) => {
    e.preventDefault();
});

taskList.addEventListener("drop", (e) => {
    e.preventDefault();
    const fromIndex = e.dataTransfer.getData("text/plain");
    const toElement = e.target.closest("li");
    if (toElement) {
        const toIndex = Array.from(taskList.children).indexOf(toElement);
        if (fromIndex !== toIndex) {
            const [task] = tasks.splice(fromIndex, 1);
            tasks.splice(toIndex, 0, task);
            renderTasks();
            saveTasks();
        }
    }
});

renderTasks();
