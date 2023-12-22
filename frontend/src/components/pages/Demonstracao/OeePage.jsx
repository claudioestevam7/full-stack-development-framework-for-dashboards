import React from 'react'
import DobleDonnuts from '../../Graficos/Oee';

const OeePage = () => {
  const data = [
    { label: 'Produtividade', value: 70 },
    { label: 'Categoria 2', value: 30 }
  ];
  const data2 = [
    { label: 'Produtividade', value: 50 },
    { label: 'Categoria 2', value: 50 }
  ];
  const data3 = [
    { label: 'Produtividade', value: 20 },
    { label: 'Categoria 2', value: 80 }
  ];
  return (
    <div>
      <DobleDonnuts
        data={data}
        data2={data2}
        data3={data3}
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

export default OeePage