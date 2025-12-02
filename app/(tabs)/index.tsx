import { useFocusEffect, useRouter } from "expo-router";
import React, { useRef } from "react";
import { Alert, BackHandler, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Header from "@/components/common/Header";
import HomeBanner from "@/components/home/sections/HomeBanner";
import QuickActions from "@/components/home/sections/QuickActions";
import TodayRecommendations from "@/components/home/sections/TodayRecommendations";
import UserRecommendations from "@/components/home/sections/UserRecommendations";

export default function Home() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();
  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };
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
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <Header
        state="default"
        hasBack={false}
        hasSearch
        titleType="logo"
        title=""
        onLogoPress={scrollToTop}
        onSearchPress={() => router.push("/(tabs)/search")}
      />
      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
        <HomeBanner />
        <QuickActions />
        <TodayRecommendations />
        <UserRecommendations />
      </ScrollView>
    </View>
  );
}
