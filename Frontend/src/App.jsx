import React from 'react';
import './App.css';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import LoginComponent from './Components/LoginComponent/LoginComponent';
import AdminHome from './Actors/Admin/AdminHome';
import DoctorHome from './Actors/Doctor/DoctorHome'
import AddDoctor from './Actors/Admin/AddDoctor';
import ListDoctor from './Actors/Admin/ListDoctor';
import AddLab from './Actors/Admin/AddLab';
import AddReceptionist from './Actors/Admin/AddReceptionist'
import AddPatient from './Actors/Receptionist/AddPatient';
import ViewDoctor from './Actors/Admin/ViewDoctor';
import ViewHospital from './Actors/Admin/ViewReceptionist';
import ViewLab from './Actors/Admin/ViewLab';
import LabHome from './Actors/Lab/LabHome';
import ListLab from './Actors/Admin/ListLab';
import ListReceptionist from './Actors/Admin/ListReceptionist';
import Upload from './Actors/Lab/UploadReports';
import ReceptionistHome from './Actors/Receptionist/ReceptionistHome';
import RadiologistHome from './Actors/Radiologist/RadiologistHome';
import PatientDetails from './Actors/Doctor/PatientDetails'
import ChangePassword from './Components/LoginComponent/ChangePassword';
import CreateCase from './Actors/Receptionist/CreateCase';
import ListPatients from './Actors/Doctor/ListPatients';
import ListDoctors from './Actors/Doctor/ListDoctors';
import ForgotPassword from './Components/ForgotPassword';
import UserRequests from './Actors/Admin/UserRequests';
import ViewReceptionist from './Actors/Admin/ViewReceptionist';
import PatientHome from './Actors/Patient/PatientHome';
import ViewCase from './Actors/Patient/ViewCase';
import UnitCases from './Actors/Patient/UnitCases';
import ViewProfile from './Actors/Patient/ViewProfile';
import ViewPolicy from './Actors/Patient/ViewPolicy';
import LaunchComplaint from './Actors/Patient/LaunchComplaint';
import OTPgen from './Components/OTPgen';
import NewPassAfterOtp from './Components/NewPassAfterOtp';
import Consent from './Actors/Patient/Consent';
import Notification from './Actors/Doctor/Notification';
import Invitations from './Actors/Radiologist/Invitations';
import ChatRoom from "./Components/ChatRoom"
import OHIF from "./Actors/Doctor/OHIF";
import DiagnosisForm from './Actors/Doctor/DiagnosisForm';
import OHIFRadiologist from './Actors/Radiologist/ohifChat';
function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
      <Route exact path='/' element={<LoginComponent/>} />
      <Route exact path='/doctor/diagnosis' element={<DiagnosisForm/>} />
      <Route path='/forgotpassword' element={<ForgotPassword/>}/>
      <Route path="/chat" element={<ChatRoom />} />
      <Route path="/ohif" element={<OHIF />} />
      <Route path="/ohifradio" element={<OHIFRadiologist />} />
      <Route path="/notifications" element={ <Notification/>}/>
      <Route path="/consents" element={ <Consent /> } />
      <Route path="/invitations" element={<Invitations />} />

      <Route exact path='/admin' element={<AdminHome/>} />
      <Route path='/admin/listDoctor/addDoctor' element={<AddDoctor/>} />
      <Route path='/admin/listDoctor' element={<ListDoctor/>} />
      <Route path='/admin/listLab' element = {<ListLab/>}/>
      <Route path='/admin/listReceptionist' element = {<ListReceptionist/>}/>
      <Route path='/admin/listReceptionist/viewReceptionist' element = {<ViewReceptionist/>}/>
      <Route path='/admin/listLab/addLab' element={<AddLab/>}/>
      <Route path='/admin/listReceptionist/addReceptionist' element={<AddReceptionist/>}/>
      <Route path='/admin/listDoctor/viewDoctor' element={<ViewDoctor/>} />
      <Route path='/admin/viewHospital' element={<ViewHospital/>} />
      <Route path='/admin/listLab/viewLab' element={<ViewLab/>} />
      <Route path='/admin/changePassword' element={<ChangePassword userRole="admin"/>}/>
      <Route path='/admin/userrequests' element={<UserRequests/>}/>
      
      <Route path='/doctor' element={<DoctorHome/>} />
      <Route path='/doctor/changePassword' element={<ChangePassword userRole="doctor"/>}/>
      <Route path='/doctor/ViewPatient' element={<PatientDetails/>}/>
      <Route path='/doctor/listPatients' element={<ListPatients/>} />
      <Route path='/doctor/listPatients/patientdetails' element={<PatientDetails/>} />
      <Route path='/doctor/listDoctors' element={<ListDoctors/>} />
      <Route path='/doctor/notification' element={<Notification/>} />

      <Route path='/lab' element={<LabHome/>}/>
      <Route path='/lab/changePassword' element={<ChangePassword userRole="lab"/>}/>
      <Route path='/lab/upload' element={<Upload/>}/>


      <Route path='/receptionist' element={<ReceptionistHome/>}/>
      <Route path='/receptionist/addpatient' element={<AddPatient/>}/>
      <Route path='receptionist/changePassword' element={<ChangePassword userRole="receptionist"/>}/>
      <Route path='/receptionist/newCase' element={<CreateCase/>}/>



      <Route path='/radiologist' element={<RadiologistHome/>}/>    
      <Route path='radiologist/changePassword' element={<ChangePassword userRole="radiologist"/>}/>
      <Route path='/radiologist/invitations' element={<Invitations/>}/>

      {/* Patient Routes */}
      <Route path="/patient" element={<PatientHome />} />
      <Route path="/patient/viewCase" element={<ViewCase />} />
      <Route path="/patient/viewCase/unitCases" element={<UnitCases />} />
      <Route path="/patient/viewProfile" element={<ViewProfile/>} />
      <Route path="/patient/viewPolicy" element={<ViewPolicy/>} />
      <Route path="/patient/launchComplaint" element={<LaunchComplaint/>} />
      <Route path="/otpGen" element={<OTPgen/>}/>
      <Route path="/newPass" element={<NewPassAfterOtp/>}/>
      <Route path='/patient/changePassword' element={<ChangePassword userRole="patient"/>}/>
      <Route path="/patient/consent" element={<Consent/>}/>


      </Routes>
      </Router>
    </div>
  );
}

export default App;
