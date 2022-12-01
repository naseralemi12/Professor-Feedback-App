window.addEventListener('DOMContentLoaded', init);

/**
 * function init()
 * 
 * Functionality for the student feedback view page
 * Has a dropdown list and two buttons to view and add feedback.
 * @author Christian Velasquez, Kenny Fong
 */

window.addEventListener('DOMContentLoaded', init);

/** 
 * Import Statements 
 */
import { generateDropDown, updateCurrClass} from "./helpers.js";


var selectedClass;
function init() {
    const dropdownList = document.getElementById("classSelect");
    
    // Creates classList if it doesn't already exist
    if (localStorage.classList == undefined) {
        localStorage.setItem("classList", JSON.stringify([]));
    }
    const class_list = JSON.parse(localStorage.classList);


    // generate the dropdown selection
    generateDropDown(classList);
    let fbButton = document.getElementById('addComment');
    let viewFb = document.getElementById('view');

    let classSelectedBtns = document.getElementById('classSelectedBtns');
    let classSelection = document.getElementById('classSelect');

    // when a class is selected from the dropdown the current class should be changed and the
    // view feedback and modify categories buttons should be unhidden
    classSelection?.addEventListener("change", () => {
        // changes currClass in local storage 
        updateCurrClass();
        // unhide
        classSelectedBtns.hidden = false;
    });


    fbButton.addEventListener('click' , () => {
        updateCurrClass();
    });
    viewFb.addEventListener('click' , () => {
        updateCurrClass();
    });
}
