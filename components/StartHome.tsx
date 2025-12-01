import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoImage from "@/assets/icons/ic_logo.svg";
import LogoText from "@/assets/images/navbar/nav_logo.svg";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const BACKGROUND_IMAGE = require("@/assets/images/bg_leaves.png");

type Props = {
  onLogin?: () => void;
  onSignup?: () => void;
};

export default function SplashHome({ onLogin, onSignup }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-secondary-50 items-center justify-around px-4">
      <Image source={BACKGROUND_IMAGE} style={styles.backgroundImage} resizeMode="cover" />
      <View className="flex-1 flex-col w-full items-center justify-center">
        <View className="flex-row items-center">
          <LogoImage width={90} height={71} />
          <LogoText width={147.5} height={59} style={{ marginLeft: 16 }} />
        </View>
      </View>

      <View className="w-full items-center gap-4 flex flex-col pb-6">
        <TouchableOpacity
          onPress={onLogin}
          activeOpacity={0.8}
          className="w-full py-4 bg-primary-500 rounded-lg items-center justify-center"
        >
          <Text className="text-white text-body-16-semibold">로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onSignup}
          activeOpacity={0.8}
          className="w-full py-4 bg-primary-500 rounded-lg items-center justify-center"
        >
          <Text className="text-white text-body-16-semibold">회원가입</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    opacity: 0.5,
  },
});
