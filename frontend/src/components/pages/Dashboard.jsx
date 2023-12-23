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
    <div className='w-full h-full border-2 border-white rounded-20 mx-2 flex flex-col gap-4'>
      <div className='w-full h-14  flex items-center justify-start text-xl px-7 font-semibold bg-fourth-500  border-2 rounded-20'>
        <h1 className='text-white'>Painel de Desempenho Operacional - Monitorando OEE para Eficiência Máxima na Produção</h1>
      </div>

      {/* INDICADORES */}
      <div className="flex-grow h-[16rem] flex justify-between items-center">
        <IndicatorPage dataIndicator={dataIndicadorDisponibilidade} nameIndicator={'Disponibilidade'} iconIndicator={<LuZap />} />
        <IndicatorPage dataIndicator={dataIndicadorQualidade} nameIndicator={'Qualidade'} iconIndicator={<HiChartBarSquare />} />
        <IndicatorPage dataIndicator={dataIndicadorPerformance} nameIndicator={'Performance'} iconIndicator={<FaArchive />} />
        <IndicatorPage dataIndicator={dataIndicadorOEE} nameIndicator={'OEE'} iconIndicator={<HiDocumentText />} />


      </div>


      <div className="w-full h-[21rem]  flex justify-between gap-4">
        <div className="border-2 h-full w-[500px] flex items-center justify-center flex-col bg-fourth-200 bg-opacity-30 rounded-br-20 rounded-tr-20">
          <h1 className='w-full justify-start flex px-5 text-xl font-semibold text-fourth-700'>OEE por turno</h1>
          <PieChart
            data={dataTurno}
            // title={"OEE por Turno"}
            width={400}
            height={300}
            radius={130}
            innerRadius={30}
            cornerRadius={5}
            padAngle={0.02}
            borderWidth={2}
            borderColor="#fff"
            palette={['#086788', '#7d8bb0', '#07A0c3']}
          />
        </div>
        <div className="border-2 h-full w-[500px] flex items-center justify-center flex-col bg-fourth-200 bg-opacity-30 rounded-20 rounded-tl-20">
          <h1 className='w-full justify-start flex px-5 text-xl font-semibold text-fourth-700'>OEE por Linha</h1>
          <BarChart
            data={dataLinha}
            meta={20}
            width={500}
            height={260}
            margin={{ top: 45, right: 30, bottom: 10, left: 30 }}
            xKey="x"
            yKey="y"
            classKey="class"
            backgroundColor="#f9f9f9"
            grid={true}
          />
        </div>
        <div className="border-2 h-full w-[500px] flex items-center justify-center flex-col flex-grow bg-fourth-200 bg-opacity-20 rounded-bl-20 rounded-tl-20">
          <h1 className='w-full justify-start flex px-5 text-xl font-semibold text-fourth-700'>OEE por Fábrica</h1>
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
      <div className="w-full h-[25rem]  flex justify-between gap-4">


        <div className="border-2 h-full w-[750px] flex items-center justify-center flex-col flex-grow bg-fourth-200 bg-opacity-20 rounded-br-20 rounded-tr-20 rounded-bl-20">
          <h1 className='w-full justify-start flex px-5 text-xl font-semibold text-fourth-700'>OEE por Item</h1>
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
        <div className="border-2 h-full w-[750px] flex items-center justify-center flex-col flex-grow bg-fourth-200 bg-opacity-20 rounded-bl-20 rounded-tl-20 rounded-br-20">
          <h1 className='w-full justify-start flex px-5 text-xl font-semibold text-fourth-700'>OEE por Lote</h1>
          <ColumnsChart
            data={dataLote}
            title={"OEE por Lote"}
            width={750}
            height={300}
            margin={{ top: 20, right: 20, bottom: 35, left: 40 }}
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