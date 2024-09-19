const express = require("express");
const {createVersion,getAllVersions,getVersion,updateVersion} = require('../controllers/versionController')
// const { verifyAdmin, verifyUser } = require('../middleware/verifyToken')
// const company_route = express();
const router = express.Router();
router.post('/versionCreate',createVersion);
router.get('/',getAllVersions);
router.get('/:id',getVersion);
router.put('/:id',updateVersion);

module.exports = router;