//@ts-check
window.addEventListener('DOMContentLoaded', init);
//var csv = require('jquery-csv');
//const csv = require("../../node_modules/jquery-csv/src/jquery.csv");

function init() {
    const emailElement = document.getElementById('emailInput');
    const passwordElement = document.getElementById('passwordInput');
    const radioStudentElement = document.getElementById('student');
    const radioProfessorElement = document.getElementById('professor');
    const warningMessage = document.getElementById('warningMessage');
    const loginButton = document.getElementById('logInButton');
    const url = '../scripts/loginData.json';
    let atposition = (emailElement.value).indexOf("@");
    let dotposition = (emailElement.value).indexOf(".");
    let attempt = 3;
    let match = false;
    // Variable to count number of attempts.
    // Below function Executes on click of login button.
    loginButton.addEventListener('click', () => {

        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                adder(data);
            })
            .catch((error) => {
                console.error(error);
            })

        function adder(data) {
            console.log(data);
            /* for (var obj in data) {
                 for (var key in obj) {
                     console.info(JSON.stringify(key.value));
                     console.info(obj[key]);
                 }
             }*/
            for (const i of data) {
                if (i.email == emailElement.value && i.password == passwordElement.value) {
                    match = true;
                }
            }
        }
        /* var ip = JSON.parse()
        
            
for(var obj in ip) {
  for(var key in obj) {
    console.info(key)
    console.info(obj[key])
  }
}*/
        /* let acc;

         for (const account of loginData) {
             if (username1 == account.email) {
                 system.console(account.email);
                 acc = account;
             }
         }*/
        /* fetch('loginData.json')
             .then((response) => response.json())
             .then((json) => console.log(json));*/
        console.log(match);
        //if (emailElement.value == "cse110@ucsd.edu" && passwordElement.value == "group31" && radioStudentElement.checked) {
        if (match == true && radioStudentElement.checked) {

            window.location = "student_feedback_view.html"; // Redirecting to other page.
            return false;
        } else if (match == true && radioProfessorElement.checked) { //emailElement.value == "powell@ucsd.edu" && passwordElement.value == "cse110" && radioProfessorElement.checked) {
            window.location = "professor_feedback_view.html"; // Redirecting to other page.
            return false;
        } else if (emailElement.value == "" || passwordElement.value == "" || !(radioStudentElement.checked || radioProfessorElement.checked)) {
            warningMessage.innerHTML = "All fields are required. Please try again.";
            return false;
        } else if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= emailElement.value.length) {
            warningMessage.innerHTML = "Invalid Email. Please Enter a valid email.";
            return false;
        } else {
            attempt--; // Decrementing by one.
            warningMessage.innerHTML = "You have " + attempt + " attempt(s) left!";
            // Disabling fields after 3 attempts.
            if (attempt == 0) {
                document.getElementById("emailElement").disabled = true;
                document.getElementById("passwordElement").disabled = true;
                document.getElementById("logInButton").disabled = true;
                return false;
            }
        }
    });
    /* 
    var atposition=x.indexOf("@");  
    var dotposition=x.lastIndexOf(".");  
    if (atposition<1 || dotposition<atposition+2 || dotposition+2>=x.length){  
      alert("Please enter a valid e-mail address \n atpostion:"+atposition+"\n dotposition:"+dotposition);  
      return false;  
      }  

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
         });*/


}