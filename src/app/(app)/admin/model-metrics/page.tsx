import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle2 } from "lucide-react";

export default function ModelMetricsPage() {
  const demoMetrics = [
    { name: "BERT-base-uncased (Fine-tuned)", accuracy: "92.3%", f1: "0.925" },
    { name: "XGBoost Classifier (Stacked)", accuracy: "93.1%", f1: "0.932" },
  ]
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">
          Model Metrics
        </h1>
        <p className="text-muted-foreground">
          Performance metrics from our demo ML models.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Demonstration Model Performance</CardTitle>
          <CardDescription>These metrics are from the offline-trained dummy models and are not used for live inference. They exist for demonstration purposes.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model Name</TableHead>
                <TableHead>Accuracy</TableHead>
                <TableHead>F1-Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoMetrics.map(metric => (
                <TableRow key={metric.name}>
                  <TableCell className="font-medium">{metric.name}</TableCell>
                  <TableCell>{metric.accuracy}</TableCell>
                  <TableCell>{metric.f1}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Live Analysis Engine</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="h-6 w-6 text-green-500" />
            <div>
              <p className="font-semibold">Google Genkit AI</p>
              <p className="text-sm text-muted-foreground">
                All live review analyses are powered by our highly-available, state-of-the-art Genkit AI engine.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
