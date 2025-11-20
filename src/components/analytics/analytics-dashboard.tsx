import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FakeGenuineChart } from './fake-genuine-chart';
import { DailyUsageChart } from './daily-usage-chart';
import { LanguageDonut } from './language-donut';
import { StatCards } from '../dashboard/stat-cards';

export function AnalyticsDashboard() {
  return (
    <div className="space-y-8">
      <StatCards />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Fake vs. Genuine Over Time</CardTitle>
            <CardDescription>
              Monthly distribution of review classifications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FakeGenuineChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Language Distribution</CardTitle>
            <CardDescription>
              Breakdown of submitted review languages.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LanguageDonut />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Daily Usage Trends</CardTitle>
          <CardDescription>
            Number of reviews analyzed per day.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DailyUsageChart />
        </CardContent>
      </Card>
    </div>
  );
}
