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
    

    let addCategoryButton = document.getElementById("addCategoryButton");
    addCategoryButton?.addEventListener('click', () => {
        event.preventDefault();
        addCategory("CSE110",document.getElementById("addNewCategory").value);
    });
    let TestclassList = ["CSE110","CSE101"];
    localStorage.setItem("ClassList",JSON.stringify(TestclassList));
    //Initialize all exist classes' category !!THIS SHOULD BE CALLED ONLY ONCE
    let classList = JSON.parse(localStorage.getItem("ClassList"));
    for(let i=0;i<classList?.length;i++){
        NewclassCategory(classList[i]);
    }

    //This part is for professor_modify_category
    const categoryTable = document.getElementById("categorylist");
    var list = JSON.parse(localStorage.getItem("CSE110"));
    for(let i=0;i<list.length;i++){
        var newRow = categoryTable.insertRow();
        var newCell = newRow.insertCell();
        var newCategory =document.createTextNode(list[i]);
        newCell.appendChild(newCategory);
        //category list for given class
        let cell = newRow.insertCell(1);
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete Category";
        //when the deleteButton is clicked, the row should be deleted
        deleteButton.onclick = function(){
            deleteButton.parentNode.parentNode.remove();
            deleteCategory("CSE110",list[i]);
        };
        cell.appendChild(deleteButton);
    }

    /*TEST for professor_modify_category
    const categoryTable = document.getElementById("categorylist");
    for(let i=0;i<2;i++){
        var newRow = categoryTable.insertRow();
        var newCell = newRow.insertCell();
        var newCategory = document.createTextNode('new row');
        newCell.appendChild(newCategory);
        //category list for given class
        let cell = newRow.insertCell(1);
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete Category"
        cell.appendChild(deleteButton);
    }
    */

    
}


function NewclassCategory(className){
    var category = ["Exam","Lecture","Discussion"];
    localStorage.setItem(className,JSON.stringify(category));
}

function deleteCategory(classname,category){
    var currcategory = JSON.parse(localStorage.getItem(classname));
    console.log(currcategory);
    currcategory = currcategory.filter(function(item) {
        return item !== category
    })
    localStorage.setItem(classname,JSON.stringify(currcategory));
    console.log(currcategory);
}

function addCategory(classname, category){
    var currcategory = JSON.parse(localStorage.getItem(classname));
    console.log(currcategory);
    console.log("!!!!!!!!!!!!!!!!!!!!");
    currcategory.push(category);
    localStorage.setItem(classname,JSON.stringify(currcategory));
    console.log(currcategory);
}