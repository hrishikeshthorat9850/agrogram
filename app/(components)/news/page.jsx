"use client";
import { useState,useEffect } from "react";
import { useView } from "@/app/ViewContext";
import Image from "next/image";
import Link from "next/link";

export default function News() {
  const slugify = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric with dashes
    .replace(/^-+|-+$/g, '')     // trim leading/trailing dashes
    .slice(0, 100); 
  const [news,setNews] = useState([{
    id : "",
    title : "",
    summary : "",
    date : "",
    imgUrl : "",
    srcUrl : ""
  }]);
  const { setView } = useView();
  const apiUrl = "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=38cfe7fceb6540bf95cf4b05401503b6";
const fetchApi = async () => {
    try {
      const res = await fetch(apiUrl);
      const jsonData = await res.json();
      const articles = jsonData.articles.map((article) => ({
        id: slugify(article.title),
        title: article.title,
        summary: article.content || article.description || "No summary available.",
        date: article.publishedAt,
        imgUrl: article.urlToImage,
        srcUrl : article.urlToImage
      }));
      setNews(articles);
      localStorage.setItem("articles", JSON.stringify(articles));
      console.log(articles);
    } catch (err) {
      console.error("Error fetching news:", err);
      }
    };
  useEffect(() => {
    fetchApi();
  }, []);
  return (
    <section className="w-full max-w-xl mx-auto mt-6 mb-8">
      <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">AgroGram News</h2>
      <div className="flex flex-col gap-6">
        {news.map((article) => (
          <Link href={`/news/${article.id}`} key={article.id} className="bg-white rounded-xl shadow-md flex flex-col md:flex-row overflow-hidden hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-green-400 group text-left cursor-pointer">
            <div className="relative w-full md:w-40 h-48 md:h-auto flex-shrink-0">
              <Image
                src={article.srcUrl || null}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
                sizes="(max-width: 768px) 100vw, 160px"
                priority={article.id}
              />
            </div>
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-1">{article.title}</h3>
                <p className="text-green-700 text-sm mb-2 line-clamp-3">{article.summary}</p>
              </div>
              <div className="text-xs text-gray-500 mt-2">{new Date(article.date).toLocaleDateString()}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
} 