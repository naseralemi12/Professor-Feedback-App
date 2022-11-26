//@ts-check
window.addEventListener('DOMContentLoaded', init);

// the init function will wait for all the dom content to load before running any javascript, so we include all our javascript inside the function
function init() {
    const dropdownList = document.getElementById("classSelect");
    const classList = JSON.parse(localStorage.classList);
    let commentBox = document.getElementById("")
    // generate the dropdown selection
    generateDropDown();
    generateComments();
    let newFeedbackButton = document.getElementById('newFeedback'); // this button triggers the dialog box
    let saveButton = document.getElementById('saveButton'); // this button is used inside the dialog box
    let dialog = document.querySelector('dialog'); // this element is the dialog box itself
    let cancelButton = document.getElementById('cancelButton'); // this button is used inside the dialog box
    let viewFeedbackButton = document.getElementById('viewFeedback'); // element for view feedback button show trigger the feedbacks dialog box to open
    let confirmationMessage = document.getElementById('confirmationMessage'); // just a confirmation meessage to assure the user that the input has been saved. the feedback can be seen by clicking view feedback button
    let addProfessorClassBtn = document.getElementById('addNewClassBtn');
    //when the newFeedbackButton is clicked, th dialog box should open
    
    //when addNewClass btn is clicked, add class to local storage for professor
    //Please review this, not sure why it doesnt work when clicked, checked console and it works but not when button is clicked.
    addProfessorClassBtn?.addEventListener('click', () => {
        console.log("Sanity Check");
        if (localStorage.classList == undefined) { localStorage.setItem("classList", JSON.stringify([])); }
        let classList = JSON.parse(localStorage.getItem("classList"));
        let classValue = document.getElementById('newClass')?.value;
        classList?.push(classValue);
        localStorage.setItem("classList", JSON.stringify(classList));
        console.log('Succesfuly added new class');
    });

    /// creates a comment/feedback object
    let createFeedbackObject = () => {
        // get the input data from the dialog
        let dialogInput = {};
        dialogInput.title = document.getElementById("title")?.value;
        dialogInput.className = document.getElementById("className")?.value;
        dialogInput.date = document.getElementById("date")?.value;
        dialogInput.feedBack = document.querySelector("textarea")?.value;
        dialogInput.category = document.querySelector('input[name="category"]:checked')?.value;

        // there might be a cleaner way to do this with just the comment storage
        // check if class exists in local storage
        if (localStorage.classList == undefined) { localStorage.setItem("classList", JSON.stringify([])); }
        // maybe move this somewhere where it doesnt need to be run repeatedly
        let classList = JSON.parse(localStorage.getItem("classList"));
        // add class if doesnt exist
        if (!classList?.includes(dialogInput.className)) {
            classList?.push(dialogInput.className);
            localStorage.setItem("classList", JSON.stringify(classList));
        }
        return dialogInput;
    }

    // after each save button click, the form needs to be cleared so for next new feedback it will be ready
    let resetForm = () => {
        document.getElementById("title").value = "";
        document.getElementById("className").value = "";
        document.getElementById("date").value = "";
        document.querySelector("textarea").value = "";
        // reset all radio buttons
        let radio = document.getElementsByName("category");
        for (let i = 0; i < radio.length; i++) {
            radio[i].checked = false;
        }
    }
    /**
    * Reads 'comments' from localStorage and returns an array of
    * all of the comments found (parsed, not in string form). If
    * nothing is found in localStorage for 'comments', an empty array
    * is returned.
    * @returns {Array<Object>} An array of comments found in localStorage
    */
    function getCommentsFromStorage() {
        if (localStorage.getItem('comment') == null) {
            const emptyArray = [];
            return emptyArray;
        }
        const str = localStorage.getItem("comment");
        return JSON.parse(str);
    }

    /**
    * Saves an array of comments to 'comments' in localStorage.
    * 
    * @param {Array<Object>} comment An array of comments found in localStorage
    */
    function saveCommentToStorage(comment) {
        localStorage.setItem("comment", JSON.stringify(comment));
    }

    /**
    * Populates drowdown lists with Classes in LocalStorage
    *
    */
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
    /**
    * Populates the page with comments
    *
    */
    function generateComments() {
        let currentComments = getCommentsFromStorage();
        for (let i = 0; i < currentComments.length; i++) {
            let responses = currentComments[i].feedBack;
            let commBoxDiv = document.createElement('div');
            let newComment = document.createTextNode(responses);
            commBoxDiv.appendChild(newComment);
            const dummyDiv = document.getElementById("div1"); //should be adding new comment boxes above this div(serves as a refrecne point everything will add ontop of it)
            document.body.insertBefore(commBoxDiv, dummyDiv);
        }
    }


    /**
    * Reads comments from localstorage and renders to the selected element.
    * Also supports rendering a specific class's comments
    * 
    * @param {HTMLElement} renderElement The element to render to
    * @param {HTMLElement} dropdown The element whose selection value we take
    */
    function renderToElement(renderElement, dropdown) {
        renderElement.innerHTML = '';
        let currentComments = getCommentsFromStorage();
        if (currentComments == null) return;
        for (let i = 0; i < currentComments.length; i++) {
            if (dropdown.value == "" || dropdown.value == currentComments[i].className) {
                const temp = document.createElement('the-element');
                temp.data = currentComments[i];
                renderElement.appendChild(temp);
                temp.shadowRoot?.querySelector(".update")?.addEventListener('click', () => {
                    // TODO: bring up feedback dialog with loaded values
                    //       ready to be edited
                    console.log(currentComments[i].title);

                });
                temp.shadowRoot?.querySelector(".delete")?.addEventListener('click', () => {
                    currentComments = currentComments.slice(0, i).concat(currentComments.slice(i + 1));
                    saveCommentToStorage(currentComments);
                    renderToElement(renderElement, dropdown);
                    // ---check if deleted comment was last one from class---
                    // screw it we regenerate classList runtime be damned LMAO
                    let classList = [];
                    for (let i = 0; i < currentComments.length; i++) {
                        if (!classList?.includes(currentComments[i].className)) {
                            classList?.push(currentComments[i].className);
                        }
                    }
                    localStorage.setItem("classList", JSON.stringify(classList));

                    // reload the dropdown
                    // this is kinda inefficient
                    // ideally would go through the dropdown and delete the option or smthng
                    dropdown.innerHTML = '<option value = "">See All</option>';
                    for (let i = 0; i < classList.length; i++) {
                        const temp = document.createElement('option');
                        temp.value = classList[i];
                        temp.innerHTML = classList[i];
                        dropdown?.append(temp);
                    }
                });
            }
        }
    }

}