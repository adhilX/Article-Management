"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getArticleById } from "../../../services/articleServices";

export default function ArticleDetailView() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetchArticle();
    }
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const data = await getArticleById(id as string);
      setArticle(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load article");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto w-full pt-32 pb-32 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
        <p className="text-slate-400">Opening the story...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-3xl mx-auto w-full pt-32 pb-32 text-center">
        <div className="glass-panel p-10 rounded-3xl border-red-500/20">
          <p className="text-red-400 text-lg mb-6">{error || "Article not found"}</p>
          <Link href="/" className="btn-primary px-8">Back Home</Link>
        </div>
      </div>
    );
  }

  const dateStr = new Date(article.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <article className="max-w-3xl mx-auto w-full pt-12 pb-32">
      <Link href="/" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors mb-10 group bg-white/5 py-1.5 px-3 rounded-full hover:bg-white/10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Dashboard
      </Link>
      
      <header className="mb-12">
        <div className="flex flex-wrap gap-2 mb-6">
          {(article.tags || []).map((tag: string, i: number) => (
            <span key={i} className="text-[10px] font-bold tracking-widest uppercase bg-purple-500/20 text-purple-300 px-3 py-1.5 rounded-full border border-purple-500/30">
              {tag}
            </span>
          ))}
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
          {article.title}
        </h1>
        
        <div className="flex items-center justify-between border-t border-b border-white/10 py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-purple-500/20 ring-2 ring-white/10">
              {article.author?.name?.charAt(0).toUpperCase() || "A"}
            </div>
            <div>
              <p className="font-semibold text-white">{article.author?.name || "Author"}</p>
              <p className="text-sm text-slate-400">{dateStr} · {Math.ceil(article.content.split(" ").length / 200)} min read</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2.5 text-slate-400 hover:text-pink-400 hover:bg-pink-400/10 rounded-full transition-all border border-transparent hover:border-pink-400/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="p-2.5 text-slate-400 hover:text-indigo-400 hover:bg-indigo-400/10 rounded-full transition-all border border-transparent hover:border-indigo-400/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="prose prose-invert prose-lg max-w-none text-slate-300 font-serif pb-12">
        <p className="text-2xl text-slate-200 mb-8 font-sans font-light leading-relaxed">
          {article.description}
        </p>
        
        <div className="whitespace-pre-wrap leading-relaxed">
          {article.content}
        </div>
      </div>
    </article>
  );
}
