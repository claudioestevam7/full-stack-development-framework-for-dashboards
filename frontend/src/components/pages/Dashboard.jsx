import React from 'react'
import IndicatorChart from '../Graficos/Indicator'
import IndicatorPage from '../Graficos/IndicatorPage'
import { LuZap } from "react-icons/lu";
import { FaArchive } from "react-icons/fa";
import { HiChartBarSquare } from "react-icons/hi2";
import { HiDocumentText } from "react-icons/hi";

import {
  dataIndicadorDisponibilidade,
  dataIndicadorQualidade,
  dataIndicadorPerformance,
  dataIndicadorOEE,
  dataTurno
} from './Dados/dados';
import PieChart from '../Graficos/Pie';


const Dashboard = () => {
  return (
    <div className='w-full h-full border-2 border-black'>
      <div className='w-full h-14 border-2 border-black'>

      </div>

      {/* INDICADORES */}
      <div className="w-full h-[13rem] border-2 border-black flex justify-arround items-center">
        <IndicatorPage dataIndicator={dataIndicadorDisponibilidade} nameIndicator={'Disponibilidade'} iconIndicator={<LuZap />} />
        <IndicatorPage dataIndicator={dataIndicadorQualidade} nameIndicator={'Qualidade'} iconIndicator={<HiChartBarSquare />} />
        <IndicatorPage dataIndicator={dataIndicadorPerformance} nameIndicator={'Performance'} iconIndicator={<FaArchive />} />
        <IndicatorPage dataIndicator={dataIndicadorOEE} nameIndicator={'OEE'} iconIndicator={<HiDocumentText />} />


      </div>


      <div className="w-full h-[18rem] border-2 border-black">
        <div className="border-2 h-full w-[45rem] flex items-center justify-center">
          <PieChart
            data={dataTurno}
            width={200}
            height={300}
            radius={100}
            innerRadius={30}
            cornerRadius={5}
            padAngle={0.02}
            borderWidth={2}
            borderColor="#fff"
            palette={['#086788', '#07A0c3', '#f0c808']}
          />


        </div>




      </div>
      <div className="w-full h-[19rem] border-2 border-black"></div>

    </div>
  )
}

export default Dashboard