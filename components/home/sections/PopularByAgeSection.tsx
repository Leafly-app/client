import type { Book } from "@/components/common/BookCarousel";
import BookCarousel from "@/components/common/BookCarousel";
import IcPeople from "@/components/icons/IcPeople";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const mockBooks: Book[] = [
  {
    id: "9788936439743",
    title: "혼모노",
    author: "성해나 (지은이)",

    cover: "https://image.aladin.co.kr/product/36101/66/cover500/k152033655_2.jpg",
  },
  {
    id: "9788956604992",
    title: "7년의 밤",
    author: "정유정 (지은이)",
    cover: "https://image.aladin.co.kr/product/988/67/cover500/8956604991_3.jpg",
  },
  {
    id: "9791141613433",
    title: "노 피플 존",
    author: "정이현 (지은이)",
    cover: "https://image.aladin.co.kr/product/37448/73/cover500/k512032607_1.jpg",
  },
  {
    id: "9791168343108",
    title: "양면의 조개껍데기",
    author: "김초엽 (지은이)",
    cover: "https://image.aladin.co.kr/product/37024/77/cover500/k482030732_2.jpg",
  },
  {
    id: "9788968971389",
    title: "지금 나를 위해 해야 하는 것들",
    author: "김연경 (지은이)",
    cover: "https://image.aladin.co.kr/product/37875/98/cover500/8968971382_1.jpg",
  },
  {
    id: "9788901297842",
    title: "기분이 태도가 되지 않게 (헬로키티 에디션)",
    author: "레몬심리 (지은이)",
    cover: "https://image.aladin.co.kr/product/37535/62/cover500/8901297841_1.jpg",
  },
];

export default function PopularByAgeSection() {
  const router = useRouter();

  const booksWithPress = mockBooks.map((book) => ({
    ...book,
    onPress: () => router.push(`/book/${book.id}` as any),
  }));

  return (
    <View className="py-0 px-2 pb-4">
      <View className="mb-2">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <IcPeople width={20} height={20} fill="#2563EB" />
            <Text className="text-body-16-bold text-gray-900">20대 인기 도서</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-body-12-bold text-primary-500">더보기</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-body-12-regular text-gray-600 mb-2">
          같은 연령대가 가장 많이 읽는 책
        </Text>
      </View>
      <BookCarousel books={booksWithPress} />
    </View>
  );
}
