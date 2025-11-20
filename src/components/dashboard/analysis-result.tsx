import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';

export function AnalysisResult({ result }) {
  const getScoreColor = (score) => {
    if (score < 40) return 'bg-red-500';
    if (score < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const isFake = result.classification === 'Fake';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Analysis Result</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <label className="text-sm font-medium">Trust Score</label>
            <span className="text-2xl font-bold text-primary">
              {result.trustScore}
            </span>
          </div>
          <Progress
            value={result.trustScore}
            className="h-3"
            indicatorClassName={getScoreColor(result.trustScore)}
          />
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-1">
            <h3 className="font-semibold">Classification</h3>
            <p className="text-sm text-muted-foreground">
              System's conclusion on the review's authenticity.
            </p>
          </div>
          <Badge variant={isFake ? 'destructive' : 'default'} className="text-lg">
            {result.classification}
          </Badge>
        </div>

        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold">
              Visual Explanation (Simulated SHAP)
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <div>
                <h4 className="font-medium mb-2">Highlighted Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {result.highlightedKeywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Summary Sentences</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  {result.summarySentences.map((sentence, index) => (
                    <li key={index}>{sentence}</li>
                  ))}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
