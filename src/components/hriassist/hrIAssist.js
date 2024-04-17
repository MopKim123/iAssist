import React, {useState} from 'react';
import '../../App.css';
import * as XLSX from 'xlsx';
import Navbar from '../navbar';
import TopNavbar from '../topnavbar'; 
import Footer from '../footer';
// import { useNavigate } from "react-router-dom";
import { variables } from '../../variables'; 
import { Link, useLocation, useNavigate } from 'react-router-dom';

const HRIAssist = () => {

  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState('upload'); // State to manage active tab
 

  // const handleNavigateBack = () => {
  //   setShowPreview(false); // Hide the preview
  //   setActiveTab('upload'); // Switch back to upload tab
  // };

  const viewRequest = () => {
    navigate('/request') 
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
                                        {/* {departments.map(dep=> */}
                                            <tr  > 
                                                <td className='column'>
                                                      <label>Joachem S. Trinidad</label>
                                                </td>  
                                                <td className='column'>
                                                      <label>Pag-Ibig Loan: Landbank Card</label> 
                                                </td>  
                                                <td className='column'>
                                                      <label>4 days</label> 
                                                </td>  
                                                <td className='column'>
                                                      <label>status</label> 
                                                </td>  
                                                <td className='column'>
                                                      <label>20/4/2024, 12:12 AM</label> 
                                                </td>  
                                                <td className='column'>
                                                      <button type="button" 
                                                      className="btn btn-primary m-2 float-end"
                                                      onClick={viewRequest}>
                                                          View
                                                      </button>
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
