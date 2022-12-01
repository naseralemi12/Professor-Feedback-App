window.addEventListener('DOMContentLoaded', init);
import { filterSubmissions } from "./helpers.js"
function init() {
    loadComments();

    // attach event listener to all comments
    let comments = document.querySelectorAll('.expandInfo');
    for (let i = 0; i < comments.length;i++) {
        comments[i].addEventListener('click', () => {
            document.querySelector('#commentTitle').innerHTML= "Title: " + comments[i].innerText; // setting title
            let submissionsArr = filterSubmissions(JSON.parse(localStorage.getItem("submissions")));
            document.querySelector('.textbox').innerText = submissionsArr[i].feedBack;
            document.querySelector('#Categoryname').innerText = "Category: " + submissionsArr[i].category;
            document.querySelector('#Date').innerText = "Date: " + submissionsArr[i].date;
            document.querySelector('#Name').innerText = "Name: " + submissionsArr[i].name;
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

