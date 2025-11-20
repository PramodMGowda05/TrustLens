import { StatCards } from '@/components/dashboard/stat-cards';
import { ReviewForm } from '@/components/dashboard/review-form';
import { RecentAnalyses } from '@/components/dashboard/recent-analyses';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">
          Review Analysis Workspace
        </h1>
        <p className="text-muted-foreground">
          Analyze reviews for authenticity and gain trust insights.
        </p>
      </div>

      <StatCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <ReviewForm />
        </div>
        <div className="lg:col-span-1">
          <RecentAnalyses />
        </div>
      </div>
    </div>
  );
}
