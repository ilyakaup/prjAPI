const { Router } = require('express');
const path = require('path');
const JSONContent = require('./classes/JSONContent');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await JSONContent.getData(path.resolve(__dirname, '..', 'data', 'users.json'));
    res.json(users);
  } catch (err) {
    res.status(500).json({ Internal_Error: err.message });
  }
});

// Проверка id на четкое соответствие (при необходимости можно ослабить) 24-м символам HEX-кода,
// остальные запросы - не id
router.get(/^\/([abcdef]|\d){24}$/, async (req, res) => {
  try {
    const id = req.path.split('/')[1];
    const user = await JSONContent.getItem(path.resolve(__dirname, '..', 'data', 'users.json'), id);
    if (user) res.json(user); else res.status(404).json({ message: `Нет пользователя с id: ${id}` });
  } catch (err) {
    res.status(500).json({ Internal_Error: err.message });
  }
});

module.exports = router;
