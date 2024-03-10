import './App.css';

import Sidebar from './components/sidebar/sidebar';

function App() {
  return(
    <div className='flex'>
      <Sidebar/>
      <div>
        Rest Of The Content
      </div>
    </div>
  )
}

export default App;
