window.addEventListener('DOMContentLoaded', init);
import { filterSubmissions } from "./helpers.js"
function init() {
    loadComments();
    let categorySelection = document.getElementById("categorySelect");

    categorySelection?.addEventListener("change", () =>{
        loadComments();
    });
    let currClass = JSON.parse(localStorage.currClass).class;
    let classCategories = JSON.parse(localStorage.getItem(currClass));
    for (let i = 0; i < classCategories.length; i++) {
        const temp = document.createElement('option');
        temp.value = classCategories[i];
        temp.innerHTML = classCategories[i];
        categorySelection?.append(temp);
    }
    // attach event listener to all comments
    let comments = document.querySelectorAll('.expandInfo');
    for (let i = 0; i < comments.length; i++) {
        comments[i].addEventListener('click', () => {
            document.querySelector('#commentTitle').innerHTML = "Title: " + comments[i].innerText; // setting title
            let submissionsArr = filterSubmissions(JSON.parse(localStorage.getItem("submissions")));
            document.querySelector('.textbox').innerText = submissionsArr[i].feedBack;
            document.querySelector('#Categoryname').innerText = "Category: " + submissionsArr[i].category;
            document.querySelector('#Date').innerText = "Date: " + submissionsArr[i].date;
            document.querySelector('#Name').innerText = "Name: " + submissionsArr[i].name;
        });
    }
    
    /**
* Populates the page with comments
*
* @authors Kenny 
*/
    function loadComments() {
        let submissionsArr = filterSubmissions(JSON.parse(localStorage.getItem("submissions")));
        let temp = [];
        for (const arrIdx in submissionsArr) {
            if (submissionsArr[arrIdx].category ==  categorySelection.value) {
            filteredArray.push(submissionsArr[arrIdx]);
            }
        }
        return filteredArray;
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
}


