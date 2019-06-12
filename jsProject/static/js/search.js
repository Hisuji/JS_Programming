const searchForm = document.querySelector('.searchForm'),
    searchInput = searchForm.querySelector('input');

function browse(text) {
    const path = `https://search.naver.com/search.naver?query=${text}`;
    window.open(path);
}

function handleSubmit(event) {
    event.preventDefault();
    const searchValue = searchInput.value;
    browse(searchValue);
    searchInput.value = '';
}


function init() {
    searchForm.addEventListener('submit', handleSubmit);
}

init();