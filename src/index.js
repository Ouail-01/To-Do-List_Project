/* eslint-disable import/no-cycle */
import './style.css';
import updating from './modules/updating.js';

const todoList = document.querySelector('.todo-list');
const todoTask = document.getElementById('todo-task');
const addTaskBtn = document.getElementById('add-task-btn');
const taskCompleted = document.getElementById('clear-all-btn');
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
  index += 1;
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

const resetIndexes = (arr) => arr.forEach((item, idx) => { item.index = idx + 1; });

const deleteTask = (task) => {
  const item = storedToDos[task];
  storedToDos = storedToDos.filter((todo) => todo !== item);
  resetIndexes(storedToDos);
  localStorage.setItem('toDos', JSON.stringify(storedToDos));
  getToDos();
};

const editTask = (task) => {
  editIndex = task;
  const taskToEdit = storedToDos[task];
  todoTask.value = taskToEdit.description;
  todoTask.focus();
};

const clearTaskCompleted = () => {
  storedToDos = storedToDos.filter((todo) => !todo.completed);
  resetIndexes(storedToDos);
  localStorage.setItem('toDos', JSON.stringify(storedToDos));
  getToDos();
};

addTaskBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (!todoTask.value) return;

  if (editIndex != null) {
    saveEdittedTask(editIndex);
    editIndex = null;
  } else {
    saveToDos({ index: storedToDos.length, description: todoTask.value, completed: false });
  }

  getToDos();
  todoTask.value = '';
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && todoTask.value) {
    addTaskBtn.click();
  }
});

document.addEventListener('DOMContentLoaded', getToDos);
todoList.addEventListener('click', updating);
taskCompleted.addEventListener('click', updating);

export {
  deleteTask, completedTask, editTask, clearTaskCompleted,
};
