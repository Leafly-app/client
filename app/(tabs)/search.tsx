import type { Book as CarouselBook } from "@/components/common/BookCarousel";
import type { CategoryType } from "@/components/common/CategoryList";
import SearchHeader from "@/components/common/SearchHeader";
import { CategorySection } from "@/components/search/CategorySection";
import { PopularBooksSection } from "@/components/search/PopularBooksSection";
import { RecommendedKeywords } from "@/components/search/RecommendedKeywords";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const recommendedSearchKeywords = [
  "잎새",
  "고영이",
  "강아지",
  "귤",
  "아몬드",
  "호두",
  "흰수염고래",
];
const popularBooks: CarouselBook[] = [
  {
    id: "9791130649498",
    title: "100일 아침 습관의 기적 - 최고의 나를 만나는 하루 20분의 약속",
    author: "켈리 최 (지은이)",
    cover: "https://image.aladin.co.kr/product/32928/20/coversum/k612936843_2.jpg",
  },
  {
    id: "9791191308006",
    title:
      "앞으로 5년, 집을 사고팔 타이밍은 정해져 있다 - 유튜브 직방TV 〈빅데이터의 신〉 삼토시가 찾아낸",
    author: "삼토시(강승우) (지은이)",
    cover: "https://image.aladin.co.kr/product/25893/67/coversum/k802737770_1.jpg",
  },
  {
    id: "9791172172923",
    title:
      "하루 3분, 눈이 좋아지는 기적의 그림 - 근시, 원시, 난시, 노안 어떠한 문제성 눈이든 좋아질 수 있다!",
    author: "히라마쓰 루이 (지은이)",
    cover: "https://image.aladin.co.kr/product/34172/71/coversum/k472931119_1.jpg",
  },
  {
    id: "9791168340770",
    title:
      "미움받을 용기 (200만 부 기념 스페셜 에디션) - 자유롭고 행복한 삶을 위한 아들러의 가르침",
    author: "기시미 이치로, 고가 후미타케 (지은이), 전경아 (옮긴이), 김정운 (감수)",
    cover: "https://image.aladin.co.kr/product/30782/55/coversum/k442831368_1.jpg",
  },
];

export default function SearchScreen() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>([]);
  const insets = useSafeAreaInsets();

  const toggleCategory = (category: CategoryType) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  };

  const handleSearch = (searchKeyword?: string) => {
    const keywordToSearch = searchKeyword || keyword;
    if (!keywordToSearch || keywordToSearch.trim().length < 2) {
      return;
    }

    const params = new URLSearchParams({
      keyword: keywordToSearch.trim(),
    });

    if (selectedCategories.length > 0) {
      params.append("categories", selectedCategories.join(","));
    }

    router.push(`/search-results?${params.toString()}`);
  };

  const handleKeywordPress = (searchKeyword: string) => {
    setKeyword(searchKeyword);
    handleSearch(searchKeyword);
  };

  return (
    <View className="flex-1 bg-gray-50" style={{ paddingTop: insets.top }}>
      <SearchHeader
        keyword={keyword}
        onKeywordChange={setKeyword}
        onBackPress={() => router.back()}
        onSubmit={handleSearch}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5 py-4 gap-7">
          <RecommendedKeywords
            keywords={recommendedSearchKeywords}
            onKeywordPress={handleKeywordPress}
          />
          <PopularBooksSection books={popularBooks} />
          <CategorySection
            selectedCategories={selectedCategories}
            onCategoryPress={toggleCategory}
          />
        </View>
      </ScrollView>
    </View>
  );
}
