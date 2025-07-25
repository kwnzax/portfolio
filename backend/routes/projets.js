const express = require('express')
const admin = require('../middleware/admin')
const router = express.Router()
const { upload, processImages } = require('../middleware/multer')
const projetCrtl = require('../controllers/projets')

router.post('/', admin, upload, processImages, projetCrtl.createProjet);
router.get('/', projetCrtl.getAllProjets);
router.get('/:id', projetCrtl.getOneProjet);
router.put('/:id', admin, upload, processImages, projetCrtl.modifyProjet);
router.delete('/:id', admin, projetCrtl.deleteProjet);


module.exports = router;