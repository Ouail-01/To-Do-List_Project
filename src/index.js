import './style.css';
import updating from './updating.js';

const todoList = document.querySelector('.todo-list');
const todoTask = document.getElementById('todo-task');
const addTaskBtn = document.getElementById('add-task-btn');
let storedToDos = [];
let editIndex = null;

const getToDos = () => {
  if (localStorage.getItem('toDos') === null) {
    storedToDos = [];
  } else {
    storedToDos = JSON.parse(localStorage.getItem('toDos'));
  }
  let show = '';
  storedToDos.forEach((task, index) => {
    const completed = task.completed ? 'line-through' : '';
    show += `
    <li class="task-item ${completed}" id=${index}>
    <div>
    <input class="list-input input checkbox" type="checkbox" id=${index} ${task.completed ? 'checked' : ''}>
    <label for="${index}" class='list-label label'>${task.description}</label>
    </div>
    <div>
    <i class="fas fa-trash delete resize" id=${index}></i>
    <i class="fas fa-edit edit resize" id=${index}></i>
    </div> 
    </li>`;
  });
  todoList.innerHTML = show;
};
