const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
// const toDoList = document.querySelector(".js-toDoList");
const pendingList = document.querySelector(".js-pendingList");
const finishedList = document.querySelector(".js-finishedList");

const TODOS_LS = "toDos";
const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";

let toDos = [];
let toDoLists_pending = [];
let toDoLists_finished = [];
let todoIdx = 0;

//localStorage로 저장
function saveToDos() {
    // localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    localStorage.setItem(PENDING_LS, JSON.stringify(toDoLists_pending));
    localStorage.setItem(FINISHED_LS, JSON.stringify(toDoLists_finished));
}

const handleDeleteToDo = event => {
    const btn = event.target;
    const li = btn.parentNode;

    const tmpPendingList = toDoLists_pending.filter(todoPending => {
        return todoPending.id !== parseInt(li.id);
    });

    const tmpFinishedList = toDoLists_finished.filter(todoFinished => {
        return todoFinished.id !== parseInt(li.id);
    });

    toDoLists_pending = tmpPendingList;
    toDoLists_finished = tmpFinishedList;

    li.remove();
    saveToDos();
};

//pending -> finished
const handleFinishToDo = event => {
    const btn = event.target;
    const li = btn.parentNode;

    //remove pending list
    const tmpPending = toDoLists_pending.filter(todoPending => {
        return todoPending.id !== parseInt(li.id);
    });

    const tmpFinished = toDoLists_pending.filter(todoPending => {
        return todoPending.id === parseInt(li.id);
    });

    toDoLists_pending = tmpPending;
    toDoLists_finished = toDoLists_finished.concat(tmpFinished);

    li.remove();
    const span = li.querySelector("span");
    const todoObj = {
        id: li.id,
        text: span.innerText
    };
    paintFinished(todoObj);
    saveToDos();
};

const handleChangeToPending = () => {
    const btn = event.target;
    const li = btn.parentNode;

    //remove finished list
    const tmpFinished = toDoLists_finished.filter(todoFinished => {
        return todoFinished.id !== parseInt(li.id);
    });

    const tmpPending = toDoLists_finished.filter(todoFinished => {
        return todoFinished.id === parseInt(li.id);
    });

    toDoLists_pending = toDoLists_pending.concat(tmpPending);
    toDoLists_finished = tmpFinished;

    li.remove();
    const span = li.querySelector("span");
    const todoObj = {
        id: li.id,
        text: span.innerText
    };
    paintPending(todoObj);
    saveToDos();
};

const paintFinished = todo => {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const pendingBtn = document.createElement("button");
    const span = document.createElement("span");

    // delBtn.innerText = "Delete";
    delBtn.innerText = "X";
    delBtn.addEventListener("click", handleDeleteToDo);
    delBtn.style.marginLeft = "10px";
    // delBtn.style.backgroundColor = "#e74c3c";
    delBtn.style.backgroundColor = "#ee5253";

    // pendingBtn.innerText = "Go to pending";
    pendingBtn.innerText = "<<";
    pendingBtn.addEventListener("click", handleChangeToPending);
    pendingBtn.style.backgroundColor = "#1abc9c";
    span.innerText = todo.text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(pendingBtn);
    li.id = todo.id;

    finishedList.appendChild(li);
};

const paintPending = todo => {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const finishBtn = document.createElement("button");
    const span = document.createElement("span");

    // delBtn.innerText = "Delete";
    delBtn.innerText = "X";
    delBtn.addEventListener("click", handleDeleteToDo);
    delBtn.style.marginLeft = "10px";
    delBtn.style.backgroundColor = "#ee5253";

    // finishBtn.innerText = "Finished";
    finishBtn.innerText = ">>";
    finishBtn.addEventListener("click", handleFinishToDo);
    finishBtn.style.backgroundColor = "#1abc9c";

    span.innerText = todo.text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(finishBtn);
    li.id = todo.id;

    pendingList.appendChild(li);
};

const paintTodos = () => {
    //paintPending
    toDoLists_pending.forEach(todo => {
        paintPending(todo);
    });

    //paintFinished
    toDoLists_finished.forEach(todo => {
        paintFinished(todo);
    });
};

const addPending = currentValue => {
    const newId = todoIdx + 1;
    todoIdx = newId;
    const toDoObj = {
        id: newId,
        text: currentValue
    };
    toDoLists_pending.push(toDoObj);
    paintPending(toDoObj);
    saveToDos();
};

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    addPending(currentValue);
    toDoInput.value = "";
}

const loadToDos = () => {
    /* const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(todo => {
            paintToDo(todo.text);
        });
    } */

    const loadPendingList = localStorage.getItem(PENDING_LS);
    const loadFinishedList = localStorage.getItem(FINISHED_LS);
    if (loadPendingList !== null) {
        const parsedPendingList = JSON.parse(loadPendingList);
        toDoLists_pending = parsedPendingList;
    }
    if (loadFinishedList !== null) {
        const parsedFinishedList = JSON.parse(loadFinishedList);
        toDoLists_finished = parsedFinishedList;
    }

    paintTodos();
};

function init() {
    toDoForm.addEventListener("submit", handleSubmit);
    loadToDos();
}
init();
