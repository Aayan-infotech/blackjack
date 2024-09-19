const express = require("express");
const {addAmount,getAllamount,getWallet,updateWallet,deleteWallet} = require('../controllers/walletController')
// const { verifyAdmin, verifyUser } = require('../middleware/verifyToken')
// const company_route = express();
const router = express.Router();
router.post('/addamount',addAmount);
router.get('/',getAllamount);
router.get('/:id',getWallet);
router.put('/:id',updateWallet);
router.delete('/:id',deleteWallet);


module.exports = router;