import React from 'react'
import BarChart from '../../Graficos/Bar';

const BarPage = () => {
  const data = [
    { x: 'A', y: 20, class: 'Class1', icone: 'src/assets/arow1.png'},
    { x: 'B', y: 35, class: 'Class1', icone: 'src/assets/arow2.png'},
    { x: 'C', y: 15, class: 'Class2', icone: 'src/assets/arow1.png'},
    { x: 'D', y: 25, class: 'Class2', icone: 'src/assets/arow2.png'},
    { x: 'E', y: 30, class: 'Class3', icone: 'src/assets/arow1.png'},
  ];

  return (
    <div>
      <h2>Horizontal Multi-Class Bar Chart Example</h2>
      <BarChart
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

export default BarPage