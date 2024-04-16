import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../navbar';
import TopNavbar from '../topnavbar';
import Footer from '../footer';
import '../../App.css';
import { variables } from '../../variables';

function SSSLoan() {

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

    const [selectedFile, setSelectedFile] = useState(null);

    // useEffect(() => {
    //     // Fetch employee data based on employeeId
    //     const fetchEmployeeData = async () => {
    //         try {
    //             const response = await fetch(variables.API_URL + 'UploadEmp/' + employeeId);
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch employee data');
    //             }
    //             const data = await response.json();
    //             setEmployeeData(data);
    //         } catch (error) {
    //             console.error('Error fetching employee data:', error);
    //         }
    //     };

    //     fetchEmployeeData();
    // }, [employeeId]);

    // const handleFormSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log(selectedFile);

    //     const checkResponse = await fetch('http://localhost:5000/upload', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({sssloanPDF: selectedFile.name }),
    //   });
      
    //   if (!checkResponse.ok) {
    //     console.error('Failed to check employee ID:', checkResponse.statusText);
    //     return;
    //   }
    // };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
      
        const formData = new FormData();
        formData.append('sssloanPDF', selectedFile); // Assuming selectedFile holds the PDF file
      
        try {
          const uploadResponse = await fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData,
          });
      
          if (!uploadResponse.ok) {
            console.error('Failed to upload PDF:', uploadResponse.statusText);
            return;
          }
      
          console.log('PDF uploaded successfully');
        } catch (error) {
          console.error('Error uploading PDF:', error);
        }
      };
      

    const handleFileSelect = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    if (!employeeData) {
        return <div>Loading...</div>;
    }

    const getCurrentDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        let month = now.getMonth() + 1;
        let day = now.getDate();

        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }

        return `${year}-${month}-${day}`;
    };


    return (
        <div id="wrapper">
            <Navbar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <TopNavbar />
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <h4 className="m-0 font-weight-bold text-primary header-name">SSS Loan</h4>
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
                                            <h6 className="m-0 font-weight-bold text-primary">Loan Details</h6>
                                        </div>
                                        {/* Card Body - New Hire Options */}
                                        <div className="card-body">
                                            <div className="tab-content">
                                                <div className="card-body loan-row">
                                                    <div className="form-group">
                                                        <label>Loan Application Date</label>
                                                        <input
                                                            type="date"
                                                            className="form-control"
                                                            id="loanApplicationDate"
                                                            name="loanApplicationDate"
                                                            max={getCurrentDate()}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="name">Transaction Number</label>
                                                        <input type="text" className="form-control" id="name" name="name" />
                                                    </div>
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
                                            <h6 className="m-0 font-weight-bold text-primary">1 Month Pay Slip</h6>
                                        </div>
                                        {/* Card Body - New Hire Options */}
                                        <div className="card-body">
                                            <div className="tab-content">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-left">
                                                        <input
                                                            type="file"
                                                            className="input-file"
                                                            aria-describedby="fileHelp"
                                                            onChange={handleFileSelect}
                                                        />
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
                        {/* page content begin here */}
                        <div className="container-fluid">
                            <div className="row justify-content-center">
                                <div className="col-xl-8 col-lg-7">
                                    <div className="card shadow mb-4">
                                        {/* Card Header - New Hire Upload */}
                                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 className="m-0 font-weight-bold text-primary">Loan Disclosure Statement</h6>
                                        </div>
                                        {/* Card Body - New Hire Options */}
                                        <div className="card-body">
                                            <div className="tab-content">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-left">
                                                        <input type="file" className="input-file" aria-describedby="fileHelp" />
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
        </div>
    );
}

export default SSSLoan;