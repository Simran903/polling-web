import React, { FC } from 'react';
import StatsInfo from './StatsInfo';

interface UserDetailsCardProps {
  profileImageUrl?: string;
  username: string;
  totalPollsVotes?: number;
  totalPollsCreated?: number;
  totalPollsBookmarked?: number;
}

const UserDetailsCard: FC<UserDetailsCardProps> = ({
  profileImageUrl,
  username,
  totalPollsVotes,
  totalPollsCreated,
  totalPollsBookmarked,
}) => {
  // console.log(profileImageUrl);

  return (
    <div className='bg-surface-a10 rounded-lg mt-16 overflow-hidden p-5'>
      <div className="w-full h-32 bg-cover flex justify-center bg-primary-a0/80 relative">
        <div className="absolute -bottom-10 rounded-full overflow-hidden border-2 border-primary-a0">
          <img
            src={profileImageUrl || "https://plus.unsplash.com/premium_photo-1690407617686-d449aa2aad3c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D"}
            alt='Profile Image'
            className='w-20 h-20 rounded-full' />
        </div>
      </div>
      <div className="mt-12 px-5">
        <div className="pt-1 text-center">
          <h5 className='text-lg text-primary-a0 font-medium leading-6'>@{username}</h5>
        </div>
      </div>

      <div className="flex items-center justify-center gap-5 flex-wrap py-6">
        <StatsInfo label="Polls Created" value={totalPollsCreated || 0} />
        <StatsInfo label="Polls Voted" value={totalPollsVotes || 0} />
        <StatsInfo label="Polls Bookmarked" value={totalPollsBookmarked || 0} />
      </div>

    </div>
  );
}

export default UserDetailsCard;