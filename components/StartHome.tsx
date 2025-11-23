import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoText from "@/assets/images/home/home_logo.svg";
import LogoImage from "@/assets/images/home/home_logo_image.svg";

type Props = {
  onLogin?: () => void;
  onSignup?: () => void;
};

export default function SplashHome({ onLogin, onSignup }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-around px-4">
      <View className="flex-1 flex-col w-full items-center justify-center">
        <View className="flex-row items-center">
          <LogoImage width={61} height={48} />
          <LogoText width={120} height={40} style={{ marginLeft: 16 }} />
        </View>
      </View>

      <View className="w-full items-center space-y-4 pb-6">
        <TouchableOpacity
          onPress={onLogin}
          activeOpacity={0.8}
          className="w-full h-12 bg-gray-600 rounded-md items-center justify-center"
        >
          <Text className="text-white text-base">로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onSignup}
          activeOpacity={0.8}
          className="w-full h-12 bg-gray-600 rounded-md items-center justify-center mt-4"
        >
          <Text className="text-white text-base">회원가입</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
