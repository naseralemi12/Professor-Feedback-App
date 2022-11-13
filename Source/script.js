//@ts-check
window.addEventListener('DOMContentLoaded', init);

// the init function will wait for all the dom content to load before running any javascript, so we include all our javascript inside the function
function init() {
    let newFeedbackButton = document.getElementById('newFeedback'); // this button triggers the dialog box
    let saveButton = document.getElementById('saveButton'); // this button is used inside the dialog box
    let dialog = document.querySelector('dialog'); // this element is the dialog box itself
    let cancelButton = document.getElementById('cancelButton'); // this button is used inside the dialog box
    let firstRow = null; // this is the first row of the table
    let currentRow = null; // this is the row that is currently selected and is under work 
    let viewFeedbackButton = document.getElementById('viewFeedback'); // element for view feedback button show trigger the feedbacks dialog box to open
    let viewFeedbackDialog = document.getElementById('feedbackListTable'); //this dialog box will be triggered by view feedbacks button and
    let closeFeedbackDialog = document.getElementById('closeButton'); // close the feedbacks dialog box
    let confirmationMessage = document.getElementById('confirmationMessage'); // just a confirmation meessage to assure the user that the input has been saved. the feedback can be seen by clicking view feedback button
    let viewTableDialog = document.getElementById('viewTable'); // just a confirmation meessage to assure the user that the input has been saved. the feedback can be seen by clicking view feedback button
    let viewTableCloseButton = document.getElementById('viewCloseB');

    
    // create view table
    var table = document.getElementById("feedbackList").getElementsByTagName('tbody')[0];
    var viewFeedbackTable = document.getElementById("viewList").getElementsByTagName('tbody')[0];
    let newViewRow = viewFeedbackTable.insertRow(-1);
    let viewcell1 = newViewRow.insertCell(0);
    let newViewRow2 = viewFeedbackTable.insertRow(-1);
    let viewcell2 = newViewRow2.insertCell(0);

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

   
    //when save button is clicked, the class name, date and feedback needs to be saved and ready to be shown
    saveButton.addEventListener('click', () => {
        let dialogInput = {};
        dialogInput.className = document.getElementById("title").value;
        dialogInput.date = document.getElementById("date").value;
        dialogInput.category = document.getElementById("category").name;
        dialogInput.feedBack = document.querySelector("textarea").value;

        if (firstRow == null) {
            let newRow = table.insertRow(-1);
            let cell1 = newRow.insertCell(0);
            cell1.innerHTML = dialogInput.className;
            let cell2 = newRow.insertCell(1);
            cell2.innerHTML = dialogInput.date;
            let cell3 = newRow.insertCell(2);
            cell3.innerHTML = dialogInput.category;
            let cell4 = newRow.insertCell(3);

            let viewPage = document.createElement("button");
            viewPage.innerHTML = "View Feedback";
            //when the deleteButton is clicked, the row should be deleted
            viewPage.onclick = function(){
                if (typeof viewTable.showModal === "function") { // check if the dialog is already open or not
                    viewTableDialog.showModal(); // open the dialog box
                }
                let rowIdx = viewPage.parentNode.parentNode.rowIndex;
                viewcell1.innerHTML = dialogInput.feedBack;
                viewcell2.innerHTML = table.rows[rowIdx-1].cells[3].innerHTML;;
            };
            cell4.appendChild(viewPage);

            let cell5 = newRow.insertCell(4);
            let deleteButton = document.createElement("button");
            deleteButton.innerHTML = "Delete Feedback"
            //when the deleteButton is clicked, the row should be deleted
            deleteButton.onclick = function(){
                deleteButton.parentNode.parentNode.remove();
            };
            cell5.appendChild(deleteButton);

        } else {
            currentRow.cells[0].innerHTML = dialogInput.className;;
            currentRow.cells[1].innerHTML = dialogInput.date;
            currentRow.cells[2].innerHTML = dialogInput.category;
            currentRow.cells[3].innerHTML = dialogInput.feedBack;
        }
        resetForm();
        console.log("saved");
        confirmationMessage.textContent = "Feedback saved!";
    });

    // after each save button click, the form needs to be cleared so for next new feedback it will be ready
    let resetForm = () => {
        document.getElementById("title").value = "";
        document.getElementById("date").value = "";
        document.getElementById("category").value = "";
        document.querySelector("textarea").value = "";
        currentRow = null;
    }

    // this will trigger the dialog box that has all the feedbacks so the user can see them
    viewFeedbackButton.addEventListener('click', () => {
        if (typeof viewFeedbackDialog.showModal === "function") { // check if the dialog is already open or not
            viewFeedbackDialog.showModal(); // open the dialog box
        }
    });

    // this will close the dialog box that has the feedbacks list
    closeFeedbackDialog.addEventListener('click', () => {
        viewFeedbackDialog.close();
    });

    // this will close the dialog box that has the view list
    viewTableCloseButton.addEventListener('click', () => {
        viewTableDialog.close();
    });

    
   
}