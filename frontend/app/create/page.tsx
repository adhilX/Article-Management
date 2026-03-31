"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createArticle } from "../../services/articleServices";
import ProtectedRoute from "../../components/ProtectedRoute";
import { Tag, Send } from "lucide-react";

export default function CreateArticlePage() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    setLoading(true);
    setError("");

    try {
      const tagsArray = tags.split(",").map(t => t.trim()).filter(t => t !== "");
      await createArticle({
        title,
        content,
        description,
        tags: tagsArray
      });
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create article");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto w-full pt-8 pb-32">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-white/10 pb-4 gap-4">
          <h1 className="text-3xl font-bold text-white tracking-tight">Write an Article</h1>
          <div className="flex gap-4 items-center">
            <button 
              type="button"
              onClick={() => router.push("/")}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handlePublish}
              disabled={!title || !content}
              className="btn-primary text-sm rounded-full shadow-[0_4px_15px_rgba(37,99,235,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              Post
            </button>
          </div>
        </div>

        <form className="space-y-8" onSubmit={handlePublish}>
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
              className="w-full sm:w-80 bg-transparent text-slate-300 placeholder:text-slate-600 focus:outline-none font-mono text-sm disabled:opacity-50"
            />
          </div>

          <div className="pt-6 relative group">
            <textarea
              placeholder="Start writing your amazing story..."
              value={content}
              onChange={e => setContent(e.target.value)}
              disabled={loading}
              className="w-full min-h-[500px] bg-transparent text-lg text-slate-300 placeholder:text-slate-600 focus:outline-none resize-none leading-relaxed font-serif disabled:opacity-50"
            />
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
}
