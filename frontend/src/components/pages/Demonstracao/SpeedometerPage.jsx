import React from 'react'
import SpeedometerChart from '../../Graficos/Speedometer'

const SpeedometerPage = () => {
  const value = 78

  return (
    <div className="h-[350px] w-[700px] relative">
      <SpeedometerChart value={value} />
    </div>
  );
}

export default SpeedometerPage