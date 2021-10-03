const usernameForm = document.querySelector('#username-form')
const usernameInput = usernameForm.querySelector('input')
const username = document.querySelector('#username')

const clock = document.querySelector('#clock')

const toDoForm = document.querySelector('#todo-form')
const toDoInput = toDoForm.querySelector('input')
const toDoList = document.querySelector('#todo-list')

let toDos = [] // local storage에 array값이 있다면 reference를 바꿔주기 위해 let 선언.
const TODOS_KEY = 'todos'
const USERNAME_KEY = 'username'

usernameForm.onsubmit = () => {
    event.preventDefault()
    console.log(usernameInput.value)
    localStorage.setItem(USERNAME_KEY, usernameInput.value)
    usernameForm.classList.add('hidden')
    username.innerText = `Hi! ${usernameInput.value}`
}

function getTime() {
    const date = new Date()
    clock.innerText = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`
}
getTime()
setInterval(getTime, 1000)

function savedToDo() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos))
}

function deleteFilter(target) {}

function deleteToDo(event) {
    const li = event.target.parentNode
    // console.dir(li)
    console.log(typeof li.id)
    console.log(`toDos[0] id type : ${typeof toDos[0].id}`)
    toDos = toDos.filter(item => item.id != parseInt(li.id))
    savedToDo(toDos) //update
    li.remove()
}

function paintToDo(newTodoObj) {
    const li = document.createElement('li')
    li.id = newTodoObj.id
    const span = document.createElement('span')
    span.innerText = newTodoObj.text
    const button = document.createElement('button')
    button.innerText = '❌'
    button.onclick = deleteToDo

    li.appendChild(span)
    li.appendChild(button)
    toDoList.appendChild(li)
    // console.log(li)
}
function handleToDoSubmit(event) {
    console.log('nothing')
    event.preventDefault()
    const newTodo = toDoInput.value //not input.innerText
    toDoInput.value = ''
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    }
    // toDos.push(newTodo)
    toDos.push(newTodoObj)
    savedToDo()
    paintToDo(newTodoObj)
}

toDoForm.onsubmit = handleToDoSubmit

const savedUsername = localStorage.getItem(USERNAME_KEY)
if (savedUsername) {
    usernameForm.classList.add('hidden')
    username.innerText = `Hi! ${savedUsername}`
}

const savedToDos = localStorage.getItem(TODOS_KEY)
console.log(savedToDos)
if (savedToDos) {
    const parsedToDos = JSON.parse(savedToDos)
    toDos = parsedToDos
    parsedToDos.forEach(paintToDo)
    // console.log(parsedToDos)
    // console.log(parsedToDos[0])
}
