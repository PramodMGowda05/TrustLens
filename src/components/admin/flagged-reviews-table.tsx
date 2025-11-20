import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { recentAnalyses } from "@/lib/data";
import Link from "next/link";

export function FlaggedReviewsTable() {
  const flaggedReviews = recentAnalyses.filter(r => r.classification === 'Fake');

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Moderation Queue</CardTitle>
            <CardDescription>Reviews automatically flagged as 'Fake' by the system.</CardDescription>
        </div>
        <Link href="/admin/reviews">
            <Button variant="outline" size="sm">View All</Button>
        </Link>
      </CardHeader>
      <CardContent>
         <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Trust Score</TableHead>
              <TableHead className="hidden md:table-cell">Review</TableHead>
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
                 <TableCell className="max-w-sm truncate hidden md:table-cell">{review.reviewText}</TableCell>
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
  );
}
