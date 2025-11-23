import LogoText from "@/assets/images/home/home_logo.svg";
import LogoImage from "@/assets/images/home/home_logo_image.svg";
import SearchIcon from "@/assets/images/home/home_search.svg";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

const HomeHeader = React.memo(() => {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    Alert.alert(
      "로그아웃",
      "로그아웃 하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "로그아웃",
          onPress: async () => {
            await logout();
            router.replace("/");
          },
          style: "destructive",
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View className="flex-row items-center justify-between px-5 py-4 bg-white">
      <View className="flex-row items-center">
        <LogoImage width={32} height={24} />
        <LogoText width={80} height={32} style={{ marginLeft: 8 }} />
      </View>
      <View className="flex-row items-center gap-3">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleLogout}
          className="bg-secondary-600 px-3 py-1.5 rounded-lg"
        >
          <Text className="text-body-12-semibold text-white">로그아웃</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.push("/(tabs)/search")}>
          <SearchIcon width={24} height={24} fill="#000000" />
        </TouchableOpacity>
      </View>
    </View>
  );
});

HomeHeader.displayName = "HomeHeader";

export default HomeHeader;
