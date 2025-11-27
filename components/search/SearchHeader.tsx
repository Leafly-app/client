import GoBackIcon from "@/assets/images/goback.svg";
import SearchIcon from "@/components/icons/IcSearch";
import { TextInput, TouchableOpacity, View } from "react-native";

interface SearchHeaderProps {
  keyword: string;
  onKeywordChange: (keyword: string) => void;
  onSearch: () => void;
  onBack: () => void;
}

export function SearchHeader({ keyword, onKeywordChange, onSearch, onBack }: SearchHeaderProps) {
  return (
    <View className="flex-row items-center px-5 py-3 bg-white border-b border-gray-200">
      <TouchableOpacity activeOpacity={0.7} onPress={onBack} className="mr-3">
        <GoBackIcon width={24} height={24} fill="#000000" />
      </TouchableOpacity>
      <View className="flex-1 flex-row items-center bg-gray-100 rounded-xl px-4 py-2">
        <TextInput
          className="flex-1 text-body-14-regular text-gray-900"
          placeholder="도서명 · 저자 · ISBN 검색"
          placeholderTextColor="#9CA3AF"
          value={keyword}
          onChangeText={onKeywordChange}
          onSubmitEditing={onSearch}
          returnKeyType="search"
        />
        <TouchableOpacity activeOpacity={0.7} onPress={onSearch}>
          <SearchIcon width={24} height={24} fill="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
