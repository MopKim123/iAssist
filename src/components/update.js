import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './navbar';
import TopNavbar from './topnavbar';
import Footer from './footer';
import '../App.css';
import { variables } from '../variables';

 function UpdateEmployeeInfo() {
   
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
      const { name, value } = e.target;
      setEmployeeData({
        ...employeeData,
        [name]: value
      });
    };
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(variables.API_URL + 'UploadEmp/' + employeeId, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(employeeData)
        });
        if (!response.ok) {
          throw new Error('Failed to update employee');
        }
        // Handle successful update
        console.log('Employee updated successfully');
      } catch (error) {
        console.error('Error updating employee:', error);
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
            <div className="col-xl-12 col-xl-9">
              <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <ul className="nav nav-tabs nav-fill">
                      <li className="nav-item">
                          <a className="nav-link active " id="personalDetails-tab" data-toggle="tab" href="#personalDetails" role="tab" aria-controls="personalDetails" aria-selected="false">Employee Personal Details</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link" id="employmentInfo-tab" data-toggle="tab" href="#employmentInfo" role="tab" aria-controls="employmentInfo" aria-selected="false">Employment Information</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link " id="projectCode-tab" data-toggle="tab" href="#projectCode" role="tab" aria-controls="projectCode" aria-selected="false">Project Code</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link " id="shift-tab" data-toggle="tab" href="#shift" role="tab" aria-controls="shift" aria-selected="false">Shift</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link " id="deliveryUnit-tab" data-toggle="tab" href="#deliveryUnit" role="tab" aria-controls="deliveryUnit" aria-selected="false">Delivery Unit</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link " id="department-tab" data-toggle="tab" href="#department" role="tab" aria-controls="department" aria-selected="false">Department</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link " id="address-tab" data-toggle="tab" href="#address" role="tab" aria-controls="address" aria-selected="false">Address</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link " id="education-tab" data-toggle="tab" href="#education" role="tab" aria-controls="education" aria-selected="false">Education</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link " id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Contact</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link " id="emergencyContact-tab" data-toggle="tab" href="#emergencyContact" role="tab" aria-controls="emergencyContact" aria-selected="false">Emergency Contact</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link " id="dependent-tab" data-toggle="tab" href="#dependent" role="tab" aria-controls="dependent" aria-selected="false">Dependent</a>
                      </li>
                      <li className="nav-item">
                          <a className="nav-link " id="product-tab" data-toggle="tab" href="#product" role="tab" aria-controls="product" aria-selected="false">Product</a>
                      </li>
                  </ul>
                  </div>
                 <br/>
                  <div className="tab-content">
                      <div className="tab-pane fade show active" id="personalDetails" role="tabpanel" aria-labelledby="personalDetails-tab">
                          {/* Personal Details Form */}
                        <div className="container">
                            <form onSubmit={handleFormSubmit}>
                                <div className="row justify-content-center">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Employee ID</label>
                                            <span className="form-control">{employeeData.EmpID}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="emailAddress">Email Address</label>
                                            <input type="text" className="form-control" id="emailAddress" name="emailAddress" value={employeeData.EmailAddress} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="contactNumber">Contact Number</label>
                                            <input type="text" className="form-control" id="contactNumber" name="contactNumber" value={employeeData.ContactNumber} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input type="text" className="form-control" id="name" name="name" value={employeeData.Name} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="lastName">Last Name</label>
                                            <input type="text" className="form-control" id="lastName" name="LastName" value={employeeData.LastName} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="firstName">First Name</label>
                                            <input type="text" className="form-control" id="firstName" name="FirstName" value={employeeData.FirstName} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="middleName">Middle Name</label>
                                            <input type="text" className="form-control" id="middleName" name="MiddleName" value={employeeData.MiddleName} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="maidenName">Maiden Name</label>
                                            <input type="text" className="form-control" id="maidenName" name="maidenName" value={employeeData.MaidenName} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="birthdate">Birthdate</label>
                                              <input type="text" className="form-control" id="birthdate" name="birthdate" value={employeeData.Birthdate} onChange={handleInputChange} />
                                              </div>
                                            </div>

                                </div>
                                <div className="row justify-content-center">
                                <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="age">Age</label>
                                              <input type="number" className="form-control" id="age" name="age" value={employeeData.Age} onChange={handleInputChange} />
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="birthMonth">Birth Month</label>
                                              <input type="text" className="form-control" id="birthMonth" name="birthMonth" value={employeeData.BirthMonth} onChange={handleInputChange} />      
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="ageBracket">Age Bracket</label>
                                              <input type="text" className="form-control" id="ageBracket" name="ageBracket" value={employeeData.AgeBracket} onChange={handleInputChange} />
                                              </div>
                                            </div>

                                </div>
                                <div className="row justify-content-center">
                                <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="gender">Gender</label>
                                              <input type="text" className="form-control" id="gender" name="gender" value={employeeData.Gender} onChange={handleInputChange} />
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="maritalStatus">Marital Status</label>
                                              <input type="text" className="form-control" id="maritalStatus" name="maritalStatus" value={employeeData.MaritalStatus} onChange={handleInputChange} />
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="SSS">SSS No.</label>
                                              <input type="text" className="form-control" id="SSS" name="SSS" value={employeeData.SSS} onChange={handleInputChange} />     
                                              </div>
                                            </div>
                                </div>
                                <div className="row justify-content-center">
                                <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="PHIC">PHIC</label>
                                              <input type="text" className="form-control" id="PHIC" name="PHIC" value={employeeData.PHIC} onChange={handleInputChange} />
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="HDMF">HDMF</label>
                                              <input type="text" className="form-control" id="HDMF" name="HDMF" value={employeeData.HDMF} onChange={handleInputChange} />      
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="TIN">TIN</label>
                                              <input type="text" className="form-control" id="TIN" name="TIN" value={employeeData.TIN} onChange={handleInputChange} />
                                              </div>
                                            </div>
                                </div>
                                <div className="row justify-content-center">
                                <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="HRANID">HRANID</label>
                                              <input type="text" className="form-control" id="HRANID" name="HRANID" value={employeeData.HRANID} onChange={handleInputChange} />     
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="contactNumber">Contact Number</label>
                                              <input type="text" className="form-control" id="contactNumber" name="contactNumber" value={employeeData.ContactNumber} onChange={handleInputChange} />
                                              </div>
                                            </div>
                                </div>
                                <button type="submit" className="btn btn-primary d-block mx-auto">Save Changes</button>
                            </form>
                        </div>
                      <br/>
                      </div>
                      <div className="tab-pane fade" id="employmentInfo" role="tabpanel" aria-labelledby="employmentInfo-tab">
                          {/* Employment Information Form */}
                          <div className="container">
                            <form onSubmit={handleFormSubmit}>
                                <div className="row justify-content-center">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Employee Info ID</label>
                                            <span className="form-control">{employeeData.EmpID}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="hranId">HRAN ID</label>
                                            <input type="text" className="form-control" id="hranId" name="hranId" value={employeeData.EmailAddress} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="dateHired">Date Hired</label>
                                            <input type="text" className="form-control" id="dateHired" name="dateHired" value={employeeData.ContactNumber} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="tenure">Tenure</label>
                                            <input type="text" className="form-control" id="tenure" name="tenure" value={employeeData.Name} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="empLevel">Employee Level</label>
                                            <input type="text" className="form-control" id="empLevel" name="empLevel" value={employeeData.LastName} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="projectCode">Project Code</label>
                                            <input type="text" className="form-control" id="projectCode" name="projectCode" value={employeeData.FirstName} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="projectName">Project Name</label>
                                            <input type="text" className="form-control" id="projectName" name="projectName" value={employeeData.MiddleName} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="designation">Designation</label>
                                            <input type="text" className="form-control" id="designation" name="designation" value={employeeData.MaidenName} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="department">Department</label>
                                              <input type="text" className="form-control" id="department" name="department" value={employeeData.Birthdate} onChange={handleInputChange} />
                                              </div>
                                            </div>
                                   </div>
                                <div className="row justify-content-center">
                                <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="productCode">Product Code</label>
                                              <input type="text" className="form-control" id="productCode" name="productCode" value={employeeData.Age} onChange={handleInputChange} />
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="prodDesc"> Product Description</label>
                                              <input type="text" className="form-control" id="prodDesc" name="prodDesc" value={employeeData.BirthMonth} onChange={handleInputChange} />      
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="employementStatus">Employment Status</label>
                                              <input type="text" className="form-control" id="employementStatus" name="employementStatus" value={employeeData.AgeBracket} onChange={handleInputChange} />
                                              </div>
                                            </div>
                                </div>
                                <div className="row justify-content-center">
                                <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="empStatus">Employee Status</label>
                                              <input type="text" className="form-control" id="empStatus" name="empStatus" value={employeeData.Gender} onChange={handleInputChange} />
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="workWeekType"> Work week type</label>
                                              <input type="text" className="form-control" id="workWeekType" name="workWeekType" value={employeeData.MaritalStatus} onChange={handleInputChange} />
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="shift">Shift</label>
                                              <input type="text" className="form-control" id="shift" name="shift" value={employeeData.SSS} onChange={handleInputChange} />     
                                              </div>
                                            </div>
                                </div>
                                <div className="row justify-content-center">
                                <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="workArrangement">Work Arrangement</label>
                                              <input type="text" className="form-control" id="workArrangement" name="workArrangement" value={employeeData.PHIC} onChange={handleInputChange} />
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="rateClass">Rate Class</label>
                                              <input type="text" className="form-control" id="rateClass" name="rateClass" value={employeeData.HDMF} onChange={handleInputChange} />      
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="rate">Rate</label>
                                              <input type="text" className="form-control" id="rate" name="rate" value={employeeData.TIN} onChange={handleInputChange} />
                                              </div>
                                            </div>
                                </div>
                                <div className="row justify-content-center">
                                <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="managerId">Manager Id</label>
                                              <input type="text" className="form-control" id="managerId" name="managerId" value={employeeData.HRANID} onChange={handleInputChange} />     
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="managerName">Manager Name</label>
                                              <input type="text" className="form-control" id="managerName" name="managerName" value={employeeData.ContactNumber} onChange={handleInputChange} />
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="pmpicid">PMPICID</label>
                                              <input type="text" className="form-control" id="pmpicid" name="pmpicid" value={employeeData.ContactNumber} onChange={handleInputChange} />
                                              </div>
                                            </div>
                                </div>
                                <div className="row justify-content-center">
                                <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="HRANID">Delivery Unit</label>
                                              <input type="text" className="form-control" id="HRANID" name="HRANID" value={employeeData.HRANID} onChange={handleInputChange} />     
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="duhid">DUHID</label>
                                              <input type="text" className="form-control" id="duhid" name="duhid" value={employeeData.ContactNumber} onChange={handleInputChange} />
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="isManager">Is Manager</label>
                                              <input type="text" className="form-control" id="isManager" name="isManager" value={employeeData.ContactNumber} onChange={handleInputChange} />
                                              </div>
                                            </div>
                                </div>
                                <div className="row justify-content-center">
                                <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="isPmpic">Is PMPIC</label>
                                              <input type="text" className="form-control" id="isPmpic" name="isPmpic" value={employeeData.HRANID} onChange={handleInputChange} />     
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="isIndContributor">Is Individual Contributor</label>
                                              <input type="text" className="form-control" id="isIndContributor" name="isIndContributor" value={employeeData.ContactNumber} onChange={handleInputChange} />
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="isActive">Is Active</label>
                                              <input type="text" className="form-control" id="isActive" name="isActive" value={employeeData.ContactNumber} onChange={handleInputChange} />
                                              </div>
                                            </div>
                                </div>
                                <div className="row justify-content-center">
                                <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="HRANType">HRAN Type</label>
                                              <input type="text" className="form-control" id="HRANType" name="HRANType" value={employeeData.HRANID} onChange={handleInputChange} />     
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="titoType">TITO Type</label>
                                              <input type="text" className="form-control" id="titoType" name="titoType" value={employeeData.ContactNumber} onChange={handleInputChange} />
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="isDuHead">Is DU Head</label>
                                              <input type="text" className="form-control" id="isDuHead" name="isDuHead" value={employeeData.ContactNumber} onChange={handleInputChange} />
                                              </div>
                                            </div>
                                </div>
                                <div className="row justify-content-center">
                                <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="position">Position</label>
                                              <input type="text" className="form-control" id="position" name="position" value={employeeData.HRANID} onChange={handleInputChange} />     
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="positionLevel">Position Level</label>
                                              <input type="text" className="form-control" id="positionLevel" name="positionLevel" value={employeeData.ContactNumber} onChange={handleInputChange} />
                                              </div>
                                            </div>
                                            <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="EmpID">Employee Id</label>
                                              <input type="text" className="form-control" id="EmpID" name="EmpID" value={employeeData.EmpID} onChange={handleInputChange} />
                                              </div>
                                            </div>
                                </div>
                                {/* <button type="submit" className="btn btn-primary d-block mx-auto">Submit</button> */}
                            </form>
                        </div>
                      <br/>
                      </div>
                      <div className="tab-pane fade" id="projectCode" role="tabpanel" aria-labelledby="projectCode-tab">
                          {/* Project Code Form */}
                          <div className="container">
                            <form onSubmit={handleFormSubmit}>
                                <div className="row justify-content-center">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Project ID</label>
                                            <span className="form-control">{employeeData.EmpID}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="projectCode">Project Code</label>
                                            <input type="text" className="form-control" id="projectCode" name="projectCode" value={employeeData.EmailAddress} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="projectName">Project Name</label>
                                            <input type="text" className="form-control" id="projectName" name="projectName" value={employeeData.MiddleName} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="tenure">Tenure</label>
                                            <input type="text" className="form-control" id="tenure" name="tenure" value={employeeData.Name} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="empLevel">Employee Level</label>
                                            <input type="text" className="form-control" id="empLevel" name="empLevel" value={employeeData.LastName} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="projectCode">Project Code</label>
                                            <input type="text" className="form-control" id="projectCode" name="projectCode" value={employeeData.FirstName} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="projectName">Project Name</label>
                                            <input type="text" className="form-control" id="projectName" name="projectName" value={employeeData.MiddleName} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="du_id">DUID</label>
                                            <input type="text" className="form-control" id="du_id" name="du_id" value={employeeData.MaidenName} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="isActive">Is Active</label>
                                              <input type="text" className="form-control" id="isActive" name="isActive" value={employeeData.ContactNumber} onChange={handleInputChange} />
                                              </div>
                                            </div>
                                </div>
                                <button type="submit" className="btn btn-primary d-block mx-auto">Submit</button>
                            </form>
                        </div>
                      <br/>
                      </div>
                      <div className="tab-pane fade" id="shift" role="tabpanel" aria-labelledby="shift-tab">
                          {/* Project Code Form */}
                          <div className="container">
                            <form onSubmit={handleFormSubmit}>
                                <div className="row justify-content-center">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Project ID</label>
                                            <span className="form-control">{employeeData.EmpID}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="projectCode">Project Code</label>
                                            <input type="text" className="form-control" id="projectCode" name="projectCode" value={employeeData.EmailAddress} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="projectName">Project Name</label>
                                            <input type="text" className="form-control" id="projectName" name="projectName" value={employeeData.MiddleName} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="tenure">Tenure</label>
                                            <input type="text" className="form-control" id="tenure" name="tenure" value={employeeData.Name} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="empLevel">Employee Level</label>
                                            <input type="text" className="form-control" id="empLevel" name="empLevel" value={employeeData.LastName} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="projectCode">Project Code</label>
                                            <input type="text" className="form-control" id="projectCode" name="projectCode" value={employeeData.FirstName} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="projectName">Project Name</label>
                                            <input type="text" className="form-control" id="projectName" name="projectName" value={employeeData.MiddleName} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="du_id">DUID</label>
                                            <input type="text" className="form-control" id="du_id" name="du_id" value={employeeData.MaidenName} onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                              <div className="form-group">
                                              <label htmlFor="isActive">Is Active</label>
                                              <input type="text" className="form-control" id="isActive" name="isActive" value={employeeData.ContactNumber} onChange={handleInputChange} />
                                              </div>
                                            </div>
                                </div>
                                <button type="submit" className="btn btn-primary d-block mx-auto">Submit</button>
                            </form>
                        </div>
                      <br/>
                      </div>

                      {/* Add more tab content here */}
                  </div>
              </div>
              </div>
              </div>
              </div>
              </div>
              <Footer />
          </div>
      </div>
  );
}

export default UpdateEmployeeInfo;

