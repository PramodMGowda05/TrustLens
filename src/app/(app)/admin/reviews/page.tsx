import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { recentAnalyses } from "@/lib/data";

export default function FlaggedReviewsPage() {
  const flaggedReviews = recentAnalyses.filter(r => r.classification === 'Fake').slice(0, 2);
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">
          Flagged Reviews
        </h1>
        <p className="text-muted-foreground">
          Approve, reject, or mark reviews as suspicious.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Moderation Queue</CardTitle>
          <CardDescription>Reviews automatically flagged as 'Fake' by the system.</CardDescription>
        </CardHeader>
        <CardContent>
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Trust Score</TableHead>
                <TableHead>Review</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {flaggedReviews.map(review => (
                <TableRow key={review.id}>
                  <TableCell>{review.product}</TableCell>
                  <TableCell>
                    <Badge variant={review.trustScore < 50 ? "destructive" : "secondary"}>
                      {review.trustScore}
                    </Badge>
                  </TableCell>
                   <TableCell className="max-w-sm truncate">{review.reviewText}</TableCell>
                  <TableCell className="text-right">
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">Approve</Button>
                      <Button variant="destructive" size="sm">Reject</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
