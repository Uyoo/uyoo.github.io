const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");
const section_toDoList = document.querySelector(".section-toDoList");
const header = document.querySelector("header");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

const saveName = text => {
    localStorage.setItem(USER_LS, text);
};

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

const askForName = () => {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
};

const paintGreeting = text => {
    form.classList.remove(SHOWING_CN);
    header.classList.add(SHOWING_CN);
    // greeting.classList.add(SHOWING_CN);
    section_toDoList.classList.add(SHOWING_CN);

    // greeting.innerText = `Hello ${text}`;
    const span = document.createElement("span");
    span.innerText = `Hello "${text}"`;
    header.appendChild(span);
};

const loadName = () => {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
};

function init() {
    loadName();
    input.addEventListener("focusout", event => {
        event.target.value = "";
    });
}
init();
