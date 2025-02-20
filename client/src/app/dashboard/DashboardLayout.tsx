"use client";
import Navbar from '@/components/Navbar'
import SideMenu from '@/components/SideMenu'
import UserDetailsCard from '@/components/UserDetailsCard';
import { UserContext } from '@/context/UserContext';
import React, { FC, ReactNode, useContext } from 'react'

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {

  const { user }: any = useContext(UserContext)
  
  return (
    <div className=''>
      <Navbar />

      {user && (<div className="flex">
        <div className="max-[1080px]:hidden">
          <SideMenu />
        </div>
        <div className="grow mx-5">
          {children}
        </div>
        <div className="hidden md:block mr-5">
          <UserDetailsCard
            profileImageUrl={user && user.profileImageUrl}
            username={user && user.username}
            totalPollsVotes={user && user.totalPollsVotes}
            totalPollsCreated={user && user.totalPollsCreated}
            totalPollsBookmarked={user && user.totalPollsBookmarked}
          />
        </div>
      </div>)}
    </div>
  )
}

export default DashboardLayout