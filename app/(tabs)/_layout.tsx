import BookIcon from "@/assets/images/tab/tab_book.svg";
import CameraIcon from "@/assets/images/tab/tab_camera.svg";
import FeedIcon from "@/assets/images/tab/tab_feed.svg";
import HomeIcon from "@/assets/images/tab/tab_home.svg";
import WriteIcon from "@/assets/images/tab/tab_write.svg";
import { colors } from "@/styles/colors";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary[600],
        tabBarInactiveTintColor: colors.gray[500],
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.gray[200],
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: "Pretendard-Regular",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          tabBarIcon: ({ color }) => <HomeIcon width={24} height={24} fill={color} />,
        }}
      />
      <Tabs.Screen
        name="write"
        options={{
          title: "독후감 작성",
          tabBarIcon: ({ color }) => <WriteIcon width={24} height={24} fill={color} />,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "",
          tabBarIcon: () => (
            <View className="w-14 h-14 rounded-full bg-primary-100 items-center justify-center -mb-5">
              <CameraIcon width={28} height={28} fill="#FFF" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: "피드",
          tabBarIcon: ({ color }) => <FeedIcon width={24} height={24} fill={color} />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "서재",
          tabBarIcon: ({ color }) => <BookIcon width={24} height={24} fill={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
