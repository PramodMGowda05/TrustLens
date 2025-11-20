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
      {/* Placeholder for admin stats and charts */}
       <div className="grid h-64 place-content-center rounded-lg border-2 border-dashed bg-card">
        <p className="text-muted-foreground">Admin statistics and charts will be displayed here.</p>
      </div>
    </div>
  );
}
