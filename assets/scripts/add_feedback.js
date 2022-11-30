/**
 * add_feedback.js
 * 
 * Functionality for the student to add feedback
 * Uses localstorage and arrays to store comments.
 * @author Christian Velasquez, Kenny Fong
 */
// imports 

//import { appendComment} from "./helpers.js"

window.addEventListener('DOMContentLoaded', init);
// Dynamically changes the title of the page based on local storage held value before page load
document.getElementById('Classname').innerText = JSON.parse(localStorage.getItem('currClass')).class;

function init() {
    const submitReplyButton = document.getElementById('submitB');
    // ONLY CLICK AFTER BOXES HAVE BEEN FILLED IN 
    submitReplyButton.addEventListener('click', () => {
        // will pull from local or create empty array 
        const submissions = JSON.parse(localStorage.getItem("submissions")) || []; // goated

        // parse elements for their values
        let course = document.getElementById('Classname').innerText;
        let title = document.getElementById('FeedbackTitle').value;
        let content = document.getElementById('stucommenttxt').value;
        let category = document.querySelector('input[name="Categories_of_Class"]:checked').value;
        let date = new Date().toDateString();

        // if annonymous don't save name
        let isAnnonymous = document.getElementById('Annonymous').checked;
        let name = isAnnonymous ? "Annonymous" : JSON.parse(localStorage.getItem('currUser'));
        console.log(name);
        // create new object to fill in 
        let newSubmit = {};
        newSubmit.title = title;
        newSubmit.className = course;
        newSubmit.date = date;
        newSubmit.feedBack = content;
        newSubmit.category = category;
        newSubmit.name = name;
        
        submissions.push(newSubmit);

        // push back edited storage element
        localStorage.setItem("submissions", JSON.stringify(submissions));
    });

    /* 
     * Creates the category radio boxes based on each class' local storage settings 
     */
     const checkboxlist = document.getElementById("ctgrlist");
     //Add checkboxes based on the categories of class
     let currClass = JSON.parse(localStorage.getItem('currClass')).class;
     const currentCategoryList = JSON.parse(localStorage.getItem(`${currClass}`));
     for(let i=0;i<currentCategoryList.length;i++){
         var ctgr = document.createElement("INPUT");
         var ctgrname = document.createTextNode(currentCategoryList[i]);
         if (i==0) {
            ctgr.setAttribute("checked", "true");
         }
         ctgr.setAttribute("type", "radio");
         ctgr.setAttribute("value",currentCategoryList[i]);
         ctgr.setAttribute("name","Categories_of_Class");
         ctgr.innerHTML=currentCategoryList[i];
         checkboxlist?.appendChild(ctgrname);
         checkboxlist?.appendChild(ctgr);
     }
}