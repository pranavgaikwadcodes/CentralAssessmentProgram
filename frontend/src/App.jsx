import './App.css';
import { BrowserRouter } from 'react-router-dom';


import { Route, Routes } from 'react-router-dom';

// Initial Page
import InitialSelectPage from './initialSelectPage';

// CAP ADMIN PAGES
import CAPadminPage from './components/capadmin/capadmin';
import DashboardPage from './components/capadmin/dashboard';
import AddCollege from './components/capadmin/addCollege';
import SettingsPage from './components/capadmin/settings';
import LoginPage from './components/capadmin/login';

// College Portal Pages
import CollegPortalPage from './components/collegeportal/admin/collegeadmin';
import CollegePortalDashboard from './components/collegeportal/admin/collegeadmin';
import CollegePortalSettingsPage from './components/collegeportal/admin/settings';
import CollegePortalProfileSettingsPage from './components/collegeportal/admin/profileSettings';
import CollegePortalDepartmentPage from './components/collegeportal/admin/department';
import CollegePortalAddDepartmentPage from './components/collegeportal/admin/addDepartment';
import CollegePortalBillingPage from './components/collegeportal/admin/billing';
import CollegePortalLoginPage from './components/collegeportal/admin/login';

// Department Portal Pages
import DepartmentLoginPage from './components/collegeportal/department/login';
import DepartmentPortalPage from './components/collegeportal/department/departmentadmin';
import SubjectsPage from './components/collegeportal/department/subjects';
import AddSubjectPage from './components/collegeportal/department/addSubject';

// Examiner Portal Pages
import ExaminerLoginPage from './components/examinerportal/login';
import ExaminerRegisterPage from './components/examinerportal/register';
import ExaminerPortalPage from './components/examinerportal/examineradmin';
import ExaminerDashboardPage from './components/examinerportal/dashboard';
import ExaminerProfilePage from './components/examinerportal/profile';
import IssueCardPage from './components/examinerportal/issueCard';
import PaymentPage from './components/examinerportal/payment';

import ErrorPage from './404';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <InitialSelectPage/> } />
        
        {/* CAP ADMIN ROUTES */}
        <Route path='/adminlogin' element={ <LoginPage/> } />
        <Route path='CAPADMIN/*' element={ <CAPadminPage/> } >
          <Route path='dashboard' element={ <DashboardPage/> } />
          <Route path='addCollege' element={ <AddCollege/> } />
          <Route path='settings' element={ <SettingsPage/> } />
        </Route>   
        
        {/* COLLEGE PORTAL ROUTES */}
        <Route path='/collegelogin' element={ <CollegePortalLoginPage/> } />
        <Route path='CollegePortal/*' element={ <CollegPortalPage/> } >
          <Route path='dashboard' element={ <CollegePortalDashboard/> } />
          <Route path='deptManagement' element={ <AddCollege/> } />
          <Route path='billing' element={ <SettingsPage/> } />
          <Route path='settings' element={ <CollegePortalSettingsPage/> } />
          <Route path='profileSettings' element={ <CollegePortalProfileSettingsPage/> } />
          <Route path='department' element={ <CollegePortalDepartmentPage/> } />
          <Route path='addDepartment' element={ <CollegePortalAddDepartmentPage/> } />
          <Route path='billing' element={ <CollegePortalBillingPage/> } />
        </Route>

        {/* DEPARTMENT PORTAL ROUTES */}
        <Route path='/departmentlogin' element={ <DepartmentLoginPage/> } />
        <Route path='DepartmentPortal/*' element={ <DepartmentPortalPage/> } >
          <Route path='dashboard' element={ <CollegePortalDashboard/> } />
          <Route path='subjects' element={ <SubjectsPage/> } />
          <Route path='addSubject' element={ <AddSubjectPage/> } />
        </Route>

        {/* EXAMINER PORTAL ROUTES */}
        <Route path='/examinerlogin' element={ <ExaminerLoginPage/> } />
        <Route path='/examinerregister' element={ <ExaminerRegisterPage/> } />
        <Route path='ExaminerPortal/*' element={ <ExaminerPortalPage/> } >
          <Route path='dashboard' element={ <ExaminerDashboardPage/> } />
          <Route path='profile' element={ <ExaminerProfilePage/> } />
          <Route path='issueCard' element={ <IssueCardPage/> } />
          <Route path='payment' element={ <PaymentPage/> } />
        </Route>

        {/* ERROR ROUTE */}
        <Route path='*' element={ <ErrorPage /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;