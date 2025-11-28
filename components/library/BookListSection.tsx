import BookCardV2 from "@/components/common/BookCardV2";
import type { LibraryBook } from "@/types/member/member";
import { ScrollView, Text, View } from "react-native";

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

  return (
    <View className="bg-white rounded-xl py-3 mx-4">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row px-4">
          {books.map((book) => (
            <View key={`${book.isbn}`} className="mr-3">
              <BookCardV2
                title={book.title}
                cover={book.coverUrl}
                onPress={() => onBookPress(book.isbn)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
