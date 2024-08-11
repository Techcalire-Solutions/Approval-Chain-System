const express = require('express');
const router = express.Router();
const {Op, fn, col, where} = require('sequelize');
const multer = require('../../utils/multer'); // Import the configured multer instance

router.post('/fileupload', multer.single('file'), (req, res) => {
  
  try {
    console.log(req.body);
    
    console.log('File uploaded:', req.file);

    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }

    // Construct the URL path
    const fileUrl = `/invoices/uploads/${req.file.filename}`;
    console.log(fileUrl, "_________________________");

    res.status(200).send({
      message: 'File uploaded successfully',
      file: req.file,
      fileUrl: fileUrl
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;