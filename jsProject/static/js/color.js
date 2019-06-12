const deepColor = new Array("#1e272e", "#d2dae2", "#ff3f34", "#ffa801", "#ffdd59", "#27ae60", "#3867d6", "#1e3799", "#be2edd");
const lighterColor = new Array("#2f3542", "#dcdde1", "#fc5c65", "#fd9644", "#f5cd79", "#badc58", "#74b9ff", "#4a69bd", "#a29bfe");
const controlsColor = document.querySelectorAll('.controls_color');
const changeBtn = document.querySelector('#jsChange');

function paint() {
    controlsColor.forEach(function (item, index) {
        item.classList.toggle('changeColor');

        if (item.classList.contains('changeColor')) {
            item.style.backgroundColor = deepColor[index];
        } else {
            item.style.backgroundColor = lighterColor[index];
        }
    });
}

function selectColor() {
    paint();
    changeBtn.addEventListener("click", paint);
}

function init() {
    selectColor();
}

init();
