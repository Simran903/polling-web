import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import SideMenu from './SideMenu'

const Navbar = () => {
  const [openSideMenu, setOpenSideMenu] = useState(false)
  return (
    <div className='flex gap-5 border-b border-surface-a30 bg-surface-a10 backdrop-blur-[2px] p-4 top-0 z-30 sticky'>

      <button
        className='block lg:hidden'
        onClick={() => {
          setOpenSideMenu(!openSideMenu)
        }}
      >
        {openSideMenu ? <HiOutlineX className='text-2xl' /> : <HiOutlineMenu className='text-2xl' />}
      </button>
      <h2 className='text-xl font-medium text-primary-a0'>Polling App</h2>

      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4">
          <SideMenu />
        </div>
      )}
    </div>
  )
}

export default Navbar