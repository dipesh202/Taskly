const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const categoryBox = document.getElementById("category");
const dueDateBox = document.getElementById("due-date");
const priorityBox = document.getElementById("priority");

function addTask() {
    const task = inputBox.value.trim();
    const category = categoryBox.value;
    const dueDate = dueDateBox.value;
    const priority = priorityBox.value;

    if (task === '') {
        alert("Enter Some Data");
        return;
    }

    let li = document.createElement("li");
    li.classList.add(`category-${category}`);
    li.classList.add(`priority-${priority}`);

    li.innerHTML = `
        <strong>${task}</strong><br>
        <small> ${dueDate || "No Date"} |  ${category} |  ${priority}</small>
    `;

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    listContainer.appendChild(li);
    inputBox.value = "";
    dueDateBox.value = "";

    saveTask();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI" || e.target.tagName === "STRONG") {
        e.target.closest("li").classList.toggle("checked");
        saveTask();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveTask();
    }
});

function saveTask() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    const data = localStorage.getItem("data");
    if (data && data !== "undefined") {
        listContainer.innerHTML = data;
    } else {
        listContainer.innerHTML = "";
    }
}

showTask();
