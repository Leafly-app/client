import AuthFooter from "@/components/auth/AuthFooter";
import AuthHeader from "@/components/auth/AuthHeader";
import { FormController } from "@/components/auth/FormController";
import SubmitButton from "@/components/auth/SubmitButton";
import { useLogin } from "@/hooks/useLogin";
import { loginSchema, type LoginFormData } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();
  const { handleLogin, isLoading } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const success = await handleLogin(data);
    if (success) {
      router.replace("/(tabs)/explore");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-6">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1">
          <AuthHeader title="로그인" />

          <FormController
            control={control}
            name="email"
            label="이메일"
            placeholder="email@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email?.message}
          />

          <FormController
            control={control}
            name="password"
            label="비밀번호"
            placeholder="********"
            secureTextEntry
            error={errors.password?.message}
          />

          <View className="flex-1" />

          <SubmitButton
            text="로그인"
            isLoading={isLoading}
            onPress={handleSubmit(onSubmit)}
            className="mb-4"
          />

          <AuthFooter text="아직 계정이 없으신가요?" linkText="회원가입" href="/signup" />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
