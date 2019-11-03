const myTodods = document.querySelector('#myTodos')
const myAccount = document.querySelector('#myAccount')

var urlParams = new URLSearchParams(window.location.search)
const mail = urlParams.get('mail');

myTodods.addEventListener('click', (e) => {
    window.location.href = '/myTodos?mail=' + mail
})

myAccount.addEventListener('click', (e) => {
    window.location.href = '/myAccount?mail=' + mail
})

