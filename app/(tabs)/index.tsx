import { useFocusEffect, useRouter } from "expo-router";
import React from "react";
import { Alert, BackHandler } from "react-native";

import ScreenLayout from "@/components/layouts/ScreenLayout";
import HomeBanner from "@/components/home/sections/HomeBanner";
import QuickActions from "@/components/home/sections/QuickActions";
import TodayRecommendations from "@/components/home/sections/TodayRecommendations";
import UserRecommendations from "@/components/home/sections/UserRecommendations";

export default function Home() {
  const router = useRouter();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert(
          "앱 종료",
          "앱을 종료하시겠습니까?",
          [
            {
              text: "취소",
              onPress: () => null,
              style: "cancel",
            },
            {
              text: "종료",
              onPress: () => BackHandler.exitApp(),
            },
          ],
          { cancelable: false },
        );
        return true;
      };

      const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => subscription.remove();
    }, []),
  );

  return (
    <ScreenLayout
      enableStickyHeader
      headerConfig={{
        hasSearch: true,
        titleType: "logo",
        onSearchPress: () => router.push("/(tabs)/search"),
      }}
    >
      <HomeBanner />
      <QuickActions />
      <TodayRecommendations />
      <UserRecommendations />
    </ScreenLayout>
  );
}
