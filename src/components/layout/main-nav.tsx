'use client';

import {
  BarChart,
  BotMessageSquare,
  FileQuestion,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  UserCircle,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '../ui/sidebar';
import { cn } from '@/lib/utils';
import { mockUser } from '@/lib/data';

export function MainNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/dashboard',
      icon: <LayoutDashboard />,
      label: 'Dashboard',
    },
    {
      href: '/analytics',
      icon: <BarChart />,
      label: 'Analytics',
    },
    {
      href: '/profile',
      icon: <UserCircle />,
      label: 'Profile',
    },
    {
      href: '/settings',
      icon: <Settings />,
      label: 'Settings',
    },
    {
      href: '/support',
      icon: <FileQuestion />,
      label: 'Support',
    },
  ];

  const adminNavItems = [
    {
      href: '/admin/dashboard',
      icon: <ShieldCheck />,
      label: 'Admin',
    },
    {
      href: '/admin/users',
      icon: <ShieldCheck />,
      label: 'Users',
    },
    {
      href: '/admin/reviews',
      icon: <ShieldCheck />,
      label: 'Reviews',
    },
    {
      href: '/admin/model-metrics',
      icon: <BotMessageSquare />,
      label: 'Model Metrics',
    },
  ];

  const isAdmin = mockUser.role === 'admin';

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} legacyBehavior passHref>
            <SidebarMenuButton
              isActive={pathname === item.href}
              className="w-full justify-start"
              tooltip={item.label}
            >
              {item.icon}
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}

      {isAdmin && (
        <>
          <div className="mt-4 mb-2 px-2 text-xs font-medium text-muted-foreground uppercase">
            Admin
          </div>
          {adminNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname.startsWith(item.href)}
                  className="w-full justify-start"
                  tooltip={item.label}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </>
      )}
    </SidebarMenu>
  );
}
