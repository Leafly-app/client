import { Text, View } from "react-native";
import type { Book } from "@/components/common/BookCarousel";
import BookCarousel from "@/components/common/BookCarousel";
import type { LibraryBook } from "@/types/member/member";

interface BookListSectionProps {
  books: LibraryBook[];
  onBookPress: (isbn: string) => void;
}

export default function BookListSection({ books, onBookPress }: BookListSectionProps) {
  if (books.length === 0) {
    return (
      <View className="bg-white rounded-xl py-8 mx-4">
        <Text className="text-body-14-regular text-gray-500 text-center">등록된 책이 없습니다</Text>
      </View>
    );
  }

  const carouselBooks: Book[] = books.map((book) => ({
    id: book.isbn,
    title: book.title,
    author: "",
    cover: book.coverUrl,
    onPress: () => onBookPress(book.isbn),
  }));

  return (
    <View className="mx-4">
      <BookCarousel books={carouselBooks} />
    </View>
  );
}
