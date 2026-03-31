"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getArticleById, updateArticle } from "../../../services/articleServices";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { Tag, Save, X } from "lucide-react";

export default function EditArticlePage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchArticle();
    }
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const data = await getArticleById(id as string);
      setTitle(data.title);
      setTags(data.tags?.join(", ") || "");
      setContent(data.content);
      setDescription(data.description || "");
    } catch (err: any) {
      setError("Failed to load article data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    setUpdating(true);
    setError("");

    try {
      const tagsArray = tags.split(",").map(t => t.trim()).filter(t => t !== "");
      await updateArticle(id as string, {
        title,
        content,
        description,
        tags: tagsArray
      });
      router.push(`/articles/${id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to update article");
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  // Early return for loading
  if (loading) {
    return (
      <ProtectedRoute>
        <div className="max-w-4xl mx-auto w-full pt-32 pb-32 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
          <p className="text-slate-400">Loading article editor...</p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto w-full pt-8 pb-32">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-white/10 pb-4 gap-4">
          <h1 className="text-3xl font-bold text-white tracking-tight">Edit Article</h1>
          <div className="flex gap-4 items-center">
            <button 
              type="button"
              onClick={() => router.back()}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Discard changes
            </button>
            <button 
              type="button" 
              onClick={handleUpdate}
              disabled={!title || !content || updating}
              className="btn-primary text-sm px-6 py-2 rounded-full shadow-[0_4px_15px_rgba(168,85,247,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {updating ? "Updating..." : "Update Article"}
            </button>
          </div>
        </div>

        <form className="space-y-8" onSubmit={handleUpdate}>
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
              {error}
            </div>
          )}
          <div>
            <input 
              type="text" 
              placeholder="Article Title..." 
              value={title}
              onChange={e => setTitle(e.target.value)}
              disabled={updating}
              className="w-full bg-transparent text-4xl sm:text-5xl font-extrabold text-white placeholder:text-slate-600 focus:outline-none tracking-tight leading-tight disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
             <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Description (Summary)</label>
             <input 
              type="text" 
              placeholder="Summarize your article for the feed..." 
              value={description}
              onChange={e => setDescription(e.target.value)}
              disabled={updating}
              className="w-full bg-transparent text-lg text-slate-300 placeholder:text-slate-600 focus:outline-none border-b border-white/5 pb-2 disabled:opacity-50"
            />
          </div>

          <div className="flex items-center gap-3 glass-panel px-4 py-2 w-fit rounded-lg">
            <Tag className="h-5 w-5 text-slate-500" />
            <input 
              type="text" 
              placeholder="Add tags (comma separated)" 
              value={tags}
              onChange={e => setTags(e.target.value)}
              disabled={updating}
              className="w-full sm:w-80 bg-transparent text-slate-300 placeholder:text-slate-600 focus:outline-none font-mono text-sm disabled:opacity-50"
            />
          </div>

          <div className="pt-6 relative group">
            <textarea 
              placeholder="Start writing your amazing story..."
              value={content}
              onChange={e => setContent(e.target.value)}
              disabled={updating}
              className="w-full min-h-[500px] bg-transparent text-lg text-slate-300 placeholder:text-slate-600 focus:outline-none resize-none leading-relaxed font-serif disabled:opacity-50"
            />
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
}
