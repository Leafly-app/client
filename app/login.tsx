import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Dimensions, Image, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const BACKGROUND_IMAGE = require("@/assets/images/bg_leaves.png");

import AuthFooter from "@/components/auth/AuthFooter";
import AuthHeader from "@/components/auth/AuthHeader";
import { FormController } from "@/components/auth/FormController";
import Button from "@/components/common/Button";
import { useLogin } from "@/hooks/useLogin";
import { type LoginFormData, loginSchema } from "@/schemas/auth";

export default function LoginScreen() {
  const router = useRouter();
  const { handleLogin, isLoading } = useLogin();
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
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
      router.replace("/(tabs)");
    }
  };

  return (
    <View
      className="flex-1 bg-gray-50"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      <Image source={BACKGROUND_IMAGE} style={styles.backgroundImage} resizeMode="cover" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 px-6">
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

          <Button
            text="로그인"
            isLoading={isLoading}
            disabled={!isValid}
            onPress={handleSubmit(onSubmit)}
            variant="primary-green"
            fullWidth
            className="mb-4"
          />

          <AuthFooter text="아직 계정이 없으신가요?" linkText="회원가입" href="/signup" />
        </View>
      </KeyboardAvoidingView>
    </View>
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
