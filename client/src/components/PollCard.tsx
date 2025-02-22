"use client";
import { UserContext } from '@/context/UserContext';
import { getPollBookmarked } from '@/utils/helper';
import React, { FC, useContext, useState } from 'react';
import UserProfileInfo from './UserProfileInfo';
import PollActions from './PollActions';
import PollContent from './PollContent';

interface PollCardProps {
  pollId: string;
  question: string;
  type: string;
  options: string[];
  voters: number;
  responses: number[];
  creatorProfileImage: string;
  creatorName: string;
  userHasVoted: boolean;
  isPollClosed: boolean;
  createdAt: string;
}

const PollCard: FC<PollCardProps> = ({
  pollId,
  question,
  type,
  options,
  voters,
  responses,
  creatorProfileImage,
  creatorName,
  userHasVoted,
  isPollClosed,
  createdAt,
  isMyPoll
}) => {

  const { user } = useContext(UserContext);

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1)
  const [rating, setRating] = useState(0)
  const [userResponse, setUserResponse] = useState("")
  const [isVoteComplete, setIsVoteComplete] = useState(userHasVoted)
  const [pollResult, setPollResult] = useState({
    options,
    voters,
    responses,
  })

  const isPollBookmarked = getPollBookmarked(
    pollId,
    user?.bookmarkedPolls || []
  )

  const [pollBookmrked, setPollBookmrked] = useState(isPollBookmarked)
  const [pollClosed, setPollClosed] = useState(isPollClosed || false)
  const [pollDeleted, setPollDeleted] = useState(false)

  const handleInput = (value: any) => {
    if (type === "rating") setRating(value);
    else if (type === "open-ended") setUserResponse(value);
    else setSelectedOptionIndex(value);
  }

  return !pollDeleted && <div className='bg-surface-a10 my-5 p-5 rounded-lg border border-primary-a0/20 mx-auto'>
    <div className="flex items-start justify-between">
      <UserProfileInfo
        imgUrl={creatorProfileImage}
        username={creatorName}
        createdAt={createdAt}
      />
      <PollActions
        pollId={pollId}
        isVoteComplete={isVoteComplete}
        onVoteSubmit={() => { }}
        isBookmarked={pollBookmrked}
        toggleBookmark={() => { }}
        inputCaptured={
          !!(userResponse || selectedOptionIndex >= 0 || rating)
        }
        isMyPoll={isMyPoll}
        pollClosed={pollClosed}
        onClosePoll={() => { }}
        onDelete={() => { }}
      />
    </div>

    <div className="ml-14 mt-3">
      <p className='text-lg leading-8'>
        {question}
      </p>
      <div className="mt-4">
        <PollContent
          type={type}
          options={options}
          selectedOptionIndex={selectedOptionIndex}
          onOptionSelect={handleInput}
          rating={rating}
          onRatingChange={handleInput}
          userResponse={userResponse}
          onResponseChange={handleInput}
        />
      </div>
    </div>
  </div>
}

export default PollCard