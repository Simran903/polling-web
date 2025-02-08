"use client";
import axiosClient from '@/constants/axiosClient';
import { UserContext } from '@/context/UserContext'
import { API_PATHS } from '@/utils/apiPaths';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'

export const useUserAuth = () => {

  const { user, updateUser, clearUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user) return;

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const response = await axiosClient(API_PATHS.AUTH.GET_USER_INFO);
        if (isMounted && response.data) {
          updateUser(response.data)
        }
      } catch (error) {
        console.log("Failed to fetch user info", error);
        if (isMounted) {
          clearUser();
          router.push('/auth/signin')
        }
      }
    }

    fetchUserInfo();

    return () => {
      isMounted = false;
    }
  }, [user, updateUser, clearUser])



}