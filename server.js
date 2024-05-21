// backend
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Specify upload directory
const util = require('util');

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

// HR - get all employee submission
app.post('/hrsubmission',  upload.single(''), async (req, res) => {
 
  try {
    const { pageNumber, pageSize } = req.body; 
    const result = await dbOperation.getSubmissions(pageNumber, pageSize);
    res.status(200).json({ result: result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}); 
// HR - get all employee submission with filter
app.post('/hrfiltersubmission', upload.single(''),  async (req, res) => {
 
  try {
    const { pageNumber, pageSize, name, transactionType, status, month, year } = req.body;   
    const result = await dbOperation.getFilteredSubmissions(pageNumber, pageSize, name, transactionType, status, month, year);
    res.status(200).json({ result: result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}); 
// HR - download submissions
app.post('/hrdownloadsubmissions', upload.single(''),  async (req, res) => {
 
  try {
    const { name, transactionType, status, month, year } = req.body;   
    const result = await dbOperation.downloadSubmissions(name, transactionType, status, month, year);
    res.status(200).json({ result: result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}); 
// HR - get submission pdfs
app.post('/submissionpdf',  upload.single('SubmissionID'), async (req, res) => {

  try {
  
    const result = await dbOperation.getPDF(req.body.SubmissionID);
    res.status(200).json({ result: result });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// HR - update pdf status
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
// HR - update submission status
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


// Employee - get employee submission
app.post('/usersubmission',  upload.single('EmpId'), async (req, res) => {

  try { 
  
    const { pageNumber, pageSize } = req.body; 
    const result = await dbOperation.getUserSubmissions(req.body.EmpId,pageNumber, pageSize);
    res.status(200).json({ result: result });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// All - get notifications
app.post('/getnotification',  upload.single(''), async (req, res) => {

  try {   
    // const result = await dbOperation.getPDF(req.body.SubmissionID);
    // console.log(req.body.EmpId)
    const result = await dbOperation.getNotifications(req.body.EmpId);
    res.status(200).json({ result: result });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// All - mark all notifications as read
app.post('/notificationmarkallread',  upload.single(''), async (req, res) => {

  try {    
    const result = await dbOperation.markAllNotificationsRead(req.body.EmpId);
    res.status(200).json({ result: result });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// All - mark one notification as read
app.post('/setnotificationasread',  upload.single(''), async (req, res) => {

  try {    
    const result = await dbOperation.setNotificationAsRead(req.body.NotificationID);
    res.status(200).json({ result: result });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// All - get submission details for notification
app.post('/getsubmissionfornotification',  upload.single(''), async (req, res) => {

  try {    
    const result = await dbOperation.getSubmissionForNotification(req.body.SubmissionID);
    res.status(200).json({ result: result });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// All - insert notification
app.post('/insertnotification',  upload.single(''), async (req, res) => {

  try {

    const { EmployeeName, TransactionType, SenderID, ReceiverID, NotificationType, SubmissionID } = req.body; 
    // console.log(EmployeeName, TransactionType, SenderID, ReceiverID, NotificationType, SubmissionID);
    // const insertNotification = async ( EmployeeName, TransactionType, SenderID, ReceiverID, NotificationType, SubmissionID) => {
    
    const result = await dbOperation.insertNotification(EmployeeName, TransactionType, SenderID, ReceiverID, NotificationType, SubmissionID);
    res.status(200).json({ result: result });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.post('/getnotificationsforviewall',  upload.single('EmpId'), async (req, res) => {

  try { 
  
    const { pageNumber, pageSize } = req.body; 
    const result = await dbOperation.getNotificationsForViewAll(req.body.EmpId,pageNumber, pageSize);
    res.status(200).json({ result: result });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));