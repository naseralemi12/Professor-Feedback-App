window.addEventListener('DOMContentLoaded', init);

function init() {
    loadComments();
}

/**
* Populates the page with comments
*
* @authors Kenny 
*/
 function loadComments() {
    let submissionsArr = JSON.parse(localStorage.getItem("submissions"))
    for (let i = 0; i < submissionsArr.length; i++) {
        const div = document.createElement('div');
        let contentText = submissionsArr[i].feedBack;
        div.className = 'commentBox';
        div.innerHTML = `
            <p>${contentText}</p>
        `;
        document.querySelector('.commentLinks').appendChild(div);
    }
}