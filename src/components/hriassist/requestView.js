import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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


 function RequestView() {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`; 

    const { employeeId } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1); 

    const [pdfPages, setPdfPages] = useState([]);
    const convertToPDF = () => {
      const binaryString = atob(base64pdf.blobpdf);
 
      const arrayBuffer = new ArrayBuffer(binaryString.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
      }
      // Create a Blob object from the ArrayBuffer
      const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
    
      // Create a URL for the Blob object
      // const pdfUrl = URL.createObjectURL(blob);
      return(URL.createObjectURL(blob))
    }

    const pdfUrl = convertToPDF()  

    
  const convertAndDownloadPDF = () => { 
    // Create a temporary URL for the Blob
    const url = convertToPDF()

    // Create a temporary anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.pdf';
    document.body.appendChild(a);
    a.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };
  
    useEffect(() => {
      // Fetch employee data based on employeeId
    //   const fetchEmployeeData = async () => {
    //     try {
    //       const response = await fetch(variables.API_URL + 'UploadEmp/' + employeeId);
    //       if (!response.ok) {
    //         throw new Error('Failed to fetch employee data');
    //       }
    //       const data = await response.json();
    //       setEmployeeData(data);
    //     } catch (error) {
    //       console.error('Error fetching employee data:', error);
    //     }
    //   };
  
    //   fetchEmployeeData();
    // console.log(pdf1)
    }, [employeeId]); 
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      // try {
      //   const response = await fetch(variables.API_URL + 'UploadEmp/' + employeeId, {
      //     method: 'PUT',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify(employeeData)
      //   });
      //   if (!response.ok) {
      //     throw new Error('Failed to update employee');
      //   }
      //   // Handle successful update
      //   console.log('Employee updated successfully');
      // } catch (error) {
      //   console.error('Error updating employee:', error);
      // }
    }; 
  
    const handleButtonClick = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
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
                      <h4 className="m-0 font-weight-bold text-primary header-name">*Transaction Type Name</h4>
                    </div>
                  </div>
          <div className="row justify-content-center">
            <div className="col-xl-12 col-xl-9">
            <form onSubmit={handleFormSubmit}>
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <ul className="nav nav-tabs nav-fill">
                        <li className="nav-item">
                            <a className="nav-link active " id="personalDetails-tab" data-toggle="tab" href="#personalDetails" role="tab" aria-controls="personalDetails" 
                            aria-selected="false">Transaction Type Name</a>
                        </li> 
                    </ul>
                    </div>
                  <br/>
                    <div className="tab-content">
                      <div className="tab-pane fade show active" id="personalDetails" role="tabpanel" aria-labelledby="personalDetails-tab">
                          {/* Personal Details Form */}
                      <div className="container">
                              <div className="row justify-content-center">
                                <div className="col-md-4">
                                  <div className="form-group">
                                    <label htmlFor="middleName">*Requirement Name</label>
                                    {/* add here */} 
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
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 col-lg-7">
                            <div className="card shadow mb-4">
                                {/* Card Header - New Hire Upload */}
                                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold text-primary">*Requirement name</h6>
                                </div>
                                {/* Card Body - New Hire Options */}
                                <div className="card-body">
                                    <div className="tab-content">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between">
                                              <div> 
                                                <button onClick={handleButtonClick}>
                                                  View PDF
                                                </button>
                                                <button onClick={convertAndDownloadPDF} className='btnClose'>
                                                  Download
                                                </button>
                                              </div>
                                              <label>*File Name</label>
                                              <label>*Upload Date</label>
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
                </form>
              </div>

              

              </div> 
                <Modal show={showModal} onHide={handleCloseModal} size="lg">
                  <Modal.Header>
                    <Modal.Title>*File name</Modal.Title>
                    <div>
                      <button type="button" onClick={convertAndDownloadPDF}>Download</button>
                      <button type="button" className="btnClose" onClick={handleCloseModal}>Close</button>
                    </div>
                  </Modal.Header>
                  <Modal.Body style={{backgroundColor: 'lightgray'}}>  
                    <Document
                        file={'/dummy.pdf'} 
                        onLoadSuccess={({ numPages })=>setNumPages(numPages)} 
                    >
                        {Array.apply(null, Array(numPages))
                        .map((x, i)=>i+1)
                        .map(page => 
                          <div style={{ marginBottom: '20px' }}>
                            <Page
                              pageNumber={page}
                              renderAnnotationLayer={false}
                              renderTextLayer={false}
                            />
                          </div>)}
                    </Document>
                  </Modal.Body>
                  <Modal.Footer> 
                    <div>
                      <button type="button" onClick={convertAndDownloadPDF}>Download</button>
                      <button type="button" className="btnClose" onClick={handleCloseModal}>Close</button>
                    </div>
                  </Modal.Footer>
                </Modal>

              </div>
              </div>
              <Footer />
          </div>
      </div>
  );
}

export default RequestView;

