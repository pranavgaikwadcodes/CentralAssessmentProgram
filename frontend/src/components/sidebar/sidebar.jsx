import React from 'react'

// icons
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LaunchIcon from '@mui/icons-material/Launch';

const SideBar = ({ children }) => {
  return (
    <aside className='h-screen'>
      <nav className='h-full felx flex-col bg-primary border-r shadow-sm'>
        <div className="p-4 pb-2 flex justify-between items-center">          
          <div className='w-72 text-white text-lg'> Central Assessment Program </div>

          <button className='p-1.5 rounded-lg bg-gray hover:bg-white'>
            <FirstPageIcon/>
          </button>
        </div>

        <ul className='flex-1 px-3'>{ children }</ul>

        <div className='border-t flex flex-col p-3'>
          <div className='text-white'>Need any help ?</div>
          <div className='text-gray'>Connect to CAPtivaX support</div>
          <div>
            <button className=' w-72 h-10 rounded-lg bg-button-blue hover:bg-button-blue-hover text-white flex justify-center items-center text-sm font-inter font-semibold'>
              Connect CAPtivaX <span className='pl-2'></span><LaunchIcon sx={{ fontSize: 15}}/>
            </button>
          </div>
        </div>
      </nav>
    </aside>
  )
}

export default SideBar