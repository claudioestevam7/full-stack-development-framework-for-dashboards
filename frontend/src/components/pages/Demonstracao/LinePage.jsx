import React from 'react'
import MultiLineChart from '../../Graficos/Line';

const LinePage = () => {
  const data = [
    { x: 1, y1: 30, y2: 20 },
    { x: 2, y1: 50, y2: 40 },
    { x: 3, y1: 20, y2: 35 },
    { x: 4, y1: 45, y2: 25 },
  ];

  return (
    <div>
      <h1>Gráfico de Linhas Múltiplas</h1>
      <MultiLineChart
        data={data}
        width={800}
        height={500}
        margin={{ top: 30, right: 30, bottom: 50, left: 50 }}
        xKey="x"
        yKeys={['y1', 'y2']}
        lineColors={['#4CAF50', '#2196F3']}
        lineWidth={2}
        pointRadius={5}
        backgroundColor="#f9f9f9"
        grid={true}
      />
    </div>
  );
}

export default LinePage