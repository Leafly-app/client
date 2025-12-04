import type { Book } from "@/components/common/BookCarousel";
import BookCarousel from "@/components/common/BookCarousel";
import IcPeople from "@/components/icons/IcPeople";
import { Text, TouchableOpacity, View } from "react-native";

const mockBooks: Book[] = [
  {
    id: "9791130649498",
    title: "100일 아침 습관의 기적 - 최고의 나를 만나는 하루 20분의 약속",
    author: "켈리 최 (지은이)",
    cover: "https://image.aladin.co.kr/product/32928/20/coversum/k612936843_2.jpg",
  },
  {
    id: "9791191308006",
    title: "앞으로 5년, 집을 사고팔 타이밍은 정해져 있다",
    author: "삼토시(강승우) (지은이)",
    cover: "https://image.aladin.co.kr/product/25893/67/coversum/k802737770_1.jpg",
  },
  {
    id: "9791172172923",
    title: "하루 3분, 눈이 좋아지는 기적의 그림",
    author: "히라마쓰 루이 (지은이)",
    cover: "https://image.aladin.co.kr/product/34172/71/coversum/k472931119_1.jpg",
  },
  {
    id: "9791168340770",
    title: "미움받을 용기",
    author: "기시미 이치로, 고가 후미타케 (지은이)",
    cover: "https://image.aladin.co.kr/product/30782/55/coversum/k442831368_1.jpg",
  },
];

export default function PopularByAgeSection() {
  return (
    <View className="py-0 px-2 pb-4">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center gap-2">
          <IcPeople width={20} height={20} fill="#2563EB" />
          <Text className="text-body-16-bold text-gray-900">20대 인기 도서</Text>
        </View>
        <TouchableOpacity>
          <Text className="text-body-10-bold text-primary-500">더보기</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-body-10-regular text-gray-600 mb-2">
        같은 연령대가 가장 많이 읽는 책
      </Text>
      <BookCarousel books={mockBooks} />
    </View>
  );
}
