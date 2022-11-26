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

            for (const i of data) {
                console.log(JSON.stringify(i.email));
                console.log(i.password);
                console.log("and");
                console.log(JSON.stringify(emailElement.value));
                console.log(passwordElement.value);
                if (JSON.stringify(i.email) === JSON.stringify(emailElement.value) && JSON.stringify(i.password) === JSON.stringify(passwordElement.value)) {
                    match = true;
                }
            }
        }

        console.log(match);
        if (match && radioStudentElement.checked) {
            match = false;
            window.location = "student_feedback_view.html"; // Redirecting to other page.
            return false;
        } else if (match && radioProfessorElement.checked) {
            match = false;
            window.location = "professor_feedback_view.html"; // Redirecting to other page.
            return false;
        } else if (emailElement.value == "" || passwordElement.value == "" || !(radioStudentElement.checked || radioProfessorElement.checked)) {
            warningMessage.innerHTML = "All fields are required. Please try again.";
            return false;
        }
        /* else if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= emailElement.value.length) {
                    warningMessage.innerHTML = "Invalid Email. Please Enter a valid email.";
                    return false;
                }*/
        else {
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


}