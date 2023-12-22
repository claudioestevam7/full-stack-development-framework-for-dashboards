import React from 'react'
import ParetoChart from '../../Graficos/Pareto';

const ParetoPage = () => {
  const data = [
    { category: 'A', value: 20 },
    { category: 'B', value: 35 },
    { category: 'C', value: 15 },
    { category: 'D', value: 25 },
    { category: 'E', value: 30 },
  ];

  return (
    <div>
      <h2>Pareto Chart Example</h2>
      <ParetoChart data={data} width={800} height={500} margin={{ top: 30, right: 30, bottom: 50, left: 50 }} />
    </div>
  );
}

export default ParetoPage