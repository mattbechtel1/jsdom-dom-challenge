let sec = 0;
let go = setInterval(countSecs, 1000);

document.addEventListener("DOMContentLoaded", () => {
    let counter = document.getElementById('counter');
    counter.innerText = 0;

    addListeners();
});

function addListeners() {
    let plusBtn = document.getElementById('plus');
    plusBtn.addEventListener('click', addSec);
    
    let minusBtn = document.getElementById('minus');
    minusBtn.addEventListener('click', subtractSec);
    
    let likeBtn = document.getElementById('heart');
    likeBtn.addEventListener('click', addLike);
    
    let pauseBtn = document.getElementById('pause');
    pauseBtn.addEventListener('click', pause);

    let commentForm = document.getElementById('comment-form');
    commentForm.removeEventListener('submit', noAction);
    commentForm.addEventListener('submit', addComment);
}

function countSecs() {
    sec += 1
    counter.innerText = sec;
}

function addSec() {
    sec += 1;
    counter.innerText = sec;
}

function subtractSec() {
    sec -= 1;
    counter.innerText = sec;
}

function addLike() {
    let likesContainer = document.querySelector('.likes');

    let likeItem;
    let numSpan;
    if (likesContainer.querySelector(`#num-${sec}`)) {
        likeItem = document.getElementById(`num-${sec}`);
        numSpan = likeItem.querySelector('span');
        if (numSpan.innerText === '1') {
            likeItem.innerHTML = `${sec} has been liked <span>2</span> times.` 
        } else {
            numSpan.innerText = parseInt(numSpan.innerText) + 1
        }

    } else {
        // debugger
        likeItem = document.createElement('li');
        likeItem.id = "num-" + sec;
        likeItem.innerHTML = `${sec} has been liked <span>1</span> time.`
        likesContainer.appendChild(likeItem);
    }
}

function pause(event) {
    clearInterval(go);
    event.target.removeEventListener('click', pause)
    event.target.innerText = 'resume';
    event.target.addEventListener('click', restartInterval);

    let plusBtn = document.getElementById('plus');
    plusBtn.removeEventListener('click', addSec);

    let minusBtn = document.getElementById('minus');
    minusBtn.removeEventListener('click', subtractSec);

    let likeBtn = document.getElementById('heart');
    likeBtn.removeEventListener('click', addLike);

    let commentForm = document.getElementById('comment-form');
    commentForm.removeEventListener('submit', addComment);
    commentForm.addEventListener('submit', noAction);
}

function noAction(event) {
    event.preventDefault();
}

function restartInterval(event) {
    go = setInterval(countSecs, 1000);
    event.target.removeEventListener('click', restartInterval)
    event.target.innerText = 'pause';
    
    addListeners();
}

function addComment(event) {
    let container = document.getElementById('list')
    let p = document.createElement('p')
    p.innerText = event.target.comment.value;

    container.appendChild(p);
    event.preventDefault();
}