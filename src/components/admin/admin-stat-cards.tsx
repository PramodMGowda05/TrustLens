import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Users, ShieldAlert, ScanLine, Server } from 'lucide-react';

export function AdminStatCards() {
  const stats = [
    {
      title: 'Total Users',
      value: '152',
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      change: '+15 since last month',
    },
    {
      title: 'Pending Moderation',
      value: '12',
      icon: <ShieldAlert className="h-4 w-4 text-muted-foreground" />,
      change: '+3 new today',
    },
    {
      title: 'Total Analyses',
      value: '25,831',
      icon: <ScanLine className="h-4 w-4 text-muted-foreground" />,
      change: '+8.2% from last month',
    },
    {
      title: 'System Status',
      value: 'Operational',
      icon: <Server className="h-4 w-4 text-muted-foreground" />,
      change: 'All systems normal',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
