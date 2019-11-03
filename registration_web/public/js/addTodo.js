const addTodoButton = document.querySelector('#addTodo')
const nameInput = document.querySelector('#name')
const descriptionInput = document.querySelector('#description')

var urlParams = new URLSearchParams(window.location.search)
const mail = urlParams.get('mail');


addTodoButton.addEventListener('click', (e) => {
    const name = nameInput.value
    const description = descriptionInput.value

    fetch('http://localhost:3000/addTodo?mail=' + mail + '&name=' + name + '&description=' + description,{
        redirect: "follow",
        method: 'Post'
    }).then((response) => {
        response.json().then((data) => {
            if (data.error) {
            } else {
                canContinue = data.canContinue;
            }
        }).then(() => {
            if (canContinue) {
                window.location.href = '/myTodos?mail=' + mail
            }
        })
    })
})