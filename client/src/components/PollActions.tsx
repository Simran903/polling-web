import React, { FC, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

interface PollActionsProps {
  isVoteComplete: boolean;
  inputCaptured: boolean;
  onVoteSubmit?: () => Promise<Response>;
  isBookmarked: boolean;
  toggleBookmark: () => void;
  isMyPoll: boolean;
  pollClosed: boolean;
  onClosePoll: () => void;
  onDelete: () => void;
}

const PollActions: FC<PollActionsProps> = ({
  isVoteComplete,
  inputCaptured,
  onVoteSubmit,
  isBookmarked,
  toggleBookmark,
  isMyPoll,
  pollClosed,
  onClosePoll,
  onDelete,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleVoteClick = async (): Promise<void> => {
    if (!onVoteSubmit) return;
    setLoading(true);
    try {
      await onVoteSubmit();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {(isVoteComplete || pollClosed) && (
        <div className="text-sm font-medium text-slate-500 bg-sky-700 px-3 py-1 rounded-md">
          {pollClosed ? "Closed" : "Voted"}
        </div>
      )}

      <button
        className="p-2 rounded-md transition"
        onClick={toggleBookmark}
      >
        {isBookmarked ? <FaBookmark className="text-primary-a0" /> : <FaRegBookmark className="hover:text-primary-a0" />}
      </button>

      {inputCaptured && !isVoteComplete && (
        <button
          className="ml-auto bg-surface-a30 py-1 px-4 rounded-lg hover:bg-primary-a0/50 transition text-sm"
          onClick={handleVoteClick}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      )}
    </div>
  );
};

export default PollActions;