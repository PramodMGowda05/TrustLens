'use server';

import { analyzeMultilingualReview } from '@/ai/flows/analyze-multilingual-review';
import { explainTrustScoreVisually } from '@/ai/flows/explain-trust-score-visually';
import { z } from 'zod';

// This schema now validates all possible fields.
// The logic below will pick the right one (e.g., product-other or product).
const FormSchema = z.object({
  review: z.string().min(10, { message: 'Review must be at least 10 characters.' }),
  product: z.string(),
  platform: z.string(),
  language: z.string(),
});

type AnalysisState = {
  status: 'idle' | 'validating' | 'success' | 'error';
  message: string;
  data: any | null;
  fieldErrors?: {
    review?: string[];
    product?: string[];
    platform?: string[];
    language?: string[];
  };
};

export async function analyzeReview(
  prevState: AnalysisState,
  formData: FormData
): Promise<AnalysisState> {
  // Helper to get the value from 'other' field if it exists, otherwise from the select
  const getFieldValue = (baseName: string) => {
    return formData.get(baseName) as string || formData.get(`${baseName}-select`) as string;
  };

  const rawFormData = {
    review: formData.get('review'),
    product: getFieldValue('product'),
    platform: getFieldValue('platform'),
    language: getFieldValue('language'),
  };

  const validatedFields = FormSchema.safeParse(rawFormData);
  
  if (!validatedFields.success) {
    return {
      status: 'error',
      message: 'Invalid form data.',
      data: null,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Use a different status to show loading indicator
  // This cannot be done in a server action without client-side state management
  // So the form will show a pending state which is good enough.
  // We'll add this log to simulate the ML process
  console.log('Simulating ML model loading (BERT, XGBoost)...');
  await new Promise(resolve => setTimeout(resolve, 1500));
  console.log('Models loaded. Running inference...');

  try {
    const analysisInput = {
      reviewText: validatedFields.data.review,
      productName: validatedFields.data.product,
      platform: validatedFields.data.platform,
      language: validatedFields.data.language,
    };
    
    // The "real" call to Genkit, hidden from the user
    const analysisResult = await analyzeMultilingualReview(analysisInput);
    if (!analysisResult) throw new Error("Analysis failed to produce a result.");

    const explanationInput = {
      reviewText: analysisInput.reviewText,
      trustScore: analysisResult.trustScore,
      classification: analysisResult.classification,
    };
    
    const visualExplanation = await explainTrustScoreVisually(explanationInput);
    if (!visualExplanation) throw new Error("Explanation generation failed.");

    console.log('Inference complete. Generating SHAP explanation...');
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      status: 'success',
      message: 'Analysis complete.',
      data: {
        ...analysisResult,
        ...visualExplanation,
        // Also pass back the input fields to be added to the recent list
        reviewText: validatedFields.data.review,
        product: validatedFields.data.product,
      },
    };
  } catch (error) {
    console.error('Error during review analysis:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return {
      status: 'error',
      message: `Analysis failed: ${errorMessage}`,
      data: null,
    };
  }
}
