/* eslint-disable import/no-cycle */
import { completedTask, deleteTask, editTask, clearTaskCompleted } from '../index.js';

const statusUpdate = (e) => {
  const item1 = e.target;

  if (item1.classList.contains('checkbox')) {
    const itemm = item1.closest('li');
    completedTask(itemm);
  }

  if (item1.classList.contains('delete')) {
    const itemm = item1.parentElement.parentElement.id;
    deleteTask(itemm);
  }

  if (item1.classList.contains('edit')) {
    const itemm = item1.parentElement.parentElement.id;
    editTask(itemm);
  }

  if (item1.classList.contains("clear-all")) {
    clearTaskCompleted();
  }
};

export default statusUpdate;