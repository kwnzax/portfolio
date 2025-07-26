const express = require('express')
const admin = require('../middleware/admin')
const router = express.Router()
const { uploadLogo, processLogo } = require('../middleware/multer')
const skillCtrl = require('../controllers/skills')

router.post('/', admin, uploadLogo, processLogo, skillCtrl.createSkill);
router.get('/', skillCtrl.getAllSkills);
router.put('/:id', admin, uploadLogo, processLogo, skillCtrl.modifySkill);
router.delete('/:id', admin, skillCtrl.deleteSkill);


module.exports = router;