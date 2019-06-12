const canvas = document.getElementById('jsCanvas');
canvas.width = 700;
canvas.height = 500;

const groupColors = document.getElementById('jsColors');
const color = document.getElementsByClassName('controls_color');
const ctx = canvas.getContext('2d');
ctx.strokeStyle = groupColors.firstElementChild.style.backgroundColor;
ctx.lineWidth = 2.5;

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

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

function handleColor(event) {
    ctx.strokeStyle = event.target.style.backgroundColor;
}

Array.from(color).forEach(function (color) {
    color.addEventListener("click", handleColor);
})