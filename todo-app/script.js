let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        if (filter === "completed" && !task.completed)return;
        if(filter === "pending" && task.completed) return;

        const li = document.createElement("li");

        li.innerHTML = `
        <span onclick="toggleTask(${index})" class="${task.completed ? 'completed' : ''}">
            ${task.text}
        </span>
        <button onclick = "deleteTask(${index})">X</button>
        `;

        taskList.appendChild(li);
    });
}

function addTask(){
    const input = document.getElementById("taskInput");

    if (input.value.trim() === "") return;

    tasks.push({ text: input.value, completed: false});
    input.value = "";
    
    saveTasks();
    renderTasks();
}

function deleteTask(index){
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function filterTasks(type) {
    renderTasks(type);
}
renderTasks();

document.getElementById("taskInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter"){
        addTask();
    }
});