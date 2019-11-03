const deleteAccount = document.querySelector('#deleteAccount')
var urlParams = new URLSearchParams(window.location.search);
const mail = urlParams.get('mail');

deleteAccount.addEventListener('click', (e) => {
    console.log('click')
    fetch('http://localhost:3000/deleteAccount?mail=' + mail, {
        method: 'Post'
    }).then(window.location.href = '/')
})