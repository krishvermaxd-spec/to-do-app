import React from 'react'
import Navbar from './Navbar'
import Task from './Task'
import doodle from './assets/doodle.png'


const App = () => {
  return (
    <>
      <div className='w-screen h-screen bg-gray-100 overflow-auto'>
        <img src={doodle} alt="bg" className='absolute  opacity-50 object-cover w-screen h-screen inset-0 pointer-events-none blur-xs' />
        <h1 className='md:text-3xl text-xl w-full flex justify-center font-bold mt-1'>Hello</h1>
        <h2 className='md:text-xl text-sm text-gray-500 w-full flex shrink justify-center font-semibold'>What's your focus for today?</h2>

        <Task/>
      </div>
    </>
  )
}

export default App
