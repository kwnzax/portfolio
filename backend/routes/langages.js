const express = require('express')
const admin = require('../middleware/admin')
const router = express.Router()
const { upload, processImages } = require('../middleware/multer')
const langageCtrl = require('../controllers/langages')

router.post('/', admin, upload, processImages, langageCtrl.createLangage);
router.get('/', langageCtrl.getAllLangages);
router.put('/:id', admin, upload, processImages, langageCtrl.modifyLangage);
router.delete('/:id', admin, langageCtrl.deleteLangage);


module.exports = router;