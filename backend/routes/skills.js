const express = require('express')
const admin = require('../middleware/admin')
const router = express.Router()
const { upload, processImages } = require('../middleware/multer')
const skillCtrl = require('../controllers/skills')

router.post('/', admin, upload, processImages, skillCtrl.createSkill);
router.get('/', skillCtrl.getAllSkills);
router.put('/:id', admin, upload, processImages, skillCtrl.modifySkill);
router.delete('/:id', admin, skillCtrl.deleteSkill);


module.exports = router;