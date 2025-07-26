const express = require('express')
const admin = require('../middleware/admin')
const router = express.Router()
const { uploadLogo, processLogo } = require('../middleware/multer')
const toolCtrl = require('../controllers/tools')

router.post('/', admin, uploadLogo, processLogo, toolCtrl.createTool);
router.get('/', toolCtrl.getAllTools);
router.delete('/:id', admin, toolCtrl.deleteTool);


module.exports = router;