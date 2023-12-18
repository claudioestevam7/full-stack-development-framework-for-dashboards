import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Sidebar from './components/Sidebar'
import './App.css'
import SidebarSetores from './components/SidebarSetores'
import Planejamento from './components/planejamento/Planejamento';

function App() {

  return (
    <div className='flex '>

      <div className='w-[300px] h-full border-4 border-primary-500 py-10'>
        <SidebarSetores />
      </div>
      <Router>

        <Routes>
          <Route exact path="/planilha" element={<Planejamento />} />
        </Routes>
      </Router>
    </div>

  )
}

export default App
