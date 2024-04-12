import React, {useState} from 'react';
import '../App.css';
import * as XLSX from 'xlsx';
import Navbar from './navbar';
import TopNavbar from './topnavbar'; 
import Footer from './footer';
// import { useNavigate } from "react-router-dom";
import { variables } from '../variables';
// import UpdateEmployeeInfo from './components/update';

const HRIAssist = () => {

  const [file, setFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState('upload'); // State to manage active tab

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('No File Selected');
      return;
    }

    const fileType = file.type;
    if (
      fileType !==
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      alert('Please select an Excel file.');
      return;
    }

    try {
      const data = await readFile(file);
      const parsedData = parseExcelData(data);
      setExcelData(parsedData);
      setShowPreview(true); // Show the preview once data is parsed
      setActiveTab('preview'); // Switch to preview tab
    } catch (error) {
      console.error('Error occurred while reading the file:', error);
      setExcelData([]);
      setShowPreview(false);
      setActiveTab('upload'); // Switch back to upload tab on error
      alert('Error occurred while reading the file. Please try again.');
    }
  };

  const handleSaveData = async () => {
    try {
      // Send data to server for database save
      await sendDataToServer(excelData);
      alert('Data saved to database successfully!');
    } catch (error) {
      console.error('Error occurred while saving data:', error);
      alert('Error occurred while saving data. Please try again later.');
    }
  };

  // const handleNavigateBack = () => {
  //   setShowPreview(false); // Hide the preview
  //   setActiveTab('upload'); // Switch back to upload tab
  // };

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(new Uint8Array(e.target.result));
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const parseExcelData = (data) => {
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    if (rows.length === 0) {
      return [];
    }

    const headers = rows[0];
    const parsedData = rows.slice(1).map((row) => {
      const rowData = {};
      headers.forEach((header, index) => {
        const cellValue = row[index];
        rowData[header] = parseCellValue(cellValue);
      });
      return rowData;
    });

    return parsedData;
  };

  const parseCellValue = (value) => {
    if (typeof value === 'string') {
      return value.trim(); // Trim whitespace for string values
    }
    return value; // Return value as is for other types
  };
  const convertExcelDateToDate = (excelDateValue) => {
    if (!excelDateValue) return null;
  
    const excelDateNumber = parseFloat(excelDateValue);
  
    if (isNaN(excelDateNumber)) return null;
  
    // Convert Excel date number to JavaScript date
    const excelDateInMS = (excelDateNumber - 25569) * 86400 * 1000;
    const dateObj = new Date(excelDateInMS);
  
    // Format date to desired string (e.g., "MM/DD/YYYY")
    const formattedDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`;
    
    return formattedDate;
  };
  
  const sendDataToServer = async (data) => {
    try {
      const response = await fetch(variables.API_URL + 'UploadEmp/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Send data directly without wrapping in { excelData: ... }
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to send data: ${errorText}`);
      }
    } catch (error) {
      console.error('Error occurred while sending data:', error);
      throw error;
    }
  };
  // const handleSaveData = async () => {
  //   try {
  //     const response = await fetch(variables.API_URL + 'UploadEmp/SaveData', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(excelData),
  //     });
  
  //     if (response.ok) {
  //       alert('Data saved successfully!');
  //     } else {
  //       alert('Failed to save data.');
  //     }
  //   } catch (error) {
  //     console.error('Error saving data:', error);
  //     alert('Error occurred while saving data.');
  //   }
  // };
  

  
  return (
    
          <div>
      <div id="wrapper">
         {/* Sidebar */}
         <Navbar />
            {/* Content Wrapper */}
      <div id="content-wrapper" className="d-flex flex-column">
        {/* Main Content */}
        <div id="content">
         {/* Topbar */}
         <TopNavbar />
            {/* Start of Page Content */}
            <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-body">
              <div className="tab-content"> 
                <div
                          className={`tab-pane fade show active `}
                          id="newHireReports"
                          role="tabpanel"
                          aria-labelledby="reports-tab"
                        >
                  <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>
                                        Requests
                                    </th> 
                                    {/* <th>
                                        
                                    </th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {/* {departments.map(dep=> */}
                                    <tr>
                                        <td className='td-width'>
                                            <div className='request'> 
                                                <div className='sender'>
                                                    <label>Joachem S. Trinidad</label>
                                                </div>
                                                <div className='sender'>
                                                    <label>Pag-Ibig Loan: Landbank Card</label>
                                                </div>
                                                <div className='time'>
                                                    <label>12:12 AM</label>
                                                </div> 
                                                <div className='view'>
                                                  <button type="button" 
                                                  className="btn btn-primary m-2 float-end">
                                                      View
                                                  </button>
                                                </div> 
                                            </div>    
                                        </td>  
                                    </tr>
                                    <tr>
                                        <td className='td-width'>
                                            <div className='request'> 
                                                <div className='sender'>
                                                    <label>Rujie Jopista</label>
                                                </div>
                                                <div className='sender'>
                                                    <label>SSS Loan</label>
                                                </div>
                                                <div className='time'>
                                                    <label>12:12 AM</label>
                                                </div> 
                                                <div className='view'>
                                                  <button type="button" 
                                                  className="btn btn-primary m-2 float-end">
                                                      View
                                                  </button>
                                                </div> 
                                            </div>    
                                        </td>  
                                    </tr>
                                    <tr>
                                        <td className='td-width'>
                                            <div className='request'> 
                                                <div className='sender'>
                                                    <label>Rhea Trinidad</label>
                                                </div>
                                                <div className='sender'>
                                                    <label>Maternity Notification</label>
                                                </div>
                                                <div className='time'>
                                                    <label>12:12 AM</label>
                                                </div> 
                                                <div className='view'>
                                                  <button type="button" 
                                                  className="btn btn-primary m-2 float-end">
                                                      View
                                                  </button>
                                                </div> 
                                            </div>    
                                        </td>  
                                    </tr>
                                    <tr>
                                        <td className='td-width'>
                                            <div className='request'> 
                                                <div className='sender'>
                                                    <label>Ronalyn Giducos</label>
                                                </div>
                                                <div className='sender'>
                                                    <label>Maternity Benefit Reimbursement</label>
                                                </div>
                                                <div className='time'>
                                                    <label>12:12 AM</label>
                                                </div> 
                                                <div className='view'>
                                                  <button type="button" 
                                                  className="btn btn-primary m-2 float-end">
                                                      View
                                                  </button>
                                                </div> 
                                            </div>    
                                        </td>  
                                    </tr>
                                    {/* )} */}
                            </tbody>
                        </table>
                    <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
            {/* /.container-fluid */}
          </div>
          {/* Footer */}
          <Footer />
          {/* End of Page Content */}
        </div>
        {/* End of Content Wrapper */}
      </div>
      {/* End of Page Wrapper */}
      </div>
  );
}

export default HRIAssist;
