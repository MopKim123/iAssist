import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../navbar';
import TopNavbar from '../topnavbar';
import Footer from '../footer';
import '../../App.css';
import { variables } from '../../variables';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 function MaternityNotification() {
   
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
      EmailAddress: ''
    });

    const [thisInfo, setThisInfo] = useState({
      Notication_Form: '',
      Maternity_Eligibility: '',
      Credit_Form: '',
      Medical_Reports: ''
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
      handleSetLinks();
    }, [employeeId]);
  
  
    // const handleFormSubmit = async (e) => {
    //   e.preventDefault();
      
    //   const formData = new FormData();
    //   formData.append('Notication_Form', thisInfo.Notication_Form);
    //   formData.append('Maternity_Eligibility', thisInfo.Maternity_Eligibility);
    //   formData.append('Credit_Form', thisInfo.Credit_Form);
    //   formData.append('Medical_Reports', thisInfo.Medical_Reports);

    //     try {
    //       const response = await fetch('/MaternityNotification', {
    //         method: 'POST',
    //         body: formData,
    //       });
    
    //       if (response.ok) {
    //         const jsonResponse = await response.json();

    //         console.log(jsonResponse.message);

    //         setThisInfo({
    //           Notication_Form: '',
    //           Maternity_Eligibility: '',
    //           Credit_Form: '',
    //           Medical_Reports: ''
    //         });
      
    //         // Clear file input fields
    //         document.getElementById('Notication_Form').value = null;
    //         document.getElementById('Maternity_Eligibility').value = null;
    //         document.getElementById('Credit_Form').value = null;
    //         document.getElementById('Medical_Reports').value = null;

    //         // Emit success toast
    //         toast.success('Submitted Successfully', {
    //           position: "bottom-right",
    //           autoClose: 5000,
    //           hideProgressBar: false,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: true,
    //           progress: undefined,
    //           theme: "light",
    //         });
    
    //       } else {
    //         console.error('Failed to upload PDF:', response.statusText);
    //           toast.error('Failed to Submit', {
    //             position: "bottom-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //           });
    //       }
    //     } catch (error) {
    //       console.error('Error uploading PDF:', error);
    //     }
    // };

    const handleFormSubmit = async (e) => {
      e.preventDefault();
    
      // Function to validate file type
      const isValidFileType = (file) => {
        const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg'];
        return allowedTypes.includes(file.type);
      };
    
      // Collecting files
      const noticationForm = thisInfo.Notication_Form;
      const maternityEligibility = thisInfo.Maternity_Eligibility;
      const creditForm = thisInfo.Credit_Form;
      const medicalReports = thisInfo.Medical_Reports;
    
      // Validate files
      if (!isValidFileType(noticationForm) || !isValidFileType(maternityEligibility) ||
          !isValidFileType(creditForm) || !isValidFileType(medicalReports)) {
        toast.error('Only PDF, PNG, or JPEG files are allowed', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
    
      const formData = new FormData();
      formData.append('Notication_Form', noticationForm);
      formData.append('Maternity_Eligibility', maternityEligibility);
      formData.append('Credit_Form', creditForm);
      formData.append('Medical_Reports', medicalReports);
    
      try {
        const response = await fetch('/MaternityNotification', {
          method: 'POST',
          body: formData,
        });
    
        if (response.ok) {
          const jsonResponse = await response.json();
    
          console.log(jsonResponse.message);
    
          setThisInfo({
            Notication_Form: '',
            Maternity_Eligibility: '',
            Credit_Form: '',
            Medical_Reports: ''
          });
    
          // Clear file input fields
          document.getElementById('Notication_Form').value = null;
          document.getElementById('Maternity_Eligibility').value = null;
          document.getElementById('Credit_Form').value = null;
          document.getElementById('Medical_Reports').value = null;
    
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
    
        }  else {
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
    
    const handleNotication_Form = (e) => {
      setThisInfo({ ...thisInfo, Notication_Form: e.target.files[0] });
    };
    const handMaternity_Eligibility = (e) => {
      setThisInfo({ ...thisInfo, Maternity_Eligibility: e.target.files[0] });
    };
    const handleCredit_Form = (e) => {
      setThisInfo({ ...thisInfo, Credit_Form: e.target.files[0] });
    };
    const handleMedical_Reports = (e) => {
      setThisInfo({ ...thisInfo, Medical_Reports: e.target.files[0] });
    };
  
    const handleSetLinks = async () => {
      try {
          const response = await fetch('/setLink', {
              method: 'POST'
          });
  
          if (response.ok) {
              const jsonResponse = await response.json();

              const url = jsonResponse.data;
  
            //   if(selected === '1'){
            //       setThisSOA({
            //         thisLabel: url[0].LinkName,
            //         thisLink: url[0].LinkURL
            //       });
            //       setThisVF({
            //         thisLabel: url[1].LinkName,
            //         thisLink: url[1].LinkURL
            //       });
            //   }else if(selected === '2'){
                
              
            // }
              
          }
        } catch (error) {
            console.error('Error fetching links:', error);
        }
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
                      <h4 className="m-0 font-weight-bold text-primary header-name">Maternity Notification</h4>
                    </div>
                  </div>
                  <form onSubmit={handleFormSubmit}>
                    {/* page content begin here */}
                    <div className="container-fluid">
                      <div className="row justify-content-center">
                        <div className="col-xl-8 col-lg-7">
                          <div className="card shadow mb-4">
                            {/* Card Header - New Hire Upload */}
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                              <h6 className="m-0 font-weight-bold text-primary">SSS Maternity Notification Form</h6>
                            </div>
                            {/* Card Body - New Hire Options */}
                            <div className="card-body">
                              <div className="tab-content">
                                <div className="card-body">
                                  <div className="d-flex justify-content-left">
                                    <input id='Notication_Form' type="file" className="input-file" aria-describedby="fileHelp" onChange={handleNotication_Form}/>
                                    <small id="fileHelp" className="form-text text-muted">Choose a file to upload.</small>
                                  </div>
                                  <button style={{ fontSize: '12px', border: 'none', background: 'none' }} type="button">
                                    <a href="https://www.sss.gov.ph/sss/DownloadContent?fileName=SIC_01241.pdf" target="_blank" rel="noopener noreferrer">Link to download SSS Maternity Form</a>
                                  </button>
                                </div>
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
                              <h6 className="m-0 font-weight-bold text-primary">Screenshot of SSS Maternity Eligibility</h6>
                            </div>
                            {/* Card Body - New Hire Options */}
                            <div className="card-body">
                              <div className="tab-content">
                                <div className="card-body">
                                  <div className="d-flex justify-content-left">
                                    <input id='Maternity_Eligibility' type="file" className="input-file" aria-describedby="fileHelp" onChange={handMaternity_Eligibility}/>
                                    <small id="fileHelp" className="form-text text-muted">Choose a file to upload.</small>
                                  </div>
                                  <button style={{ fontSize: '12px', border: 'none', background: 'none' }} type="button">
                                    <a href="https://innodata-my.sharepoint.com/:b:/p/zax/EWXR8fUdvqhBoGd00VF5dvABgcA6oPrNY-Ba1rA2AlBMTw?e=KPEBNN" target="_blank" rel="noopener noreferrer">Please see link for the steps/process</a>
                                  </button>
                                </div>
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
                              <h6 className="m-0 font-weight-bold text-primary">SSS Allocation of Maternity Leave Credit Form</h6>
                            </div>
                            {/* Card Body - New Hire Options */}
                            <div className="card-body">
                              <div className="tab-content">
                                <div className="card-body">
                                  <div className="d-flex justify-content-left">
                                    <input id='Credit_Form' type="file" className="input-file" aria-describedby="fileHelp" onChange={handleCredit_Form}/>
                                    <small id="fileHelp" className="form-text text-muted">Choose a file to upload.</small>
                                  </div>
                                  <button style={{ fontSize: '12px', border: 'none', background: 'none' }} type="button">
                                    <a href="https://www.sss.gov.ph/sss/DownloadContent?fileName=smd-01409.pdf" target="_blank" rel="noopener noreferrer">Please see link for the steps/process</a>
                                  </button>
                                </div>
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
                              <h6 className="m-0 font-weight-bold text-primary">Medical Certificate or Ultrasound Report</h6>
                            </div>
                            {/* Card Body - New Hire Options */}
                            <div className="card-body">
                              <div className="tab-content">
                                <div className="card-body">
                                  <div className="d-flex justify-content-left">
                                    <input id='Medical_Reports' type="file" className="input-file" aria-describedby="fileHelp" onChange={handleMedical_Reports}/>
                                    <small id="fileHelp" className="form-text text-muted">Choose a file to upload.</small>
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

export default MaternityNotification;

