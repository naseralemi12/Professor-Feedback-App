/**
 * Helpers.js
 * 
 * Function definitions here to declutter 
 * driver js files (professorFeedback.js etc..)
 * @author Christian Velasquez
 */

/**
 * Exports for Professor Feedback.js
 */

    /**
    * function getSpecificComments()
    * Reads Array of Json Objects 'comments' from localStorage
    * Only the specified class' comments are appended to array that is returned
    * If nothing is found in localStorage for 'comments', an empty array
    * is returned instead.
    * 
    * @author Christian
    * @param classTitle identifier used to parse Json object's classname keys
    * @returns {Array<Object>} An array of class specific comments found in localStorage
    */
export function getSpecificComments(classTitle) {
    // Case of empty local
    if (localStorage.getItem('comment') == null) {
        const emptyArray = [];
        return emptyArray;
    }
    else {
        const str = localStorage.getItem("comment");
        const jsoned = JSON.parse(str);
        // iterate through array of json object linearly (very slow)
        // only add objects that pertain to the selected class in dropdown
        const filteredArray = [];
        for (const arrIdx in jsoned) {
            if (jsoned[arrIdx].classname == classTitle) {
            filteredArray.push(jsoned[arrIdx]);
            }
        }
        return filteredArray;
    }
}

    /**
    * function generateSpecificComments()
    * Uses Specific comments retrieved from local storage
    * to create dynamically create new html elements
    * 
    * @author Christian
    * @param classTitle identifier used to retrieve specific comments
    */
 export function generateSpecificComments(classTitle) {
    let currentComments = getSpecificComments(classTitle);
    // fill local with specific comments 
    if (localStorage.getItem('currentComments') == undefined) {
        // currentComments will change every time a new class is selected from
        // drop down menu  
        localStorage.setItem("currentComments", JSON.stringify(currentComments)); 
        createElems(currentComments);
        return;
    }
    else {
        document.getElementsByClassName('commentLinks');
        createElems(localStorage.getItem("currentComments"));
        return;
    }
}

    /**
    * function createElems()
    * Uses local storage currentComments to build html elements
    * dynamically, expects jsonObjArray to not be null
    * 
    * @author Christian
    * @param jsonObjArray This key's (jsonObjArray's) local storage held value 
    */
export function createElems(jsonObjArray) {
    // linear creation of elements (slow?)
    for (let i = 0; i < jsonObjArray.length; i++) {
        // may change to jsonObjArray[i].title
        let parentDiv = document.getElementsByClassName('commentLinks')[0];
        // create elements & insert all required data 
        let aElem = document.createElement('a');
        aElem.setAttribute('class','Alinks')
        console.log(jsonObjArray);
        aElem.innerText = jsonObjArray[i].classname;
        parentDiv.appendChild(aElem);
        //const dummy = document.getElementById("1"); //should be adding new comment boxes above this (serves as a refrecne point everything will add ontop of it)
        //document.body.insertBefore(commBox, dummy);
        }
        return;
}

    /**
    * @Todo add doc 
    *
    * @author Christian
    */
export function generateDropDown(classList) {
    let dropDownMenu = document.getElementById("classSelect");
    dropDownMenu.hidden = false;
    // necessary ?
    dropDownMenu.innerHTML = '<option value = "">See All</option>';
    for (let i = 0; i < classList.length; i++) {
        const temp = document.createElement('option');
        temp.value = classList[i];
        temp.innerHTML = classList[i];
        dropDownMenu?.append(temp);
    }
}

 /**
    * @Todo add doc 
    *
    * @author Christian
    */
export function updateCurrClass() {
    let currClass = {
        class : document.getElementById("classSelect").value,
    }
    localStorage.setItem('currClass', JSON.stringify(currClass));
}
 /**
    * @Todo add doc 
    *
    * @author Christian
    */
  export function filterSubmissions(submissions) {
    const filteredArray = [];
    for (const arrIdx in submissions) {
        if (submissions[arrIdx].className ==  JSON.parse(localStorage.getItem('currClass')).class) {
        filteredArray.push(submissions[arrIdx]);
        }
    }
    return filteredArray;
}
    /**
    * function NewclassCategory(classname)
    * 
    * Operation: This function is used to assign default categories
    * @author Chris
    * @param className
    */
function NewclassCategory(className){
    var category = ["Exam","Lecture","Discussion"];
    localStorage.setItem(className,JSON.stringify(category));
}

export function appendClass() {
    console.log("Sanity Check");
    const classList = JSON.parse(localStorage.getItem("classList")) || []; // goated
    let classValue = document.getElementById('newClass')?.value;
    classList?.push(classValue);
    localStorage.setItem("classList", JSON.stringify(classList));
    NewclassCategory(classValue); // idk what this does // sets up checkboxes on student add comment
    console.log('Succesfuly added new class');
    // may break errthing :-)
    location.reload();
}
/**
 * END Exports for Professor Feedback.js
 */

/**
 * Exports for add_feedback.js
 */

export function appendComment() {  
    const submits = localStorage.getItem('submissions');
    let course = document.getElementsById('Classname').value;
    let title = document.getElementById('FeedbackTitle').value;
    let content = document.getElementById('stucommenttxt').value;
    let newSubmit = {};
    console.log("hello");
    newSubmit.title = title;
    newSubmit.className = course;
    newSubmit.date = "today";
    newSubmit.feedBack = content;
    newSubmit.category = "TODO"
    submits.parse().push(newSubmit);
}