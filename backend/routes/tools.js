const express = require('express')
const admin = require('../middleware/admin')
const router = express.Router()
const { upload, processImages } = require('../middleware/multer')
const toolCtrl = require('../controllers/tools')

router.post('/', admin, upload, processImages, toolCtrl.createTool);
router.get('/', toolCtrl.getAllTools);
router.delete('/:id', admin, toolCtrl.deleteTool);


module.exports = router;