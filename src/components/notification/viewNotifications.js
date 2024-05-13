import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Navbar from '../navbar';
import TopNavbar from '../topnavbar';
import Footer from '../footer';
import '../../App.css';
import { variables } from '../../variables';
import { base64pdf } from '../../vblob';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// import pdf1 from '../../dummy.pdf'
import "react-pdf/dist/esm/Page/TextLayer.css"; 

import { Document, Page,pdfjs } from 'react-pdf'; 


 function ViewNotifications() {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`; 

    const location = useLocation();
 
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);  
    
 

    const [hasNotification, setHasNotification] = useState(true);
    const [notification, setNotification] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
   
     
  
    useEffect(() => { 
      getNotifications()    
    }, []); 

    
  const getNotifications = async () => {
    
    const EmpId = '10023'

    const formData = new FormData(); 
    formData.append('EmpId', EmpId); 
     
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
        if(data.result != 0){  
          if(data.result.some(notification => notification.IsSeen === false)){
            setHasNotification(true)
          } else {
            setHasNotification(false)
          }
          setNotification(data.result)
        }else{
          setHasNotification(false)
        }
        // setTotalPages(Math.ceil(data.result.count / pageSize))  
      } catch (error) {
          console.error('Error parsing JSON response:', error);
      }
 
    } catch (error) {
      console.error('Error:', error);
    }
  };
 
  
    return (
      <div id="wrapper">
          <Navbar />
          <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <TopNavbar />
          <div className="container-fluid">
                  <div className="container-fluid">
                    <div className="row justify-content-center">
                      <h4 className="m-0 font-weight-bold text-primary header-name"> dsa</h4>
                    </div>
                  </div>
          <div className="row justify-content-center">
            <div className="col-xl-12 col-xl-9">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <ul className="nav nav-tabs nav-fill">
                        <li className="nav-item">
                            <a className="nav-link active " id="personalDetails-tab" data-toggle="tab" href="#personalDetails" role="tab" aria-controls="personalDetails" 
                            aria-selected="false"> </a>
                        </li> 
                    </ul>
                    </div>
                  <br/>
                    <div className="tab-content">
                      <div className="tab-pane fade show active" id="personalDetails" role="tabpanel" aria-labelledby="personalDetails-tab">
                          {/* Personal Details Form */}
                      <div className="container">
                              <div className="justify-content-center">
                                <div > 
                                <div className="d-flex justify-content-between"> 
                                </div>
                                </div> 
                              </div> 
                      </div>
                      <br/> 
                      </div> 
                      {/* Add more tab content here */}
                      </div>
                </div> 

                {/* page content begin here */}  
                {notification && notification.map((pdf, index) =>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 col-lg-7">
                            <div className="card shadow mb-4">
                                {/* Card Header - New Hire Upload */}
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                  <h6 className="m-0 font-weight-bold text-primary">{pdf.RequirementName}</h6> 
                                  <h6 className="m-0 font-weight-bold" style={{color: 'red'}}>{pdf.Resubmit?'Resubmit':''}</h6> 
                                </div>
                                {/* Card Body - New Hire Options */}
                                <div className="card-body">
                                    <div className="tab-content">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center">
                                               
                                              <label>Date Submitted: {pdf.UploadDate}</label>  
                                            </div>
 
                                            {/* For Resubmission */}
                                            {pdf.Resubmit === 1 &&
                                              <div className="d-flex justify-content-between">
                                                  {pdf.EmpResubmitted === 0 &&
                                                  <div className="d-flex justify-content-left">
                                                      <input type="file" className="input-file" aria-describedby="fileHelp"/> 
                                                  </div> }
                                                  <label>Reason: {pdf.ResubmitReason}</label>
                                              </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )} 
                {/* Page content ends here */} 
                
                {/* page content begin here */}
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 col-lg-7">
                            <div className="card shadow mb-4">
                                {/* Card Header - New Hire Upload */}
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-primary">Remark</h6>
                                </div>
                                {/* Card Body - New Hire Options */}
                                <div className="card-body">
                                    <div className="tab-content">
                                        <div className="card-body loan-row"> 
                                            <div className="form-group"> <textarea 
                                              className="form-control" 
                                              id="remark" 
                                              name="remark"
                                              rows="3" 
                                              style={{ resize: "vertical" }}
                                            />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Page content ends here */}
                <button type="submit" className="btn btn-primary d-block mx-auto">Submit</button>
              </div>
 
              </div>   
              </div>
              </div>
              <Footer />
          </div>
      </div>
  );
}

export default ViewNotifications;

