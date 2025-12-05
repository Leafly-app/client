import type { Book as CarouselBook } from "@/components/common/BookCarousel";
import type { CategoryType } from "@/components/common/CategoryList";
import SearchHeader from "@/components/common/SearchHeader";
import { CategorySection } from "@/components/search/CategorySection";
import { PopularBooksSection } from "@/components/search/PopularBooksSection";
import { RecommendedKeywords } from "@/components/search/RecommendedKeywords";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const recommendedSearchKeywords = [
  "소년이 온다",
  "채식주의자",
  "작별하지 않는다",
  "트렌드 코리아 2025",
  "불변의 법칙",
  "모순",
  "넥서스",
  "급류",
];
const popularBooks: CarouselBook[] = [
  {
    id: "9791193401583",
    title: "최소한의 삼국지",
    author: "최태성 (지은이)",
    cover: "https://image.aladin.co.kr/product/37773/21/cover500/k002033562_2.jpg",
  },
  {
    id: "9791141614072",
    title: "나나 올리브에게",
    author: "루리 (지은이)",
    cover: "https://image.aladin.co.kr/product/37789/25/cover500/k392033660_1.jpg",
  },
  {
    id: "9788927105886",
    title: "사람이 되는 법",
    author: "캐서린 뉴먼 (지은이)",
    cover: "https://image.aladin.co.kr/product/30369/61/cover500/8927105885_1.jpg",
  },
  {
    id: "9788925588735",
    title: "프로젝트 헤일메리",
    author: "앤디 위어 (지은이)",
    cover: "https://image.aladin.co.kr/product/27045/43/cover500/8925588730_2.jpg",
  },
  {
    id: "9791142813887",
    title: "나의 히어로 아카데미아 캐릭터 팬북 컴플리트 에디션",
    author: "호리코시 코헤이 (지은이)",
    cover: "https://image.aladin.co.kr/product/37902/70/cover500/k842033737_1.jpg",
  },
  {
    id: "9791142335204",
    title: "열혈강호 94",
    author: "전극진 (지은이)",
    cover: "https://image.aladin.co.kr/product/37900/46/cover500/k202033730_1.jpg",
  },
];

export default function SearchScreen() {
  const router = useRouter();
  const { mode } = useLocalSearchParams<{ mode?: string }>();
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

    if (mode === "review") {
      params.append("mode", "review");
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
