window.addEventListener('DOMContentLoaded', init);
import { filterSubmissions } from "./helpers.js"
function init() {
    let categorySelection = document.getElementById("categorySelect");
    
    let currClass = JSON.parse(localStorage.currClass).class;
    let classCategories = JSON.parse(localStorage.getItem(currClass));
    for (let i = 0; i < classCategories.length; i++) {
        const temp = document.createElement('option');
        temp.value = classCategories[i];
        temp.innerHTML = classCategories[i];
        categorySelection?.append(temp);
    }
    
    loadComments();
    categorySelection?.addEventListener("change", () =>{
        loadComments();        
    });

    /**
    * Populates the page with comments
    *
    * @authors Kenny 
    */
    function loadComments() {
        let categorySelection = document.getElementById("categorySelect");
        
        if (categorySelection.value == ""){ // fix maybe? magic value bad
            let submissionsArr = filterSubmissions(JSON.parse(localStorage.getItem("submissions")));
            document.querySelector('.commentLinks').innerHTML = "";
            for (let i = 0; i < submissionsArr.length; i++) {
                const div = document.createElement('div');
                let contentText = submissionsArr[i].title;
                div.className = 'commentBox';
                div.innerHTML = `
                    <a class="expandInfo">${contentText}</a>
                `;
                document.querySelector('.commentLinks').appendChild(div);
            }   
        } else {
            let submissionsArr = filterSubmissions(JSON.parse(localStorage.getItem("submissions")));
            let temp = [];
            for (const arrIdx in submissionsArr) {
                if (submissionsArr[arrIdx].category == categorySelection.value) {
                temp.push(submissionsArr[arrIdx]);
                }
            }
            submissionsArr = temp;
            document.querySelector('.commentLinks').innerHTML = "";
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
        // attach event listener to all comments
        let comments = document.querySelectorAll('.commentBox'); // changed from expandinfo to commentbox
        for (let i = 0; i < comments.length; i++) {
            comments[i].addEventListener('click', () => {
                let display = document.getElementById("feedbackDisplay");
                display.hidden = false;

                document.querySelector('#commentTitle').innerHTML = "Title: " + comments[i].innerText; // setting title
                let submissionsArr = filterSubmissions(JSON.parse(localStorage.getItem("submissions")));
                document.querySelector('.textbox').innerText = submissionsArr[i].feedBack;
                document.querySelector('#Categoryname').innerText = "Category: " + submissionsArr[i].category;
                document.querySelector('#Date').innerText = "Date: " + submissionsArr[i].date;
                document.querySelector('#Name').innerText = "Name: " + submissionsArr[i].name;
            });
        } 
    }
}


