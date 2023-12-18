import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'
import SidebarSetores from './components/SidebarSetores'
import Column from './components/Graficos/Column';
import Pie from './components/Graficos/Pie';
import Palette from './components/Graficos/Palette';
import Line from './components/Graficos/Line';
import Bar from './components/Graficos/Bar';

function App() {

  return (
    <div className='flex h-full  font-[Roboto]'>

      <Router>
      <div className='w-[300px] border-4 border-primary-500 py-10 bg-primary-200 rounded-20 p-4'>
        <SidebarSetores />
      </div>
        <div className='w-full flex justify-center items-center'>

        <Routes>
          <Route path="/palette" element={<Palette />}  />
          <Route exact path="/pie" element={<Pie />}/>
          <Route path="/column" element={<Column />}  />
          <Route path="/line" element={<Line />}  />
          <Route path="/bar" element={<Bar />}  />
        </Routes>
        </div>
      </Router>
    </div>

  )
}

export default App
