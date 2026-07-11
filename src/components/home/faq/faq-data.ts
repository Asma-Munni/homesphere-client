export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export const faqData: FaqItem[] = [
  {
    id: 1,
    question: "How do I find a property on HomeSphere?",
    answer:
      "Use the Explore page to search properties by location, category, price range, and other filters to quickly find a home that matches your needs.",
  },
  {
    id: 2,
    question: "Who can list a property?",
    answer:
      "Only registered Property Holders can create and manage property listings after signing in to their account.",
  },
  {
    id: 3,
    question: "Is HomeSphere free for tenants?",
    answer:
      "Yes. Browsing properties, searching, filtering, and viewing property details are completely free for tenants.",
  },
  {
    id: 4,
    question: "How can I contact a property holder?",
    answer:
      "Each property details page provides the available contact information or inquiry option shared by the property holder.",
  },
  {
    id: 5,
    question: "Are the property listings verified?",
    answer:
      "HomeSphere reviews submitted listings to improve quality and help users find reliable property information.",
  },
  {
    id: 6,
    question: "Can I save my favorite properties?",
    answer:
      "Yes. Logged-in tenants can save properties to their Favorites list for easy access later.",
  },
];