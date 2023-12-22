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
  dataTurno,
  dataLinha,
  dataFabrica,
  dataItens,
  dataLote
} from './Dados/dados';
import PieChart from '../Graficos/Pie';
import BarChart from '../Graficos/Bar';
import ColumnsChart from '../Graficos/Column';


const Dashboard = () => {
  return (
    <div className='w-full h-full border-2 border-white rounded-20'>
      <div className='w-full h-14  flex items-center justify-start text-xl px-7 font-semibold bg-fourth-700  border-2 rounded-20'>
        <h1 className='text-white'>Painel de Desempenho Operacional - Monitorando OEE para Eficiência Máxima na Produção</h1>
      </div>

      {/* INDICADORES */}
      <div className="flex-grow h-[13rem] flex justify-between items-center">
        <IndicatorPage dataIndicator={dataIndicadorDisponibilidade} nameIndicator={'Disponibilidade'} iconIndicator={<LuZap />} />
        <IndicatorPage dataIndicator={dataIndicadorQualidade} nameIndicator={'Qualidade'} iconIndicator={<HiChartBarSquare />} />
        <IndicatorPage dataIndicator={dataIndicadorPerformance} nameIndicator={'Performance'} iconIndicator={<FaArchive />} />
        <IndicatorPage dataIndicator={dataIndicadorOEE} nameIndicator={'OEE'} iconIndicator={<HiDocumentText />} />


      </div>


      <div className="w-full h-[18rem]  flex">
        <div className="border-2 h-full w-[500px] flex items-center justify-center">
          <PieChart
            data={dataTurno}
            title={"OEE por Turno"}
            width={400}
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
        <div className="border-2 h-full w-[500px] flex items-center justify-center">
          <BarChart
            data={dataLinha}
            meta={20}
            title={'OEE por Linha'}
            width={400}
            height={300}
            margin={{ top: 70, right: 30, bottom: 20, left: 30 }}
            xKey="x"
            yKey="y"
            classKey="class"
            backgroundColor="#f9f9f9"
            grid={true}
          />
        </div>
        <div className="border-2 h-full w-[500px] flex items-center justify-center flex-grow">
          <ColumnsChart
            data={dataFabrica}
            title={"OEE por Fábrica"}
            width={500}
            height={300}
            margin={{ top: 60, right: 10, bottom: 35, left: 40 }}
            xKey="x"
            yKey="y"
            classKey="class"
            backgroundColor="#f9f9f9"
            grid={true}
          />
        </div>




      </div>
      <div className="flex w-full h-[19rem]">

        <div className="border-2 h-full w-[750px] flex items-center justify-center">
          <BarChart
            data={dataItens}
            meta={15}
            title={'OEE por Item'}
            width={750}
            height={300}
            margin={{ top: 70, right: 30, bottom: 20, left: 60 }}
            xKey="x"
            yKey="y"
            classKey="class"
            backgroundColor="#f9f9f9"
            grid={true}
          />
        </div>
        <div className="border-2 h-full w-[750px] flex items-center justify-center flex-grow">
          <ColumnsChart
            data={dataLote}
            title={"OEE por Lote"}
            width={750}
            height={300}
            margin={{ top: 60, right: 20, bottom: 35, left: 40 }}
            xKey="x"
            yKey="y"
            classKey="class"
            backgroundColor="#f9f9f9"
            grid={true}
          />
        </div>


      </div>

    </div>
  )
}

export default Dashboard