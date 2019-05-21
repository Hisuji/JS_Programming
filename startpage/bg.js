const setting = document.querySelector('.setting'),
    bgList = document.querySelector('.bgList'),
    body = document.querySelector('body');

function backgroundBox() {
    bgList.classList.toggle('showing');
}

function clickSetting() {
    setting.addEventListener('click', backgroundBox);
}

function selectBgName(event) {
    const target = event.target;
    const bgCalssName = target.className;
    const list = target.tagName;
    const children = target.parentNode.children;

    // 색상<li> 이외에 다른 곳 클릭시 작동 X
    if(target.tagName === 'LI') {
        body.classList.remove(body.className);
        body.classList.add(bgCalssName);
    }
}

function clickBg() {
    bgList.addEventListener('click', selectBgName);
}

function init() {
    clickSetting();
    clickBg();
}

init();