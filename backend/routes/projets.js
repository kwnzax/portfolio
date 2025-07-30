const express = require('express')
const admin = require('../middleware/admin')
const router = express.Router()
const { uploadProjet, processImages } = require('../middleware/multer')
const projetCrtl = require('../controllers/projets')

router.get('/', (req, res) => {
    res.status(200).json([{ titre: 'test', description: 'test' }]);
  });
router.post('/', admin, uploadProjet, processImages, projetCrtl.createProjet);

router.get('/:id', projetCrtl.getOneProjet);
router.put('/:id', admin, uploadProjet, processImages, projetCrtl.modifyProjet);
router.delete('/:id', admin, projetCrtl.deleteProjet);


module.exports = router;