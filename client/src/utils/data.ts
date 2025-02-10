import { LuBadgeCheck, LuBookmark, LuLayoutDashboard, LuLogOut, LuPenTool, LuVote } from "react-icons/lu";

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: '/dashboard'
  },
  {
    id: "02",
    label: "Create Poll",
    icon: LuVote,
    path: '/dashboard/create-poll'
  },
  {
    id: "03",
    label: "My Polls",
    icon: LuPenTool,
    path: '/dashboard/my-polls'
  },
  {
    id: "04",
    label: "Voted Polls",
    icon: LuBadgeCheck,
    path: '/dashboard/voted-polls'
  },
  {
    id: "05",
    label: "Bookmarks",
    icon: LuBookmark,
    path: '/dashboard/bookmarked-polls'
  },
  {
    id: "06",
    label: "Logout",
    icon: LuLogOut,
    path: '/auth/signin'
  },
]

export const POLL_TYPE = [
  {id: "01", label: "Yes/No", value: "yes/no"},
  {id: "02", label: "Single Choice", value: "single-choice"},
  {id: "03", label: "Rating", value: "rating"},
  {id: "04", label: "Image Based", value: "image-based"},
  {id: "05", label: "Open Ended", value: "open-ended"},
]