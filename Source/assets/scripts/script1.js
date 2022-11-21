//@ts-check
window.addEventListener('DOMContentLoaded', init);
function init(){
    var classname = document.getElementById("Classname");
    const passingvalue = window.location.search;
    classname.innerHTML="CSE110";
    const submitButton = document.getElementById("submitB");
    submitButton?.addEventListener('click', () => {
        const commentObject=new Object();
        commentObject["title"] = document.getElementById("FeedbackTitle");
        commentObject["classname"] = classname?.innerHTML;
        commentObject["category"] = document.querySelector('.categoryCheckbox:checked').value;
        commentObject["feedBack"] = document.querySelector("textarea").value;
        const temp = document.createElement('the-element');
        temp.data = commentObject;
        const curcomments = getCommentsFromStorage();
        curcomments.push(commentObject);
        saveCommentToStorage(curcomments);
    });
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


