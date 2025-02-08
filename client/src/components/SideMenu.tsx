"use client";
import { UserContext } from '@/context/UserContext';
import { SIDE_MENU_DATA } from '@/utils/data';
import { useRouter, usePathname } from 'next/navigation';
import React, { useContext } from 'react';

const SideMenu = () => {
  const router = useRouter();
  const pathname = usePathname();

    const { clearUser } = useContext(UserContext)

  const handleClick = (route: string) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    router.push(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    router.push('/auth/signin');
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-surface-a10 border-r border-surface-a30 p-5 sticky top-[61px] z-20">
      {SIDE_MENU_DATA.map((item) => {
        const isActive = pathname === item.path; // Check if menu item is active

        return (
          <button
            key={item.id}
            className={`w-full flex items-center gap-4 text-lg py-4 rounded-full transition-colors 
              ${isActive ? "bg-primary-a0/80 text-black" : " hover:bg-surface-a40/20"} px-5 mb-4`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className="text-xl" />
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default SideMenu;