import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { FaPalette, FaChartPie } from "react-icons/fa";
import { FaChartColumn, FaChartLine } from "react-icons/fa6";
import { PiChartBarHorizontalFill } from "react-icons/pi";
import { BiBarChartSquare } from "react-icons/bi";
import { AiOutlineGlobal } from "react-icons/ai";
import { CgTrello } from "react-icons/cg";
import { IoIosSpeedometer } from "react-icons/io";

import Logo from '../assets/logoPrincipal.svg'

const setorActivate = { iconcor: '#fff' }

const corIcon = '#1c1c1c'
const sizeIcon = 30

const setores = [['Palette', '/palette', <FaPalette size={sizeIcon} />],
['Pie', '/pie', <FaChartPie size={sizeIcon} />],
['Column', '/column', <FaChartColumn size={sizeIcon} />],
['Line', '/line', <FaChartLine size={sizeIcon} />],
['Bar', '/bar', <PiChartBarHorizontalFill size={sizeIcon} />],
['Pareto', '/pareto', <BiBarChartSquare size={sizeIcon} />],
['OEE', '/oee', <AiOutlineGlobal size={sizeIcon} />],
['Indicator', '/indicator', <CgTrello size={sizeIcon} />],
['Speedometer', '/speedometer', <IoIosSpeedometer size={sizeIcon} />],
['Test', '/test', <IoIosSpeedometer size={sizeIcon} />],
['Dashboard', '/dashboard', <IoIosSpeedometer size={sizeIcon} />]]

const SidebarSetores = () => {
  const location = useLocation();

  return (
    <div className='h-full flex flex-col'>
      {/* Cabeçalho */}
      <div className="w-full ">

        <img src={Logo} />
      <h1 className='font-[Roboto] text-xl mt-2 font-bold'>DASHBOARD</h1>
      </div>


      {/* Campos de escolher as abas */}
      <div className="mt-[1rem] w-full">
        {setores.map((setor) => {
          return (
            // botão para a aba escolhida
            <Link to={setor[1]} key={setor}>
              <div className={location.pathname == setor[1] ? "w-full h-[3rem] bg-secundary-500 flex justify-start items-center px-7 mb-2 rounded-20 text-primary-100 duration-500 delay-500`" :
                "w-full h-[3rem] bg-primary-100 flex justify-start items-center px-7 mb-2 rounded-20 duration-500 delay-75 hover:bg-primary-400"} >
                <div className='mr-5 w-6'>
                  {setor[2]}
                </div>
                <h3 className='text-24 font-bol '>
                  {setor[0]}
                </h3>
              </div>
            </Link>
          )
        })
        }
      </div>
      <div className="flex-grow flex justify-center items-end">
        <div className="flex flex-col">

          <p className='text-sm'>@ 2024 Locomotiva</p>
          <p className='text-sm'>Cláudio Estevam</p>
        </div>
      </div>
    </div>
  )
}

export default SidebarSetores