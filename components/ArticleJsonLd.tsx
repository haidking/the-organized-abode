import { BlogPost } from "@/lib/blog";

interface ArticleJsonLdProps {
  post: BlogPost;
}

const SITE_URL = "https://thebetterhomerecipes.com";

export default function ArticleJsonLd({ post }: ArticleJsonLdProps) {
  const imageUrl = post.coverImage.startsWith("http")
    ? post.coverImage
    : `${SITE_URL}${post.coverImage}`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: [imageUrl],
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "The Better Home Recipes Team",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "The Better Home Recipes",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/The_Better_Home_Recipes_Logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
    />
  );
}
