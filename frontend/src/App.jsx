import './App.css';
import { BrowserRouter } from 'react-router-dom';

// import SideBar from './components/sidebar/sidebar';
import SideBar, { SideBarItem } from './components/sidebar/sidebar';
import CAPadminPage from './components/capadmin/capadmin';

import { Route, Routes } from 'react-router-dom';
import DashboardPage from './components/capadmin/dashboard';
import AddCollege from './components/capadmin/addCollege';
import SettingsPage from './components/capadmin/settings';
import ErrorPage from './404';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <div>LOGIN PAGE</div> } />
        <Route path='CAPADMIN' element={ <CAPadminPage/> } >
          <Route path='dashboard' element={ <DashboardPage/> } />
          <Route path='addCollege' element={ <AddCollege/> } />
          <Route path='settings' element={ <SettingsPage/> } />
        </Route>   

      </Routes>
    </BrowserRouter>
  )
}

export default App;