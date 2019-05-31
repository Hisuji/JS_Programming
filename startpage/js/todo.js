const todoForm = document.querySelector('.todoForm'),
    todoGroup = document.querySelector('.todoGroup'),
    todoInput = todoForm.querySelector('input');

const TODO_LIST = 'toDoList';

let toDos = [];

function check(event) {
    const targetName = event.target.tagName;
    if (targetName === "LI" || targetName === "SPAN") {
        const checkedIcon = (targetName === "LI") ? event.target.firstChild : event.target.previousSibling;
        const changeText = (targetName === "LI") ? event.target : event.target.parentNode;
        const currentCN = checkedIcon.className;

        if (currentCN === "far fa-square") {
            checkedIcon.className = "far fa-check-square";
            changeText.style.textDecoration = "line-through";
            
        } else {
            checkedIcon.className = "far fa-square";
            changeText.style.textDecoration = "none";
        }
    }
}

function saveTodos() {
    localStorage.setItem(TODO_LIST, JSON.stringify(toDos));
}

function addTodos(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const icon = document.createElement("i");
    //length - 0부터 시작!
    const li_id = toDos.length + 1;
    todoGroup.appendChild(li);
    icon.className = "far fa-square";
    li.addEventListener("click", check);
    li.appendChild(icon);
    li.appendChild(span);
    span.style.width = "100%";
    li.id = li_id;
    span.innerText = text;

    const lists = {
        listValue: text,
        id: li_id
    };
    toDos.push(lists);
    saveTodos();
}

function listSubmit(event) {
    event.preventDefault();
    const todoValue = todoInput.value;
    addTodos(todoValue);
    todoInput.value = "";
}

function getTodos() {
    const list = localStorage.getItem(TODO_LIST);
    if (list !== null) {
        const parseList = JSON.parse(list);
        parseList.forEach(function (element) {
            addTodos(element.listValue);
        });
    }
}

function init() {
    getTodos();
    todoForm.addEventListener("submit", listSubmit);
}

init();