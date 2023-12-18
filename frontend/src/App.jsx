import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'
import SidebarSetores from './components/SidebarSetores'
import Column from './components/Graficos/Column';
import Pie from './components/Graficos/Pie';

function App() {

  return (
    <div className='flex h-full'>

      <Router>
      <div className='w-[300px] border-4 border-primary-500 py-10'>
        <SidebarSetores />
      </div>
        <div className='w-full flex justify-center items-center'>

        <Routes>
          <Route exact path="/pizza" element={<Pie />}/>
          <Route path="/linha" element={<Column />}  />
        </Routes>
        </div>
      </Router>
    </div>

  )
}

export default App
