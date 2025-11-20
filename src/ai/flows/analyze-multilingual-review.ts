'use server';

/**
 * @fileOverview A multilingual review analysis AI agent.
 *
 * - analyzeMultilingualReview - A function that handles the review analysis process.
 * - AnalyzeMultilingualReviewInput - The input type for the analyzeMultilingualReview function.
 * - AnalyzeMultilingualReviewOutput - The return type for the analyzeMultilingualReview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeMultilingualReviewInputSchema = z.object({
  reviewText: z.string().describe('The text content of the review to be analyzed.'),
  productName: z.string().describe('The name of the product the review is about.'),
  platform: z.string().describe('The platform where the review was posted (e.g., Amazon, Google, etc.).'),
  language: z.string().describe('The language in which the review is written (e.g., English, Hindi, etc.).'),
});
export type AnalyzeMultilingualReviewInput = z.infer<typeof AnalyzeMultilingualReviewInputSchema>;

const AnalyzeMultilingualReviewOutputSchema = z.object({
  trustScore: z.number().describe('A score between 0 and 100 indicating the trustworthiness of the review.'),
  classification: z.enum(['Fake', 'Genuine']).describe('The classification of the review as either Fake or Genuine.'),
  explanation: z.object({
    highlightedKeywords: z.string().describe('Keywords from the review that contribute to the trust score.'),
    summarySentences: z.string().describe('Summary sentences explaining the trust score.'),
    confidenceBreakdown: z.string().describe('Breakdown of confidence in the classification.'),
  }).describe('Explanation of why review got its classification'),
});
export type AnalyzeMultilingualReviewOutput = z.infer<typeof AnalyzeMultilingualReviewOutputSchema>;

export async function analyzeMultilingualReview(input: AnalyzeMultilingualReviewInput): Promise<AnalyzeMultilingualReviewOutput> {
  return analyzeMultilingualReviewFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeMultilingualReviewPrompt',
  input: {schema: AnalyzeMultilingualReviewInputSchema},
  output: {schema: AnalyzeMultilingualReviewOutputSchema},
  prompt: `You are an AI expert in identifying fake reviews.

You will analyze the review text provided, considering the product name, platform, and language to determine its authenticity. Provide a trust score (0-100), classify the review as Fake or Genuine, and provide an explanation with highlighted keywords, summary sentences, and a confidence breakdown.

Review Text: {{{reviewText}}}
Product Name: {{{productName}}}
Platform: {{{platform}}}
Language: {{{language}}}

Ensure that the output is properly formatted JSON.  In the explanation, provide realistic keywords, summary, and breakdown that are representative of a real review analysis.
`,
});

const analyzeMultilingualReviewFlow = ai.defineFlow(
  {
    name: 'analyzeMultilingualReviewFlow',
    inputSchema: AnalyzeMultilingualReviewInputSchema,
    outputSchema: AnalyzeMultilingualReviewOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
