import React from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../App.css';
import { useState } from "react";
//  import { variables } from '../variables';


 function Navbar() {

  // Get user data from location state
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate()
  
//   if (data) {
//     navigate('/'); 
//   }

  const [showPages, setShowPages] = useState(false);
  const [showLoans, setShowLoans] = useState(false);
  const [showMaternity, setShowMaternity] = useState(false);

  // Function to toggle the visibility of pages list
  const togglePages = () => {
      setShowPages(!showPages);
  };
  const toggleLoans = () => {
        setShowLoans(!showLoans);
  };
  const toggleMaternity = () => {
        setShowMaternity(!showMaternity);
  };

     return (
         <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
             {/* Sidebar - Brand */}
             <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                 <div className="sidebar-brand-icon">
                     <img src="/img/hris1.png" alt="companyLogo" className="logo1" />
                 </div>
                 <div className="sidebar-brand-text">
                     <img src="/img/hris2.png" alt="companyLogo" className="logo2" />
                 </div>
             </a>
             {/* Divider */}
             <hr className="sidebar-divider my-0" />
             {/* Nav Item - Dashboard */}
             <li className="nav-item">
                <Link className="nav-link" to={{ pathname: "/dashboard"}} state={data}>
                <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                  </Link>
             </li>
             {/* Divider */}
             <hr className="sidebar-divider" />
             {/* Heading */}
             <div className="sidebar-heading">
                 MAIN
             </div>
             {/* Nav Item - New Hire Upload */}
             <li className="nav-item">
                 {/* <a className="nav-link" href="/newHireUpload"> */}
                 <Link className="nav-link" to={{ pathname: "/newHireUpload"}} state={data}>
                  <i className="fas fa-fw fa-upload"></i>
                  <span>New Hire Upload</span>
                </Link>
                 {/* </a> */}
             </li>
             <li className="nav-item">
                 {/* <a className="nav-link" href="/newHireUpload"> */}
                 <Link className="nav-link" to={{ pathname: "/submissions"}} state={data}>
                  <i className="fas fa-fw fa-book"></i>
                  <span>Submissions</span>
                </Link>
                 {/* </a> */}
             </li>
             {/* Nav Item - New Hire Upload */}
             <li className="nav-item">
                 {/* <a className="nav-link" href="/newHireUpload"> */}
                 <Link className="nav-link">
                  <i className="fas fa-fw fa-info-circle"></i>
                  <span onClick={togglePages}>iASSIST</span>
                </Link>
                {showPages && (
                    <ul className="custom-bullet-list">
                        {/* Add your list of pages here */}  
                        <li onClick={toggleLoans}>
                            <Link className="dropdown-text" state={data}>Government Loan</Link>
                            {showLoans && (
                                <ul className="custom-bullet-list">
                                    <li>
                                        <Link to="/sssloan" className="dropdown-text" state={data}>SSS Loan</Link>
                                    </li>
                                    {/* <li>
                                        <Link to="/loan2" className="dropdown-text" state={data}>Pag-Ibig Loan</Link>
                                    </li> */}
                                    <li> 
                                        <Link to="/landbankcard" className="dropdown-text" state={data}>
                                            Pag-Ibig Loan:
                                            <div className="list-padding">Landbank Card</div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/dbpcard" className="dropdown-text" state={data}>
                                            Pag-Ibig Loan:
                                            <div className="list-padding">DBP Card</div>
                                        </Link>
                                    </li>
                                    <li> 
                                        <Link to="/virtualaccount" className="dropdown-text" state={data}>
                                            Pag-Ibig Loan:
                                            <div className="list-padding">Virtual Account</div>
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        <li onClick={toggleMaternity}> 
                            <Link className="dropdown-text" state={data}>Maternity</Link>
                            {showMaternity && (
                                <ul className="custom-bullet-list sub-menu">
                                    <li>
                                        <Link to="/notification" className="dropdown-text" state={data}>
                                            Maternity   
                                            <div className="list-padding">Notification</div>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/benefit" className="dropdown-text" state={data}>
                                            Maternity Benefit 
                                            <div className="list-padding">Reimbursement</div> 
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                        
                        {/* <li onClick={toggleMaternity}>
                            <Link className="dropdown-text" state={data} > 
                                <span>Maternity</span>
                            </Link>
                        </li> 
                        {setShowMaternity && (
                            <ul className="custom-bullet-list"> 
                                <li onClick={toggleLoans}>
                                    <Link className="dropdown-text" state={data} > 
                                        <span>Maternity 1</span>
                                    </Link>
                                </li>
                                <li onClick={toggleMaternity}>
                                    <Link className="dropdown-text" state={data} > 
                                        <span>Maternity 2</span>
                                    </Link>
                                </li> 
                            </ul>
                        )} */}
                    </ul>
                )}
                 {/* </a> */}
             </li> 
             <li className="nav-item">
                 {/* <a className="nav-link" href="/newHireUpload"> */}
                 <Link className="nav-link" to={{ pathname: "/hriassist"}} state={data}>
                  <i className="fas fa-fw fa-upload"></i>
                  <span>HR iAssist</span>
                </Link>
                 {/* </a> */}
             </li>
             {/* Nav Item - Reports*/}
             <li className="nav-item">
             <Link className="nav-link" to={{ pathname: "/reports"}} state={data} >
                <i className="fas fa-fw fa-chart-bar"></i>
                <span>Report</span>
              </Link>
             </li>
             {/* Nav Item - Reports*/}
             <li className="nav-item">
             <Link className="nav-link" to={{ pathname: "/test"}} state={data} >
                <i className="fas fa-fw fa-chart-bar"></i>
                <span>Test</span>
              </Link>
             </li>
            
             {/* Sidebar Toggler (Sidebar) */}
             <div className="text-center d-none d-md-inline">
          <button className="rounded-circle border-0" id="sidebarToggle"></button>
        </div>
         </ul>
     );
 }
 
 export default Navbar;
 


  