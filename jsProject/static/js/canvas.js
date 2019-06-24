const groupColors = document.getElementById('jsColors');
const color = document.getElementsByClassName('controls_color');
const range = document.getElementById('brushRange');
const mode = document.getElementById('jsMode');
const erase = document.getElementById('jsErase');
const save = document.getElementById('jsSave');

const canvas = document.getElementById('jsCanvas');
canvas.width = 700;
canvas.height = 500;

const ctx = canvas.getContext('2d');
ctx.strokeStyle = groupColors.firstElementChild.style.backgroundColor;
ctx.lineWidth = range.value;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const drawColor = document.querySelector('.select_color');
drawColor.style.backgroundColor = groupColors.firstElementChild.style.backgroundColor;
drawColor.style.width = "30px";
drawColor.style.height = "30px";

let filling = false;
let painting = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const xValue = event.offsetX;
    const yValue = event.offsetY;

    if (!painting) {
        // beginPath() >> 경로 생성
        ctx.beginPath();
        // moveTo(x, y) >> 펜 이동 + 특정 시작점 설정
        ctx.moveTo(xValue, yValue);
    } else {
        // lineTo(x, y) >> 시작점에서 좌표 x, y로 경로 이동
        ctx.lineTo(xValue, yValue);
        // stroke() >> 선 그리기
        ctx.stroke();
    }
}

function handleRange(event) {
    const rangeValue = event.target.value;
    ctx.lineWidth = rangeValue;
    drawColor.style.width = rangeValue * 10 + "px";
    drawColor.style.height = rangeValue * 10 + "px";
}

function handleCanvas() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleContextmenu(event) {
    event.preventDefault();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvas);
    canvas.addEventListener("contextmenu", handleContextmenu);
}

function handleColor(event) {
    const brushColor = event.target.style.backgroundColor;
    ctx.strokeStyle = brushColor;
    ctx.fillStyle = brushColor;
    drawColor.style.backgroundColor = brushColor;
}

function handleMode() {
    if (!filling) {
        mode.innerText = "Paint";
        filling = true;
    } else {
        mode.innerText = "Fill";
        filling = false;
    }
}

function handleErase() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function handleSave() {
    const imageURL = canvas.toDataURL(); //The default format type is image/png.
    const downloadLink = document.createElement('a');
    downloadLink.href = imageURL;
    downloadLink.download = "paint";
    downloadLink.click();
}

Array.from(color).forEach(function (color) {
    color.addEventListener("click", handleColor);
})

if (range) {
    range.addEventListener("input", handleRange);
}

if (mode) {
    mode.addEventListener("click", handleMode);
}

if (erase) {
    erase.addEventListener("click", handleErase);
}

if (save) {
    save.addEventListener("click", handleSave);
}
