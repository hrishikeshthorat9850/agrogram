"use client";
import Image from "next/image";
import { useView } from "@/app/ViewContext";
const newsArticles = [
  {
    id: 1,
    title: "Government Announces New Subsidy for Organic Fertilizers",
    summary: "The Ministry of Agriculture has introduced a new subsidy program to encourage the use of organic fertilizers among small and medium-scale farmers.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    date: "2024-06-01",
  },
  {
    id: 2,
    title: "Monsoon Rains Boost Crop Yields Across the Region",
    summary: "Recent monsoon rains have led to a significant increase in crop yields, bringing optimism to the farming community.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
    date: "2024-05-28",
  },
  {
    id: 3,
    title: "New Mobile App Helps Farmers Detect Crop Diseases Early",
    summary: "A new AI-powered mobile app is helping farmers identify and treat crop diseases before they spread, saving time and money.",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
    date: "2024-05-25",
  },
  {
    id: 4,
    title: "Local Market Prices for Dairy Products Hit Record Highs",
    summary: "Dairy farmers are seeing record prices for milk and cheese in local markets, driven by increased demand and supply chain improvements.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    date: "2024-05-20",
  },
];

export default function NewsFullPage({ newsId }) {
  const { setView } = useView();
  const article = newsArticles.find((a) => a.id === Number(newsId));
  if (!article) return null;
  return (
    <section className="w-full min-h-screen bg-green-50 flex flex-col items-center py-8 px-2 md:px-0">
      <button
        onClick={() => setView("news")}
        className="mb-8 px-6 py-2 bg-green-700 text-white rounded-full font-semibold shadow hover:bg-green-800 transition-colors"
      >
        ← Back to News Feed
      </button>
      <article className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col p-4 md:p-8 mb-8">
        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-6">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-2">{article.title}</h2>
          <div className="text-sm text-gray-500 mb-4">{new Date(article.date).toLocaleDateString()}</div>
          <p className="text-green-800 text-lg leading-relaxed mb-2">{article.summary}</p>
        </div>
      </article>
    </section>
  );
} 