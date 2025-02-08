"use client";
import React from 'react'
import DashboardLayout from './DashboardLayout'
import { useUserAuth } from '@/hooks/useUserAuth'

const Dashboard = () => {

  useUserAuth();

  return (
    <div>
      <DashboardLayout>
        <div className="">Home</div>
      </DashboardLayout>
    </div>
  )
}

export default Dashboard