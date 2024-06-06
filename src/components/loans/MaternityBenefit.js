import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../navbar';
import TopNavbar from '../topnavbar';
import Footer from '../footer';
import '../../App.css';
import { variables } from '../../variables';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 function MaternityBenefit() {
   
    const { employeeId } = useParams();
    const [employeeData, setEmployeeData] = useState({
      LastName: '',
      FirstName: '',
      MiddleName: '',
      MaidenName: '',
      Birthdate: '',
      Age: '',
      BirthMonth: '',
      AgeBracket: '',
      Aender: '',
      MaritalStatus: '',
      SSS: '',
      PHIC: '',
      HDMF: '',
      TIN: '',
      HRANID: '',
      ContactNumber: '',
      EmailAddress: '',
      deliveryType: ''
    });
    
    const [selected, setSelected] = useState("0")
    const [thisInfo, setThisInfo] = useState({
      Application_Form: '',
      LiveBirthCert: '',
      SoloParent: '',
      ProofPregnancy: '',
      HospitalRec: '',
      DeathCert: ''
    });

    useEffect(() => {
      // Fetch employee data based on employeeId
      const fetchEmployeeData = async () => {
        try {
          const response = await fetch(variables.API_URL + 'UploadEmp/' + employeeId);
          if (!response.ok) {
            throw new Error('Failed to fetch employee data');
          }
          const data = await response.json();
          setEmployeeData(data);
        } catch (error) {
          console.error('Error fetching employee data:', error);
        }
      };
  
      fetchEmployeeData();
    }, [employeeId]);
  
    const handleInputChange = (e) => {
      
      setSelected(e.target.value);

      const { name, value } = e.target;
      setEmployeeData({
        ...employeeData,
        [name]: value
      });
    }; 
    // const handleFormSubmit = async (e) => {
    //   e.preventDefault();
    

    //   const formData = new FormData();
    //   formData.append("selected", selected); // Assuming selected is defined
    //   formData.append('Application_Form', thisInfo.Application_Form); // Assuming thisInfo.Application_Form is defined
  
    //   // Append other files based on selected option
    //   if(selected === '1'){
    //       formData.append('LiveBirthCert', thisInfo.LiveBirthCert);
    //       formData.append('SoloParent', thisInfo.SoloParent);
    //   } else if(selected === '2'){
    //       formData.append('ProofPregnancy', thisInfo.ProofPregnancy);
    //       formData.append('HospitalRec', thisInfo.HospitalRec);
    //   } else if(selected === '3'){
    //       formData.append('DeathCert', thisInfo.DeathCert);
    //   }

    //   try {
    //     const response = await fetch('/MaternityBenefit', {
    //         method: 'POST',
    //         body: formData,
    //     });
    
    //     if (response.ok) {
    //         const jsonResponse = await response.json();
    
    //         console.log(jsonResponse.message);
    //          // Emit success toast
    //          toast.success('Submitted Successfully', {
    //           position: "bottom-right",
    //           autoClose: 5000,
    //           hideProgressBar: false,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: true,
    //           progress: undefined,
    //           theme: "light",
    //         });
          
    //         setEmployeeData({
    //           deliveryType: ''
    //         });
    //         setThisInfo({
    //           Application_Form: '',
    //           LiveBirthCert: '',
    //           SoloParent: '',
    //           ProofPregnancy: '',
    //           HospitalRec: '',
    //           DeathCert: ''
    //         });

            
    //         // Clear file input fields
    //         document.getElementById('deliveryType').value = null;
    //         setSelected("0");
    //         document.getElementById('Application_Form').value = null;
    
           
    //       } else {
    //           console.error('Failed to upload PDF:', response.statusText);
    //           toast.error('Failed to Submit', {
    //               position: "bottom-right",
    //               autoClose: 5000,
    //               hideProgressBar: false,
    //               closeOnClick: true,
    //               pauseOnHover: true,
    //               draggable: true,
    //               progress: undefined,
    //               theme: "light",
    //           });
    //       }
    //   } catch (error) {
    //       console.error('Error uploading PDF:', error);
    //   }
    // };

    const handleFormSubmit = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append("selected", selected); // Assuming selected is defined
      formData.append('Application_Form', thisInfo.Application_Form); // Assuming thisInfo.Application_Form is defined
  
      const validFileTypes = ['application/pdf', 'image/png', 'image/jpeg'];
  
      const validateFileType = (file) => {
          return validFileTypes.includes(file.type);
      };
  
      // Append other files based on selected option
      if (selected === '1') {
          if (!validateFileType(thisInfo.LiveBirthCert) || !validateFileType(thisInfo.SoloParent)) {
              return toast.error('Invalid file type. Only PDF, PNG, and JPEG are allowed.', {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
              });
          }
          formData.append('LiveBirthCert', thisInfo.LiveBirthCert);
          formData.append('SoloParent', thisInfo.SoloParent);
      } else if (selected === '2') {
          if (!validateFileType(thisInfo.ProofPregnancy) || !validateFileType(thisInfo.HospitalRec)) {
              return toast.error('Invalid file type. Only PDF, PNG, and JPEG are allowed.', {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
              });
          }
          formData.append('ProofPregnancy', thisInfo.ProofPregnancy);
          formData.append('HospitalRec', thisInfo.HospitalRec);
      } else if (selected === '3') {
          if (!validateFileType(thisInfo.DeathCert)) {
              return toast.error('Invalid file type. Only PDF, PNG, and JPEG are allowed.', {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
              });
          }
          formData.append('DeathCert', thisInfo.DeathCert);
      }
  
      try {
          const response = await fetch('/MaternityBenefit', {
              method: 'POST',
              body: formData,
          });
  
          if (response.ok) {
              const jsonResponse = await response.json();
              console.log(jsonResponse.message);
              // Emit success toast
              toast.success('Thank you! Your request has been submitted.', {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
              });
  
              setEmployeeData({
                  deliveryType: ''
              });
              setThisInfo({
                  Application_Form: '',
                  LiveBirthCert: '',
                  SoloParent: '',
                  ProofPregnancy: '',
                  HospitalRec: '',
                  DeathCert: ''
              });
  
              // Clear file input fields
              document.getElementById('deliveryType').value = null;
              setSelected("0");
              document.getElementById('Application_Form').value = null;
          } else {
            console.error('Failed to submit request:', response.statusText);
            toast.error('Failed to Submit', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
          }
        } catch (error) {
            console.error('Error uploading:', error);
        }
      };
  

    const handleApplicationForm = (e) => {
      setThisInfo({ ...thisInfo, Application_Form: e.target.files[0] });
    };
    const handleLiveBirthCert = (e) => {
      setThisInfo({ ...thisInfo, LiveBirthCert: e.target.files[0] });
    };
    const handleSoloParent = (e) => {
      setThisInfo({ ...thisInfo, SoloParent: e.target.files[0] });
    };
    const handleProofPregnancy = (e) => {
      setThisInfo({ ...thisInfo, ProofPregnancy: e.target.files[0] });
    };
    const handleHospitalRec = (e) => {
      setThisInfo({ ...thisInfo, HospitalRec: e.target.files[0] });
    };
    const handleDeathCert = (e) => {
      setThisInfo({ ...thisInfo, DeathCert: e.target.files[0] });
    };
  
    if (!employeeData) {
      return <div>Loading...</div>;
    }
    return (
      <div id="wrapper">
          <Navbar />
          <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <TopNavbar />
                <div className="container-fluid">
                    <div className="row justify-content-center">
                      <h4 className="m-0 font-weight-bold text-primary header-name">Maternity Benefit</h4>
                    </div>
                    <form onSubmit={handleFormSubmit}>

                      {/* page content begin here */}
                      <div className="container-fluid">
                        <div className="row justify-content-center">
                          <div className="col-xl-8 col-lg-7">
                            <div className="card shadow mb-4">
                              {/* Card Header - New Hire Upload */}
                              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">SSS Maternity Reimbursement Application Form</h6>
                              </div>
                              {/* Card Body - New Hire Options */}
                              <div className="card-body">
                                <div className="tab-content">
                                    <div className="d-flex justify-content-left">
                                      <input type="file" className="input-file" aria-describedby="fileHelp" onChange={handleApplicationForm} id='Application_Form'/>
                                      <small id="fileHelp" className="form-text text-muted">Choose a file to upload.</small>
                                  </div>
                                      <button style={{ fontSize: '12px', border: 'none', background: 'none', marginBottom: '15px' }} type="button">
                                        <a href="https://www.sss.gov.ph/sss/DownloadContent?fileName=SIC_01242.pdf" target="_blank" rel="noopener noreferrer">Please see link for the steps/process</a>
                                      </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Page content ends here */}
                      
                      {/* page content begin here */}
                      <div className="container-fluid">
                        <div className="row justify-content-center">
                          <div className="col-xl-8 col-lg-7">
                            <div className="card shadow mb-4">
                              {/* Card Header - New Hire Upload */}
                              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Delivery</h6>
                              </div>
                              {/* Card Body - New Hire Options */}
                              <div className="card-body">
                                <div className="tab-content card-tab">
                                  <div className="card-body">
                                    <div className="d-flex justify-content-left">
                                      <div className="form-group">
                                        <label htmlFor="deliveryType">Type of Delivery</label>
                                        <select className="form-control" id="deliveryType" name="deliveryType" value={employeeData.deliveryType} onChange={handleInputChange}>
                                          <option value="0" >Select Type</option>
                                          <option value="1">Live Child Birth</option>
                                          <option value="2">Miscarriage/ Emergency Termination of Pregnancy/ Ectopic Pregnancy</option>
                                          <option value="3">Still Birth/ Fetal Death</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                  {/* Vertical line */}
                                  <div className="vertical-line"></div>
                                    <div className="card-body">
                                      <div className="d-flex justify-content-left ">
                                        { selected === "0" && (
                                          <div className="no-selected">
                                            <label >Select a type of delivery</label>  
                                          </div>
                                        )}
                                        { selected === "1" && selected  !== "0" && (
                                        <div className="row justify-content-left content-holder">
                                          <div className="form-group">
                                            <label htmlFor="middleName">Live Childbirth</label>  
                                          </div>
                                          <div className="form-group">
                                            <label style={{ fontSize: '14px' }}>Proof of Child's Birth (Live Birth Certificate)</label>
                                            <input id='LiveBirthCert' type="file" className="form-control-file" aria-describedby="fileHelp" onChange={handleLiveBirthCert}/>
                                            <small id="fileHelp" className="form-text text-muted">Choose a file to upload.</small>
                                          </div>

                                          <div style={{ border: '1px solid #ccc', marginTop: '5px', marginBottom: '5px' }} />

                                          <div className="form-group">
                                            <label style={{ fontSize: '14px' }}>Solo Parent ID or Certificate of Eligibility (Solo Parent only)</label> 
                                            <input id='SoloParent' type="file" className="form-control-file" aria-describedby="fileHelp" onChange={handleSoloParent}/>
                                            <small id="fileHelp" className="form-text text-muted">Choose a file to upload.</small>
                                          </div>

                                          <label style={{ fontSize: '10px' }}>Note: Documents issued in a foreign country shall be submitted with English Translation, if applicable</label>
                                        </div> 
                                        )}
                                         
                                        { selected === '2' && selected !== '0' && selected !== '1' && (
                                        <div className="row justify-content-left content-holder">
                                          <div className="form-group">
                                          <label htmlFor="middleName">Miscarriage/ Emergency Termination of Pregnancy/ Ectopic Pregnancy</label> 
                                          </div>
                                          <div className="form-group">
                                            <label htmlFor="middleName">Proof of Pregnancy</label> 
                                            <input id='ProofPregnancy' type="file" className="form-control-file" aria-describedby="fileHelp" onChange={handleProofPregnancy}/>
                                            <small id="fileHelp" className="form-text text-muted">Choose a file to upload.</small>
                                          </div>

                                          <div style={{ border: '1px solid #ccc', marginTop: '5px', marginBottom: '5px' }} />
                                          
                                          <div className="form-group">
                                            <label htmlFor="middleName">Proof of Termination of Pregnancy/ Hospital Record</label> 
                                            <input id='HospitalRec' type="file" className="form-control-file" aria-describedby="fileHelp" onChange={handleHospitalRec}/>
                                            <small id="fileHelp" className="form-text text-muted">Choose a file to upload.</small>
                                          </div>
                                        </div>  
                                        )}

                                        { selected === '3' && selected !== '0' && selected !== '1' && selected !== '2' && (
                                        <div className="row justify-content-left content-holder">
                                          <div className="form-group">
                                          <label htmlFor="middleName">Still Birth/Fetal Death</label> 
                                          </div>
                                          <div className="form-group">
                                            <label htmlFor="middleName">Fetal Certificate of Death/ Hospital/ Medical Records</label> 
                                            <input id='DeathCert' type="file" className="form-control-file" aria-describedby="fileHelp" onChange={handleDeathCert}/>
                                            <small id="fileHelp" className="form-text text-muted">Choose a file to upload.</small>
                                          </div>
                                        </div>  
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Page content ends here */}
                        <button type="submit" className="btn btn-primary d-block mx-auto loan-btn">Submit</button>
                    </form>
                  </div>
                </div>
              <Footer />
          </div>
          <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
      </div>
  );
}

export default MaternityBenefit;

