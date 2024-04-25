import React, { createContext, useContext, useState } from 'react'
import './sidebar.css'

// icons
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import LaunchIcon from '@mui/icons-material/Launch';
import { Link, NavLink } from 'react-router-dom';

const SideBar = ({ children }) => {
  
  const [expanded, setExpanded] = useState(true)

  return (
    <aside className='h-screen'>
      <nav className='h-full felx flex-col bg-primary border-r shadow-sm'>
        <div className="p-4 pb-2 flex justify-between items-center mb-10">          
          <div className={`text-white font-inter font-semibold overflow-hidden transition-all ${expanded? "w-72" : "w-0"}`}>CentralAssessmentProgram</div>

          <button onClick={ () => setExpanded(!expanded)} className='p-1.5 rounded-lg bg-gray hover:bg-white'>
            {expanded? <FirstPageIcon/> : <LastPageIcon/>}
          </button>
        </div>

        <SidebarContext.Provider value={{expanded}}>
          
          <ul className='flex-1 px-3'>{ children } </ul>

        </SidebarContext.Provider>

        <div className={`absolute bottom-10 left-0 right-0 border-gray flex flex-col p-3 pt-20 pr-5
          overflow-hidden transition-all ${expanded? "w-fit " : "w-0"}`}
        >
          <div className={`font-inter font-semibold text-white pl-1 overflow-hidden transition-all ${expanded? "w-full ml-3" : "w-0"}`}>Need any help ?</div>
          <div className={`font-inter text-gray mt-1 pl-1 overflow-hidden transition-all ${expanded? "w-full ml-3" : "w-0"}`}>Connect to CAPtivaX support</div>
          <div className='mt-3'>
            {/* <button className= {`h-10 rounded-lg bg-button-blue hover:bg-button-blue-hover text-white flex justify-center items-center text-sm font-inter font-semibold
            overflow-hidden transition-all ${expanded? "w-full ml-3" : "w-0"}
            `}  >
              Connect CAPtivaX <span className='pl-2'></span><LaunchIcon sx={{ fontSize: 15}}/>
            </button> */}
            <a href="mailto:support@capx.co.in" className={`h-10 rounded-lg bg-button-blue hover:bg-button-blue-hover text-white flex justify-center items-center text-sm font-inter font-semibold
            overflow-hidden transition-all ${expanded? "w-full ml-3" : "w-0"}
            `}>
              Connect CAPtivaX <span className='pl-2'></span><LaunchIcon sx={{ fontSize: 15}}/>
            </a>
          </div>
        </div>
      </nav>
    </aside>
  )
}


export default SideBar

const SidebarContext = createContext()
export function SideBarItem({ icon, text , active, alert, to }) {
  const {expanded} = useContext(SidebarContext)
  return (
    <NavLink to={to}>
      <li className={`text-white relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group
      ${
        active ? "bg-gray from-gray to-secondary text-white"
        : "text-white"
      }
      `}>
        <span className={`menu-icons `} >
          {icon}
        </span>
        <span className={`font-inter overflow-hidden transition-all ${expanded? "w-52 ml-3" : "w-0"}`}>{text}</span>

        {!expanded && <div className={` font-inter absolute left-full rounded-md px-2 py-1 ml-6
        bg-secondary-light text-secondary
        invisible opacity-20 -translate-x-3 transition-all
        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}>{text}</div>}
      </li>    
    </NavLink>
  )
}