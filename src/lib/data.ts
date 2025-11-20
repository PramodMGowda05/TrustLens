import { PlaceHolderImages } from "./placeholder-images";

export const mockUser = {
  name: "Alex Smith",
  email: "alex.smith@example.com",
  avatar: PlaceHolderImages.find(img => img.id === 'user-avatar')?.imageUrl,
  role: 'admin',
};

export const products = [
  { id: 'prod-1', name: 'Smartwatch Series X' },
  { id: 'prod-2', name: 'Quantum Laptop Pro' },
  { id: 'prod-3', name: 'AcousticBliss Headphones' },
  { id: 'prod-4', name: 'Stellar Drone 4K' },
];

export const platforms = [
  { id: 'plat-1', name: 'Amazon' },
  { id: 'plat-2', name: 'Flipkart' },
  { id: 'plat-3', name: 'Google' },
  { id: 'plat-4', name: 'Other' },
];

export const languages = [
  { id: 'lang-1', name: 'English' },
  { id: 'lang-2', name: 'Hindi' },
  { id: 'lang-3', name: 'Tamil' },
  { id: 'lang-4', name: 'Kannada' },
];

export const recentAnalyses = [
  {
    id: 1,
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    product: 'Smartwatch Series X',
    platform: 'Amazon',
    trustScore: 88,
    classification: 'Genuine',
    reviewText: "This watch is amazing! The battery life is incredible and it tracks my workouts perfectly. Highly recommend to anyone looking for a solid smartwatch.",
    highlightedKeywords: ["amazing", "incredible", "perfectly", "Highly recommend"],
    summarySentences: ["Positive sentiment and specific feature praise suggest an authentic user experience.", "The use of enthusiastic but not overly generic language increases confidence."]
  },
  {
    id: 2,
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    product: 'Quantum Laptop Pro',
    platform: 'Google',
    trustScore: 23,
    classification: 'Fake',
    reviewText: "DO NOT BUY! This is a total scam. The product never arrived and customer service was a nightmare. I want my money back immediately. One star.",
    highlightedKeywords: ["DO NOT BUY", "scam", "nightmare", "money back"],
    summarySentences: ["The review uses overly aggressive, capitalized phrases and common scam-related keywords.", "Lack of specific details about the product itself is a major red flag."]
  },
  {
    id: 3,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    product: 'AcousticBliss Headphones',
    platform: 'Flipkart',
    trustScore: 92,
    classification: 'Genuine',
    reviewText: "The noise cancellation is top-notch. I use them on my daily commute and it completely blocks out the train noise. Sound quality is crisp and clear.",
    highlightedKeywords: ["top-notch", "daily commute", "crisp and clear"],
    summarySentences: ["Mentions a specific use case (daily commute) and details about features (noise cancellation), which points to a genuine purchase.", "The language is positive and descriptive without being hyperbolic."]
  },
  {
    id: 4,
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    product: 'Stellar Drone 4K',
    platform: 'Other',
    trustScore: 76,
    classification: 'Genuine',
    reviewText: "Pretty good drone for the price. The camera quality is decent, though it struggles a bit in low light. Flight controls are intuitive. A solid choice for beginners.",
    highlightedKeywords: ["decent", "struggles a bit", "intuitive", "beginners"],
    summarySentences: ["The review provides a balanced view, mentioning both pros and cons (low light camera performance).", "This balanced perspective is a strong indicator of a real customer review."]
  },
];


export const fakeVsGenuineData = [
    { name: 'Jan', Genuine: 40, Fake: 24 },
    { name: 'Feb', Genuine: 30, Fake: 13 },
    { name: 'Mar', Genuine: 50, Fake: 28 },
    { name: 'Apr', Genuine: 47, Fake: 29 },
    { name: 'May', Genuine: 61, Fake: 23 },
    { name: 'Jun', Genuine: 55, Fake: 18 },
];

export const dailyUsageData = [
    { date: '2023-05-01', count: 25 },
    { date: '2023-05-02', count: 34 },
    { date: '2023-05-03', count: 28 },
    { date: '2023-05-04', count: 45 },
    { date: '2023-05-05', count: 52 },
    { date: '2023-05-06', count: 48 },
    { date: '2023-05-07', count: 60 },
];

export const languageDistributionData = [
    { name: 'English', value: 400, fill: 'hsl(var(--chart-1))' },
    { name: 'Hindi', value: 300, fill: 'hsl(var(--chart-2))' },
    { name: 'Tamil', value: 150, fill: 'hsl(var(--chart-3))' },
    { name: 'Kannada', value: 100, fill: 'hsl(var(--chart-4))' },
];
