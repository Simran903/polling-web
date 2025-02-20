import { getInitials } from '@/utils/helper';
import React, { FC } from 'react';

interface CharAvatarProps {
  username: string;
  width?: string;
  height?: string;
  style?: string;
}

const CharAvatar: FC<CharAvatarProps> = ({ username, width, height, style }) => {
  return (
    <div className={`${width || 'w-12'} ${height || 'h-12'} ${style || ''} flex items-center justify-center rounded-full font-medium bg-gray-100`}>
      {getInitials(username || "")}
    </div>
  )
}

export default CharAvatar;