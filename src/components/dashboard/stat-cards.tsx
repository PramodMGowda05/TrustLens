import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Activity, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export function StatCards() {
  const stats = [
    {
      title: 'Total Analyses',
      value: '12,450',
      icon: <Activity className="h-4 w-4 text-muted-foreground" />,
      change: '+12.5% from last month',
    },
    {
      title: 'Avg. Trust Score',
      value: '81.3',
      icon: <CheckCircle className="h-4 w-4 text-muted-foreground" />,
      change: '+2.1 points from last month',
    },
    {
      title: 'Flagged Reviews',
      value: '1,891',
      icon: <AlertTriangle className="h-4 w-4 text-muted-foreground" />,
      change: '-5.2% from last month',
    },
    {
      title: 'Avg. Analysis Time',
      value: '2.1s',
      icon: <Clock className="h-4 w-4 text-muted-foreground" />,
      change: 'No change',
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
