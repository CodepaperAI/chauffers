import { cache } from "react";

const UPLIFTAI_BASE_URL = "https://api.upliftai.co/api/public/v1";

export type BlogStatus = "PUBLISH" | "DRAFT" | "ALL";

export type UpliftBlog = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content?: string | null;
  status?: BlogStatus;
  publishDate?: string | null;
  publishTime?: string | null;
  featuredImage?: string | null;
  categories?: string[];
  tags?: string[];
  seoScore?: number;
  createdAt?: string;
  updatedAt?: string;
  authorName?: string | null;
  authorUrl?: string | null;
  meta?: {
    seoTitle?: string | null;
    seoDescription?: string | null;
    focusKeyword?: string | null;
    keywords?: string[];
    ogTitle?: string | null;
    ogDescription?: string | null;
    ogType?: string | null;
    ogUrl?: string | null;
    ogSiteName?: string | null;
    ogLocale?: string | null;
    articleAuthor?: string | null;
    articleSection?: string | null;
    articleTags?: string[];
  };
  customFields?: {
    readingTime?: string | number | null;
    [key: string]: unknown;
  };
};

export type BlogPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type UpliftListResponse = {
  success: boolean;
  data?: {
    blogs?: UpliftBlog[];
    pagination?: BlogPagination;
  };
  error?: string;
};

type UpliftDetailResponse = {
  success: boolean;
  data?: {
    blog?: UpliftBlog;
  };
  error?: string;
};

export type BlogListResult = {
  blogs: UpliftBlog[];
  pagination: BlogPagination | null;
  error: string | null;
};

const blockedExternalFeedTerms = [
  "shoffr",
  "bangalore",
  "bengaluru",
  "delhi ncr",
];

function getUpliftToken() {
  return process.env.UPLIFTAI_API_TOKEN?.trim();
}

function getBlogSearchText(blog: UpliftBlog) {
  return [
    blog.title,
    blog.excerpt,
    blog.content,
    blog.authorName,
    blog.meta?.seoTitle,
    blog.meta?.seoDescription,
    blog.meta?.ogTitle,
    blog.meta?.ogDescription,
    ...(blog.categories || []),
    ...(blog.tags || []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function isDocklandsSafeBlog(blog: UpliftBlog) {
  const text = getBlogSearchText(blog);

  return !blockedExternalFeedTerms.some((term) => text.includes(term));
}

async function fetchUplift<T>(path: string, params?: Record<string, string | number>) {
  const token = getUpliftToken();

  if (!token) {
    throw new Error("UpliftAI blog token is not configured.");
  }

  const url = new URL(`${UPLIFTAI_BASE_URL}${path}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const payload = (await response.json().catch(() => null)) as T | null;

  if (!response.ok) {
    const message =
      payload && typeof payload === "object" && "error" in payload
        ? String((payload as { error?: string }).error)
        : `UpliftAI request failed with ${response.status}.`;
    throw new Error(message);
  }

  if (!payload) {
    throw new Error("UpliftAI returned an empty response.");
  }

  return payload;
}

export async function getBlogs({
  page = 1,
  limit = 12,
  status = "PUBLISH",
}: {
  page?: number;
  limit?: number;
  status?: BlogStatus;
} = {}): Promise<BlogListResult> {
  try {
    const payload = await fetchUplift<UpliftListResponse>("/blogs", {
      page,
      limit,
      status,
    });

    if (!payload.success) {
      throw new Error(payload.error || "UpliftAI could not load blogs.");
    }

    return {
      blogs: (payload.data?.blogs || []).filter(isDocklandsSafeBlog),
      pagination: payload.data?.pagination || null,
      error: null,
    };
  } catch (error) {
    return {
      blogs: [],
      pagination: null,
      error: error instanceof Error ? error.message : "Could not load blogs.",
    };
  }
}

export const getBlogBySlug = cache(async (slug: string) => {
  try {
    const payload = await fetchUplift<UpliftDetailResponse>(
      `/blog/${encodeURIComponent(slug)}`,
    );

    if (!payload.success) {
      throw new Error(payload.error || "UpliftAI could not load this blog.");
    }

    const blog = payload.data?.blog || null;

    if (!blog || !isDocklandsSafeBlog(blog)) {
      return null;
    }

    return blog;
  } catch {
    return null;
  }
});

export function formatBlogDate(blog: UpliftBlog) {
  const rawDate = blog.publishDate || blog.createdAt || blog.updatedAt;

  if (!rawDate) {
    return "Docklands 1998";
  }

  const date = new Date(rawDate);

  if (Number.isNaN(date.getTime())) {
    return rawDate;
  }

  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function getReadingTime(blog: UpliftBlog) {
  const readingTime = blog.customFields?.readingTime;

  if (!readingTime) {
    return null;
  }

  return String(readingTime);
}
