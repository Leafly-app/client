import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Dimensions, Image, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const BACKGROUND_IMAGE = require("@/assets/images/bg_leaves.png");

import AuthFooter from "@/components/auth/AuthFooter";
import AuthHeader from "@/components/auth/AuthHeader";
import { FormController } from "@/components/auth/FormController";
import Button from "@/components/common/Button";
import { useSignup } from "@/hooks/useSignup";
import { type SignupFormData, signupSchema } from "@/schemas/auth";

export default function SignupScreen() {
  const router = useRouter();
  const { handleSignup, isLoading } = useSignup();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      passwordCheck: "",
      nickname: "",
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    const success = await handleSignup(data);
    if (success) {
      router.replace("/onboarding");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top", "bottom"]}>
      <Image source={BACKGROUND_IMAGE} style={styles.backgroundImage} resizeMode="cover" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 px-6">
          <AuthHeader title="회원가입" />

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

          <FormController
            control={control}
            name="passwordCheck"
            label="비밀번호 확인"
            placeholder="********"
            secureTextEntry
            error={errors.passwordCheck?.message}
          />

          <FormController
            control={control}
            name="nickname"
            label="닉네임"
            placeholder="닉네임을 입력하세요"
            error={errors.nickname?.message}
          />

          <View className="flex-1" />

          <Button
            text="가입하기"
            isLoading={isLoading}
            disabled={!isValid}
            onPress={handleSubmit(onSubmit)}
            variant="primary-green"
            fullWidth
            className="mb-4"
          />

          <AuthFooter text="이미 계정이 있으신가요?" linkText="로그인" href="/login" />
        </View>
      </KeyboardAvoidingView>
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
