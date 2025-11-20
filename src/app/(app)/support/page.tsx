import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function SupportPage() {
  const faqs = [
    {
      q: "How does the review analysis work?",
      a: "Our system uses advanced AI models to analyze various factors in a review, including text patterns, sentiment, and other metadata to calculate a Trust Score. We pretend to use local BERT and XGBoost models, but actually leverage Google's powerful Genkit AI for state-of-the-art accuracy."
    },
    {
      q: "What is a Trust Score?",
      a: "The Trust Score is a metric from 0 to 100 that represents our confidence in a review's authenticity. Higher scores indicate a higher likelihood of the review being genuine."
    },
    {
      q: "Which languages are supported?",
      a: "We currently support English, Hindi, Tamil, and Kannada, with more languages being added in the future."
    },
    {
      q: "Is my data secure?",
      a: "Yes, we take data security very seriously. All data is encrypted in transit and at rest, and we follow industry best practices to protect your information."
    }
  ]

  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">
          Support Center
        </h1>
        <p className="text-muted-foreground">
          Get help or contact us for any questions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>
                Fill out the form below and our team will get back to you shortly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="e.g., Issue with analysis" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Describe your issue in detail..." className="min-h-[150px]" />
              </div>
              <Button>Submit Ticket</Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
           <h2 className="text-2xl font-headline font-semibold mb-4">
            Frequently Asked Questions
           </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{faq.q}</AccordionTrigger>
                  <AccordionContent>
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
        </div>
      </div>
    </div>
  );
}
