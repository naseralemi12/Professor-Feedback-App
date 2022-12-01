// imports 
window.addEventListener('DOMContentLoaded', init);
// Dynamically changes the title of the page based on local storage held value before page load
document.getElementById('Classname').innerText = JSON.parse(localStorage.getItem('currClass')).class;

/**
 * function init()
 * 
 * Functionality for the student to add feedback
 * Uses localstorage and arrays to store comments.
 * @author Christian Velasquez, Kenny Fong
 */
function init() {
    const submit_reply_button = document.getElementById('submitB');
    // ONLY CLICK AFTER BOXES HAVE BEEN FILLED IN 
    submit_reply_button.addEventListener('click', () => {
        // will pull from local or create empty array 
        const submissions = JSON.parse(localStorage.getItem("submissions")) || []; // goated

        // parse elements for their values
        let course = document.getElementById('Classname').innerText;
        let title = document.getElementById('FeedbackTitle').value;
        let content = document.getElementById('stucommenttxt').value;
        let category = document.querySelector('input[name="Categories_of_Class"]:checked').value;
        let date = new Date().toDateString();

        // if annonymous don't save name
        let is_annonymous = document.getElementById('Annonymous').checked;
        let name = is_annonymous ? "Annonymous" : JSON.parse(localStorage.getItem('currUser'));
        console.log(name);
        // create new object to fill in 
        let new_submit = {};
        new_submit.title = title;
        new_submit.className = course;
        new_submit.date = date;
        new_submit.feedBack = content;
        new_submit.category = category;
        new_submit.name = name;
        
        // push back edited storage element
        submissions.push(new_submit);
        localStorage.setItem("submissions", JSON.stringify(submissions));
    });

    /* 
    * Creates the category radio boxes based on each class' local storage settings 
    */
    const check_box_list = document.getElementById("ctgrlist");
    //Add checkboxes based on the categories of class
    let curr_class = JSON.parse(localStorage.getItem('currClass')).class;
    const current_category_list = JSON.parse(localStorage.getItem(`${curr_class}`));
    
    for(let i=0;i<current_category_list.length;i++){
        var ctgr = document.createElement("INPUT");
        var ctgrname = document.createTextNode(current_category_list[i]);
        if (i==0) {
            ctgr.setAttribute("checked", "true");
        }
        ctgr.setAttribute("type", "radio");
        ctgr.setAttribute("value",current_category_list[i]);
        ctgr.setAttribute("name","Categories_of_Class");
        ctgr.innerHTML=current_category_list[i];
        check_box_list?.appendChild(ctgrname);
        check_box_list?.appendChild(ctgr);
    }
}