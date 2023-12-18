import React from 'react'


const Palette = () => {



  const cores = {

    primary: [
      "#dedee0",
      "#bdbec1",
      "#9b9da1",
      "#7a7d82",
      "#595c63",
      "#474a4f",
      "#35373b",
      "#242528",
      "#121214"
    ],
    secundary: [
      "#fad3d1",
      "#f5a7a4",
      "#ef7b76",
      "#ea4f49",
      "#e5231b",
      "#b71c16",
      "#891510",
      "#5c0e0b",
      "#2e0705"
    ],
    tertiary: [
      "#e7e7e7",
      "#cfcece",
      "#b7b6b6",
      "#9f9d9d",
      "#878585",
      "#6c6a6a",
      "#515050",
      "#363535",
      "#1b1b1b"
    ],
    fourth: [
      "#d9deee",
      "#b3bddc",
      "#8c9ccb",
      "#667bb9",
      "#405aa8",
      "#334886",
      "#263665",
      "#1a2443",
      "#0d1222"      
    ]
  }

  return (
    <div className="">
      <h1 className='font-bold mb-[2rem]'>Paletta de Cores</h1>
      <div className="">

        {
          Object.entries(cores).map(([chave, cor]) => (

            <div className='flex'> 
              <h3 className='font-bold w-[4rem] mr-3'>{chave}</h3>
              <div className="flex mb-[2rem] w-full" >
                {
                  cor.map((codCor, index) => {
                    return (
                      <div className='w-[8rem] flex flex-col justify-center items-center'>
                        <div className={`w-16 h-16 m-1 flex items-center justify-center`} style={{ backgroundColor: `${codCor}` }}>
                          <h4 className='text-sm bg-white'>{codCor}</h4>
                        </div>
                        <h5>{chave}-{(index + 1) * 100}</h5>
                      </div>
                    )

                  })
                }

              </div >
            </div>


          ))

        }


      </div>
    </div>
  )
}

export default Palette