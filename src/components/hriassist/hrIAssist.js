import React, {useState} from 'react';
import '../../App.css';
import * as XLSX from 'xlsx';
import Navbar from '../navbar';
import TopNavbar from '../topnavbar'; 
import Footer from '../footer';
// import { useNavigate } from "react-router-dom";
import { variables } from '../../variables'; 
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button'; 
import { useEffect } from 'react';

const HRIAssist = () => {

  const navigate = useNavigate(); 
  const currentYear = new Date().getFullYear(); 
  const [maxYear, setMaxYear] = useState(currentYear);

  const [submissions, setSubmissions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(1);
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filter, setFilter] = useState({transactionType:'',status:'',month:'',year:''});
  const [searhFilter, setSearchFilter] = useState(false) 
    
  const viewRequest = (data) => {
    navigate('/request', { state: { data } }) 
  };

     

  const SortableHeader = ({ label, column, sortColumn, sortDirection, onSort }) => {
    const handleClick = () => {
      onSort(column);
    };
  
    return (
      <th onClick={handleClick} style={{ cursor: 'pointer' }}>
        {label} {sortColumn === column && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
      </th>
    );
  };

  const handleSort = (column) => {
    if (column === sortColumn) {
      // Reverse the sort direction if the same column is clicked again
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedSubmissions = [...submissions].sort((a, b) => {
    if (sortColumn) {
      const comparison = a[sortColumn].localeCompare(b[sortColumn]);
      return sortDirection === 'asc' ? comparison : -comparison;
    } else {
      return 0;
    }
  });
  
  useEffect(() => { 
    if(Object.values(filter).every(value => value === '')){
      setSearchFilter(false)
    }
    if(!searhFilter){   
      getSubmissions(currentPage, pageSize)   
    }else{  
      getFilteredSubmissions(currentPage, pageSize)   
    }
  }, [currentPage, pageSize, filter]);
  
  const getSubmissions = async (pageNumber, pageSize) => {
    
    const EmpId = '10023'

    const formData = new FormData(); 
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
        setSubmissions(data.result.submissions) 
        setTotalPages(Math.ceil(data.result.count / pageSize))  
      } catch (error) {
          console.error('Error parsing JSON response:', error);
      }
 
    } catch (error) {
      console.error('Error:', error);
    }
  }; 

  const getFilteredSubmissions = async (pageNumber, pageSize, filter) => {
    
    const EmpId = '10023'

    const formData = new FormData(); 
    formData.append('pageNumber', pageNumber);
    formData.append('pageSize', pageSize);
     
    // try {
    //   const uploadResponse = await fetch('http://localhost:5000/hrsubmission', {
    //     method: 'POST',
    //     body: formData
    //   }) 
  
    //   if (!uploadResponse.ok) {
    //     console.error('Failed:', uploadResponse.statusText);
    //     return;
    //   } 

    //   try {
    //     const data = await uploadResponse.json();   
    //     setSubmissions(data.result.submissions) 
    //     setTotalPages(Math.ceil(data.result.count / pageSize))  
    //   } catch (error) {
    //       console.error('Error parsing JSON response:', error);
    //   }
 
    // } catch (error) {
    //   console.error('Error:', error);
    // }
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

  const filterSearch = () => {
    setCurrentPage(1)
    setSubmissions([]) 
    if(Object.values(filter).every(value => value === '')){ 
      setSearchFilter(false)
      getSubmissions(currentPage, pageSize) 
    }else{ 
      getFilteredSubmissions(currentPage, pageSize, filter) 
      setSearchFilter(true)
    }
  };

  const handleFilterSubmit = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value
    }));
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
                    <br/>
                    <div className="tab-content">
                      <div className="tab-pane fade show active" id="personalDetails" role="tabpanel" aria-labelledby="personalDetails-tab">
                        {/* Personal Details Form */}
                        <div className="container-fluid d-flex justify-content-center" >
                          <div className="justify-content-between ">    
                              <table className="" style={{ tableLayout: 'fixed', width: '100%' }}>
                                <thead>
                                  <tr>
                                    <th className="pr-3 pl-3" style={{ width: '25%' }}>Transaction Type</th>
                                    <th className="pr-1 pl-1" style={{ width: '25%' }}>Status</th>
                                    <th className="pr-1 pl-1" style={{ width: '25%' }}>Month</th>
                                    <th className="pr-1 pl-1" style={{ width: '25%' }}>Year</th>
                                    <th style={{ width: '10%' }}> </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="pr-1 pl-1" > 
                                      <select className="form-control" id="transactionType" name="transactionType" onChange={handleFilterSubmit}>
                                        <option value="">Select Transaction Type</option>
                                        <option value="SSS Loan">SSS Loan</option>
                                        <option value="Pag-Ibig Landbank Card">Pag-Ibig Landbank Card</option>
                                        <option value="Pag-Ibig DBP Card">Pag-Ibig DBP Card</option>
                                        <option value="Pag-Ibig Virtual Account">Pag-Ibig Virtual Account</option>
                                        <option value="Maternity Notication">Maternity Notication</option>
                                        <option value="Maternity Benefit">Maternity Benefit</option> 
                                        <option value="Other">Other</option> 
                                      </select></td> 
                                    <td className="pr-1 pl-1" > 
                                      <select className="form-control" id="status" name="status" onChange={handleFilterSubmit}>
                                        <option value="">Select Status</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Resubmit">Resubmit</option>
                                        <option value="Complete">Complete</option>
                                        <option value="Cancelled">Cancelled</option>
                                        <option value="Expired">Expired</option> 
                                      </select></td><td className="pr-1 pl-1" >
                                      <select className="form-control" id="month" name="month" onChange={handleFilterSubmit}>
                                        <option value="">Select Month</option>
                                        <option value="1">January</option>
                                        <option value="2">February</option>
                                        <option value="3">March</option>
                                        <option value="4">April</option>
                                        <option value="5">May</option>
                                        <option value="6">June</option>
                                        <option value="7">July</option>
                                        <option value="8">August</option>
                                        <option value="9">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                      </select>
                                    </td>   
                                    <td className="pr-1 pl-1" >
                                      <input type="number"  className="form-control" id="year" name="year" pattern="\d*" max={new Date().getFullYear()}  onChange={handleFilterSubmit}/>
                                    </td>
                                    <td className="d-flex align-items-center justify-content-center"><Button onClick={filterSearch}>Filter</Button></td> 
                                  </tr>
                                </tbody>
                              </table>  
                          </div> 
                        </div>
                        <br/> 
                      </div>  
                    </div>
                  </div> 
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
                                            <SortableHeader label="Name" column="Name" sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} />
                                            <SortableHeader label="Transaction Type" column="TransactionType" sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} />
                                            <SortableHeader label="Turn Around" column="TurnAround" sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} />
                                            <SortableHeader label="Status" column="Status" sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} />
                                            <SortableHeader label="Date Time" column="DateTime" sortColumn={sortColumn} sortDirection={sortDirection} onSort={handleSort} />
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                      {sortedSubmissions.map((sub, index) =>
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
                                              {(sub.Status === 'Expired' || sub.Status === 'Cancelled') && <label style={{color: 'red'}}>{sub.Status}</label>}
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
