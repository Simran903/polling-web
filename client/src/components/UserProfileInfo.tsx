import Image from 'next/image';
import React, { FC } from 'react';
import CharAvatar from './CharAvatar';
import moment from 'moment';

interface UserProfileInfoProps {
  imgUrl?: string;
  username: string;
  createdAt?: string | Date;
}

const UserProfileInfo: FC<UserProfileInfoProps> = ({ imgUrl, username, createdAt }) => {
  return (
    <div className='flex items-center gap-4'>
      {imgUrl ? (
        <Image src={imgUrl} alt='' className='w-10 h-10 rounded-full border border-primary-a0/50' width='10' height='10' />
      ) : (
        <CharAvatar username={username} style='text-lg border border-primary-a0/50 h-10 w-10' />
      )}
      <div className="">
        <p className='text-[15px] font-medium leading-4'>
          @{username}
          <span className='mx-1 text-sm text-slate-500'> ~</span>
          <span className='mx-1 text-[10.5px]  text-slate-500'>
            {createdAt && moment(createdAt).fromNow()}
          </span>
        </p>
      </div>
    </div>
  );
}

export default UserProfileInfo;