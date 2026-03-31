"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ArticleCard from "../components/ArticleCard";
import { getArticles, deleteArticle, getTags } from "../services/articleServices";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import { Plus, Search, Hash, AlertCircle, BookOpen, SearchX, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmationModal from "../components/ConfirmationModal";
import Pagination from "@/components/Pagination";
import { motion, AnimatePresence } from "framer-motion";

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
            <div className="relative w-full max-w-xl group border-none">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
              <input
                type="text"
                placeholder="Search articles by title, description or tags..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all"
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

            <Link href="/create" className="btn-primary group w-full md:w-auto px-6 py-3">
              <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform" />
              New Article
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-slate-400 mr-2 flex items-center gap-1">
              <Hash className="h-4 w-4" /> Filters:
            </span>
            <button
              onClick={() => { setActiveTag(""); setCurrentPage(1); }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all border ${activeTag === ""
                ? "bg-blue-600 text-white border-blue-600"
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
                  ? "bg-blue-600 text-white border-blue-600"
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
              <div className="col-span-full py-20 text-center glass-panel rounded-3xl border-red-500/20">
                <AlertCircle className="w-12 h-12 text-red-500/50 mx-auto mb-4" />
                <p className="text-red-400 font-medium">{error}</p>
                <button onClick={() => fetchArticles()} className="mt-4 px-6 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all text-sm font-bold">Try again</button>
              </div>
            ) : dynamicTags.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-full py-24 text-center glass-panel rounded-[2.5rem] border-white/5 overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-blue-600/5 blur-3xl rounded-full -z-10 translate-y-1/2" />
                <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-12 group hover:rotate-0 transition-transform duration-500">
                  <BookOpen className="h-10 w-10 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Your story starts here</h3>
                <p className="text-slate-400 max-w-sm mx-auto mb-8">Ready to share your insights? Create your first article and build your personal knowledge base.</p>
                <Link href="/create" className="btn-primary px-8 py-3.5 group">
                  <Sparkles className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  Write First Story
                </Link>
              </motion.div>
            ) : articles.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="col-span-full py-24 text-center glass-panel rounded-[2.5rem] border-dashed border-white/10"
              >
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <SearchX className="h-8 w-8 text-slate-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No matching articles</h3>
                <p className="text-slate-400 max-w-xs mx-auto mb-8">We couldn't find anything matching your current filters. Try different keywords or browse all topics.</p>
                <button
                  onClick={() => { setSearchInput(""); setActiveTag(""); }}
                  className="px-6 py-2.5 rounded-xl bg-white/5 text-blue-400 hover:bg-white/10 transition-all font-bold group flex items-center mx-auto"
                >
                  Clear all filters
                </button>
              </motion.div>
            ) : (
                <AnimatePresence mode="popLayout">
                {articles.map((article: any, index: number) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    key={article._id} 
                    className="h-full"
                  >
                    <ArticleCard article={article} onDelete={handleDeleteClick} />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={pagination.pages}
            onPageChange={(page) => setCurrentPage(page)}
            loading={loading}
          />
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
