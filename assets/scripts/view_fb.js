window.addEventListener('DOMContentLoaded', init);

/** 
 * Import Statements 
 */
import { filterSubmissions } from "./helpers.js"


// sets goBack's destination based on whether we are 
// a professor or student
// Must run before init 
let goBack = document.getElementById('goback');
if (JSON.parse(localStorage.getItem('permission'))) {
    goBack.href = "../html/professor_feedback_view.html";
}
else{
    goBack.href = "../html/student_feedback_view.html";
}

/**
 * function init()
 * 
 * Allows the page to load all comments stored in submissions
 * @author Christian Velasquez, Kenny Fong
 */
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
                // gets the hidden section that displays comments/feedback and makes it visible 
                let display = document.getElementById("feedbackDisplay");
                display.hidden = false;
                let submissionsArr = filterSubmissions(JSON.parse(localStorage.getItem("submissions")));
                // filterSubmissions doesnt filter for category so we need to do that to get the right comment for index
                if (categorySelection.value != ""){ // magic value should be changed at some point
                    let temp = []
                    for (const arrIdx in submissionsArr) {
                        if (submissionsArr[arrIdx].category == categorySelection.value) {
                        temp.push(submissionsArr[arrIdx]);
                        }
                    }
                    submissionsArr = temp;
                }

                document.querySelector('#commentTitle').innerHTML = "" + comments[i].innerText; // setting title
                document.querySelector('.textbox').innerText = submissionsArr[i].feedBack;
                document.querySelector('#Categoryname').innerText = "Category: " + submissionsArr[i].category;
                document.querySelector('#Date').innerText = "Posted at " + submissionsArr[i].date + " by ";
                document.querySelector('#Name').innerText = "" + submissionsArr[i].name;

                if (submissionsArr[i].name === null) {
                    document.querySelector('#Name').innerText = "Anonymous";
                }
            });
        } 
    }
}


