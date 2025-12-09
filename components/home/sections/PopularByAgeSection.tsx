import type { Book } from "@/components/common/BookCarousel";
import BookCarousel from "@/components/common/BookCarousel";
import IcPeople from "@/components/icons/IcPeople";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const mockBooks: Book[] = [
  {
    id: "9788970135472",
    title: "은하수를 여행하는 히치하이커를 위한 안내서 - 합본",
    author: "더글러스 애덤스 (지은이)",

    cover: "https://image.aladin.co.kr/product/60/74/cover500/8970135472_1.jpg",
  },
  {
    id: "9788938201010",
    title: "그리고 아무도 없었다",
    author: "애거사 크리스티 (지은이)",
    cover: "https://image.aladin.co.kr/product/35/9/cover500/8938201015_1.jpg",
  },
  {
    id: "9788982735769",
    title: "눈물을 마시는 새",
    author: "이영도 (지은이)",
    cover: "https://image.aladin.co.kr/product/39/97/cover500/8982735763_3.jpg",
  },
  {
    id: "9788960172661",
    title: "그림자 자국",
    author: "이영도 (지은이)",
    cover: "https://image.aladin.co.kr/product/280/99/cover500/8960172669_1.jpg",
  },
  {
    id: "9788956602158",
    title: "악인",
    author: "요시다 슈이치 (지은이)",
    cover: "https://image.aladin.co.kr/product/102/31/cover500/8956602158_1.jpg",
  },
  {
    id: "9788990982315",
    title: "예지몽",
    author: "하가시노 게이고 (지은이)",
    cover: "https://image.aladin.co.kr/product/344/5/cover500/8990982316_1.jpg",
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
