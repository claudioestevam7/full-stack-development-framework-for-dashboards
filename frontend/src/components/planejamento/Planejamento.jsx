import React from 'react'
import LineChart from '../LineChart'
import PieChart from '../PieChart'
import Sidebar from '../Sidebar'


const Planejamento = () => {
  return (
    <div className='flex h-full'>
      


      <div className='w-[300px] border-4 border-primary-500  p-5'>
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

export default Planejamento