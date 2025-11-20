'use server';

/**
 * @fileOverview Explains the trust score of a review visually using highlighted keywords and summary sentences.
 *
 * - explainTrustScoreVisually - A function that generates a visual explanation of the trust score.
 * - ExplainTrustScoreVisuallyInput - The input type for the explainTrustScoreVisually function.
 * - ExplainTrustScoreVisuallyOutput - The return type for the explainTrustScoreVisually function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainTrustScoreVisuallyInputSchema = z.object({
  reviewText: z.string().describe('The text content of the review.'),
  trustScore: z.number().describe('The trust score of the review (0-100).'),
  classification: z
    .enum(['Fake', 'Genuine'])
    .describe('The classification of the review.'),
});
export type ExplainTrustScoreVisuallyInput = z.infer<
  typeof ExplainTrustScoreVisuallyInputSchema
>;

const ExplainTrustScoreVisuallyOutputSchema = z.object({
  highlightedKeywords: z
    .array(z.string())
    .describe('Keywords from the review that contribute to the trust score.'),
  summarySentences: z
    .array(z.string())
    .describe(
      'Summary sentences explaining why the review was classified as fake or genuine.'
    ),
});
export type ExplainTrustScoreVisuallyOutput = z.infer<
  typeof ExplainTrustScoreVisuallyOutputSchema
>;

export async function explainTrustScoreVisually(
  input: ExplainTrustScoreVisuallyInput
): Promise<ExplainTrustScoreVisuallyOutput> {
  return explainTrustScoreVisuallyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainTrustScoreVisuallyPrompt',
  model: 'googleai/gemini-pro',
  input: {schema: ExplainTrustScoreVisuallyInputSchema},
  output: {schema: ExplainTrustScoreVisuallyOutputSchema},
  prompt: `You are an AI expert in analyzing customer reviews to determine their authenticity.

  Based on the review text, trust score, and classification, generate a visual explanation that highlights keywords and provides summary sentences explaining the classification.

  Review Text: {{{reviewText}}}
  Trust Score: {{{trustScore}}}
  Classification: {{{classification}}}

  Output should contain:
  - highlightedKeywords: An array of keywords from the review that significantly contribute to the trust score.
  - summarySentences: An array of concise sentences explaining why the review was classified as fake or genuine, referencing the highlighted keywords where applicable.

  Example Output Format:
  {
    "highlightedKeywords": ["unreliable", "scam", "never", "refund"],
    "summarySentences": [
      "The review contains strong negative language such as 'unreliable' and 'scam', indicating a potential issue.",
      "The reviewer mentions 'never' receiving a refund, which is a common complaint in fake reviews.",
      "The combination of these factors contributes to the review being classified as fake."]
  }
`,
});

const explainTrustScoreVisuallyFlow = ai.defineFlow(
  {
    name: 'explainTrustScoreVisuallyFlow',
    inputSchema: ExplainTrustScoreVisuallyInputSchema,
    outputSchema: ExplainTrustScoreVisuallyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
