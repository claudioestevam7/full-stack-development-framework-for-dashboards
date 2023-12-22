import React from 'react'
import PieChart from '../../Graficos/Pie'

const PiePage = () => {
  const data = [
    { label: 'Categoria 1', value: 30 },
    { label: 'Categoria 2', value: 50 },
    { label: 'Categoria 3', value: 20 },
    { label: 'Categoria 4', value: 30 },
  ];
return (
  <div>
    <h1 className='font-bold'>Gráfico de Pizza</h1>
    <PieChart
      data={data}
      width={400}
      height={400}
      radius={200}
      innerRadius={50}
      cornerRadius={10}
      padAngle={0.02}
      borderWidth={3}
      borderColor="#fff"
      backgroundColor="#f0f0f0"
    />
  </div>
)
}

export default PiePage
