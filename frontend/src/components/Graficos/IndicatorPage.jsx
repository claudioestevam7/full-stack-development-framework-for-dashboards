import React from 'react'
import IndicatorChart from './Indicator';
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import { dataIndicadorDisponibilidade } from '../pages/Dados/dados';
import { LuZap } from 'react-icons/lu';

const IndicatorPage = ({
  dataIndicator = dataIndicadorDisponibilidade, 
  nameIndicator = 'Disponibilidade', 
  iconIndicator = <LuZap />}) => {

  if (dataIndicator[dataIndicator.length - 1].y1 > dataIndicator[dataIndicator.length - 2].y1){

    const icon = <TbTriangleFilled />

  }


  const valorInicial = dataIndicator[dataIndicator.length - 2].y1
  const valorFinal = dataIndicator[dataIndicator.length - 1].y1

  const variacao = Math.abs(valorFinal - valorInicial) / valorInicial *100
  const color = valorFinal > valorInicial ? 
          "w-[21rem] h-[12rem] rounded-20 border-white border-4 relative flex flex-col bg-fourth-400"
        : "w-[21rem] h-[12rem] rounded-20 border-white border-4 relative flex flex-col bg-secundary-400" 

  return (
    <>
      <div className="flex-grow flex px-1 justify-around ">

        <div className={color}>
          <div className="flex text-2xl px-2 py-1 text-white gap-2 items-center">
            {iconIndicator}
            <h1 className=''>{nameIndicator}</h1>
          </div>

          <div className="absolute top-4 right-3 flex flex-col items-end text-white">
            <h1 className='text-5xl font-extrabold'>{valorFinal}%</h1>
            <div className="flex gap-1 mt-1 items-center">
              <h2>{variacao.toFixed(2)} %</h2>
              {valorFinal > valorInicial ? <TbTriangleFilled /> : <TbTriangleInvertedFilled/>}
            </div>
          </div>
          <div className="flex-grow flex items-end px-2 py-2">

            <IndicatorChart
              data={dataIndicator}
              width={200}
              height={100}
              margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
              xKey="x"
              yKeys={['y1']}
              lineColors={['#fff']}
              lineWidth={3}
              pointRadius={5}
              backgroundColor="#f9f9f9"
              grid={true}
            />
          </div>
        </div>

      </div>
    </>
  )
}


export default IndicatorPage