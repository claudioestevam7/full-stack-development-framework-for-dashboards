import React from 'react'

const Sidebar = () => {
  return (
    <div className=''>
      <h1 className='font-medium text-24'>Sidebar</h1>
      {/* TIPOS DE TYPY : https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input */}


      <div className='flex flex-col'>

        <input type='button' className='w-full bg-primary-700' placeholder='texto' />
        <input type='checkbox' className='w-full' placeholder='texto' />
        <input type='color' className='w-full' placeholder='texto' />
        <input type='date' className='w-full' placeholder='texto' />
        <input type='datetime' className='w-full' placeholder='texto' />
        <input type='datetime' className='w-full' placeholder='texto' />
        <input type='email' className='w-full' placeholder='texto' />
        <input type='file' className='w-full' placeholder='texto' />
        <input type='hidden' className='w-full' placeholder='texto' />
        <input type='image' className='w-full' placeholder='texto' />
        <input type='month' className='w-full' placeholder='texto' />
        <input type='number' className='w-full' placeholder='texto' />
        <input type='password' className='w-full' placeholder='texto' />
        <input type='radio' className='w-full' placeholder='texto' />
        <input type='range' className='w-full' placeholder='texto' />

        <select name="cars" id="cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </div>





    </div>
  )
}

export default Sidebar
