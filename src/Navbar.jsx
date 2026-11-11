import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar flex items-center justify-between bg-blue-700  text-white w-screen'>
      <div className='m-2 p-1 font-bold hover:font-extrabold hover:cursor-pointer'>Task manager</div>
      <div className='flex gap-6 mx-2 px-2 font-bold'>
        <div className='hover:cursor-pointer hover:font-extrabold'>Home</div>
        <div className='hover:cursor-pointer hover:font-extrabold'>Your tasks</div>
      </div>
    </div>
  )
}

export default Navbar
