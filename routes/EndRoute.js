const express = require("express");
const {endgame,endedGames} = require('../controllers/endController')

const router = express.Router();
router.post('/end',endgame);
router.get('/',endedGames);


module.exports = router;