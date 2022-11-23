//@ts-check
window.addEventListener('DOMContentLoaded', init);
//var csv = require('jquery-csv');
const csv = require("../../node_modules/jquery-csv/src/jquery.csv");
function init() {
    let loginButton = document.querySelector('.logIN');
    let studentCheck = document.getElementById('student');
    let profCheck = document.getElementById('professor');
    let ifStudent = null;
    
    var arrayed = $.csv.toArray("STUDENT,PROFESSOR,StuPwd,ProfPwds1@ucsd.edu,p1@ucsd.edu,student123,prof123");
    //console.log(arrayed);
    // Check if student is logging in
    studentCheck.addEventListener('click', () => {
        ifStudent = true;
    });
    
    // Check if professor is logging in
    profCheck.addEventListener('click', () => {
        ifStudent = false;
    });

    loginButton.addEventListener('click', () => {
        // If student
            // Check if email and pw in stu csv
                // if in csv, then login
                // else, add to csv
        // else 
            // check if email and pw is in prof csv
                // if in csv, then login
                // else, add to csv
    });
}