import Link from "next/link";

interface Article {
  _id: string;
  title: string;
  excerpt: string;
  author: { name: string };
  createdAt: string;
  tags?: string[];
}

export default function ArticleCard({ article }: { article: Article }) {
  // Format date assuming an ISO string
  const dateStr = new Date(article.createdAt || Date.now()).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div className="glass-panel p-5 rounded-2xl flex flex-col group hover:-translate-y-1 hover:shadow-[0_15px_40px_-10px_rgba(168,85,247,0.2)] transition-all duration-300 h-full border border-white/5 hover:border-white/10 relative overflow-hidden">
      {/* Decorative gradient blob inside card */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-500 pointer-events-none" />

      <div className="flex-1 mt-2 z-10">
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-wrap gap-2">
            {(article.tags || ["Article"]).slice(0, 2).map((tag, i) => (
              <span key={i} className="text-[10px] font-semibold tracking-wider uppercase bg-white/10 text-slate-300 px-2.5 py-1 rounded-full border border-white/5">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-500">{dateStr}</p>
        </div>

        <Link href={`/articles/${article._id}`} className="block mt-1">
          <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-purple-300 transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-slate-400 line-clamp-3 mb-4 leading-relaxed">
            {article.excerpt}
          </p>
        </Link>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between z-10 w-full">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-slate-600 to-slate-400 flex items-center justify-center text-[10px] font-bold text-white shadow-inner">
            {article.author.name.charAt(0).toUpperCase()}
          </div>
          <span className="text-xs font-medium text-slate-400">{article.author.name}</span>
        </div>
        
        <div className="flex gap-2">
          <Link 
            href={`/edit/${article._id}`}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
            title="Edit Article"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
          </Link>
          <Link 
            href={`/articles/${article._id}`}
            className="p-1.5 text-slate-400 hover:text-purple-400 hover:bg-purple-400/10 rounded-md transition-colors"
            title="View Article"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
