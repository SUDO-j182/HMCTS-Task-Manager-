const request = require('supertest');
const app = require('../server');

describe('HMCTS Task Manager API', () => {

  it('GET /api/tasks should return 200 and an array', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/tasks should create a new task', async () => {
    const newTask = {
      title: 'Test Task',
      description: 'This is a test.',
      datetime: '2099-12-31T23:59',
      status: 'todo'
    };

    const res = await request(app)
      .post('/api/tasks')
      .send(newTask)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe(newTask.title);
  });

});
