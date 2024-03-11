import './App.css';

import SideBar from './components/sidebar/sidebar';

function App() {
  return(
    <div className='flex'>
      <SideBar/>
      <div>
        Rest Of The Content
      </div>
    </div>
  )
}

export default App;
