'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { analyzeReview } from '@/app/actions';
import { AnalysisResult } from './analysis-result';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { languages, platforms, products } from '@/lib/data';

const initialState = {
  status: 'idle' as 'idle' | 'validating' | 'success' | 'error',
  message: '',
  data: null as any,
  fieldErrors: undefined as any,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto" suppressHydrationWarning>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Analyze Review
    </Button>
  );
}

type ReviewFormProps = {
  onAnalysisComplete: (newAnalysis: any) => void;
};

export function ReviewForm({ onAnalysisComplete }: ReviewFormProps) {
  const [state, formAction] = useActionState(analyzeReview, initialState);
  const { toast } = useToast();

  const [productValue, setProductValue] = useState(products[0].name);
  const [platformValue, setPlatformValue] = useState(platforms[0].name);
  const [languageValue, setLanguageValue] = useState(languages[0].name);
  
  const [showOtherProduct, setShowOtherProduct] = useState(false);
  const [showOtherPlatform, setShowOtherPlatform] = useState(false);
  const [showOtherLanguage, setShowOtherLanguage] = useState(false);

  useEffect(() => {
    if (state.status === 'error') {
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: state.message,
      });
    }
    if (state.status === 'success' && state.data) {
      onAnalysisComplete({
        ...state.data,
        id: new Date().getTime(),
        timestamp: new Date().toISOString(),
      });
    }
  }, [state, toast, onAnalysisComplete]);

  return (
    <form action={formAction}>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Analyze Review</CardTitle>
          <CardDescription>
            Paste a review below to get an instant authenticity analysis.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="review">Review Text</Label>
            <Textarea
              id="review"
              name="review"
              placeholder="e.g., 'This product is absolutely amazing...'"
              className="min-h-[120px]"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Product Field */}
            <div className="space-y-2">
              <Label htmlFor="product-select">Product</Label>
               <Select name="product-select" value={productValue} onValueChange={(value) => {
                 setShowOtherProduct(value === 'other');
                 setProductValue(value);
               }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map(p => <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>)}
                  <SelectItem value="other">Other...</SelectItem>
                </SelectContent>
              </Select>
              {showOtherProduct && (
                <Input name="product" placeholder="Enter product name" required className="mt-2" />
              )}
               <Input type="hidden" name="product" value={showOtherProduct ? "" : productValue} />
            </div>

            {/* Platform Field */}
            <div className="space-y-2">
              <Label htmlFor="platform-select">Platform</Label>
              <Select name="platform-select" value={platformValue} onValueChange={(value) => {
                 setShowOtherPlatform(value === 'other');
                 setPlatformValue(value);
               }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a platform" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map(p => <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>)}
                  <SelectItem value="other">Other...</SelectItem>
                </SelectContent>
              </Select>
              {showOtherPlatform && (
                <Input name="platform" placeholder="Enter platform name" required className="mt-2" />
              )}
               <Input type="hidden" name="platform" value={showOtherPlatform ? "" : platformValue} />
            </div>

            {/* Language Field */}
            <div className="space-y-2">
              <Label htmlFor="language-select">Language</Label>
              <Select name="language-select" value={languageValue} onValueChange={(value) => {
                 setShowOtherLanguage(value === 'other');
                 setLanguageValue(value);
               }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(l => <SelectItem key={l.id} value={l.name}>{l.name}</SelectItem>)}
                  <SelectItem value="other">Other...</SelectItem>
                </SelectContent>
              </Select>
              {showOtherLanguage && (
                <Input name="language" placeholder="Enter language" required className="mt-2" />
              )}
              <Input type="hidden" name="language" value={showOtherLanguage ? "" : languageValue} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <SubmitButton />
        </CardFooter>
      </Card>
      
      {state.status === 'success' && state.data && (
        <div className="mt-8">
          <AnalysisResult result={state.data} />
        </div>
      )}
      
      {state.status === 'validating' && (
         <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Analysis in Progress...</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </CardContent>
          </Card>
        </div>
      )}

      {state.status === 'idle' && (
        <div className="mt-8">
          <Alert className="border-dashed">
            <AlertTitle>Waiting for input</AlertTitle>
            <AlertDescription>
              Your analysis results will appear here.
            </AlertDescription>
          </Alert>
        </div>
      )}
    </form>
  );
}
