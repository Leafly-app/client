import { IcStarFilled } from "@/components/icons";
import { colors } from "@/styles/colors";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

interface FeedStatsProps {
  reviewCount: number;
  averageRating: number;
}

interface StatItemProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
}

function StatItem({ value, label, icon }: StatItemProps) {
  return (
    <View className="items-center" style={{ gap: 20 }}>
      <View
        className="w-[6.25rem] h-[1.75rem] flex-row items-center justify-center"
        style={{ gap: 2 }}
      >
        {icon}
        <Text className="text-heading-20-bold text-primary-700">{value}</Text>
      </View>
      <View className="w-[6.25rem] h-[1.75rem] items-center justify-center">
        <Text className="text-body-12-semibold text-gray-700">{label}</Text>
      </View>
    </View>
  );
}

export default function FeedStats({ reviewCount, averageRating }: FeedStatsProps) {
  return (
    <View className="px-4 pt-3 pb-5">
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.00)", colors.primary[200]]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={{
          height: 106,
          borderRadius: 8,
          paddingVertical: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View className="flex-row items-center" style={{ gap: 10 }}>
          <StatItem value={reviewCount} label="독후감" />
          <View className="bg-gray-50" style={{ width: 1, height: "100%" }} />
          <StatItem
            value={averageRating.toFixed(1)}
            label="평균 별점"
            icon={<IcStarFilled width={16} height={16} color="#FACC15" />}
          />
        </View>
      </LinearGradient>
    </View>
  );
}
