"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getArticleById, deleteArticle } from "../../../services/articleServices";
import { ArrowLeft, FileEdit, Trash2, Calendar, Clock } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmationModal from "../../../components/ConfirmationModal";

export default function ArticleDetailView() {
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

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

  const confirmDelete = async () => {
    try {
      setDeleting(true);
      await deleteArticle(id as string);
      toast.success("Article deleted successfully");
      router.push("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete article");
    } finally {
      setDeleting(false);
      setDeleteModalOpen(false);
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
        <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back
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
            {/* <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-purple-500/20 ring-2 ring-white/10">
              {article.author?.name?.charAt(0).toUpperCase() || "A"}
            </div> */}
            <div>
              {/* <p className="font-semibold text-white">{article.author?.name || "Author"}</p> */}
              <div className="flex items-center gap-4 text-sm text-slate-400 mt-1">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {dateStr}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {Math.ceil(article.content.split(" ").length / 200)} min read
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Link 
              href={`/edit/${article._id}`}
              className="p-2.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all border border-transparent hover:border-white/20"
              title="Edit Article"
            >
              <FileEdit className="h-5 w-5" />
            </Link>
            <button 
              onClick={() => setDeleteModalOpen(true)}
              className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-all border border-transparent hover:border-red-400/30"
              title="Delete Article"
            >
              <Trash2 className="h-5 w-5" />
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

      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Article"
        message="Are you sure you want to delete this article? This action cannot be undone."
        isLoading={deleting}
      />
    </article>
  );
}
