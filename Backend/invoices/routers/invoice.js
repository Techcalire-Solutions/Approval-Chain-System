const express = require('express');
const router = express.Router();
const {Op, fn, col, where} = require('sequelize');
const multer = require('../../utils/multer'); // Import the configured multer instance
const path = require('path');
const fs = require('fs');

router.post('/fileupload', multer.single('file'), (req, res) => {
  
  try {
    console.log(req.body);
    
    console.log('File uploaded:', req.file);

    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }

    // Construct the URL path
    const fileUrl = `/invoices/uploads/${req.file.filename}`;

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

const deleteFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};

router.delete('/filedelete/*', async (req, res) => {
  try {
    // Extract the file path from the URL
    const encodedFilePath = req.params[0];
    console.log(encodedFilePath);
     // Capture the rest of the URL after /filedelete/
    const decodedFilePath = decodeURIComponent(encodedFilePath); // Decode the URL component
    
    // Resolve the absolute path
    const absoluteFilePath = path.resolve(decodedFilePath);

    await deleteFile(absoluteFilePath);

    res.status(200).send({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).send({ message: error.message });
  }
});
module.exports = router;