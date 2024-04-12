import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import LoginPage from './components/login';
import Register from './components/register';
import Dashboard from './components/dashboard';
import NewHireUpload from './components/newHireUpload';
import Reports from './components/reports';
import Footer from './components/footer';
import UpdateEmployeeInfo from './components/update'; 
import IAssist from './components/iassist';

import SSSLoan from './components/loans/sssLoan';
import PagIbigLandbankCard from './components/loans/pagIbigLandbankCard';
import PagIbigDBPCard from './components/loans/pagIbigDBPCard';
import PagIbigVirtualAccount from './components/loans/pagIbigVirtualAccount';
import MaternityNotification from './components/loans/MaternityNotification';
import MaternityBenefit from './components/loans/MaternityBenefit';
import HRIAssist from './components/hrIAssist';


function App() {
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/newHireUpload" element={<NewHireUpload />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/update" element={<UpdateEmployeeInfo />} />
          <Route path="/update/:employeeId" element={<UpdateEmployeeInfo />} />

          <Route path="/iassist" element={<IAssist />} />
            <Route path="/sssloan" element={<SSSLoan />} />
            <Route path="/landbankcard" element={<PagIbigLandbankCard />} />
            <Route path="/dbpcard" element={<PagIbigDBPCard />} />
            <Route path="/virtualaccount" element={<PagIbigVirtualAccount />} />
            <Route path="/notification" element={<MaternityNotification />} />
            <Route path="/benefit" element={<MaternityBenefit />} />
            <Route path="/hriassist" element={<HRIAssist />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;