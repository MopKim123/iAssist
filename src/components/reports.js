import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import TopNavbar from './topnavbar';
import Footer from './footer';
import { variables } from '../variables';
import { useNavigate } from "react-router-dom";

const Reports = () => {
    const navigate = useNavigate();

    const handleUpdate = (employeeId) => {
        // Redirect to the update page with employee ID as a parameter
        navigate(`/update/${employeeId}`);
    };

    const [employees, setEmployees] = useState([]);
    // const [searchQuery, setSearchQuery] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                // Make a GET request to fetch new hire employees from the server
                const response = await fetch(variables.API_URL + 'UploadEmp');

                // Check if the response is successful
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                // Extract the data from the response
                const data = await response.json();

                // Set the retrieved data in your component state
                setEmployees(data);
                setFilteredEmployees(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        // Call the fetchData function when the component mounts
        fetchData();
    }, []); // Empty dependency array to run only once when the component mounts

    // const handleSearchChange = (event) => {
    //     const { value } = event.target;
    //     setSearchQuery(value);
    //     filterEmployees(value);
    // };

    // const filterEmployees = (query) => {
    //     const filtered = employees.filter((employee) =>
    //         employee.EmpID.toLowerCase().includes(query.toLowerCase()) ||
    //         employee.Name.toLowerCase().includes(query.toLowerCase())
    //     );
    //     setFilteredEmployees(filtered);
    // };

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
                                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h5 className="m-0 font-weight-bold text-primary">Reports</h5>
                                        {/* Topbar Search */}
                                        <form className="form-inline ml-auto">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <button className="btn btn-primary" type="button">
                                                        <i className="fas fa-search fa-sm"></i>
                                                    </button>
                                                </div>
                                                <input
                                                    type="text"
                                                    className="form-control bg-light border-0 small"
                                                    placeholder="Search by ID or Name"
                                                    // value={searchQuery}
                                                    // onChange={handleSearchChange}
                                                />
                                            </div>
                                        </form>
                                    </div>

                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">ACTION</th>
                                                            <th scope="col">EMPLOYEE ID</th>
                                                            <th scope="col">NAME</th>
                                                            <th scope="col">FIRST NAME</th>
                                                            <th scope="col">MIDDLE NAME</th>
                                                            <th scope="col">LAST NAME</th>
                                                            <th scope="col">MAIDEN NAME</th>
                                                            <th scope="col">BIRTHDATE</th>
                                                            <th scope="col">AGE</th>
                                                            <th scope="col">BIRTH MONTH</th>
                                                            <th scope="col">AGE BRACKET</th>
                                                            <th scope="col">GENDER</th>
                                                            <th scope="col">MARITAL STATUS</th>
                                                            <th scope="col">SSS</th>
                                                            <th scope="col">PHIC</th>
                                                            <th scope="col">HDMF</th>
                                                            <th scope="col">TIN</th>
                                                            {/* <th scope="col">ADDRESS</th> */}
                                                            <th scope="col">HRANID</th>
                                                            <th scope="col">CONTACT NUMBER</th>
                                                            <th scope="col">EMAIL ADDRESS</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {filteredEmployees.length > 0 ? (
                                                            filteredEmployees.map((employee) => (
                                                                <tr key={employee.EmpID}>
                                                                    <td>
                                                                        <button
                                                                            className="update-button btn btn-xs"
                                                                            onClick={() => handleUpdate(employee.EmpID)} // Call handleUpdate with employee ID
                                                                        >
                                                                            <i className="fas fa-pencil-alt"></i> Update
                                                                        </button>
                                                                    </td>
                                                                    <td>{employee.EmpID}</td>
                                                                    <td>{employee.Name}</td>
                                                                    <td>{employee.FirstName}</td>
                                                                    <td>{employee.MiddleName}</td>
                                                                    <td>{employee.LastName}</td>
                                                                    <td>{employee.MaidenName}</td>
                                                                    <td>{employee.Birthdate}</td>
                                                                    <td>{employee.Age}</td>
                                                                    <td>{employee.BirthMonth}</td>
                                                                    <td>{employee.AgeBracket}</td>
                                                                    <td>{employee.Gender}</td>
                                                                    <td>{employee.MaritalStatus}</td>
                                                                    <td>{employee.SSS}</td>
                                                                    <td>{employee.PHIC}</td>
                                                                    <td>{employee.HDMF}</td>
                                                                    <td>{employee.TIN}</td>
                                                                    <td>{employee.HRANID}</td>
                                                                    <td>{employee.ContactNumber}</td>
                                                                    <td>{employee.EmailAddress}</td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td colSpan="20">No data available</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
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
};

export default Reports;

