"use client";

import CommentsSection from "@/components/blog/CommentsSection";
import SocialShare from "@/components/ui/SocialShare";
import NewsletterSubscription from "@/components/ui/NewsletterSubscription";

// This would be dynamic in production - fetching from API
export default function BlogPost({ params }: { params: { id: string } }) {
	// Mock data - replace with actual API call
	const post = {
		id: params.id,
		title: "Walking in Purpose: Discovering God's Plan for Your Life",
		content: `
      <p>God has a unique plan and purpose for each of us. From the beginning of time, He has designed you with specific gifts, talents, and a divine calling that only you can fulfill.</p>

      <p>In Jeremiah 29:11, we read: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future."</p>

      <p>This powerful scripture reminds us that God's plans for our lives are good, filled with hope, and designed for our prosperity. However, discovering and walking in that purpose requires intentionality and a close relationship with God.</p>

      <h2>Three Keys to Discovering Your Purpose:</h2>

      <h3>1. Seek God First</h3>
      <p>Your purpose is found in God's presence. As you spend time in prayer, worship, and studying His Word, He will reveal His plans for your life. Matthew 6:33 says, "But seek first his kingdom and his righteousness, and all these things will be given to you as well."</p>

      <h3>2. Identify Your Gifts and Passions</h3>
      <p>God has placed specific talents and passions within you. These are clues to your purpose. What are you naturally good at? What makes your heart come alive? These are not coincidences but divine indicators of your calling.</p>

      <h3>3. Step Out in Faith</h3>
      <p>Purpose is often discovered in motion. Don't wait until you have it all figured out. Take the first step in faith, and God will guide your path. Proverbs 3:5-6 encourages us to trust in the Lord with all our hearts and lean not on our own understanding.</p>

      <p>Remember, your purpose is not just about you—it's about the impact you're called to make in the lives of others. As you discover and walk in your God-given purpose, you will experience fulfillment, joy, and the satisfaction of living the life you were created for.</p>
    `,
		category: "Devotional",
		date: "2025-11-25",
		readTime: "5 min read",
		author: "Pastor Sola Olukoya",
	};

	return (
		<div className="pt-20" style={{ backgroundColor: "var(--bg-dark)" }}>
			<article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				{/* Post Header */}
				<header className="mb-12">
					<div className="flex items-center gap-3 mb-4">
						<span
							className="text-xs font-semibold px-3 py-1 rounded-full"
							style={{
								backgroundColor: "var(--secondary)",
								color: "var(--primary)",
							}}
						>
							{post.category}
						</span>
						<span style={{ color: "var(--text-muted)" }}>{post.readTime}</span>
					</div>

					<h1
						className="text-4xl md:text-5xl font-bold mb-6"
						style={{ color: "var(--text)" }}
					>
						{post.title}
					</h1>

					<div className="flex items-center justify-between">
						<div style={{ color: "var(--text-muted)" }}>
							By{" "}
							<span style={{ color: "var(--secondary)" }}>{post.author}</span> •{" "}
							{post.date}
						</div>
					</div>
				</header>

				{/* Post Content */}
				<div
					className="prose prose-lg max-w-none mb-12"
					style={{ color: "var(--text)" }}
					dangerouslySetInnerHTML={{ __html: post.content }}
				/>

				<style jsx>{`
					:global(.prose h2) {
						color: var(--secondary);
						font-size: 2rem;
						font-weight: bold;
						margin-top: 2rem;
						margin-bottom: 1rem;
					}
					:global(.prose h3) {
						color: var(--secondary);
						font-size: 1.5rem;
						font-weight: bold;
						margin-top: 1.5rem;
						margin-bottom: 0.75rem;
					}
					:global(.prose p) {
						color: var(--text);
						margin-bottom: 1.5rem;
						line-height: 1.8;
					}
				`}</style>

				{/* Social Share */}
				<SocialShare
					url={`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.id}`}
					title={post.title}
				/>

				{/* Comments */}
				<CommentsSection postId={post.id} />

				{/* Newsletter */}
				<div className="mt-12">
					<NewsletterSubscription />
				</div>
			</article>
		</div>
	);
}
