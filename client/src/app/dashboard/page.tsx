"use client";
import React, { useState, useEffect, FC } from 'react';
import DashboardLayout from './DashboardLayout';
import { useUserAuth } from '@/hooks/useUserAuth';
import { useRouter } from 'next/navigation';
import HeaderWithFilter from '@/components/HeaderWithFilter';
import axiosClient from '@/constants/axiosClient';
import { API_PATHS } from '@/utils/apiPaths';
import PollCard from '@/components/PollCard';

const PAGE_SIZE: number = 10;

interface Poll {
  _id: string;
  question: string;
  type: string;
  options: any[];
  voters: any[];
  responses: any[];
  creator: {
    profileImageUrl: string | null;
    username: string;
  };
  userHasVoted: boolean;
  closed: boolean;
  createdAt: string | false;
}

const Dashboard: FC = () => {
  useUserAuth();
  const router = useRouter();

  const [allPolls, setAllPolls] = useState<Poll[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<string>("");

  const fetchAllPolls = async (overridePage: number = 1): Promise<void> => {
    if (loading) return;
    setLoading(true);

    try {
      const token: string | null = localStorage.getItem("token");

      const response = await axiosClient.get(
        `${API_PATHS.POLLS.GET_ALL}?page=${overridePage}&limit=${PAGE_SIZE}&type=${filterType}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.polls?.length > 0) {
        setAllPolls((prevPolls) => overridePage === 1 ? response?.data?.polls : [...prevPolls, ...response?.data?.polls]);
        setStats(response?.data?.stats || []);
        setHasMore(response?.data?.polls?.length === PAGE_SIZE);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching polls:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchAllPolls(page);
  }, [filterType]);

  useEffect(() => {
    if (page !== 1) {
      fetchAllPolls();
    }
   }, [page]);

   return (
     <DashboardLayout>
       <div className="my-5 mx-auto">
         <HeaderWithFilter
           title="Polls"
           filterType={filterType}
           setFilterType={(type: string) => {
             setFilterType(type);
           }}
         />
         {allPolls.map((poll) => (
           <PollCard
             key={`dashboard_${poll._id}`}
             pollId={poll._id}
             question={poll.question}
             type={poll.type}
             options={poll.options}
             voters={poll.voters.length || 0}
             responses={poll.responses || []}
             creatorProfileImage={poll.creator.profileImageUrl || ""}
             creatorName={poll.creator.username}
             userHasVoted={poll.userHasVoted || false}
             isPollClosed={poll.closed || false}
             createdAt={poll.createdAt || ""}
           />
         ))}
       </div>
     </DashboardLayout>
   );
};

export default Dashboard;