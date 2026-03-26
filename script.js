document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let priority = document.getElementById("priority").value;

    if (taskInput.value === "") return;

    let task = {
        text: taskInput.value,
        priority: priority,
        completed: false
    };

    let tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    displayTasks();
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
    displayTasks();
}

function displayTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let tasks = getTasks();

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.textContent = task.text + " (" + task.priority + ")";

        li.classList.add(task.priority.toLowerCase());
        if (task.completed) li.classList.add("completed");

        li.onclick = () => toggleComplete(index);

        let delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.onclick = (e) => {
            e.stopPropagation();
            deleteTask(index);
        };

        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}

function toggleComplete(index) {
    let tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function deleteTask(index) {
    let tasks = getTasks();
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}