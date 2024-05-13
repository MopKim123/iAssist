// global.js

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

export function add(a, b) {
  return a + b;
}
