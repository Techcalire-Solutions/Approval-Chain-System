const express = require('express');
const router = express.Router();
const {Op, fn, col, where} = require('sequelize');
const multer = require('../../utils/multer'); // Import the configured multer instance
const path = require('path');
const fs = require('fs');
const PerformaInvoice = require('../models/performaInvoice');
const authenticateToken = require('../../middleware/authorization');

router.post('/fileupload', multer.single('file'), authenticateToken, (req, res) => {
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

router.delete('/filedelete/:id', async (req, res) => {
  let id = req.params.id;
  try {
    const pi = await PerformaInvoice.findByPk(id);
    let filename = pi.url
    const directoryPath = path.join(__dirname, '../uploads'); // Replace 'uploads' with your folder name
    const filePath = path.join(directoryPath, filename);

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ message: 'File not found' });
        }

        // Delete the file
        fs.unlink(filePath, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting file' });
            }

            return res.status(200).json({ message: 'File deleted successfully' });
        });
    })
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).send({ message: error.message });
  }
});
module.exports = router;