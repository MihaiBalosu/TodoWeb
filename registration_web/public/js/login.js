const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')
const loginButton = document.querySelector('#login')
const result = document.querySelector('#result');

loginButton.addEventListener('click', (e) => {
    const password = passwordInput.value
    const email = emailInput.value
    result.textContent = 'Loading..'

    fetch('http://localhost:3000/login?email=' + email + '&password=' + password, {
        redirect: "follow",
        method: 'Post'
    }).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                result.textContent = data.error
            } else {
                result.textContent = data.result;
                canContinue = data.canContinue;
            }
        }).then(() => {
            if (canContinue) {
                window.location.href = '/welcome?mail=' + email
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

