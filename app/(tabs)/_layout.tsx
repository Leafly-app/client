import IcBook from "@/components/icons/IcBook";
import IcCamera from "@/components/icons/IcCamera";
import IcFeed from "@/components/icons/IcFeed";
import IcHome from "@/components/icons/IcHome";
import IcWrite from "@/components/icons/IcWrite";
import { colors } from "@/styles/colors";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import { Platform, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary[700],
        tabBarInactiveTintColor: colors.gray[500],
        headerShown: false,
        tabBarStyle: {
          height: 68 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
          paddingHorizontal: 12,
          backgroundColor: colors.white,
          borderTopWidth: 0,
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
          tabBarIcon: ({ color }) => <IcHome width={16} height={16} stroke={color} />,
        }}
      />
      <Tabs.Screen
        name="write"
        options={{
          title: "독후감 작성",
          tabBarIcon: ({ color }) => <IcWrite width={16} height={16} stroke={color} />,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "",
          tabBarStyle: { display: "none" },
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={{
                position: "absolute",
                left: "50%",
                top: -16,
                marginLeft: -28,
                width: 56,
                height: 56,
                borderRadius: 1000,
                borderWidth: 4,
                borderColor: colors.primary[400],
                overflow: "hidden",
              }}
            >
              {Platform.OS === "ios" && (
                <BlurView intensity={20} tint="light" style={{ position: "absolute", inset: 0 }} />
              )}
              <LinearGradient
                colors={["#AAEEBC33", "#FCF17433"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ position: "absolute", inset: 0 }}
              />
              <View className="flex-1 items-center justify-center">
                <IcCamera width={24} height={24} fill={colors.primary[700]} />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: "피드",
          tabBarIcon: ({ color, focused }) => (
            <IcFeed width={16} height={16} stroke={color} fill={focused ? color : "none"} />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "서재",
          tabBarIcon: ({ color }) => <IcBook stroke={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          href: null,
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
}
