const express = require('express');
const path = require('path');
const cards = require('./routes/cards');
const users = require('./routes/users');

const app = express();
const PORT = 3000;
const staticContent = express.static(path.resolve(__dirname, 'public'));

app.use(staticContent);
app.use('/cards', cards);
app.use('/users', users);

app.use((req, res) => {
  const pathArr = req.path.split('/');
  let response = { message: `Запрашиваемый ресурс: ${req.path} не найден` };
  if (pathArr.length === 3 && pathArr[1] === 'users') response = { message: `Некорректно введен id: ${pathArr[2]}` };
  res.status(404).json(response);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
