import IcChevronLeft from "@/components/icons/IcChevronLeft";
import IcSearch from "@/components/icons/IcSearch";
import { colors } from "@/styles/colors";
import { TextInput, TouchableOpacity, View } from "react-native";

interface SearchHeaderProps {
  keyword: string;
  onKeywordChange: (text: string) => void;
  onBackPress: () => void;
  onSubmit?: () => void;
}

export default function SearchHeader({
  keyword,
  onKeywordChange,
  onBackPress,
  onSubmit,
}: SearchHeaderProps) {
  return (
    <View className="flex-row items-center px-5 py-3 gap-[0.625rem]">
      <TouchableOpacity activeOpacity={0.7} onPress={onBackPress}>
        <IcChevronLeft width={24} height={24} stroke={colors.gray[900]} />
      </TouchableOpacity>

      <View className="flex-1 flex-row items-center border border-gray-500 rounded-md px-2 py-1">
        <TextInput
          className="flex-1 text-body-12-regular text-gray-900 mr-2"
          placeholder="도서명 · 저자 · ISBN 검색"
          placeholderTextColor={colors.gray[500]}
          value={keyword}
          onChangeText={onKeywordChange}
          onSubmitEditing={() => onSubmit?.()}
          returnKeyType="search"
        />
        <TouchableOpacity activeOpacity={0.7} onPress={() => onSubmit?.()}>
          <IcSearch width={20} height={20} stroke={colors.gray[500]} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
