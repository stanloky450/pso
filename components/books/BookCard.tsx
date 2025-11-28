"use client";

import { motion } from "framer-motion";
import { FaBook, FaShoppingCart, FaCheckCircle, FaBarcode } from "react-icons/fa";

interface BookCardProps {
  book: {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    price: string;
    usdPrice: string;
    themes: string[];
    pages: number;
    isbn: string;
    features: string[];
  };
  index: number;
  isInView: boolean;
}

const BookCard = ({ book, index, isInView }: BookCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="card bg-primary-light"
    >
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Book Cover */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-secondary to-secondary-dark rounded-lg p-8 aspect-[3/4] flex flex-col items-center justify-center text-center shadow-2xl sticky top-24">
            <FaBook className="text-primary text-6xl mb-6" />
            <h3 className="text-primary font-bold text-3xl mb-3">
              {book.title}
            </h3>
            <p className="text-primary-dark italic text-sm mb-6">
              {book.subtitle}
            </p>
            <div className="text-primary-dark text-sm">
              <p>{book.pages} Pages</p>
            </div>
          </div>
        </div>

        {/* Book Details */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-3xl font-bold text-secondary mb-3">
              {book.title}
            </h3>
            <p className="text-xl text-text-muted italic mb-4">
              {book.subtitle}
            </p>
          </div>

          <p className="text-text-muted leading-relaxed text-lg">
            {book.description}
          </p>

          {/* Themes */}
          <div>
            <h4 className="text-secondary font-semibold mb-3">Key Themes:</h4>
            <div className="flex flex-wrap gap-2">
              {book.themes.map((theme) => (
                <span
                  key={theme}
                  className="bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-semibold"
                >
                  {theme}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-secondary font-semibold mb-3">
              What's Inside:
            </h4>
            <ul className="space-y-2">
              {book.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <FaCheckCircle className="text-secondary mt-1 mr-3 flex-shrink-0" />
                  <span className="text-text-muted">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ISBN */}
          <div className="flex items-center text-text-muted text-sm">
            <FaBarcode className="mr-2 text-secondary" />
            <span>ISBN: {book.isbn}</span>
          </div>

          {/* Price and Buy Button */}
          <div className="bg-primary rounded-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-text-muted text-sm mb-2">Price:</p>
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-secondary">
                  {book.price}
                </span>
                <span className="text-xl text-text-muted">
                  ({book.usdPrice})
                </span>
              </div>
            </div>
            <button className="btn-primary flex items-center whitespace-nowrap">
              <FaShoppingCart className="mr-2" />
              Buy Now
            </button>
          </div>

          {/* Payment Note */}
          <p className="text-text-muted text-sm italic text-center">
            Secure payment through Paystack • Instant download available • Free
            shipping within Nigeria
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
