import BooksHero from "@/components/books/BooksHero";
import BooksGrid from "@/components/books/BooksGrid";

export const metadata = {
  title: "Books by Pastor Sola Olukoya | The G-Factor, Set-Time, Overcoming Issues of Life",
  description: "Purchase life-transforming books by Pastor Sola Olukoya - The G-Factor, Set-Time, and Overcoming Issues of Life",
};

export default function BooksPage() {
  return (
    <div className="pt-20">
      <BooksHero />
      <BooksGrid />
    </div>
  );
}
