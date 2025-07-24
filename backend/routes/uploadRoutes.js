import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('uploads/'));
    },
    filename: (req, file, cb) => {
        const extname = path.extname(file.originalname);
        const uniqueName = `${file.fieldname}-${Date.now()}${extname}`;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedExtensions = /jpe?g|png|webp/;
    const allowedMimetypes = /image\/jpe?g|image\/png|image\/webp/;

    const extname = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;

    if (allowedExtensions.test(extname) && allowedMimetypes.test(mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only images (JPEG, PNG, WEBP) are allowed"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
    console.log("File Upload Request Received"); // Debugging line
    uploadSingleImage(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.error("Multer Error:", err.message);
            return res.status(400).send({ message: err.message });
        } else if (err) {
            console.error("Error:", err.message);
            return res.status(400).send({ message: err.message });
        }
        console.log("File Details:", req.file); // Debugging line
        if (req.file) {
            res.status(200).send({
                message: "Image uploaded successfully",
                image: `/uploads/${req.file.filename}`
            });
        } else {
            res.status(400).send({
                message: "No image file provided"
            });
        }
    });
});


export { upload };
export default router;
