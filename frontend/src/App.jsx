import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Sidebar from './components/Sidebar'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'

function App() {

  return (
    <div className='flex'>

      <div className='border '>
        <Sidebar />
      </div>

      <div>
        <LineChart />
      </div>

      <div>
        <PieChart />
      </div>

    </div>

  )
}

export default App
