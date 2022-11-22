//@ts-check
window.addEventListener('DOMContentLoaded', init);
// the init function will wait for all the dom content to load before running any javascript, so we include all our javascript inside the function
var currentClass = "CSE110";
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

    /*
    //This Part for initialization
        run = false;
        let TestclassList = ["CSE110","CSE101"];
        localStorage.setItem("ClassList",JSON.stringify(TestclassList));
        //Initialize all exist classes' category !!THIS SHOULD BE CALLED ONLY ONCE
        let classList = JSON.parse(localStorage.getItem("ClassList"));
        for(let i=0;i<classList?.length;i++){
            NewclassCategory(classList[i]);
        }
    */

    /*
     *This part is for professor_modify_category
     */
    const categoryTable = document.getElementById("categorylist");
    var list = JSON.parse(localStorage.getItem(currentClass));
    if(categoryTable){
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
                deleteCategory(currentClass,list[i]);
            };
            cell.appendChild(deleteButton);
        }
        document.getElementById("CategoryClassName").innerHTML=currentClass;
        let addCategoryButton = document.getElementById("addCategoryButton");
        addCategoryButton?.addEventListener('click', () => {
        addCategory(currentClass,document.getElementById("addNewCategory").value);
    });
    } 
    

    /* 
     *This Part is for student_add_comment
     */
    const checkboxlist = document.getElementById("ctgrlist");
    const currentCategoryList = JSON.parse(localStorage.getItem(currentClass));
    for(let i=0;i<currentCategoryList.length;i++){
        var ctgr = document.createElement("INPUT");
        var ctgrname = document.createTextNode(currentCategoryList[i]);
        ctgr.setAttribute("type", "checkbox");
        ctgr.setAttribute("value",currentCategoryList[i]);
        ctgr.setAttribute("name","Categories_of_Class");
        ctgr.innerHTML=currentCategoryList[i];
        checkboxlist?.appendChild(ctgrname);
        checkboxlist?.appendChild(ctgr);
    }
    document.getElementById("Classname").innerHTML=currentClass;
    const submitButton = document.getElementById("submitB");
    submitButton?.addEventListener('click', () => {
        const commentObject=new Object();
        commentObject["title"] = document.getElementById("FeedbackTitle").value;
        commentObject["classname"] = currentClass;
        var categoryArray=[];
        var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
        for (var i = 0; i < checkboxes.length; i++) {
            categoryArray.push(checkboxes[i].value);
        }
        commentObject["category"]=JSON.stringify(categoryArray);
        commentObject["feedBack"] = document.querySelector("textarea").value;
        commentObject["Anon"] = document.getElementById("yes").checked;
        const temp = document.createElement('the-element');
        temp.data = commentObject;
        const curcomments = getCommentsFromStorage();
        curcomments.push(commentObject);
        saveCommentToStorage(curcomments);
    });
}


function NewclassCategory(className){
    var category = ["Exam","Lecture","Discussion"];
    localStorage.setItem(className,JSON.stringify(category));
}

function deleteCategory(classname,category){
    var currcategory = JSON.parse(localStorage.getItem(classname));
    currcategory = currcategory.filter(function(item) {
        return item !== category
    })
    localStorage.setItem(classname,JSON.stringify(currcategory));
}

function addCategory(classname, category){
    var currcategory = JSON.parse(localStorage.getItem(classname));
    currcategory.push(category);
    localStorage.setItem(classname,JSON.stringify(currcategory));
}

function saveCommentToStorage(comment) {
        
    localStorage.setItem("comment",JSON.stringify(comment));
}

/**
    * Reads 'comments' from localStorage and returns an array of
    * all of the comments found (parsed, not in string form). If
    * nothing is found in localStorage for 'comments', an empty array
    * is returned.
    * @returns {Array<Object>} An array of recipes found in localStorage
    */
 function getCommentsFromStorage() {
    if (localStorage.getItem('comment') == null) {
        const emptyArray = [];
        return emptyArray;
    }
    const str = localStorage.getItem("comment");
    return JSON.parse(str);
}