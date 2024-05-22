// global.js

import emailjs from '@emailjs/browser'; 

// Define your functions
export async function notification2() { 

  const formData = new FormData(); 
  // formData.append('pageNumber', pageNumber);
  // formData.append('pageSize', pageSize);
   
  try {
    const uploadResponse = await fetch('http://localhost:5000/getnotification', {
      method: 'POST',
      body: formData
    }) 

    if (!uploadResponse.ok) {
      console.error('Failed:', uploadResponse.statusText);
      return;
    } 

    try {
      const data = await uploadResponse.json();  
      // console.log('this array -',data.result); 
      // setNotification(data.result) 
      // setTotalPages(Math.ceil(data.result.count / pageSize))  
    } catch (error) {
        console.error('Error parsing JSON response:', error);
    }

  } catch (error) {
    console.error('Error:', error);
  }
}


export async function notificationMarkAllRead(id){
    

  const formData = new FormData(); 
  formData.append('EmpId', id); 
    
  try {
    const uploadResponse = await fetch('http://localhost:5000/notificationmarkallread', {
      method: 'POST',
      body: formData
    }) 

    if (!uploadResponse.ok) {
      console.error('Failed:', uploadResponse.statusText);
      return;
    } 

    try {
      const data = await uploadResponse.json();    
      // setTotalPages(Math.ceil(data.result.count / pageSize))  
    } catch (error) {
        console.error('Error parsing JSON response:', error);
    }

  } catch (error) {
    console.error('Error:', error);
  }
};

export async function setNotificationAsRead(NotificationID){
    

  const formData = new FormData(); 
  formData.append('NotificationID', NotificationID); 
    
  try {
    const uploadResponse = await fetch('http://localhost:5000/setnotificationasread', {
      method: 'POST',
      body: formData
    }) 

    if (!uploadResponse.ok) {
      console.error('Failed:', uploadResponse.statusText);
      return;
    } 

    try {
      const data = await uploadResponse.json();     
    } catch (error) {
        console.error('Error parsing JSON response:', error);
    }

  } catch (error) {
    console.error('Error:', error);
  }
};

//insert notification
export async function insertNotification(Name, TransactionType, SenderID, ReceiverID, notificationType, SubmissionID){ 

  const formData = new FormData();
  formData.append('EmployeeName', Name);  
  formData.append('TransactionType', TransactionType);  
  formData.append('SenderID', SenderID);  
  formData.append('ReceiverID', ReceiverID);  
  formData.append('NotificationType', notificationType);  
  formData.append('SubmissionID', SubmissionID);   
  try {
    const uploadResponse = await fetch('http://localhost:5000/insertnotification', {
      method: 'POST',
      body: formData
    }) 

    if (!uploadResponse.ok) {
      console.error('Failed:', uploadResponse.statusText);
      return;  
    }   
  } catch (error) {
    console.error('Error:', error);
  }
}; 


export async function sendEmail (template, reason, documentName, data) {  
  const complete = `test ${data}`
  const submit = `test ${data}`
  const resubmit = `
  Dear ${data.receiver_name}, \n\n\n

  I hope this email finds you well. 
  \n\n
  We would like to bring to your attention that there is a requirement for resubmission of a document related to the ${data.transaction_type} you initiated. 
  It appears that the ${data.document_name} submitted did not meet the necessary criteria.
  \n\n
  To ensure the completion of the transaction process, we kindly request you to resubmit the ${data.document_name} at your earliest convenience. 
  The reason for resubmission is ${data.reason}.
  \n\n
  Your prompt attention to this matter will greatly assist us in finalizing the transaction smoothly.
  \n\n
  If you require any assistance or clarification regarding the resubmission process, please do not hesitate to reach out to ${data.contact_person}.
  \n\n
  Thank you for your cooperation and understanding.
  \n\n\n
  ${data.sample}`

  const resubmitted = `test ${data}`
  const expired = `test ${data}`


  return new Promise((resolve, reject) => {
    //email content
    const formData = {
      sender_name: 'senderName',
      sender_email: data.EmailAddress, // hr's email
      receiver_name: data.Name,
      // receiver_email: sampleEmail,
      receiver_email: data.EmailAddress,
      transaction_type: data.TransactionType,
      document_name: documentName,
      reason: reason,
      contact_person: 'Ms Cham',
    };  
    
    emailjs.send('service_2cen06m', template, formData, 'hrQ_V5JOOkQWdddTK')
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        alert('Updated Successfully')
        // getSubmissionPDF() 
        resolve(true);
      }, (error) => {
        console.error('Email sending failed:', error.text);
        reject(error);
      });
  });
};

export function add(a, b) {
  return a + b;
}
