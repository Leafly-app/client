import { Image, Text, View } from "react-native";
import IcCalendar from "@/components/icons/IcCalendar";
import IcCompany from "@/components/icons/IcCompany";
import { colors } from "@/styles/colors";

interface BookInfoSectionProps {
  cover: string;
  title: string;
  author: string;
  publisher: string;
  pubDate: string;
}

export default function BookInfoSection({
  cover,
  title,
  author,
  publisher,
  pubDate,
}: BookInfoSectionProps) {
  return (
    <View className="items-center gap-[0.62rem]">
      <Image source={{ uri: cover }} className="w-[180px] h-[258px] rounded-lg" />

      <Text className="text-body-14-bold text-gray-900 text-center">{title}</Text>
      <Text className="text-body-12-regular text-gray-800">{author}</Text>

      <View className="gap-[0.62rem]">
        <View className="flex-row items-center gap-2">
          <IcCompany width={14} height={14} fill={colors.gray[700]} />
          <Text className="text-body-12-regular text-gray-700">{publisher}</Text>
        </View>

        <View className="flex-row items-center gap-2">
          <IcCalendar width={14} height={14} fill={colors.gray[700]} />
          <Text className="text-body-12-regular text-gray-700">{pubDate}</Text>
        </View>
      </View>
    </View>
  );
}
