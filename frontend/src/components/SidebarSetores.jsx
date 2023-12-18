import React from 'react'


const setores = ['Planejamento', 'Estoque']





const SidebarSetores = () => {
  return (
    <div>
      <h1>DASHBOARD</h1>

      <div className="mt-[10rem] w-full">

        {setores.map((setor) => {
          return (
            <div className="w-full h-[3rem] bg-secundary-500 flex justify-start items-center px-7 mb-2 rounded-20">

          <div className='mr-5'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              width={35}
              height={30}
              viewBox="0 0 32 32"
            >
              <path
                d="M15 14H3v3h12v-3zm-1 2H4v-1h10v1zm-8 5h16v-3H6v3zm1-2h14v1H7v-1zm15 10h7v-3h-7v3zm1-2h5v1h-5v-1zm-9-2h13v-3H14v3zm1-2h11v1H15v-1zM31 5h-3V3c0-1.654-1.346-3-3-3s-3 1.346-3 3v2H10V3c0-1.654-1.346-3-3-3S4 1.346 4 3v2H1a1 1 0 0 0-1 1v25a1 1 0 0 0 1 1h30a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zm-7-2a1 1 0 0 1 2 0v5c0 .551-.449 1-1 1s-1-.449-1-1V3zM6 3a1 1 0 0 1 2 0v5c0 .551-.449 1-1 1s-1-.449-1-1V3zm24 27H2V12h28v18zm0-19H2V7h3v1a2 2 0 1 0 4 0V7h14v1a2 2 0 1 0 4 0V7h3v4z"
                style={{
                  fill: "#fff",
                }}
              />
            </svg>
          </div>
          <h3 className='text-24 font-bol text-primary-100'>
            {setor}
          </h3>
        </div>
          )
        })
        }

        
      </div>


    </div>
  )
}

export default SidebarSetores