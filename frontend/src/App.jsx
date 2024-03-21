import './App.css';
import { BrowserRouter } from 'react-router-dom';

import CAPadminPage from './components/capadmin/capadmin';

import { Route, Routes } from 'react-router-dom';
import DashboardPage from './components/capadmin/dashboard';
import AddCollege from './components/capadmin/addCollege';
import SettingsPage from './components/capadmin/settings';
import LoginPage from './components/capadmin/login';
import ErrorPage from './404';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <div>LOGIN PAGE</div> } />
        
        {/* CAP ADMIN ROUTES */}
        <Route path='/adminlogin' element={ <LoginPage/> } />
        <Route path='CAPADMIN' element={ <CAPadminPage/> } >
          <Route path='dashboard' element={ <DashboardPage/> } />
          <Route path='addCollege' element={ <AddCollege/> } />
          <Route path='settings' element={ <SettingsPage/> } />
        </Route>   
        
        {/* COLLEGE PORTAL ROUTES */}


        {/* EXAMINER PORTAL ROUTES */}

        {/* ERROR ROUTE */}
        <Route path='*' element={ <ErrorPage /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;