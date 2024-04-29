import React, {useState} from 'react';
import '../../App.css';
import * as XLSX from 'xlsx';
import Navbar from '../navbar';
import TopNavbar from '../topnavbar'; 
import Footer from '../footer';
// import { useNavigate } from "react-router-dom";
import { variables } from '../../variables'; 
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const HRIAssist = () => {

  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(10);
 
  const viewRequest = (data) => {
    navigate('/request', { state: { data } }) 
  };


  
  useEffect(() => {
    getSubmissions(currentPage, pageSize)
    subCountPages()
  }, [currentPage, pageSize]);
  
  const getSubmissions = async (pageNumber, pageSize) => {
    
    const EmpId = '10023'

    const formData = new FormData();
    formData.append('EmpId', EmpId); 
    formData.append('pageNumber', pageNumber);
    formData.append('pageSize', pageSize);
     
    try {
      const uploadResponse = await fetch('http://localhost:5000/hrsubmission', {
        method: 'POST',
        body: formData
      }) 
  
      if (!uploadResponse.ok) {
        console.error('Failed:', uploadResponse.statusText);
        return;
      } 

      try {
        const data = await uploadResponse.json();  
        setSubmissions(data.result) 
      } catch (error) {
          console.error('Error parsing JSON response:', error);
      }
 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const subCountPages = async () => { 
    try {
      const uploadResponse = await fetch('http://localhost:5000/subcountpages', {
        method: 'POST'
      }) 
  
      if (!uploadResponse.ok) {
        console.error('Failed:', uploadResponse.statusText);
        return;
      } 

      try {
        const data = await uploadResponse.json();
        setTotalPages(Math.ceil(data.result / pageSize))  
      } catch (error) {
          console.error('Error parsing JSON response:', error);
      }

      // console.log('PDF uploaded successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const Pagination = ({ currentPage }) => { 
  
    const handleNextClick = () => {
      setCurrentPage(currentPage + 1);
    };
  
    const handlePreviousClick = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };
  
    return (
      <div className='pagination-btn'>
        <button onClick={handlePreviousClick} disabled={currentPage === 1} >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextClick} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    );
  };

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
                                                Name
                                            </th> 
                                            <th>
                                                Transaction Type
                                            </th> 
                                            <th>
                                                Turn-Around time
                                            </th> 
                                            <th>
                                                Status
                                            </th> 
                                            <th>
                                                Date Sent
                                            </th> 
                                            <th>
                                                Action/s
                                            </th>  
                                        </tr>
                                    </thead>
                                    <tbody>
                                      {submissions.map((sub, index) =>
                                        <tr key={index}>
                                            <td className='column'>
                                                  <label>{sub.Name}</label>
                                            </td>  
                                            <td className='column'>
                                                  <label>{sub.TransactionType}</label> 
                                            </td>  
                                            <td className='column'>
                                                  <label>{sub.TurnAround} Days</label> 
                                            </td>  
                                            <td className='column'>
                                              {sub.Status === 'Complete' && <label style={{color: 'blue'}}>{sub.Status}</label>}
                                              {sub.Status === 'Pending' && <label style={{color: 'green'}}>{sub.Status}</label>}
                                              {sub.Status === 'Resubmit' && <label style={{color: 'orange'}}>{sub.Status}</label>}
                                              {sub.Status === 'Expired' && <label style={{color: 'red'}}>{sub.Status}</label>}
                                            </td>  
                                            <td className='column'>
                                              <label>{sub.DateTime}</label> 
                                            </td> 
                                            {/* <button onClick={() => handleButtonClick(sub)}>Go to Next Page</button>  */}
                                            <td className='column'>
                                              <button type="button" 
                                              className="btn btn-primary m-2 float-end"
                                              onClick={() => viewRequest(sub)}>
                                                  View
                                              </button>
                                            </td>  
                                        </tr> 
                                      )}
                                    </tbody>
                                </table>
                                <div className='pagination'>
                                  <Pagination
                                    currentPage={currentPage}
                                    pageSize={pageSize}
                                    totalCount={submissions.length} // You may need to fetch the total count from the backend
                                    onPageChange={handlePageChange}
                                  />
                                </div>
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
