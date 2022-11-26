window.addEventListener('DOMContentLoaded', init);
import { filterSubmissions } from "./helpers.js"
function init() {
    loadComments();

    // attach event listener to all comments
    let comments = document.querySelectorAll('.expandInfo');
    for (let item in comments) {
        comments[item].addEventListener('click', () => {
            document.querySelector('#commentTitle').innerHTML= comments[item].innerText; // setting title
            let submissionsArr = filterSubmissions(JSON.parse(localStorage.getItem("submissions")));
            document.querySelector('.textbox').innerText = submissionsArr[item].feedBack;
        });
    }
}

/**
* Populates the page with comments
*
* @authors Kenny 
*/
function loadComments() {
    let submissionsArr = filterSubmissions(JSON.parse(localStorage.getItem("submissions")));
    for (let i = 0; i < submissionsArr.length; i++) {
        const div = document.createElement('div');
        let contentText = submissionsArr[i].title;
        div.className = 'commentBox';
        div.innerHTML = `
            <a class="expandInfo">${contentText}</a>
        `;
        document.querySelector('.commentLinks').appendChild(div);
    }
}

