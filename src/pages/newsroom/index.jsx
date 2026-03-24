import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../../components/shared/Layout";
import { client, urlFor } from "../../sanity/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  body,
  "excerpt": array::join(string::split((pt::text(body)), "")[0..200], "") + "..."
}`;

const NewsRoom = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await client.fetch(POSTS_QUERY);
      setPosts(data);

      // Check if there's a slug in URL params
      const slugParam = searchParams.get("article");
      if (slugParam && data.length > 0) {
        const post = data.find((p) => p.slug.current === slugParam);
        if (post) {
          setSelectedPost(post);
        }
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load news articles. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const openArticle = (post) => {
    setSelectedPost(post);
    setSearchParams({ article: post.slug.current });
  };

  const closeArticle = () => {
    setSelectedPost(null);
    setSearchParams({});
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Layout page="News Room">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-100 via-amber-50/30 to-white">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

        <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-stone-400" />
            <span className="text-xs tracking-[0.4em] text-stone-500 uppercase">Latest Updates</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-stone-400" />
          </div>

          <h1 className="text-center text-5xl md:text-6xl font-bold text-stone-800 mb-4 tracking-tight">
            News <span className="text-brand-green">Room</span>
          </h1>

          <p className="text-center text-lg text-stone-600 max-w-2xl mx-auto">
            Stay updated with the latest news, announcements, and insights from Dibyendu Tewary Timber.
          </p>
        </div>
      </section>

      {/* News Grid Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-brand-green/20 border-t-brand-green rounded-full animate-spin mb-4" />
              <p className="text-stone-500">Loading news articles...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="text-stone-600 mb-4">{error}</p>
              <button
                type="button"
                onClick={fetchPosts}
                className="px-6 py-2 bg-brand-green text-white rounded-lg hover:bg-brand-green/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-stone-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <p className="text-stone-600">No news articles available at the moment.</p>
              <p className="text-stone-400 text-sm mt-2">Check back soon for updates!</p>
            </div>
          ) : (
            <>
              {/* Featured Post (First Post) */}
              {posts.length > 0 && (
                <div
                  className="mb-12 cursor-pointer group"
                  onClick={() => openArticle(posts[0])}
                  onKeyDown={(e) => e.key === "Enter" && openArticle(posts[0])}
                  role="button"
                  tabIndex={0}
                >
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-800 to-stone-900">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Image */}
                      <div className="relative h-64 md:h-96 overflow-hidden">
                        {posts[0].mainImage ? (
                          <img
                            src={urlFor(posts[0].mainImage).width(800).height(600).url()}
                            alt={posts[0].title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-brand-green/20 to-emerald-900/40 flex items-center justify-center">
                            <svg className="w-20 h-20 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-stone-900/80 md:block hidden" />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 to-transparent md:hidden" />
                      </div>

                      {/* Content */}
                      <div className="relative p-8 md:p-10 flex flex-col justify-center">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-brand-green/20 text-brand-green text-xs font-semibold rounded-full w-fit mb-4">
                          <span className="w-2 h-2 bg-brand-green rounded-full animate-pulse" />
                          Latest
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-brand-green transition-colors">
                          {posts[0].title}
                        </h2>
                        <p className="text-stone-400 text-sm mb-6 line-clamp-3">
                          {posts[0].excerpt || "Click to read the full article..."}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-stone-500 text-sm">
                            {formatDate(posts[0].publishedAt)}
                          </span>
                          <span className="text-brand-green text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                            Read More
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Other Posts Grid */}
              {posts.length > 1 && (
                <>
                  <h3 className="text-xl font-bold text-stone-800 mb-6">More Articles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.slice(1).map((post) => (
                      <article
                        key={post._id}
                        className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl hover:border-brand-green/30 transition-all duration-300 cursor-pointer"
                        onClick={() => openArticle(post)}
                        onKeyDown={(e) => e.key === "Enter" && openArticle(post)}
                        role="button"
                        tabIndex={0}
                      >
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden bg-stone-100">
                          {post.mainImage ? (
                            <img
                              src={urlFor(post.mainImage).width(400).height(300).url()}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
                              <svg className="w-12 h-12 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <span className="text-xs text-stone-400 mb-2 block">
                            {formatDate(post.publishedAt)}
                          </span>
                          <h3 className="text-lg font-bold text-stone-800 mb-2 group-hover:text-brand-green transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-stone-500 text-sm line-clamp-2 mb-4">
                            {post.excerpt || "Click to read more..."}
                          </p>
                          <span className="text-brand-green text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read Article
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      {/* Article Modal */}
      {selectedPost && (
        <ArticleModal post={selectedPost} onClose={closeArticle} formatDate={formatDate} />
      )}
    </Layout>
  );
};

const ArticleModal = ({ post, onClose, formatDate }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="button"
        tabIndex={0}
        aria-label="Close article"
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl mx-4 my-8 bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-white transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Article Image */}
        {post.mainImage && (
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img
              src={urlFor(post.mainImage).width(1200).height(600).url()}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        {/* Article Content */}
        <div className="p-8 md:p-12">
          {/* Meta */}
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-brand-green/10 text-brand-green text-xs font-semibold rounded-full">
              News
            </span>
            <span className="text-stone-400 text-sm">
              {formatDate(post.publishedAt)}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-stone-800 mb-8">
            {post.title}
          </h1>

          {/* Body */}
          <div className="prose prose-stone prose-lg max-w-none">
            {post.body ? (
              <PortableTextRenderer value={post.body} />
            ) : (
              <p className="text-stone-600">No content available for this article.</p>
            )}
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-stone-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center">
                  <span className="text-brand-green font-bold text-sm">DT</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-800">Dibyendu Tewary Timber</p>
                  <p className="text-xs text-stone-400">Official News</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200 transition-colors text-sm font-medium"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PortableTextRenderer = ({ value }) => {
  if (!Array.isArray(value)) return null;

  return (
    <>
      {value.map((block, index) => {
        if (block._type === "block") {
          const style = block.style || "normal";
          const children = block.children?.map((child, childIndex) => {
            let text = child.text;
            if (child.marks?.includes("strong")) {
              text = <strong key={childIndex}>{text}</strong>;
            }
            if (child.marks?.includes("em")) {
              text = <em key={childIndex}>{text}</em>;
            }
            return text;
          });

          switch (style) {
            case "h1":
              return <h1 key={block._key || index} className="text-3xl font-bold mt-8 mb-4">{children}</h1>;
            case "h2":
              return <h2 key={block._key || index} className="text-2xl font-bold mt-6 mb-3">{children}</h2>;
            case "h3":
              return <h3 key={block._key || index} className="text-xl font-bold mt-5 mb-2">{children}</h3>;
            case "h4":
              return <h4 key={block._key || index} className="text-lg font-bold mt-4 mb-2">{children}</h4>;
            case "blockquote":
              return (
                <blockquote key={block._key || index} className="border-l-4 border-brand-green pl-4 italic text-stone-600 my-4">
                  {children}
                </blockquote>
              );
            default:
              return <p key={block._key || index} className="text-stone-600 leading-relaxed mb-4">{children}</p>;
          }
        }

        if (block._type === "image" && block.asset) {
          return (
            <figure key={block._key || index} className="my-8">
              <img
                src={urlFor(block).width(800).url()}
                alt={block.alt || "Article image"}
                className="w-full rounded-xl"
              />
              {block.caption && (
                <figcaption className="text-center text-sm text-stone-400 mt-2">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        return null;
      })}
    </>
  );
};

export default NewsRoom;
