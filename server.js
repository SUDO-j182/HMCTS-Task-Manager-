                               //IMPORT DATABASE
const pool = require('./db.js');

                                  //EXPRESS SERVER SETUP
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

                                           //GET ALL TASKS FROM DATABASE
app.get('/api/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

                                               //GET TASK BY ID FROM DATABASE
app.get('/api/tasks/:id', async (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [taskId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching task by ID:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

                                            //CREATE NEW TASK IN DATABASE
app.post('/api/tasks', async (req, res) => {
  const { title, description, datetime, status } = req.body;

  if (!title || !datetime || !status) {
    return res.status(400).json({ error: 'Title, datetime, and status are required.' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO tasks (title, description, datetime, status)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [title, description || '', datetime, status]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting task:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

                                               //UPDATE A TASK BY ID IN DATABASE
app.put('/api/tasks/:id', async (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const { title, description, datetime, status } = req.body;

  if (!title || !datetime || !status) {
    return res.status(400).json({ error: 'Title, datetime, and status are required.' });
  }

  try {
    const result = await pool.query(
      `UPDATE tasks
       SET title = $1, description = $2, datetime = $3, status = $4
       WHERE id = $5 RETURNING *`,
      [title, description || '', datetime, status, taskId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

                                                  //DELETE A TASK BY ID FROM DATABASE
app.delete('/api/tasks/:id', async (req, res) => {
  const taskId = parseInt(req.params.id, 10);

  try {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1', [taskId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    res.status(204).send();
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

                         //PORT LISTENER
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
