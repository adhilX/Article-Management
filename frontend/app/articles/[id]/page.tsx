import Link from "next/link";

export default function ArticleDetailView() {
  return (
    <article className="max-w-3xl mx-auto w-full pt-12 pb-32">
      <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors mb-10 group bg-white/5 py-1.5 px-3 rounded-full hover:bg-white/10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Dashboard
      </Link>
      
      <header className="mb-12">
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-[10px] font-bold tracking-widest uppercase bg-purple-500/20 text-purple-300 px-3 py-1.5 rounded-full border border-purple-500/30">
            DevOps
          </span>
          <span className="text-[10px] font-bold tracking-widest uppercase bg-pink-500/20 text-pink-300 px-3 py-1.5 rounded-full border border-pink-500/30">
            Node.js
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-8 leading-tight">
          Building Microservices with Node.js and Docker
        </h1>
        
        <div className="flex items-center justify-between border-t border-b border-white/10 py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-lg font-bold text-white shadow-lg shadow-purple-500/20 ring-2 ring-white/10">
              D
            </div>
            <div>
              <p className="font-semibold text-white">Demo User</p>
              <p className="text-sm text-slate-400">Mar 20, 2026 · 8 min read</p>
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
          Learn how to establish a robust microservices architecture utilizing containerization to ensure your software is infinitely scalable and easy to deploy across environments.
        </p>
        
        <h2 className="text-3xl font-bold text-white mt-16 mb-6 font-sans">Introduction to Microarchitectures</h2>
        <p className="mb-6 leading-relaxed">
          The shift from monolithic applications to microservices has empowered development teams to scale rapidly, deploy independently, and iterate faster. Rather than deploying one massive codebase where a single error can crash the entire system, microservices isolate failures.
        </p>
        <p className="mb-8 leading-relaxed">
          In this article, we'll demonstrate setting up a fully dockerized Node.js service mesh that communicates asynchronously.
        </p>
        
        <div className="my-16 p-10 glass-panel rounded-2xl border border-purple-500/30 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl group-hover:bg-pink-500/20 transition-colors duration-700"></div>
          <p className="text-2xl font-medium text-white italic mb-4 relative z-10 leading-relaxed font-sans">
            "Containerization isn't just about shipping code, it's about shipping the identical operating environment with it."
          </p>
        </div>
        
        <h2 className="text-3xl font-bold text-white mt-16 mb-6 font-sans">Dockerizing your Node Application</h2>
        <p className="mb-6 leading-relaxed">
          The first step to building a resilient microservice is abstracting it into its own container image. We start by defining a <code className="bg-slate-800 text-pink-400 px-2 py-1 rounded text-sm font-mono border border-slate-700">Dockerfile</code> that extends a lightweight Node Alpine image.
        </p>
      </div>
    </article>
  );
}
