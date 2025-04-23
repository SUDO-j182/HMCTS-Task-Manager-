                                                     //D.O.M SELECTIONS
const taskForm = document.getElementById('taskForm');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskDateTime = document.getElementById('taskDateTime');
const taskStatus = document.getElementById('taskStatus');
const taskContainer = document.querySelector('.task-display-container');


                                                     //EVENT LISTENERS
taskForm.addEventListener('submit', function(event) {
                         //PREVENT PAGE RELOAD ON SUBMISSION
  event.preventDefault();

                                       //COLLECT AND SANITIZE INPUT DATA FROM THE FORM
  const title = taskTitle.value.trim();            //trim() REMOVES ANY SPACES FROM THE START AND END OF STRING INPUTS
  const description = taskDescription.value.trim();
  const datetime = taskDateTime.value;
  const status = taskStatus.value;

               //TASK OBJECT
const task = {
    title,
    description,
    datetime,
    status
  };
  
                                                  //CREATE D.O.M ELEMENT FOR TASK DISPLAY
const taskElement = document.createElement('div');

  taskElement.classList.add('task');                         
                                                  // CREATE AND APPEND TITLE
const titleElement = document.createElement('h3');
  titleElement.textContent = task.title;
  taskElement.appendChild(titleElement);

                                                // CREATE AND APPEND DESCRIPTION
const descElement = document.createElement('p');
  descElement.textContent = task.description;
  taskElement.appendChild(descElement);

                                                    // CREATE AND APPEND DATETIME
const datetimeElement = document.createElement('p');
  datetimeElement.innerHTML = `<strong>Due:</strong> ${task.datetime}`;
  taskElement.appendChild(datetimeElement);

                                                  // CREATE AND APPEND STATUS
const statusElement = document.createElement('p');
  statusElement.innerHTML = `<strong>Status:</strong> ${task.status}`;
  taskElement.appendChild(statusElement);

                                                  //CONTAINER FOR BUTTONS
const buttonGroup = document.createElement('div');
  buttonGroup.classList.add('task-buttons');
                                                  //CREATE AND APPEND DELETE BUTTON
const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete Task';
  deleteBtn.setAttribute('aria-label', 'Delete this task');
  deleteBtn.classList.add('delete-task');
  buttonGroup.appendChild(deleteBtn);
                                                 //CREATE AND APPEND EDIT BUTTON
const editBtn = document.createElement('button');
  editBtn,this.textContent = 'Edit Task';
  editBtn.setAttribute('aria-label', 'Edit this task');
  editBtn.classList.add('edit-task');
  buttonGroup.appendChild.apply(editBtn);
                                     //APPEND BUTTONS TO TASK
taskElement.appendChild(buttonGroup);

                                           //DELETE FUNCTIONALITY
deleteBtn.addEventListener('click', () => {
  taskElement.remove();
});
                                         //EDIT FUNCTIONALITY
editBtn.addEventListener('click', () => {
  alert('Edit functionality coming soon!');
});

                                           //APPEND TO DISPLAY CONTAINER
    taskContainer.appendChild(taskElement);
  
                   //RESET THE TASK FORM AFTER SUBMISSION
  taskForm.reset();
});
