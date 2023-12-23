import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css'
import SidebarSetores from './components/SidebarSetores'
import PiePage from './components/pages/Demonstracao/PiePage';
import ColumnsPage from './components/pages/Demonstracao/ColumnsPage';
import LinePage from './components/pages/Demonstracao/LinePage';
import BarPage from './components/pages/Demonstracao/BarPage';
import ParetoPage from './components/pages/Demonstracao/ParetoPage';
import Palette from './components/Graficos/Palette';

import IndicatorPage from './components/Graficos/IndicatorPage';
import SpeedometerPage from './components/pages/Demonstracao/SpeedometerPage';
import OeePage from './components/pages/Demonstracao/OeePage';
import Dashboard from './components/pages/Dashboard';
import Teste from './components/Graficos/Teste';


function App() {

  return (
    <div className='flex h-full   font-[Roboto]'>

      <Router>
      <div className='w-[300px] border-4 border-primary-500 pt-10 bg-primary-200 rounded-20 p-3'>
        <SidebarSetores />
      </div>
        <div className='w-full h-full flex justify-center items-center'>

        <Routes>
          <Route path="/palette" element={<Palette />}  />
          <Route path="/pie" element={<PiePage />}/>
          <Route path="/column" element={<ColumnsPage />}  />
          <Route path="/line" element={<LinePage />}  />
          <Route path="/bar" element={<BarPage />}  />
          <Route path="/pareto" element={<ParetoPage />}  />
          <Route path="/oee" element={<OeePage />}  />
          <Route path="/indicator" element={<IndicatorPage />}  />
          <Route path="/speedometer" element={<SpeedometerPage />}  />
          <Route exact path="/" element={<Dashboard />} index />
          <Route path="/test" element={<Teste />}  />
        </Routes>
        </div>
      </Router>
    </div>

  )
}

export default App
