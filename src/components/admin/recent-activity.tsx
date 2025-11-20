import { formatDistanceToNow } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { recentAnalyses } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const activities = [
    {
        id: 1,
        user: { name: 'Jane Doe', avatar: PlaceHolderImages.find(img => img.id === 'user-avatar')?.imageUrl },
        action: 'flagged a review for',
        target: 'Quantum Laptop Pro',
        timestamp: new Date(Date.now() - 2 * 60 * 1000)
    },
    {
        id: 2,
        user: { name: 'John Smith', avatar: '' },
        action: 'signed up',
        target: '',
        timestamp: new Date(Date.now() - 10 * 60 * 1000)
    },
    {
        id: 3,
        user: { name: 'Admin', avatar: PlaceHolderImages.find(img => img.id === 'user-avatar')?.imageUrl },
        action: 'approved a review for',
        target: 'Stellar Drone 4K',
        timestamp: new Date(Date.now() - 35 * 60 * 1000)
    }
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Recent Activity</CardTitle>
        <CardDescription>A log of recent system and user events.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} data-ai-hint="person portrait" />
                <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-medium">{activity.user.name}</span>
                  {' '}{activity.action}{' '}
                  {activity.target && <span className="font-medium">{activity.target}</span>}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true, })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
