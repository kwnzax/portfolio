const Projet = require('../models/Projet');
const cloudinary = require('../middleware/cloudinary');
const fs = require('fs');

function getCloudinaryPublicId(url) {

  const parts = url.split('/');
  const file = parts[parts.length - 1];
  const [publicId] = file.split('.');
  const folder = parts[parts.length - 2];
  return `${folder}/${publicId}`;
}

exports.createProjet = async (req, res, next) => {
  try {
    const projetObject = { ...req.body };
    delete projetObject._id;

    const tags = projetObject.tags;
    const tagsArray = typeof tags === "string" ? JSON.parse(tags) : tags;

    const miniaPath = `images/${req.processedMinia}`;
    const miniaUpload = await cloudinary.uploader.upload(miniaPath, {
      folder: 'portfolio'
    });
    const miniaUrl = miniaUpload.secure_url;

    fs.unlinkSync(miniaPath);

    const imageUrls = [];
    for (const name of req.processedImages) {
      const localPath = `images/${name}`;
      const uploadResult = await cloudinary.uploader.upload(localPath, {
        folder: 'portfolio'
      });
      imageUrls.push(uploadResult.secure_url);
      fs.unlinkSync(localPath);
    }

    const projet = new Projet({
      ...projetObject,
      tags: tagsArray,
      minia: req.cloudinaryMinia,
      images: req.cloudinaryImages,
    });

    await projet.save();
    res.status(201).json({ message: 'Projet enregistré !' });

  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
};

exports.getAllProjets = (req, res, next) => {
  Projet.find()
    .then(projets => res.status(200).json(projets))
    .catch(error => res.status(400).json({ error }));
}

exports.getOneProjet = (req, res, next) => {
  Projet.findOne({ _id: req.params.id })
    .then(projet => res.status(200).json(projet))
    .catch(error => res.status(404).json({ error }));
}


exports.modifyProjet = async (req, res, next) => {
  const updatedProjet = { ...req.body };

  try {
    if (updatedProjet.tags) {
      updatedProjet.tags = typeof updatedProjet.tags === "string"
        ? JSON.parse(updatedProjet.tags)
        : updatedProjet.tags;
    }

    delete updatedProjet._id;

    const projet = await Projet.findOne({ _id: req.params.id });
    if (!projet) return res.status(404).json({ error: "Projet non trouvé" });

    if (req.processedMinia) {
      const miniaPath = `images/${req.processedMinia}`;
      const upload = await cloudinary.uploader.upload(miniaPath, { folder: 'portfolio' });
      updatedProjet.minia = upload.secure_url;
      fs.unlinkSync(miniaPath);

      if (projet.minia) {
        const publicId = getCloudinaryPublicId(projet.minia);
        await cloudinary.uploader.destroy(publicId);
      }
    }

    if (req.processedImages && req.processedImages.length > 0) {
      updatedProjet.images = [];

      for (const name of req.processedImages) {
        const imgPath = `images/${name}`;
        const upload = await cloudinary.uploader.upload(imgPath, { folder: 'portfolio' });
        updatedProjet.images.push(upload.secure_url);
        fs.unlinkSync(imgPath);
      }

      if (Array.isArray(projet.images)) {
        for (const oldUrl of projet.images) {
          const publicId = getCloudinaryPublicId(oldUrl);
          await cloudinary.uploader.destroy(publicId);
        }
      }
    }

    await Projet.updateOne({ _id: req.params.id }, { ...updatedProjet, _id: req.params.id });
    res.status(200).json({ message: "Projet modifié avec images Cloudinary !" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProjet = async (req, res, next) => {
  try {
    const projet = await Projet.findOne({ _id: req.params.id });
    if (!projet) return res.status(404).json({ error: "Projet non trouvé" });

    if (projet.minia) {
      const publicId = getCloudinaryPublicId(projet.minia);
      await cloudinary.uploader.destroy(publicId);
    }

    if (Array.isArray(projet.images)) {
      for (const imageUrl of projet.images) {
        const publicId = getCloudinaryPublicId(imageUrl);
        await cloudinary.uploader.destroy(publicId);
      }
    }

    await Projet.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Projet supprimé !" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};