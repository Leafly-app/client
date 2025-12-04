import { useFocusEffect, useRouter } from "expo-router";
import React from "react";
import { Alert, BackHandler, View } from "react-native";

import ScreenLayout from "@/components/layouts/ScreenLayout";
import EditorPickSection from "@/components/home/sections/EditorPickSection";
import ForYouSection from "@/components/home/sections/ForYouSection";
import PopularByAgeSection from "@/components/home/sections/PopularByAgeSection";
import RecommendedBooksSection from "@/components/home/sections/RecommendedBooksSection";

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
      <View className="py-3 px-4 gap-4">
        <EditorPickSection />
        <ForYouSection />
        <PopularByAgeSection />
        <RecommendedBooksSection />
      </View>
    </ScreenLayout>
  );
}
