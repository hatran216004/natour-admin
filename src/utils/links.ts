import { FaHome } from 'react-icons/fa';
import { FaRegUser } from 'react-icons/fa';
import { MdCardTravel, MdOutlineRateReview } from 'react-icons/md';
import { RiBillLine } from 'react-icons/ri';
import { CiUser } from 'react-icons/ci';
import React from 'react';

type NavLink = {
  href: string;
  label: string;
  icon: React.ElementType;
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
