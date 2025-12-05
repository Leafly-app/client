import { getRecommendedBooks } from "@/apis/book";
import IcLeaf from "@/components/icons/IcLeaf";
import IcStarFilled from "@/components/icons/IcStarFilled";
import IcThumbsUp from "@/components/icons/IcThumbsUp";
import type { Book } from "@/types/book";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function RecommendedBooksSection() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getRecommendedBooks();
        if (response.isSuccess && response.data) {
          const uniqueBooks = response.data.filter(
            (book, index, self) => index === self.findIndex((t) => t.isbn === book.isbn),
          );
          setBooks(uniqueBooks);
        }
      } catch (error) {
        console.error("Failed to fetch recommended books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleBookPress = (isbn: string) => {
    router.push(`/book/${isbn}` as any);
  };

  return (
    <View className="py-0 px-2 pb-4">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center gap-2">
          <IcThumbsUp width={20} height={20} fill="#FACC15" />
          <Text className="text-body-16-bold text-gray-900">추천 도서</Text>
        </View>
        <TouchableOpacity>
          <Text className="text-body-10-bold text-primary-500">더보기</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-body-10-regular text-gray-600 mb-2">당신을 위한 맞춤 도서</Text>

      {loading ? (
        <View className="py-8 items-center">
          <ActivityIndicator size="large" color="#8CC63F" />
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12 }}
        >
          {books.map((book) => (
            <TouchableOpacity
              key={book.isbn}
              className="bg-secondary-50 rounded-lg border border-gray-200 p-3"
              activeOpacity={0.7}
              onPress={() => handleBookPress(book.isbn)}
            >
              <View className="flex-row gap-3">
                <View
                  className="bg-gray-300 rounded overflow-hidden"
                  style={{
                    width: 64,
                    height: 91.5,
                    aspectRatio: 64 / 91.5,
                  }}
                >
                  <Image
                    source={{ uri: book.cover }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                  />
                </View>

                <View style={{ width: 216 }}>
                  <View className="flex-row items-start justify-between mb-1">
                    <Text className="text-body-12-bold text-gray-900 flex-1" numberOfLines={2}>
                      {book.title}
                    </Text>
                    <View className="flex-row items-center gap-1 ml-2">
                      <IcStarFilled width={14} height={14} color="#FACC15" />
                      <Text className="text-body-10-regular text-gray-700">
                        {book.rating?.toFixed(1) || "0.0"}
                      </Text>
                    </View>
                  </View>

                  <Text className="text-body-10-regular text-gray-700 mb-2" numberOfLines={1}>
                    {book.author}
                  </Text>

                  <View className="bg-gray-300 mb-2" style={{ width: 216, height: 0.5 }} />

                  <View className="flex-row items-start gap-1">
                    <IcLeaf width={12} height={12} fill="#8CC63F" />
                    <Text className="text-body-8-regular text-gray-700 flex-1" numberOfLines={2}>
                      {book.reason || "당신을 위한 추천 도서입니다"}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
