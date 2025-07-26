const express = require('express')
const admin = require('../middleware/admin')
const router = express.Router()
const { uploadProjet, processImages } = require('../middleware/multer')
const projetCrtl = require('../controllers/projets')

router.post('/', admin, uploadProjet, processImages, projetCrtl.createProjet);
router.get('/', projetCrtl.getAllProjets);
router.get('/:id', projetCrtl.getOneProjet);
router.put('/:id', admin, uploadProjet, processImages, projetCrtl.modifyProjet);
router.delete('/:id', admin, projetCrtl.deleteProjet);


module.exports = router;