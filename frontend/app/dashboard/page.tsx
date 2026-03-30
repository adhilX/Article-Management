"use client";

import Link from "next/link";
import ArticleCard from "../../components/ArticleCard";

export default function DashboardPage() {
  // Dummy data for visual development
  const metrics = [
    { label: "Total Articles", value: "12", gradient: "from-purple-500 to-indigo-500" },
    { label: "Total Views", value: "4.2k", gradient: "from-pink-500 to-rose-500" },
    { label: "Subscribers", value: "148", gradient: "from-amber-500 to-orange-500" },
  ];

  const recentArticles = [
    {
      _id: "1",
      title: "Building Microservices with Node.js and Docker",
      excerpt: "Learn how to establish a robust microservices architecture utilizing containerization...",
      author: { name: "Demo User" },
      createdAt: "2026-03-20T10:00:00.000Z",
      tags: ["DevOps", "Node.js"]
    },
    {
      _id: "2",
      title: "The Future of React: Server Components Explained",
      excerpt: "Dive deep into the new paradigm of rendering components exclusively on the server.",
      author: { name: "Demo User" },
      createdAt: "2026-03-25T14:30:00.000Z",
      tags: ["React", "Frontend"]
    },
    {
      _id: "3",
      title: "Mastering Tailwind CSS 4 Features",
      excerpt: "A comprehensive guide to leveraging the new engine and v4 exclusive utilities for your Next.js project.",
      author: { name: "Demo User" },
      createdAt: "2026-03-28T09:15:00.000Z",
      tags: ["Tailwind", "Design"]
    }
  ];

  return (
    <div className="flex-1 w-full space-y-12 pb-12">
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
          {recentArticles.map(article => (
            <div key={article._id} className="h-[280px]">
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
