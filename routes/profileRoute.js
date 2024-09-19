const express = require("express");
const { profileCreated,findProfile,getProfile,updateprofile,deleteProfile} = require('../controllers/ProfileController')
// const { verifyAdmin, verifyUser } = require('../middleware/verifyToken')
// const company_route = express();
const router = express.Router();
router.post('/create',profileCreated);
router.get('/',findProfile);
router.get('/:id',getProfile);

router.put('/:id',updateprofile);

router.delete('/:id',deleteProfile);
module.exports = router;