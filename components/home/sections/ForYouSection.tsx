import type { Book } from "@/components/common/BookCarousel";
import BookCarousel from "@/components/common/BookCarousel";
import IcUserLike from "@/components/icons/IcUserLike";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const mockBooks: Book[] = [
  {
    id: "9788937448638",
    title: "후리",
    author: "카멜 다우드",
    cover: "https://image.aladin.co.kr/product/37906/47/cover500/8937448637_1.jpg",
  },
  {
    id: "9791170526643",
    title: "어스탐 경의 인사 전언",
    author: "이영도 (지은이)",
    cover: "https://image.aladin.co.kr/product/37684/42/cover500/k392032448_1.jpg",
  },
  {
    id: "9791167903334",
    title: "모텔과 나방",
    author: "유선혜 (지은이)",
    cover: "https://image.aladin.co.kr/product/37881/98/cover500/k132033009_1.jpg",
  },
  {
    id: "9791168343337",
    title: "기쁨의 황제",
    author: "오션 부엉 (지은이)",
    cover: "https://image.aladin.co.kr/product/37727/28/cover500/k522033260_1.jpg",
  },
  {
    id: "9791191803525",
    title: "신 게임",
    author: "마야 유타카 (지은이)",
    cover: "https://image.aladin.co.kr/product/37568/46/cover500/k412032527_2.jpg",
  },
  {
    id: "9788933711234",
    title: "모순",
    author: "양귀자 (지은이)",
    cover: "https://image.aladin.co.kr/product/2584/37/cover500/8998441012_3.jpg",
  },
];

export default function ForYouSection() {
  const router = useRouter();

  const booksWithPress = mockBooks.map((book) => ({
    ...book,
    onPress: () => router.push(`/book/${book.id}` as any),
  }));

  return (
    <View className="py-0 px-2 pb-4">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center gap-2">
          <IcUserLike width={20} height={20} fill="#C60000" />
          <Text className="text-body-16-bold text-gray-900">당신을 위한 추천</Text>
        </View>
        <TouchableOpacity>
          <Text className="text-body-10-bold text-primary-500">더보기</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-body-10-regular text-gray-600 mb-2">
        소설/시/희곡을 좋아하는 당신에게
      </Text>
      <BookCarousel books={booksWithPress} />
    </View>
  );
}
