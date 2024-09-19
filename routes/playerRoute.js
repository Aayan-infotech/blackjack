const express = require("express");
const { playerDetail,getdetails} = require('../controllers/playerController')
// const { verifyAdmin, verifyUser } = require('../middleware/verifyToken')
// const company_route = express();
const router = express.Router();
router.post('/playerDetail',playerDetail);
router.get('/',getdetails);
module.exports = router;