// const taskList = localStorage.getItem('todolist');
 
const BUTTONS = document.querySelectorAll('.button_add');
const HIGH_INPUT = document.querySelector('.todo__input_high');
const LOW_INPUT = document.querySelector('.todo__input_low');
const BUTTONS_DELETE = document.querySelectorAll('.button_remove');

 
 


const todoList = JSON.parse(localStorage.getItem('todoList'))||[];

function Item(taskname, priority) {
this.id = new Date().getTime();
this.taskname = taskname;
this.status = 'TODO';
this.priority = priority;
this.doneTime = '';
} 

function addTask(e) {
e.preventDefault()
if (e.target.classList.contains('button_high')){
if (!HIGH_INPUT.value){
        alert('Пустая строка')
        return;
    }
todoList.push(new Item(HIGH_INPUT.value, 'high'))

HIGH_INPUT.value = ''
}
else {
if (!LOW_INPUT.value){
        alert('Пустая строка')
        return;
    }
todoList.push(new Item(LOW_INPUT.value, 'low'))   
LOW_INPUT.value = ''
}



localStorage.setItem('todoList', JSON.stringify(todoList))
console.log(todoList)
render()
}

function deleteTask(e) {
if (e.target.classList.contains('button_remove')) {
const buttonId = e.target.id;
const finded = todoList.findIndex(i => i.id === +buttonId);
todoList.splice(finded, 1);
localStorage.setItem('todoList', JSON.stringify(todoList))

render()
console.log(todoList);
}
}

function changeStatus(e) {
    if (e.target.classList.contains('task__checkbox-label') ) {
    const labelId = e.target.id;
    const finded = todoList.findIndex(i => i.id === +labelId);
    if (todoList[finded].status !== 'DONE') {
    todoList[finded].status = 'DONE';
    todoList[finded].doneTime = new Date().getTime();
    }  
    localStorage.setItem('todoList', JSON.stringify(todoList))
    render()
    console.log(todoList);
    }
}

function render() {

const HIGH_CONTAINER = document.querySelector('#taskshigh');
const LOW_CONTAINER = document.querySelector('#taskslow');
HIGH_CONTAINER.textContent = ''
LOW_CONTAINER.textContent = ''
todoList.forEach(item => { 
if (item.priority === 'high') {
    createElements(HIGH_CONTAINER, item);
} else {
    createElements(LOW_CONTAINER, item);
}

});

}

function createElements(container, item) {

const newElement = document.createElement('li');
const checkboxElement = document.createElement('input');
const labelElement = document.createElement('label');
const textElement = document.createElement('p');
const timeElement = document.createElement('span');
const timeDoneElement = document.createElement('span');
const timeCountElement = document.createElement('span');
const buttonElement = document.createElement('button');


newElement.classList.add('tasks-todo__task', 'task');
checkboxElement.classList.add('task__checkbox-input');
labelElement.classList.add('task__checkbox-label');
textElement.classList.add('task__text');
buttonElement.classList.add('button', 'button_remove');
newElement.id = item.id;
buttonElement.id = item.id;
labelElement.id = item.id


textElement.textContent = item.taskname;
timeElement.textContent = convertTime(item.id);



container.appendChild(newElement);
newElement.appendChild(checkboxElement);
newElement.appendChild(labelElement);
newElement.appendChild(textElement);
newElement.appendChild(timeElement);
newElement.appendChild(timeDoneElement);
newElement.appendChild(timeCountElement);
newElement.appendChild(buttonElement);


timeDoneElement.style.color = "green"

if (item.status === "DONE") {
    newElement.classList.add('_active');
    timeDoneElement.textContent = convertTime(item.doneTime) ;
    timeCountElement.textContent = Math.round((item.doneTime - item.id) / 1000 / 60) + ' min' ;

    console.log(item.id)
} else {
    newElement.classList.remove('_active');
    timeDoneElement.textContent = '';
}

}


BUTTONS.forEach(button => {
    button.addEventListener('click', addTask);
})

BUTTONS_DELETE.forEach(button => {
    button.addEventListener('click', deleteTask)
})


document.addEventListener('click', deleteTask)

document.addEventListener('click', changeStatus)


function convertTime(timeStamp) {
        const date = new Date(timeStamp);
            const hours = date.getHours();
            const minutes = "0" + date.getMinutes();
        const formattedTime = `${hours}:${minutes.substr(-2)}`;
      return formattedTime  
}

render();