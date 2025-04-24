                                                    //D.O.M SELECTIONS
const taskForm = document.getElementById('taskForm');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskDateTime = document.getElementById('taskDateTime');
const taskStatus = document.getElementById('taskStatus');
const taskContainer = document.querySelector('.task-display-container');


                                                     //EVENT LISTENER
taskForm.addEventListener('submit', function(event) {
  event.preventDefault();

                                       //COLLECT AND VALIDATE INPUT DATA
  const title = taskTitle.value.trim();
  const description = taskDescription.value.trim();
  const datetime = taskDateTime.value;
  const status = taskStatus.value;

                                       //VALIDATE INPUTS BEFORE SENDING TO BACKEND
  if (!title || !datetime || !status) {
    alert("Please fill in all required fields.");
    return;
  }

                                                       //CONSTRUCT TASK OBJECT
  const task = { title, description, datetime, status };

                                            //SEND POST REQ TO BACKEND API
  fetch('http://localhost:3000/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('Failed to create task.');
    }
    return res.json();
  })
  .then(createdTask => {
    console.log('Task created:', createdTask);

                           //RENDER TASK TO D.O.M
    renderTask(createdTask);

                     //CLEAR FORM FIELDS
    taskForm.reset();
  })
  .catch(err => {
    console.error('Error:', err);
    alert('Something went wrong. Please try again.');
  });
});


                           //REUSABLE RENDER FUNCTION FOR NEW TASKS
function renderTask(task) {

                                                    //CREATE D.O.M ELEMENT FOR TASK DISPLAY
  const taskElement = document.createElement('div');
  taskElement.classList.add('task');

                                                    //CREATE AND APPEND TITLE
  const titleElement = document.createElement('h3');
  titleElement.textContent = task.title;
  taskElement.appendChild(titleElement);

                                                  //CREATE AND APPEND DESCRIPTION
  const descElement = document.createElement('p');
  descElement.textContent = task.description;
  taskElement.appendChild(descElement);

                                                     //CREATE AND APPEND DATETIME
  const datetimeElement = document.createElement('p');
  datetimeElement.innerHTML = `<strong>Due:</strong> ${task.datetime}`;
  taskElement.appendChild(datetimeElement);

                                                  //CREATE AND APPEND STATUS
const statusElement = document.createElement('p');
statusElement.innerHTML = `<strong>Status:</strong> `;

const statusBadge = document.createElement('span');
statusBadge.classList.add('status-tag');

switch (task.status.toLowerCase()) {
  case 'todo':
    statusBadge.classList.add('status-todo');
    break;
  case 'inprogress':
    statusBadge.classList.add('status-inprogress');
    break;
  case 'done':
    statusBadge.classList.add('status-done');
    break;
  default:
    statusBadge.style.backgroundColor = 'gray';
}

statusBadge.textContent = task.status;
statusElement.appendChild(statusBadge);
taskElement.appendChild(statusElement);

                                                    //CONTAINER FOR BUTTONS
  const buttonGroup = document.createElement('div');
  buttonGroup.classList.add('task-buttons');

                                                    //DELETE BUTTON
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete Task';
  deleteBtn.setAttribute('aria-label', 'Delete this task');
  deleteBtn.classList.add('delete-task');
  buttonGroup.appendChild(deleteBtn);

                                                   //EDIT BUTTON
  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit Task';
  editBtn.setAttribute('aria-label', 'Edit this task');
  editBtn.classList.add('edit-task');
  buttonGroup.appendChild(editBtn);

                                                   //SAVE BUTTON
  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save Task';
  saveBtn.setAttribute('aria-label', 'Save this task');
  saveBtn.classList.add('save-task');
  saveBtn.style.display = 'none';
  buttonGroup.appendChild(saveBtn);

                                       //APPEND BUTTON GROUP TO TASK
  taskElement.appendChild(buttonGroup);

                                           //DELETE FUNCTIONALITY
deleteBtn.addEventListener('click', () => {
  fetch(`http://localhost:3000/api/tasks/${task.id}`, {
    method: 'DELETE'
  })
  .then(res => {
    if (res.status === 204) {
      console.log(`Task with ID ${task.id} deleted successfully`);
                           //REMOVE FROM D.O.M IF SUCCESSFUL
      taskElement.remove();
    } else {
      throw new Error('Failed to delete task.');
    }
  })
  .catch(err => {
    console.error('Delete error:', err);
    alert('Could not delete task. Try again.');
  });
});


                                             //EDIT FUNCTIONALITY
  editBtn.addEventListener('click', () => {
    titleElement.textContent = '';
    descElement.textContent = '';
    datetimeElement.textContent = '';
    statusElement.textContent = '';

                                                       //TITLE FIELD
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.value = task.title;
    titleElement.appendChild(titleInput);

                                                     //DESCRIPTION FIELD
    const descInput = document.createElement('input');
    descInput.type = 'text';
    descInput.value = task.description;
    descElement.appendChild(descInput);

                                                         //DATETIME FIELD
    const datetimeInput = document.createElement('input');
    datetimeInput.type = 'datetime-local';
    datetimeInput.value = task.datetime;
    datetimeElement.appendChild(datetimeInput);

                                                         //STATUS DROPDOWN
    const statusSelect = document.createElement('select');
    ['todo', 'inprogress', 'done'].forEach(statusVal => {
      const option = document.createElement('option');
      option.value = statusVal;
      option.textContent = statusVal.charAt(0).toUpperCase() + statusVal.slice(1);
      if (statusVal === task.status) option.selected = true;
      statusSelect.appendChild(option);
    });
    statusElement.appendChild(statusSelect);

                                  //TOGGLE BUTTONS
    editBtn.style.display = 'none';
    saveBtn.style.display = 'inline-block';

                                             //SAVE FUNCTIONALITY
    saveBtn.addEventListener('click', () => {
      task.title = titleInput.value.trim();
      task.description = descInput.value.trim();
      task.datetime = datetimeInput.value;
      task.status = statusSelect.value;

      fetch(`http://localhost:3000/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to update task.');
          return res.json();
        })
        .then(updatedTask => {
          titleElement.textContent = updatedTask.title;
          descElement.textContent = updatedTask.description;
          datetimeElement.innerHTML = `<strong>Due:</strong> ${updatedTask.datetime}`;
          statusElement.innerHTML = `<strong>Status:</strong> ${updatedTask.status}`;

          saveBtn.style.display = 'none';
          editBtn.style.display = 'inline-block';
        })
        .catch(err => {
          console.error('Update error:', err);
          alert('Could not update task. Try again.');
        });
    });
  }); 

  taskContainer.appendChild(taskElement); 
} 

                      //FETCH TASKS FROM BACKEND ON PAGE LOAD
function loadTasks() {
  fetch('http://localhost:3000/api/tasks')
    .then(res => {
      console.log('Raw response:', res);
      if (!res.ok) {
        throw new Error('Failed to load tasks.');
      }
      return res.json();
    })
    .then(taskArray => {
      console.log('Loaded tasks:', taskArray);
      taskArray.forEach(task => {
                         //RENDER TASKS USING REUSABLE FUNCTION
        renderTask(task);
      });
    })
    .catch(err => {
      console.error('Error loading tasks:', err);
      alert('Failed to load tasks from server.');
    });
}

                                                        //LOAD ALL TASKS ON PAGE LOAD
document.addEventListener('DOMContentLoaded', loadTasks);