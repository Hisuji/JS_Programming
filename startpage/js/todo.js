const todoForm = document.querySelector('.todoForm'),
    todoGroup = document.querySelector('.todoGroup'),
    todoInput = todoForm.querySelector('input');

const TODO_LIST = 'toDoList';

let toDos = [];

function deleteTodo(event) {
    const clickBtn = event.target;
    const selectTodo = clickBtn.parentNode;
    todoGroup.removeChild(selectTodo);

    //filter() > 리턴이 true인 요소만 모아서 새로운 배열을 만든다.
    const renewalTodos = toDos.filter(function (restTodos) {
        return restTodos.id !== Number(selectTodo.id.substring(2));
    });

    toDos = renewalTodos;
    saveTodos();
}

function check(event) {
    const targetName = event.target.tagName;
    if (targetName === "LI" || targetName === "SPAN") {
        const checkedIcon = (targetName === "LI") ? event.target.firstChild : event.target.previousSibling;
        const changeText = (targetName === "LI") ? event.target : event.target.parentNode;
        let originId = changeText.id;
        let subId = Number(originId.substring(2));
        const currentCN = checkedIcon.className;

        if (currentCN === "far fa-square") {
            checkedIcon.className = "far fa-check-square";
            changeText.style.textDecoration = "line-through";
            toDos[subId - 1].checked = 1;
        } else if (currentCN === "far fa-check-square") {
            checkedIcon.className = "far fa-square";
            changeText.style.textDecoration = "none";
            toDos[subId - 1].checked = 0;
        }
        toDos = toDos;
        saveTodos();
    }
}

function saveTodos() {
    localStorage.setItem(TODO_LIST, JSON.stringify(toDos));
}

function addTodos(text) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const icon = document.createElement("i");
    const delBtn = document.createElement("button");
    //length - 0부터 시작!
    const li_id = toDos.length + 1;
    const stringId = 'id' + li_id;
    todoGroup.appendChild(li);
    icon.className = "far fa-square";
    li.addEventListener("click", check);
    li.appendChild(icon);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.style.position = "relative";
    delBtn.innerText = "x";
    delBtn.className = "todoBtn";
    delBtn.addEventListener("click", deleteTodo);
    li.id = stringId;
    span.innerText = text;

    let checked;

    const lists = {
        listValue: text,
        id: li_id,
        checked: checked
    };

    toDos.push(lists);
}

function listSubmit(event) {
    event.preventDefault();
    const todoValue = todoInput.value;
    addTodos(todoValue);
    todoInput.value = "";
    saveTodos();
}

function done(id, checkValue) {
    if (checkValue === 1) {
        const checkList = todoGroup.querySelector(`#id${id}`);
        const childIcon = checkList.firstChild;
        childIcon.className = "far fa-check-square";
        checkList.style.textDecoration = "line-through";
        toDos[id - 1].checked = 1;
    }
}

function getTodos() {
    const list = localStorage.getItem(TODO_LIST);
    if (list !== null) {
        const parseList = JSON.parse(list);
        parseList.forEach(function (element) {
            addTodos(element.listValue);
            done(element.id, element.checked);
        });
    }
}

function init() {
    getTodos();
    todoForm.addEventListener("submit", listSubmit);
}

init();