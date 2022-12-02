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




    loginButton.addEventListener('click', () => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                adder(data);
            })
            .catch((error) => {
                console.error(error);
            })

        async function adder(data) {
            for (const i of data) {
                if (JSON.stringify(i.email) === JSON.stringify(emailElement.value) && JSON.stringify(i.password) === JSON.stringify(passwordElement.value)) {
                    match = true;
                }
            }

            if (match && radioStudentElement.checked) {
                match = false;
                location.assign("student_feedback_view.html");
                // set permission to FALSE for student privileges 
                localStorage.setItem('permission','false')
            } else if (match && radioProfessorElement.checked) {
                match = false;
                window.location = "professor_feedback_view.html"; 
                // set permission to TRUE for professor privileges 
                localStorage.setItem('permission','true');
            } else if (emailElement.value == "" || passwordElement.value == "" || !(radioStudentElement.checked || radioProfessorElement.checked)) {
                warningMessage.innerHTML = "All fields are required. Please try again.";
            } else if (!((JSON.stringify(emailElement.value).includes('@')) || (JSON.stringify(emailElement.value).includes('.')))) {
                warningMessage.innerHTML = "Invalid Email. Please Enter a valid email.";
                document.getElementById('form').reset();
            } else {
                warningMessage.innerHTML = "Wrong Email or Password. Please try again.";
                // document.getElementById('form').reset();
            }
        }

    });


}