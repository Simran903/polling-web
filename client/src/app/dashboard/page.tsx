"use client";
import React from 'react';
import DashboardLayout from './DashboardLayout';
import { useUserAuth } from '@/hooks/useUserAuth';

const Dashboard = () => {
  
  useUserAuth();

  return (
    <DashboardLayout>
      <div className="">Home</div>
    </DashboardLayout>
  );
};

export default Dashboard;