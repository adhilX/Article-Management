"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ArticleCard from "../components/ArticleCard";
import { getArticles, deleteArticle } from "../services/articleServices";

import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "@/components/Navbar";

export default function DashboardPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await getArticles();
      setArticles(data);
    } catch (err: any) {
      setError("Failed to fetch articles");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await deleteArticle(id);
        setArticles(articles.filter(a => a._id !== id));
      } catch (err: any) {
        alert(err.response?.data?.message || "Failed to delete article");
      }
    }
  };

  // Metrics (calculated from real data)
  const metrics = [
    { label: "Total Articles", value: articles.length.toString(), gradient: "from-purple-500 to-indigo-500" },
    { label: "Total Views", value: "0", gradient: "from-pink-500 to-rose-500" },
    { label: "Subscribers", value: "0", gradient: "from-amber-500 to-orange-500" },
  ];

  return (
    <ProtectedRoute>
      <div className="flex-1 w-full space-y-12 pb-12">
        <Navbar />
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mt-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-2 tracking-tight">
              Dashboard
            </h1>
            <p className="text-slate-400 text-lg">Manage your content and analytics.</p>
          </div>
          <Link href="/create" className="btn-primary group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            New Article
          </Link>
        </header>

        {/* Metrics Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((m, i) => (
            <div key={i} className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
              <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${m.gradient} rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}></div>
              <h3 className="text-slate-400 text-sm font-medium mb-1 relative z-10">{m.label}</h3>
              <p className="text-4xl font-bold text-white relative z-10">{m.value}</p>
            </div>
          ))}
        </section>

        {/* Articles Grid */}
        <section>
          <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
            <h2 className="text-2xl font-bold text-white">Recent Articles</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm font-medium text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                All
              </button>
              <button className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                Published
              </button>
              <button className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                Drafts
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full py-20 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mb-4"></div>
                <p className="text-slate-400">Loading your articles...</p>
              </div>
            ) : error ? (
              <div className="col-span-full py-20 text-center glass-panel rounded-2xl border-red-500/20">
                <p className="text-red-400">{error}</p>
                <button onClick={() => fetchArticles()} className="mt-4 text-sm text-purple-400 hover:underline">Try again</button>
              </div>
            ) : articles.length === 0 ? (
              <div className="col-span-full py-20 text-center glass-panel rounded-2xl border-white/5">
                <p className="text-slate-400">You haven't written any articles yet.</p>
                <Link href="/create" className="mt-4 inline-block text-sm text-purple-400 hover:underline">Write your first story</Link>
              </div>
            ) : (
              articles.map((article: any) => (
                <div key={article._id} className="h-[280px]">
                  <ArticleCard article={article} onDelete={handleDelete} />
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}
