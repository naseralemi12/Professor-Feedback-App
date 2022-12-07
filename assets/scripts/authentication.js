//@ts-check
window.addEventListener('DOMContentLoaded', init);

function init() {
    const emailElement = document.getElementById('emailInput');
    const passwordElement = document.getElementById('passwordInput');
    const radioStudentElement = document.getElementById('student');
    const radioProfessorElement = document.getElementById('professor');
    const warningMessage = document.getElementById('warningMessage');
    const loginButton = document.getElementById('logInButton');
    const url = '../scripts/loginData.json';
    let match = false;



    /**
    * Event Listener for login button
    * 
    * Operation: when login button is clicked, the user data from the form will be used in the email and password variables declared above
      all the emails and passwords saved in the json file will be fetched and by using a for loop, every single one email and password will be
      compared to the email and password entered in the the form. and the professor or student page will only be entered if the correct, email
      password and radio buttons are entered.
    * @author Adam Alemi
    * @param click
    */
    loginButton.addEventListener('click', () => {
        fetch(url) // fetch the emails and passwords from json file
            .then(res => res.json())
            .then(data => {
                adder(data);
            })
            .catch((error) => {
                console.error(error);
            })

        async function adder(data) { // compare each password and email fetched from json file to the entered data by the user
            for (const i of data) {
                if (JSON.stringify(i.email) === JSON.stringify(emailElement.value) && JSON.stringify(i.password) === JSON.stringify(passwordElement.value)) {
                    match = true;
                }
            }

            if (match && radioStudentElement.checked) { // if the data matched and its a student, navigate to the the student interface
                match = false;
                location.assign("student_feedback_view.html");
                // set permission to FALSE for student privileges 
                localStorage.setItem('permission', 'false')
            } else if (match && radioProfessorElement.checked) { // if the data matched and its a professor, navigate to the professor interface
                match = false;
                window.location = "professor_feedback_view.html";
                // set permission to TRUE for professor privileges 
                localStorage.setItem('permission', 'true');
            } else if (emailElement.value == "" || passwordElement.value == "" || !(radioStudentElement.checked || radioProfessorElement.checked)) { // if any of the form fields are left empty, give a warning message
                warningMessage.innerHTML = "All fields are required. Please try again.";
            } else if (!((JSON.stringify(emailElement.value).includes('@')) || (JSON.stringify(emailElement.value).includes('.')))) { // if email is is invalid, give a warning message
                warningMessage.innerHTML = "Invalid Email. Please Enter a valid email.";
                document.getElementById('form').reset();
            } else { // if no match then ask to try again
                warningMessage.innerHTML = "Wrong Email or Password. Please try again.";
                // document.getElementById('form').reset();
            }
        }

    });


}