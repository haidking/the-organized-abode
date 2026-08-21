import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  coverImage: string;
  relatedRecipe: string;
  pinterestPin: string;
  readTime: number;
  content: string;
}

const postsDirectory = path.join(process.cwd(), "content/blog");

/**
 * Retrieves all blog posts sorted by date descending.
 */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data, content } = matter(fileContents);

      return {
        slug: data.slug || slug,
        title: data.title || "",
        date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
        category: data.category || "General",
        tags: Array.isArray(data.tags) ? data.tags : [],
        excerpt: data.excerpt || "",
        coverImage: data.coverImage || "/The_Better_Home_Recipes_Banner.png",
        relatedRecipe: data.relatedRecipe || "/recipes",
        pinterestPin:
          data.pinterestPin || "https://www.pinterest.com/thebetterhomerecipes/",
        readTime: Number(data.readTime) || 5,
        content,
      } as BlogPost;
    });

  // Sort posts by date descending
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Retrieves a single blog post by its slug.
 */
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: data.slug || slug,
      title: data.title || "",
      date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
      category: data.category || "General",
      tags: Array.isArray(data.tags) ? data.tags : [],
      excerpt: data.excerpt || "",
      coverImage: data.coverImage || "/The_Better_Home_Recipes_Banner.png",
      relatedRecipe: data.relatedRecipe || "/recipes",
      pinterestPin:
        data.pinterestPin || "https://www.pinterest.com/thebetterhomerecipes/",
      readTime: Number(data.readTime) || 5,
      content,
    } as BlogPost;
  } catch (error) {
    return null;
  }
}

/**
 * Retrieves related posts for a given slug, prioritizing same category.
 */
export function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit: number = 3
): BlogPost[] {
  const allPosts = getAllPosts();
  const filtered = allPosts.filter(
    (post) => post.slug !== currentSlug && post.category === category
  );

  if (filtered.length >= limit) {
    return filtered.slice(0, limit);
  }

  // Fallback to other recent posts if same category doesn't have enough
  const fallback = allPosts.filter(
    (post) => post.slug !== currentSlug && post.category !== category
  );

  return [...filtered, ...fallback].slice(0, limit);
}

/**
 * Returns a list of unique categories across all blog posts.
 */
export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories);
}
