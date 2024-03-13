import './App.css';

// import SideBar from './components/sidebar/sidebar';
import SideBar, { SideBarItem } from './components/sidebar/sidebar';
import CAPadminPage from './components/capadmin/capadmin';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={ <CAPadminPage/> } />
    </Routes>
  )
}

export default App;


