import type { Book } from "@/components/common/BookCarousel";
import BookCarousel from "@/components/common/BookCarousel";

interface BookRecommendationsProps {
  recommendations: {
    isbn: string;
    title: string;
    author: string;
    cover: string;
  }[];
  onBookPress: (isbn: string) => void;
}

export default function BookRecommendations({
  recommendations,
  onBookPress,
}: BookRecommendationsProps) {
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  const books: Book[] = recommendations.map((book) => ({
    id: book.isbn,
    title: book.title,
    author: book.author,
    cover: book.cover,
    onPress: () => onBookPress(book.isbn),
  }));

  return <BookCarousel books={books} />;
}
