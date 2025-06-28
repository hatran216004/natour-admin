import React from 'react';
import { VscHome } from 'react-icons/vsc';
import { PiUsersThreeThin } from 'react-icons/pi';
import { MdCardTravel, MdOutlineRateReview } from 'react-icons/md';
import { RiBillLine } from 'react-icons/ri';
import { LiaUserSolid } from 'react-icons/lia';
import { PiChats } from 'react-icons/pi';
import Dashboard from '../pages/Dashboard';
import Tours from '../pages/Tours';
import Bookings from '../pages/Bookings';
import Reviews from '../pages/Reviews';
import Users from '../pages/Users';
import UserProfile from '../pages/UserProfile';
import Messages from '../pages/Messages';
import BookingDetail from '../pages/Bookings/BookingDetail';

type NavLink = {
  href: string;
  label: string;
  icon: React.ElementType;
};

type Routes = {
  path: string;
  element: React.ElementType;
};

export const links: NavLink[] = [
  {
    href: '/dashboard',
    label: 'dashboard',
    icon: VscHome
  },
  {
    href: '/tours',
    label: 'tours',
    icon: MdCardTravel
  },
  {
    href: '/users',
    label: 'users',
    icon: PiUsersThreeThin
  },
  {
    href: '/reviews',
    label: 'reviews',
    icon: MdOutlineRateReview
  },
  {
    href: '/bookings',
    label: 'bookings',
    icon: RiBillLine
  },
  {
    href: '/messages',
    label: 'messages',
    icon: PiChats
  },
  {
    href: '/profile',
    label: 'profile',
    icon: LiaUserSolid
  }
];

export const routes: Routes[] = [
  {
    path: 'dashboard',
    element: Dashboard
  },
  {
    path: 'tours',
    element: Tours
  },
  {
    path: 'bookings',
    element: Bookings
  },
  {
    path: 'bookings/:id',
    element: BookingDetail
  },
  {
    path: 'reviews',
    element: Reviews
  },
  {
    path: 'users',
    element: Users
  },
  {
    path: 'profile',
    element: UserProfile
  },
  {
    path: 'messages',
    element: Messages
  }
];
