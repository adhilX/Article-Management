"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ArticleCard from "../components/ArticleCard";
import { getArticles, deleteArticle, getTags } from "../services/articleServices";

import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import { Plus, Search, ChevronLeft, ChevronRight, Hash } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmationModal from "../components/ConfirmationModal";

export default function DashboardPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1,
    limit: 6
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [dynamicTags, setDynamicTags] = useState<string[]>([]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
      setCurrentPage(1); // Reset to first page on new search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    fetchArticles();
    fetchTags();
  }, [searchQuery, activeTag, currentPage]);

  const fetchTags = async () => {
    try {
      const tags = await getTags();
      setDynamicTags(tags);
    } catch (err) {
      console.error("Failed to fetch tags", err);
    }
  };

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await getArticles({
        search: searchQuery,
        tag: activeTag,
        page: currentPage,
        limit: 6
      });
      setArticles(data.articles);
      setPagination(data.pagination);
    } catch (err: any) {
      setError("Failed to fetch articles");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setArticleToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!articleToDelete) return;

    try {
      setDeleting(true);
      await deleteArticle(articleToDelete);
      setArticles(articles.filter((a) => a._id !== articleToDelete));
      toast.success("Article deleted successfully");

      // If the page becomes empty, go back a page
      if (articles.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      } else {
        fetchArticles(); // Refresh to fill the gap from the next page if exists
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete article");
    } finally {
      setDeleting(false);
      setDeleteModalOpen(false);
      setArticleToDelete(null);
    }
  };

  const handleTagClick = (tag: string) => {
    setActiveTag(prev => prev === tag ? "" : tag);
    setCurrentPage(1);
  };


  return (
    <ProtectedRoute>
      <div className="flex-1 w-full space-y-8 pb-12">
        <Navbar />

        {/* Search and Filters Header */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full max-w-xl group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
              <input
                type="text"
                placeholder="Search articles by title, description or tags..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all"
              />
              {searchInput && (
                <button
                  onClick={() => setSearchInput("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            <Link href="/create" className="btn-primary group w-full md:w-auto px-4">
              <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform" />
              New
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-slate-400 mr-2 flex items-center gap-1">
              <Hash className="h-4 w-4" /> Filters:
            </span>
            <button
              onClick={() => { setActiveTag(""); setCurrentPage(1); }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${activeTag === ""
                  ? "bg-purple-500 text-white border-purple-500"
                  : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20 hover:text-white"
                }`}
            >
              All Topics
            </button>
            {dynamicTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${activeTag === tag
                    ? "bg-purple-500 text-white border-purple-500"
                    : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20 hover:text-white"
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <section className="space-y-8">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              {searchQuery ? `Search results for "${searchQuery}"` : activeTag ? `Topic: ${activeTag}` : "Recent Articles"}
              {!loading && <span className="text-sm font-normal text-slate-500 bg-white/5 px-3 py-1 rounded-full">{pagination.total} articles</span>}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-[280px] glass-panel rounded-2xl animate-pulse bg-white/5"></div>
              ))
            ) : error ? (
              <div className="col-span-full py-20 text-center glass-panel rounded-2xl border-red-500/20">
                <p className="text-red-400">{error}</p>
                <button onClick={() => fetchArticles()} className="mt-4 text-sm text-purple-400 hover:underline">Try again</button>
              </div>
            ) : articles.length === 0 ? (
              <div className="col-span-full py-20 text-center glass-panel rounded-2xl border-white/5">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-slate-500" />
                </div>
                <p className="text-slate-400 text-lg">No articles found.</p>
                <button
                  onClick={() => { setSearchInput(""); setActiveTag(""); }}
                  className="mt-4 inline-block text-sm text-purple-400 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              articles.map((article: any) => (
                <div key={article._id} className="h-full">
                  <ArticleCard article={article} onDelete={handleDeleteClick} />
                </div>
              ))
            )}
          </div>

          {/* Pagination Controls */}
          {pagination.pages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1 || loading}
                className="p-2 rounded-xl glass-panel border border-white/5 hover:border-white/20 disabled:opacity-30 disabled:hover:border-white/5 transition-all"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>

              <div className="flex items-center gap-2">
                {[...Array(pagination.pages)].map((_, i) => {
                  const pageNum = i + 1;
                  // Show current page, first, last, and pages around current
                  if (
                    pageNum === 1 ||
                    pageNum === pagination.pages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        disabled={loading}
                        className={`w-10 h-10 rounded-xl font-bold transition-all border ${currentPage === pageNum
                            ? "bg-purple-500 text-white border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                            : "glass-panel text-slate-400 border-white/5 hover:border-white/20 hover:text-white"
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (
                    pageNum === currentPage - 2 ||
                    pageNum === currentPage + 2
                  ) {
                    return <span key={pageNum} className="text-slate-600 font-bold px-1">...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(pagination.pages, prev + 1))}
                disabled={currentPage === pagination.pages || loading}
                className="p-2 rounded-xl glass-panel border border-white/5 hover:border-white/20 disabled:opacity-30 disabled:hover:border-white/5 transition-all"
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </button>
            </div>
          )}
        </section>

        <ConfirmationModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Article"
          message="Are you sure you want to delete this article? This action cannot be undone."
          isLoading={deleting}
        />
      </div>
    </ProtectedRoute>
  );
}
