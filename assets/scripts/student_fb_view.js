window.addEventListener('DOMContentLoaded', init);

/**
 * function init()
 * 
 * Functionality for the student feedback view page
 * Has a dropdown list and two buttons to view and add feedback.
 * @author Christian Velasquez, Kenny Fong
 */
function init() {
    const drop_down_list = document.getElementById("classSelect");
    /**
    * function generateDropDown()
    * 
    * Functionality for creating the dropdown list
    * @author Christian Velasquez, Kenny Fong
    */
    function generateDropDown() {
        drop_down_list.hidden = false;
        drop_down_list.innerHTML = '<option value = "">See All</option>';
        // create dropdown list
        for (let i = 0; i < class_list.length; i++) {
            const temp = document.createElement('option');
            temp.value = class_list[i];
            temp.innerHTML = class_list[i];
            drop_down_list?.append(temp);
        }
    }
    // Creates classList if it doesn't already exist
    if (localStorage.classList == undefined) {
        localStorage.setItem("classList", JSON.stringify([]));
    }
    const class_list = JSON.parse(localStorage.classList);


    // generate the dropdown selection
    generateDropDown();
    let fb_button = document.getElementById('addComment');
    let view_fb = document.getElementById('view');
    // take whatever drop_down_list.value is set to at the time of click & set local curr_class to it
    fb_button.addEventListener('click' , () => {
        // replace held value if different
        let curr_class = {
            class : document.getElementById("classSelect").value,
        }
        localStorage.setItem('currClass', JSON.stringify(curr_class));
    });
    view_fb.addEventListener('click' , () => {
        // replace held value if different
        let curr_class = {
            class : document.getElementById("classSelect").value,
        }
        localStorage.setItem('currClass', JSON.stringify(curr_class));
    });
}
