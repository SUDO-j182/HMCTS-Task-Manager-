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
  const title = taskTitle.value.trim();
  const description = taskDescription.value.trim();
  const datetime = taskDateTime.value;
  const status = taskStatus.value;

                                                        //TASK OBJECT
  const task = { title, description, datetime, status };

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
  statusElement.innerHTML = `<strong>Status:</strong> ${task.status}`;
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

                                       //APPEND BUTTON GROUP
  taskElement.appendChild(buttonGroup);

                                             //DELETE FUNCTIONALITY
  deleteBtn.addEventListener('click', () => {
    taskElement.remove();
  });

                                            //EDIT FUNCTIONALITY
  editBtn.addEventListener('click', () => {
                                  //CLEAR STATIC TEXT
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
                                           //UPDATE TASK OBJECT
      task.title = titleInput.value.trim();
      task.description = descInput.value.trim();
      task.datetime = datetimeInput.value;
      task.status = statusSelect.value;

                                            //RE-RENDER TEXT NODES
      titleElement.textContent = task.title;
      descElement.textContent = task.description;
      datetimeElement.innerHTML = `<strong>Due:</strong> ${task.datetime}`;
      statusElement.innerHTML = `<strong>Status:</strong> ${task.status}`;

                                     //TOGGLE BUTTONS BACK
      saveBtn.style.display = 'none';
      editBtn.style.display = 'inline-block';
    });
  });

                                         //APPEND FULLY BUILT TASK TO DISPLAY CONTAINER
  taskContainer.appendChild(taskElement);

                   //RESET THE TASK FORM AFTER SUBMISSION
  taskForm.reset();
});
