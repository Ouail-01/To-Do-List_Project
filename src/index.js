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

const saveToDos = ({ index, description, completed = false }) => {
  storedToDos = [];
  if (localStorage.getItem('toDos') === null) {
    storedToDos = [];
  } else {
    storedToDos = JSON.parse(localStorage.getItem('toDos'));
  }

  storedToDos.push({ index, description, completed });
  localStorage.setItem('toDos', JSON.stringify(storedToDos));
  getToDos();
};

const saveEdittedTask = (task) => {
  const myTask = storedToDos[task];
  myTask.description = todoTask.value;
  localStorage.setItem('toDos', JSON.stringify(storedToDos));
};

const completedTask = (task) => {
  const input = task.querySelector('input');
  const label = task.querySelector('label');
  const todoItem = storedToDos[task.id];
  if (input.checked) {
    todoItem.completed = true;
    label.style.textDecoration = 'line-through';
    input.style.textDecoration = 'line-through';
  } else {
    todoItem.completed = false;
    label.style.textDecoration = 'none';
  }
  localStorage.setItem('toDos', JSON.stringify(storedToDos));
  getToDos();
};
