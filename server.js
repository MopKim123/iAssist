// backend
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Specify upload directory

const dbOperation = require('./dbFiles/dbOperation.js');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/upload', upload.single('sssloanPDF'), async (req, res) => {
  // console.log(req);
  // console.log("this");
  // try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

  //   // Here you can save the file to the database
    await dbOperation.insertPDF(req.file.filename); // Pass filename to the insertPDF function

  //   res.status(200).json({ message: 'PDF uploaded successfully' });
  // } catch (error) {
  //   console.error('Error uploading PDF:', error);
  //   res.status(500).json({ error: 'Internal server error' });
  // }
});


app.post('/hrsubmission', async (req, res) => {

  try {
  
    const result = await dbOperation.getSubmissions();
    res.status(200).json({ result: result });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/submissionpdf',  upload.single('SubmissionID'), async (req, res) => {

  try {
  
    const result = await dbOperation.getPDF(req.body.SubmissionID);
    res.status(200).json({ result: result });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/usersubmission',  upload.single('EmpId'), async (req, res) => {

  try { 
  
    const result = await dbOperation.getUserSubmissions(req.body.EmpId);
    res.status(200).json({ result: result });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/updatepdf', upload.single(''), async (req, res) => {

  try {

    const id = req.body.id;
    const reason = req.body.reason;  
    const SubmissionID = req.body.SubmissionID;  
  
    const result = await dbOperation.updatePDF(id,reason,SubmissionID);
    res.status(200).json({ result: result });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/updatesubmission', upload.single(''), async (req, res) => {

  try {

    const id = req.body.id;
    const reason = req.body.reason;  
  
    const result = await dbOperation.updateSubmission(id,reason);
    res.status(200).json({ result: result });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));