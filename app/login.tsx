import AuthInput from "@/components/AuthInput";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-8">
            <TouchableOpacity onPress={() => router.back()} className="p-2">
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold">로그인</Text>
            <View className="w-8" />
          </View>

          <AuthInput label="이메일" placeholder="email@example.com" keyboardType="email-address" />
          <AuthInput label="비밀번호" placeholder="********" secureTextEntry />

          <View className="flex-1" />

          <TouchableOpacity
            activeOpacity={0.8}
            className="w-full h-14 bg-green-600 rounded-md items-center justify-center mb-4"
          >
            <Text className="text-white text-lg font-bold">로그인</Text>
          </TouchableOpacity>

          <View className="flex-row justify-center">
            <Text className="text-gray-500">아직 계정이 없으신가요? </Text>
            <Link href="/signup" asChild>
              <TouchableOpacity>
                <Text className="text-green-600 font-bold">회원가입</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
