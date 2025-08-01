const multer = require("multer")
const sharp = require("sharp")
const fs = require("fs").promises
const cloudinary = require('./cloudinaryConfig'); 

const MIME_TYPES = {
    "image/jpg": "webp",
    "image/jpeg": "webp",
    "image/png": "webp",
}

const storage = multer.memoryStorage()
const uploadProjet = multer({ storage }).fields([
    { name: "minia", maxCount: 1 },
    { name: "images", maxCount: 4 },
]);

const uploadLogo = multer({ storage }).single("logo");

const processLogo = async (req, res, next) => {
    if (!req.file) return next();

    try {
        const name = req.body.name.split(" ").join("_");
        const extension = MIME_TYPES[req.file.mimetype];
        const fileName = name + Date.now() + "." + extension

        const buffer = await sharp(req.file.buffer)
            .resize({ height: 500 })
            .toFormat("webp")
            .toBuffer();

        const imagePath = `images/${fileName}`;
        await fs.writeFile(imagePath, buffer);

        req.processedLogo = fileName;
        next();
    } catch (error) {
        console.error("Error processing logo:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const uploadBufferToCloudinary = async (buffer, filename, folder = 'projets') => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          folder,
          public_id: filename,
          format: 'webp',
          overwrite: true,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }
      ).end(buffer);
    });
  };
  
  const processImages = async (req, res, next) => {
    if (!req.files || (!req.files["minia"] && !req.files["images"])) {
      return next();
    }
  
    try {
      const name = req.body.title.split(" ").join("_");
      const processedImages = [];
  
      if (req.files["images"]) {
        for (const file of req.files["images"]) {
          const buffer = await sharp(file.buffer)
            .resize({ height: 700, fit: sharp.fit.outside })
            .toFormat("webp")
            .toBuffer();
  
          const imageUrl = await uploadBufferToCloudinary(buffer, name + "_" + Date.now());
          processedImages.push(imageUrl);
        }
      }
  
      let miniaUrl = "";
      if (req.files["minia"]) {
        const minia = req.files["minia"][0];
        const buffer = await sharp(minia.buffer)
          .resize({ height: 700, fit: sharp.fit.outside })
          .toFormat("webp")
          .toBuffer();
  
        miniaUrl = await uploadBufferToCloudinary(buffer, name + "_minia_" + Date.now());
      }
  
      req.processedImages = processedImages;
      req.processedMinia = miniaUrl;
  
      next();
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      res.status(500).json({ error: "Erreur de traitement des images." });
    }
  };

module.exports = { uploadProjet, processImages, uploadLogo, processLogo };