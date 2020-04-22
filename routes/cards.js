const { Router } = require('express');
const path = require('path');
const JSONContent = require('./classes/JSONContent');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const users = await JSONContent.getData(path.resolve(__dirname, '..', 'data', 'cards.json'));
    res.json(users);
  } catch (err) {
    res.status(500).json({ Internal_Error: err.message });
  }
});

module.exports = router;
