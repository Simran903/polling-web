"use client";
import axiosClient from '@/constants/axiosClient';
import { UserContext } from '@/context/UserContext';
import { API_PATHS } from '@/utils/apiPaths';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      clearUser();
      router.push("/auth/signin");
      return;
    }

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const response = await axiosClient.get(API_PATHS.AUTH.GET_USER_INFO, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (isMounted && response.data) {
          updateUser(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user info", error);
        if (isMounted) {
          clearUser();
          localStorage.removeItem("token");
          router.push("/auth/signin");
        }
      }
    };

    fetchUserInfo();

    return () => {
      isMounted = false;
    };
  }, []);

  return { user };
};