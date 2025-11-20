import { AdminStatCards } from "@/components/admin/admin-stat-cards";
import { RecentActivity } from "@/components/admin/recent-activity";
import { FlaggedReviewsTable } from "@/components/admin/flagged-reviews-table";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          System overview and moderation statistics.
        </p>
      </div>

      <AdminStatCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <FlaggedReviewsTable />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
