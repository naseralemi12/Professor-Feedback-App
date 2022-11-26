window.addEventListener('DOMContentLoaded', init);

function init() {
    loadComments();
}

/**
    * Populates the page with comments
    *
    */
 function loadComments() {
    let submissionsArr = getCommentsFromStorage();
    for (let i = 0; i < currentComments.length; i++) {
        let responses = currentComments[i].feedBack;
        let commBoxDiv = document.createElement('div');
        let newComment = document.createTextNode(responses);
        commBoxDiv.appendChild(newComment);
        const dummyDiv = document.getElementById("div1"); //should be adding new comment boxes above this div(serves as a refrecne point everything will add ontop of it)
        document.body.insertBefore(commBoxDiv, dummyDiv);
    }
}