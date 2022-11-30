window.addEventListener('DOMContentLoaded', init);

/** 
 * Import Statements 
 */
import { filterSubmissions } from "./helpers.js"

/**
 * function init()
 * 
 * Allows the page to load all comments stored in submissions
 * @author Christian Velasquez, Kenny Fong
 */
function init() {
    loadComments();

    // attach event listener to all loaded comments
    let comments = document.querySelectorAll('.expandInfo');
    for (let i = 0; i < comments.length;i++) {
        comments[i].addEventListener('click', () => {
            document.querySelector('#commentTitle').innerHTML= "Title: " + comments[i].innerText;
            let submissions_array = filterSubmissions(
                JSON.parse(localStorage.getItem("submissions")));
            document.querySelector('.textbox').innerText = submissions_array[i].feedBack;
            document.querySelector('#Categoryname').innerText = "Category: " +
            submissions_array[i].category;
            document.querySelector('#Date').innerText = "Date: " + submissions_array[i].date;
            document.querySelector('#Name').innerText = "Name: " + submissions_array[i].name;
        });
    }
}

/**
* Load the page with comments
*
* @authors Kenny 
*/
function loadComments() {
    let submissions_array = filterSubmissions(JSON.parse(localStorage.getItem("submissions")));
    for (let i = 0; i < submissions_array.length; i++) {
        const div = document.createElement('div');
        let content_text = submissions_array[i].title;
        div.className = 'commentBox';
        div.innerHTML = `
            <a class="expandInfo">${content_text}</a>
        `;
        document.querySelector('.commentLinks').appendChild(div);
    }
}

