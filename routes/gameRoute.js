const express = require("express");
const {createGame,getAllGames} = require('../controllers/gameController')

const router = express.Router();
router.post('/start',createGame);
router.get('/',getAllGames);


module.exports = router;