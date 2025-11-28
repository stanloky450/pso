import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";

export const metadata = {
  title: "Blog & Devotionals | Pastor Sola Olukoya",
  description: "Read inspiring devotionals, teachings, and prophetic messages from Pastor Sola Olukoya",
};

export default function BlogPage() {
  return (
    <div className="pt-20">
      <BlogHero />
      <BlogGrid />
    </div>
  );
}
