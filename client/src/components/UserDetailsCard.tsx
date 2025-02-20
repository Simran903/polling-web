import React, { FC } from 'react';
import StatsInfo from './StatsInfo';
import CharAvatar from './CharAvatar';

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

  return (
    <div className='bg-surface-a10 rounded-lg mt-16 overflow-hidden p-5'>
      <div className="w-full h-32 bg-cover flex justify-center bg-primary-a0/80 relative">
        <div className="absolute -bottom-10 rounded-full overflow-hidden border-2 border-primary-a0">
          {profileImageUrl ? <img
            src={profileImageUrl}
            alt='Profile Image'
            className='w-20 h-20 rounded-full' /> :
            <CharAvatar username={username} width='w-20' height='h-20' style='text-4xl' />
          }
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