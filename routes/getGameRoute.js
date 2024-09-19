const express = require("express");
const {addCode,getAllcode,getcode} = require('../controllers/getGame')

const router = express.Router();
router.post('/addcode',addCode);
router.get('/',getAllcode);
router.get('/:id',getcode);


module.exports = router;