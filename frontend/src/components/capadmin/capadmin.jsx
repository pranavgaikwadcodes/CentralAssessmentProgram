import React from 'react';
import SideBar, { SideBarItem } from '../sidebar/sidebar';
import Dashboard from './dashboard';
import AddCollege from './addCollege';

// icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import TuneIcon from '@mui/icons-material/Tune';
import DomainAddIcon from '@mui/icons-material/DomainAdd';


const CAPadminPage = () => {
  return (
    <div className='grid grid-rows-3 grid-flow-col '>
        <div className='flex row-span-3'>
          <SideBar>
            <SideBarItem  
              icon={ <DashboardIcon/> }
              text="Dashboard"
              alert
            />
            <SideBarItem 
              icon={ <DomainAddIcon/> }
              text="AddCollege"
              alert
            />
            <SideBarItem 
              icon={ <TuneIcon/> }
              text="Settings"
              alert
            />
          </SideBar>
          
        </div>
        
        <div className='row-span-3 col-span-3'>
            <AddCollege />
        </div>
    </div>
  )
}

export default CAPadminPage


