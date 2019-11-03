const confirm = document.querySelector('#button');
const emailInput = document.querySelector('#email');
const usernameInput = document.querySelector('#username');
const result = document.querySelector('#result');
const passwordInput = document.querySelector('#password');
const continueButton = document.querySelector('#continue');
let canContinue = false

confirm.addEventListener('click', (e) => {
    const username = usernameInput.value;
    const email = emailInput.value;
    result.textContent = 'Loading...';

    fetch('http://localhost:3000/signUp?email=' + email + '&username=' + username + '&password=' + passwordInput.value, {
        redirect: "follow",
        method: 'POST'
    }).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                result.textContent = data.error
            } else {
                result.textContent = data.result;
                canContinue = data.canContinue
            }
        }).then(() => {
            if (canContinue) {
                window.location.href = '/welcome?email=' + email
            }
        })
    })
})

function showPassword() {
    if(passwordInput.type === "password"){
        passwordInput.type = "text"
    }else{
        passwordInput.type = "password"
    }
}