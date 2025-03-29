import { FaHome } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';
import { MdCardTravel, MdOutlineRateReview } from 'react-icons/md';
import { RiBillLine } from 'react-icons/ri';
import { CiUser } from 'react-icons/ci';
import Dashboard from '../pages/Dashboard';
import Tours from '../pages/Tours/Tours.tsx';
import Bookings from '../pages/Bookings/Bookings.tsx';
import Reviews from '../pages/Reviews/Reviews.tsx';
import Users from '../pages/Users/Users.tsx';
import UserProfile from '../pages/UserProfile/UserProfile.tsx';
import React from 'react';

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
  }
];
