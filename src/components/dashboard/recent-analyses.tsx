import { formatDistanceToNow } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { recentAnalyses } from '@/lib/data';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { AnalysisResult } from './analysis-result';

export function RecentAnalyses() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Recent Analyses</CardTitle>
        <CardDescription>A log of your latest analyses.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAnalyses.map((analysis) => (
            <div
              key={analysis.id}
              className="flex items-center justify-between"
            >
              <div className="space-y-1">
                <p className="font-medium truncate">{analysis.product}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(analysis.timestamp), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    analysis.classification === 'Fake'
                      ? 'destructive'
                      : 'secondary'
                  }
                >
                  {analysis.trustScore}
                </Badge>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                      <DialogTitle>Analysis Details</DialogTitle>
                      <DialogDescription>
                        Full analysis report for "{analysis.product}".
                      </DialogDescription>
                    </DialogHeader>
                    <div className="text-sm text-muted-foreground bg-secondary p-4 rounded-md my-4">
                      <p className="font-mono">{analysis.reviewText}</p>
                    </div>
                    <AnalysisResult result={analysis} />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
