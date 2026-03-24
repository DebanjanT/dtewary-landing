import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../../components/shared/Layout";
import { client, urlFor } from "../../sanity/client";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  body
}`;

const ArticlePage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await client.fetch(POST_QUERY, { slug });
        if (!data) {
          setError("Article not found");
        } else {
          setPost(data);
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load article. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <Layout page="News Room">
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-stone-50 to-white">
          <div className="w-12 h-12 border-4 border-brand-green/20 border-t-brand-green rounded-full animate-spin mb-4" />
          <p className="text-stone-500">Loading article...</p>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout page="News Room">
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-stone-50 to-white px-6">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-stone-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-stone-800 mb-2">Article Not Found</h1>
          <p className="text-stone-500 mb-8 text-center max-w-md">
            {error || "The article you're looking for doesn't exist or has been removed."}
          </p>
          <Link
            to="/newsroom"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-green text-white rounded-full font-medium hover:bg-brand-green/90 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to News Room
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout page="News Room">
      {/* Article Header with Hero Image */}
      <article className="relative">
        {/* Hero Image Section */}
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden bg-stone-900">
          {post.mainImage ? (
            <>
              <img
                src={urlFor(post.mainImage).width(1920).height(1080).url()}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/50 to-transparent" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand-green/20 to-stone-900" />
          )}

          {/* Back Button */}
          <Link
            to="/newsroom"
            className="absolute top-6 left-6 z-10 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-sm font-medium hover:bg-white/20 transition-all border border-white/20"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to News
          </Link>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              {/* Meta */}
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-brand-green text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                  News
                </span>
                <span className="text-white/70 text-sm">
                  {formatDate(post.publishedAt)}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="relative bg-white">
          {/* Vintage paper texture */}
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

          <div className="relative max-w-4xl mx-auto px-6 py-12 md:py-16">
            {/* Decorative Line */}
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-stone-300 to-transparent" />
              <div className="w-2 h-2 rotate-45 border-2 border-brand-green" />
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-stone-300 to-transparent" />
            </div>

            {/* Article Body */}
            <div className="prose prose-lg prose-stone max-w-none">
              {post.body ? (
                <PortableTextRenderer value={post.body} />
              ) : (
                <p className="text-stone-500 italic">No content available for this article.</p>
              )}
            </div>

            {/* Article Footer */}
            <footer className="mt-16 pt-10 border-t-2 border-stone-100">
              {/* Author Card */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 bg-gradient-to-br from-stone-50 to-amber-50/30 rounded-2xl border border-stone-200">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-green to-emerald-600 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">DT</span>
                  </div>
                  <div>
                    <p className="font-bold text-stone-800">Dibyendu Tewary Timber</p>
                    <p className="text-sm text-stone-500">Official News & Announcements</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    to="/newsroom"
                    className="px-5 py-2.5 bg-white text-stone-700 rounded-full text-sm font-medium hover:bg-stone-100 transition-colors border border-stone-200"
                  >
                    More Articles
                  </Link>
                  <Link
                    to="/contact"
                    className="px-5 py-2.5 bg-brand-green text-white rounded-full text-sm font-medium hover:bg-brand-green/90 transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>

              {/* Share Section */}
              <div className="mt-8 text-center">
                <p className="text-xs text-stone-400 uppercase tracking-widest mb-4">Share this article</p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: post.title,
                          url: window.location.href,
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert("Link copied to clipboard!");
                      }
                    }}
                    className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-brand-green hover:text-white transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </Layout>
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
            if (child.marks?.includes("underline")) {
              text = <u key={childIndex}>{text}</u>;
            }
            return text;
          });

          switch (style) {
            case "h1":
              return (
                <h1 key={block._key || index} className="text-3xl md:text-4xl font-bold text-stone-800 mt-10 mb-4">
                  {children}
                </h1>
              );
            case "h2":
              return (
                <h2 key={block._key || index} className="text-2xl md:text-3xl font-bold text-stone-800 mt-8 mb-3">
                  {children}
                </h2>
              );
            case "h3":
              return (
                <h3 key={block._key || index} className="text-xl md:text-2xl font-bold text-stone-800 mt-6 mb-2">
                  {children}
                </h3>
              );
            case "h4":
              return (
                <h4 key={block._key || index} className="text-lg font-bold text-stone-800 mt-5 mb-2">
                  {children}
                </h4>
              );
            case "blockquote":
              return (
                <blockquote
                  key={block._key || index}
                  className="relative my-8 pl-6 py-4 border-l-4 border-brand-green bg-gradient-to-r from-brand-green/5 to-transparent rounded-r-lg"
                >
                  <svg className="absolute top-4 left-6 w-8 h-8 text-brand-green/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-lg italic text-stone-600 pl-10">{children}</p>
                </blockquote>
              );
            default:
              if (!children || (children.length === 1 && children[0] === "")) {
                return <div key={block._key || index} className="h-4" />;
              }
              return (
                <p key={block._key || index} className="text-stone-600 leading-relaxed mb-6 text-lg">
                  {children}
                </p>
              );
          }
        }

        if (block._type === "image" && block.asset) {
          return (
            <figure key={block._key || index} className="my-10">
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={urlFor(block).width(1200).url()}
                  alt={block.alt || "Article image"}
                  className="w-full"
                />
              </div>
              {block.caption && (
                <figcaption className="text-center text-sm text-stone-400 mt-3 italic">
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

export default ArticlePage;
