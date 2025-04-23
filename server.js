                                   //EXPRESS SERVER SETUP
const express = require('express');//pulls express framwork
const app = express();//runs express 
  app.use(express.json());//middleware to parse json data
const tasks = [];//temporary array in memory to store tasks
const PORT = process.env.PORT || 3000;//sets port to 3000 or the env variable PORT

                                     //GET API TASKS
app.get('/api/tasks', (req,res) => {
  res.json(tasks);//sends back the task array 
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
  