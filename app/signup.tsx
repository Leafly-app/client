import AuthInput from "@/components/AuthInput";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignupScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          <View className="flex-row items-center justify-between mb-8 mt-4">
            <TouchableOpacity onPress={() => router.back()} className="p-2">
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold">회원가입</Text>
            <View className="w-8" />
          </View>

          <AuthInput
            label="이메일"
            placeholder="email@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <AuthInput label="비밀번호" placeholder="********" secureTextEntry />

          <AuthInput label="비밀번호 확인" placeholder="********" secureTextEntry />

          <AuthInput label="닉네임" placeholder="닉네임을 입력하세요" />

          <TouchableOpacity
            activeOpacity={0.8}
            className="w-full h-14 bg-green-600 rounded-md items-center justify-center mb-4 mt-4"
          >
            <Text className="text-white text-lg font-bold">가입하기</Text>
          </TouchableOpacity>

          <View className="flex-row justify-center mb-6">
            <Text className="text-gray-500">이미 계정이 있으신가요? </Text>
            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text className="text-green-600 font-bold">로그인</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
