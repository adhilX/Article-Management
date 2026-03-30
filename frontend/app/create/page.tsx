"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateArticlePage() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="max-w-4xl mx-auto w-full pt-8 pb-32">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-white/10 pb-4 gap-4">
        <h1 className="text-3xl font-bold text-white tracking-tight">Write an Article</h1>
        <div className="flex gap-4 items-center">
          <button className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
            Save as draft
          </button>
          <button 
            type="button" 
            onClick={handlePublish}
            disabled={!title || !content}
            className="btn-primary text-sm px-6 py-2 rounded-full shadow-[0_4px_15px_rgba(168,85,247,0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            Publish Article
          </button>
        </div>
      </div>

      <form className="space-y-8">
        <div>
          <input 
            type="text" 
            placeholder="Article Title..." 
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full bg-transparent text-4xl sm:text-5xl font-extrabold text-white placeholder:text-slate-600 focus:outline-none tracking-tight leading-tight"
          />
        </div>

        <div className="flex items-center gap-3 glass-panel px-4 py-2 w-fit rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          <input 
            type="text" 
            placeholder="Add tags (comma separated) e.g. React, Node.js" 
            value={tags}
            onChange={e => setTags(e.target.value)}
            className="w-full sm:w-80 bg-transparent text-slate-300 placeholder:text-slate-600 focus:outline-none font-mono text-sm"
          />
        </div>

        <div className="pt-6 relative group">
          <textarea 
            placeholder="Start writing your amazing story..."
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full min-h-[500px] bg-transparent text-lg text-slate-300 placeholder:text-slate-600 focus:outline-none resize-none leading-relaxed font-serif"
          />
        </div>
      </form>
    </div>
  );
}
