                                   //EXPRESS SERVER SETUP
const express = require('express');//pulls express framwork
const cors = require('cors');
const app = express();//runs express 
  app.use(express.json());//middleware to parse json data
  app.use(cors());//enable cors for all origins
const tasks = [];//temporary array in memory to store tasks
const PORT = process.env.PORT || 3000;//sets port to 3000 or the env variable PORT

                                     //GET API TASKS
app.get('/api/tasks', (req,res) => {
  res.json(tasks);//sends back the task array 
});

                                         //GET TASK BY ID
app.get('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);//converts id from a string to a number
  const task = tasks.find(t => t.id === taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found.'});//display error if task is not found
    }
    res.json(task);//gets the located task 
});


                                            //DELETE A TASK BY ID
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found.' });
  }

  tasks.splice(taskIndex, 1); // Remove task
  res.status(204).send(); // 204 No Content = successful delete
});



                                         //UPDATE A TASK BY ID
app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = tasks.find(t => t.id === taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
  }

  const { title, description, datetime, status } = req.body;

    if (!title || !datetime || !status) {
      return res.status(400).json({ error: 'Title, datetime, and status are required.' });
  }

                     //UPDATE TASK PROPERTIES
  task.title = title;
  task.description = description || '';
  task.datetime = datetime;
  task.status = status;

  res.json(task); //Return updated task
});

                                     //POST API TASKS
app.post('/api/tasks', (req,res) => {
  const { title, description, datetime, status} = req.body;
                                         //BASIC VALIDATION
    if (!title || !datetime || !status) {
      return res.status(400).json({ error: 'Title, datetime, and status are required.'});
    }
                   //CREATE NEW TASK OBJECT
  const newTask = {
    id: tasks.length + 1,//temp ID logic
    title,
    description: description || '',
    datetime,
    status
  };
                      //STORE TASK IN MEMORY
  tasks.push(newTask);
  res.status(201).json(newTask);//respond with the new task object
});

                          //PORT LISTENER
  app.listen(PORT, () => {//runs function when server starts
    console.log(`Server is running on http://localhost:${PORT}`);//server URL
  });
  