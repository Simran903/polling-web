import React, { FC } from 'react';

interface StatsInfoProps {
  label: string;
  value: string | number;
}

const StatsInfo: FC<StatsInfoProps> = ({ label, value }) => {
  return (
    <div className='text-center'>
      <p className='font-medium text-gray-200'>{value}</p>
      <p className='text-xs mt-[2px] text-primary-a20'>{label}</p>
    </div>
  )
}

export default StatsInfo;