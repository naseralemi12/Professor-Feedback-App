//@ts-check
window.addEventListener('DOMContentLoaded', init);

// the init function will wait for all the dom content to load before running any javascript, so we include all our javascript inside the function
function init() {
    let newFeedbackButton = document.getElementById('newFeedback'); // this button triggers the dialog box
    let saveButton = document.getElementById('saveButton'); // this button is used inside the dialog box
    let dialog = document.querySelector('dialog'); // this element is the dialog box itself
    let cancelButton = document.getElementById('cancelButton'); // this button is used inside the dialog box
    
    // remove these
    // let firstRow = null; // this is the first row of the table
    // let currentRow = null; // this is the row that is currently selected and is under work 
    
    
    let viewFeedbackButton = document.getElementById('viewFeedback'); // element for view feedback button show trigger the feedbacks dialog box to open
    let viewFeedbackDialog = document.getElementById('feedbackListTable'); //this dialog box will be triggered by view feedbacks button and
    //let closeFeedbackDialog = document.getElementById('closeButton'); // close the feedbacks dialog box
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

        // if (firstRow == null) {
        //     let newRow = table.insertRow(-1);
        //     let cell1 = newRow.insertCell(0);
        //     cell1.innerHTML = dialogInput.className;
        //     let cell2 = newRow.insertCell(1);
        //     cell2.innerHTML = dialogInput.date;
        //     let cell3 = newRow.insertCell(2);
        //     cell3.innerHTML = dialogInput.category;
        //     let cell4 = newRow.insertCell(3);

        //     let viewPage = document.createElement("button");
        //     viewPage.innerHTML = "View Feedback";
        //     //when the deleteButton is clicked, the row should be deleted
        //     viewPage.onclick = function(){
        //         if (typeof viewTable.showModal === "function") { // check if the dialog is already open or not
        //             viewTableDialog.showModal(); // open the dialog box
        //         }
        //         let rowIdx = viewPage.parentNode.parentNode.rowIndex;
        //         viewcell1.innerHTML = dialogInput.feedBack;
        //         viewcell2.innerHTML = table.rows[rowIdx-1].cells[3].innerHTML;;
        //     };
        //     cell4.appendChild(viewPage);

        //     let cell5 = newRow.insertCell(4);
        //     let deleteButton = document.createElement("button");
        //     deleteButton.innerHTML = "Delete Feedback"
        //     //when the deleteButton is clicked, the row should be deleted
        //     deleteButton.onclick = function(){
        //         deleteButton.parentNode.parentNode.remove();
        //     };
        //     cell5.appendChild(deleteButton);

        // } else {
        //     currentRow.cells[0].innerHTML = dialogInput.className;;
        //     currentRow.cells[1].innerHTML = dialogInput.date;
        //     currentRow.cells[2].innerHTML = dialogInput.category;
        //     currentRow.cells[3].innerHTML = dialogInput.feedBack;
        // }
        resetForm();
        console.log("saved");
        confirmationMessage.textContent = "Feedback saved!";
    });

    /// maybe formalize? createFeedbackObject as actual function with header

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
        if(localStorage.classList==undefined){localStorage.setItem("classList",JSON.stringify([]));} 
        // maybe move this somewhere where it doesnt need to be run repeatedly
        let classList = JSON.parse(localStorage.getItem("classList"));
        // add class if doesnt exist
        if (!classList?.includes(dialogInput.className)){
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
        for (let i=0; i < radio.length; i++){
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

    function saveCommentToStorage(comment) {    
        localStorage.setItem("comment",JSON.stringify(comment));
    }

    // this will trigger the dialog box that has all the feedbacks so the user can see them
    viewFeedbackButton.addEventListener('click', () => {
        const curcomments = getCommentsFromStorage();
        const dropdownList = document.getElementById("classSelect");
        const classList = JSON.parse(localStorage.classList);

        // generate the dropdown selection
        dropdownList.hidden = false;
        dropdownList.innerHTML='<option value = "">See All</option>';
        for (let i =0; i<classList.length;i++){
            const temp = document.createElement('option');
            temp.value = classList[i];
            temp.innerHTML = classList[i];
            dropdownList?.append(temp);
        }

        // probably redo the rendering stuff into a function

        // add listener for when selected class changes
        dropdownList?.addEventListener('change', () => {
            const mainElement = document.querySelector("main");
            mainElement.innerHTML='';
            if(curcomments==null) return;
            for(let i =0; i<curcomments.length;i++){
                if (dropdownList.value == ""||dropdownList.value == curcomments[i].className){
                    const temp = document.createElement('the-element');
                    temp.data=curcomments[i];
                    mainElement.appendChild(temp);
                    temp.shadowRoot?.querySelector(".update")?.addEventListener('click', ()=>{
                        // TODO: bring up feedback dialog with loaded values
                        //       ready to be edited
                        console.log(curcomments[i].title);
                    });
                    temp.shadowRoot?.querySelector(".delete")?.addEventListener('click', ()=>{
                        // TODO: get comments from storage delete the item at the index
                        //       then save it back into storage and reload the view
                        console.log(curcomments[i].className);
                    });
                }
            }
        });

        const mainElement = document.querySelector("main");
        mainElement.innerHTML='';
        if(curcomments==null) return;
        for(let i =0; i<curcomments.length;i++){
            const temp = document.createElement('the-element');
            temp.data=curcomments[i];
            mainElement.appendChild(temp);
            temp.shadowRoot?.querySelector(".update")?.addEventListener('click', ()=>{
                // TODO: bring up feedback dialog with loaded values
                //       ready to be edited
                console.log(curcomments[i].title);
            });
            temp.shadowRoot?.querySelector(".delete")?.addEventListener('click', ()=>{
                // TODO: get comments from storage delete the item at the index
                //       then save it back into storage and reload the view
                console.log(curcomments[i].classname);
            });
        }
    });




    // // this will close the dialog box that has the feedbacks list
    // closeFeedbackDialog.addEventListener('click', () => {
    //     viewFeedbackDialog.close();
    // });

    // // this will close the dialog box that has the view list
    // viewTableCloseButton.addEventListener('click', () => {
    //     viewTableDialog.close();
    // });

    
   
}