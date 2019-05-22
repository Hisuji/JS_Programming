const clock = document.querySelector('#clock'),
    clockText = clock.querySelector('h1'),
    dateText = clock.querySelector('h2');

function printTime(value) {
    return value < 10 ? '0' + value : value;
}

function getTime() {
    const date = new Date();
    const hours = printTime(date.getHours());
    const minutes = printTime(date.getMinutes());
    clockText.innerText = `${hours}:${minutes}`
}

function getDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const dates = date.getDate();
    dateText.innerText = `${year}/${month + 1}/${dates}`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
    getDate();
}

init();