const express = require('express');
const controller = require('../controllers/chatController');

const router = express.Router();

router.post('/', controller.chat);

module.exports = router;