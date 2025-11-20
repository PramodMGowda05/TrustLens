import { Header } from '@/components/layout/header';
import { MainNav } from '@/components/layout/main-nav';
import { UserNav } from '@/components/layout/user-nav';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Bot } from 'lucide-react';
import Link from 'next/link';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen">
        <Sidebar collapsible="icon">
          <SidebarHeader className="p-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Bot className="w-8 h-8 text-primary" />
              <h1 className="text-xl font-headline font-semibold text-primary group-data-[collapsible=icon]:hidden">
                TrustLens
              </h1>
            </Link>
          </SidebarHeader>
          <SidebarContent className="p-2">
            <MainNav />
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-col md:ml-[var(--sidebar-width-icon)] transition-[margin-left] ease-in-out duration-200 group-data-[state=expanded]/sidebar-wrapper:md:ml-[var(--sidebar-width)]">
          <Header />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
