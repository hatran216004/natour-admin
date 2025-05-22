import React from 'react';
import { FaHome } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';
import { MdCardTravel, MdOutlineRateReview } from 'react-icons/md';
import { RiBillLine } from 'react-icons/ri';
import { CiUser } from 'react-icons/ci';
import Dashboard from '../pages/Dashboard';
import Tours from '../pages/Tours';
import Bookings from '../pages/Bookings';
import Reviews from '../pages/Reviews';
import Users from '../pages/Users';
import UserProfile from '../pages/UserProfile';
import Messages from '../pages/Messages';
import { IoMdChatbubbles } from 'react-icons/io';

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
    icon: FaHome
  },
  {
    href: '/tours',
    label: 'tours',
    icon: MdCardTravel
  },
  {
    href: '/users',
    label: 'users',
    icon: FaRegUser
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
    icon: IoMdChatbubbles
  },
  {
    href: '/profile',
    label: 'profile',
    icon: CiUser
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
