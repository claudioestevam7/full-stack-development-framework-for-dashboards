import React from 'react'
import ColumnsChart from '../../Graficos/Column';

const ColumnsPage = () => {
  const data = [
    { x: 'Categoria 1', y: 30},
    { x: 'Categoria 2', y: 50},
    { x: 'Categoria 3', y: 20},
    { x: 'Categoria 4', y: 70},
    { x: 'Categoria 5', y: 70},
  ];

  return (
    <div>
      <h1 className='font-bold'>Gráfico de Barras com Múltiplas Classes</h1>
      <ColumnsChart
        data={data}
        width={800}
        height={500}
        margin={{ top: 30, right: 30, bottom: 50, left: 50 }}
        xKey="x"
        yKey="y"
        classKey="class"
        backgroundColor="#f9f9f9"
        grid={true}
      />
    </div>
  );
}

export default ColumnsPage