import { Text, View } from "react-native";
import IcComment from "@/components/icons/IcComment";
import { colors } from "@/styles/colors";

interface BookDescriptionSectionProps {
  description: string;
}

export default function BookDescriptionSection({ description }: BookDescriptionSectionProps) {
  return (
    <View className="bg-secondary-50 rounded-lg py-5 px-4 shadow-md">
      <View className="flex-row items-center gap-2 mb-3">
        <IcComment width={16} height={16} stroke={colors.secondary[700]} />
        <Text className="text-body-14-semibold text-gray-900">책 소개</Text>
      </View>
      <Text className="text-body-12-regular text-gray-700">{description}</Text>
    </View>
  );
}
