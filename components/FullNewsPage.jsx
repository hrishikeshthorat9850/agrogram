"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useView } from '@/Context/ViewContext';
export default function NewsDetailPage() {
  const params = useParams();
  const id = params?.id;
  const [article, setArticle] = useState(null);
  const {view,setView} = useView();
  useEffect(() => {
    if (!id) return;

    const stored = localStorage.getItem('articles');
    if (!stored) return;

    try {
      const articles = JSON.parse(stored);
      const match = articles.find((a) => a.id === id);
      setArticle(match);
    } catch (err) {
      console.error("Error reading articles from localStorage", err);
    }
  }, [id]);

  if (!id) {
    return <div className="p-6 text-gray-500">Loading...</div>;
  }

  if (!article) {
    return <div className="p-6 text-red-500">Article not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
      <img src={article.imgUrl || null} alt={article.title} className="rounded mb-4" />
      <p className="text-sm text-gray-500 mb-2">
        Published on: {new Date(article.date).toLocaleDateString()}
      </p>
      <p className="text-gray-800">
        {article.summary || article.description || "No content available."}
      </p>
    </div>
  );
}
