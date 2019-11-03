const addTodoButton = document.querySelector('#addTodo');
const table = document.querySelector('#table');
const deleteTodo = document.querySelector('#delete')
const setComplet = document.querySelector('#completed')
const setIncomplet = document.querySelector('#incompleted')

var urlParams = new URLSearchParams(window.location.search);
const mail = urlParams.get('mail');
var clickCoords;
var clickCoordsX;
var clickCoordsY;

var menu = document.querySelector("#context-menu");
var menuWidth;
var menuHeight;

var windowWidth;
var windowHeight;
var contextMenuActive = "context-menu--active";



fetch('http://localhost:3000/myTodos?mail=' + mail, {
    method: 'Post'
}).then((response) => {
    response.json().then((datas) => {
        if (datas.error) {
            console.log('Error')
        } else {
            for (const i in datas.result.todos) {
                const row = table.insertRow(1);
                const nameCell = row.insertCell(0);
                nameCell.className = "name"
                const descriptionCell = row.insertCell(1);
                descriptionCell.className = "description";
                const statusCell = row.insertCell(2);
                statusCell.className = "status";
                nameCell.innerHTML = datas.result.todox[i].name;
                descriptionCell.innerHTML = datas.result.todox[i].description;
                statusCell.innerHTML = datas.result.todox[i].status
            }
            const names = document.getElementsByClassName("name")
            const status = document.getElementsByClassName("status");
            const des = document.getElementsByClassName("description");
            for (let i = 0; i < status.length; i++) {
                status[i].addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    menu.classList.add(contextMenuActive);
                    positionMenu(e)
                    setCompleted(status[i], des[i])
                    setIncompleted(status[i], des[i])
                    deleteTask(names[i], des[i])
                })
            }
        }
    })
});


function positionMenu(e) {
    clickCoords = getPosition(e);
    clickCoordsX = clickCoords.x;
    clickCoordsY = clickCoords.y;

    menuWidth = menu.offsetWidth + 4;
    menuHeight = menu.offsetHeight + 4;

    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    if ((windowWidth - clickCoordsX) < menuWidth) {
        menu.style.left = windowWidth - menuWidth + "px";
    } else {
        menu.style.left = clickCoordsX + "px";
    }

    if ((windowHeight - clickCoordsY) < menuHeight) {
        menu.style.top = windowHeight - menuHeight + "px";
    } else {
        menu.style.top = clickCoordsY + "px";
    }
}

function getPosition(e) {
    var posx = 0;
    var posy = 0;

    if (!e) var e = window.event;

    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    } else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return {
        x: posx,
        y: posy
    }
}

addTodoButton.addEventListener('click', (e) => {
    console.log('click');
    window.location.href = '/myTodos/addTodo?mail=' + mail
});

function deleteTask(name, des) {
    deleteTodo.addEventListener('click', (e) => {
        fetch('http://localhost:3000/delete?mail=' + mail + '&name=' + name.innerHTML + '&description=' + des.innerHTML,
            { method : 'Post'})
            .then(window.location.href = '/myTodos?mail=' + mail)

    })
}

function setCompleted(status, des) {
    setComplet.addEventListener('click', (e) => {
        console.log(des)
        fetch('http://localhost:3000/complete?mail=' + mail + '&status=' + status.innerHTML + '&description=' + des.innerHTML,{
    method: 'Post'})
            .then(window.location.href = '/myTodos?mail=' + mail)
    })
}

function setIncompleted(status, des) {
    setIncomplet.addEventListener('click', (e) => {
        fetch('http://localhost:3000/incomplete?mail=' + mail + '&status=' + status.innerHTML + '&description=' + des.innerHTML,{
            method: 'Post'})
        .then(window.location.href = '/myTodos?mail=' + mail)
    })
}
