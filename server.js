const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const tasks = [
  {
    id: 1,
    name: 'Tarea 1',
    description: 'Hacer la tarea'
  },
  {
    id: 2,
    name: 'Tarea 2',
    description: 'Lavar los trastes'
  },
  {
    id: 3,
    name: 'Tarea 3',
    description: 'Estudiar'
  }
];

app.get('/', (req, res) => {
  res.send('¡Bienvenido al servidor HTTP usando Express!');
});

app.get('/task', (req, res) => {
  res.json(tasks);
});

app.post('/task', (req, res) => {
  const { id, name, description } = req.body;

  if (!id || !name || !description) {
    res.status(400).send('Datos incompletos');
  } else {
    const newTask = { id, name, description };
    tasks.push(newTask);
    res.status(201).json(newTask);
  }
});

app.get('/image/:username', (req, res) => {
  const username = req.params.username;
  if (username === 'ronny') {
    res.sendFile(__dirname + '/flor.jpeg');
  } else {
    res.send('Página no encontrada');
  }
});

app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
