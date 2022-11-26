/**
 * student_fb_view.js
 * 
 * Functionality for the student feedback view page
 * Has a dropdown list and two buttons to view and add feedback.
 * @author Christian Velasquez, Kenny Fong
 */

window.addEventListener('DOMContentLoaded', init);
var selectedClass;
function init() {
    const dropdownList = document.getElementById("classSelect");
    // necessary function definition ? 
    function generateDropDown() {
        dropdownList.hidden = false;
        dropdownList.innerHTML = '<option value = "">See All</option>';
        for (let i = 0; i < classList.length; i++) {
            const temp = document.createElement('option');
            temp.value = classList[i];
            temp.innerHTML = classList[i];
            dropdownList?.append(temp);
        }
    }
    // Creates classList if it doesn't already exist
    if (localStorage.classList == undefined) { localStorage.setItem("classList", JSON.stringify([])); }
    const classList = JSON.parse(localStorage.classList);


    // generate the dropdown selection
    generateDropDown();
    let fbButton = document.getElementById('addComment');
    let viewFb = document.getElementById('view');
    // take whatever dropdownList.value is set to at the time of click & set local currClass to it
    fbButton.addEventListener('click' , () => {
        // replace held value if different
        let currClass = {
            class : document.getElementById("classSelect").value,
        }
        localStorage.setItem('currClass', JSON.stringify(currClass));
    });
    viewFb.addEventListener('click' , () => {
        // replace held value if different
        let currClass = {
            class : document.getElementById("classSelect").value,
        }
        localStorage.setItem('currClass', JSON.stringify(currClass));
    });
}
