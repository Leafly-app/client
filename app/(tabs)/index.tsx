import HomeBanner from "@/components/home/sections/HomeBanner";
import HomeHeader from "@/components/home/sections/HomeHeader";
import QuickActions from "@/components/home/sections/QuickActions";
import TodayRecommendations from "@/components/home/sections/TodayRecommendations";
import UserRecommendations from "@/components/home/sections/UserRecommendations";
import { useFocusEffect } from "expo-router";
import React from "react";
import { Alert, BackHandler, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
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
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeHeader />
        <HomeBanner />
        <QuickActions />
        <TodayRecommendations />
        <UserRecommendations />
      </ScrollView>
    </SafeAreaView>
  );
}
