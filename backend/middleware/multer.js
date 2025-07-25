const multer = require("multer")
const sharp = require("sharp")
const fs = require("fs").promises

const MIME_TYPES = {
    "image/jpg": "webp",
    "image/jpeg": "webp",
    "image/png": "webp",
}

const storage = multer.memoryStorage()
const upload = multer({ storage: storage }).array("images", 5);

const processImages = async (req, res, next) => {
    if (!req.files || req.files.length === 0) {
        return next()
    }

    try {
        const projetObject = JSON.parse(req.body.projet)
        const name = projetObject.title.split(" ").join("_")
        const processedImages = [];

        for (const file of req.files) {
            const extension = MIME_TYPES[file.mimetype]
            const fileName = name + Date.now() + "." + extension

            const buffer = await sharp(file.buffer)
                .resize({
                    height: 595,
                    fit: sharp.fit.outside,
                    position: sharp.strategy.entropy,
                })
                .toFormat("webp")
                .toBuffer()

            const imagePath = `images/${fileName}`
            await fs.writeFile(imagePath, buffer)

            processedImages.push(fileName)
        }

            req.prossecedImages = processedImages
            next()
        } catch (error) {
            console.error("Error processing image:", error)
            res.status(500).json({ error: "Internal server error." })
        }
    }

module.exports = { upload, processImages };