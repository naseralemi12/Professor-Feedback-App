//@ts-check
window.addEventListener('DOMContentLoaded', init);

// the init function will wait for all the dom content to load before running any javascript, so we include all our javascript inside the function
function init() {
    const dropdownList = document.getElementById("classSelect");
    const classList = JSON.parse(localStorage.classList);
    // generate the dropdown selection
    generateDropDown();
    let newFeedbackButton = document.getElementById('newFeedback'); // this button triggers the dialog box
    let saveButton = document.getElementById('saveButton'); // this button is used inside the dialog box
    let dialog = document.querySelector('dialog'); // this element is the dialog box itself
    let cancelButton = document.getElementById('cancelButton'); // this button is used inside the dialog box
    let viewFeedbackButton = document.getElementById('viewFeedback'); // element for view feedback button show trigger the feedbacks dialog box to open
    let confirmationMessage = document.getElementById('confirmationMessage'); // just a confirmation meessage to assure the user that the input has been saved. the feedback can be seen by clicking view feedback button

    //when the newFeedbackButton is clicked, th dialog box should open
    newFeedbackButton.addEventListener('click', () => {
        if (typeof dialog.showModal === "function") { // check if the dialog is already open or not
            dialog.showModal(); // open the dialog box
        }
    });

    // when the cancelButton inside the dialog box is clicked, the dialog box should close
    cancelButton.addEventListener('click', () => {
        dialog.close();
    });

    // when save button is clicked, the class name, date and feedback needs to be saved and ready to be shown
    saveButton.addEventListener('click', () => {
        let dialogObj = createFeedbackObject();
        const curcomments = getCommentsFromStorage();
        curcomments.push(dialogObj);
        saveCommentToStorage(curcomments);
        resetForm();
        console.log("saved");
        confirmationMessage.textContent = "Feedback saved!";
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
    function generateDropDown(){
        dropdownList.hidden = false;
        dropdownList.innerHTML = '<option value = "">See All</option>';
        for (let i = 0; i < classList.length; i++) {
            const temp = document.createElement('option');
            temp.value = classList[i];
            temp.innerHTML = classList[i];
            dropdownList?.append(temp);
        }
    }
    
    // this will trigger the dialog box that has all the feedbacks so the user can see them
    viewFeedbackButton.addEventListener('click', () => {
        const dropdownList = document.getElementById("classSelect");
        const classList = JSON.parse(localStorage.classList);

        // generate the dropdown selection
        dropdownList.hidden = false;
        dropdownList.innerHTML = '<option value = "">See All</option>';
        for (let i = 0; i < classList.length; i++) {
            const temp = document.createElement('option');
            temp.value = classList[i];
            temp.innerHTML = classList[i];
            dropdownList?.append(temp);
        }

        // add listener for when selected class changes
        dropdownList?.addEventListener('change', () => {
            let mainElement = document.querySelector("main");
            renderToElement(mainElement, dropdownList);
        });

        // initial render
        let mainElement = document.querySelector("main");
        renderToElement(mainElement, dropdownList);
    });


    /**
    * Reads comments from localstorage and renders to the selected element.
    * Also supports rendering a specific class's comments
    * 
    * @param {HTMLElement} renderElement The element to render to
    * @param {HTMLElement} dropdown The element whose selection value we take
    */
    function renderToElement(renderElement, dropdown){
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
                    currentComments = currentComments.slice(0,i).concat(currentComments.slice(i+1));
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