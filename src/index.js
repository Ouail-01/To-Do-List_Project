import './style.css';

const todoList = document.querySelector('.todo-list');

const taskStorage = [
    {
        id: 0,
        description: 'Watch some courses',
        completed: true,
    },
    {
        id: 1,
        description: 'Watch some tuto',
        completed: true,
    },
    {
        id: 2,
        description: 'Complete the week',
        completed: false,
    },
];

const autoFillData = () => {
    let show = '';
    taskStorage.forEach((i) => {
        show += `<li class="task-item" id="${i.id}">
        <div>
            <input type="checkbox" id="${i.id} ${i.completed ? 'checked' : ''}">
            <label type="text" for="${i.id}" id="${i.id}">${i.description}</label>
        </div>
        <i class="fas fa-ellipsis-v resize" id="${i.id}"></i>
        </li>`;
    });
    todoList.innerHTML = show;
};
autoFillData();