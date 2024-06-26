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


export async function sendEmailjs (emailType, data) {  

  let message = ''
  let title = ''

  const titleComplete = `${data.transaction_type} Approval and Completion Confirmation`
  const messageComplete = `
  Dear ${data.receiver_name},

  I hope this email finds you well.
  
  I am pleased to inform you that the ${data.transaction_type} you submitted has been successfully approved and processed. Your diligent efforts in ensuring its accuracy and completeness are greatly appreciated.
  
  Please review the attached confirmation document for your reference. Should you have any questions or require further assistance, feel free to reach out to me at any time.
  
  Thank you for your prompt attention to this matter.
  
  Best regards,
  
  ${data.sender_name}`

  const messageSubmit = `test ${data}`

  const titleResubmit = `Action Required: Resubmission of Document for ${data.transaction_type}`
  const messageResubmit = `
  Dear ${data.receiver_name},

  I hope this email finds you well. 
  
  We would like to bring to your attention that there is a requirement for resubmission of a document related to the ${data.transaction_type} you initiated. It appears that the ${data.document_name} submitted did not meet the necessary criteria.
  
  To ensure the completion of the transaction process, we kindly request you to resubmit the ${data.document_name} at your earliest convenience. The reason for resubmission is ${data.reason}.
  
  Your prompt attention to this matter will greatly assist us in finalizing the transaction smoothly.
  
  If you require any assistance or clarification regarding the resubmission process, please do not hesitate to reach out to ${data.contact_person}.
  
  Thank you for your cooperation and understanding.
  
  
  
  Best regards,

  ${data.sender_name} `
  const messageResubmitted = `test ${data}`
  const messageExpired = `test ${data}`

  switch(emailType){
    case 'complete':
      title = titleComplete
      message = messageComplete
      break;
    case 'resubmit':
      title = titleResubmit
      message = messageResubmit
      break;      
  }

  return new Promise((resolve, reject) => {
    //email content
    const formData = {
      sender_name: data.sender_name,
      sender_email: data.sender_email, 
      receiver_name: data.receiver_name, 
      // receiver_email: data.receiver_email,
      receiver_email: 'joakimtrinidad234@gmail.com', //temporary email
      message: message,  
      title: title,
    };  
    console.log('this function');
    emailjs.send('service_2cen06m', 'template_complete', formData, 'hrQ_V5JOOkQWdddTK')
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
