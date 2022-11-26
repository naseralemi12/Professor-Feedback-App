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
    // console.log(filteredArray);
    return filteredArray;
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
    if (localStorage.currentComments == undefined) {
        // currentComments will change every time a new class is selected from
        // drop down menu  
        localStorage.setItem("currentComments", JSON.stringify(currentComments)); 
        createElems(currentComments);
    }
    else {
        clearElems();
        createElems(localStorage.getItem('curretComments'));
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
function createElems(jsonObjArray) {
    // linear creation of elements (slow?)
    for (let i = 0; i < jsonObjArray.length; i++) {
        // may change to jsonObjArray[i].title
        let parentDiv = document.getElementsByClassName('commentLinks')[0];
        // create elements & insert all required data 
        let aElem = document.createElement('a');
        aElem.setAttribute('class','Alinks')
        aElem.innerText = jsonObjArray[i].classname;
        parentDiv.appendChild(aElem);
        //const dummy = document.getElementById("1"); //should be adding new comment boxes above this (serves as a refrecne point everything will add ontop of it)
        //document.body.insertBefore(commBox, dummy);
        }
}

/**
    * function clearElems()
    * 
    * Deletes all elements under specified identifier
    * 
    * @author Christian
    * @param element top level identifier (MUST BE ID)
    * 
    */
 function clearElems(element) {
    const parent = document.getElementById(element);
    parent.delete
}

/**
 * END Exports for Professor Feedback.js
 */