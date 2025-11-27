import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthFooter from "@/components/auth/AuthFooter";
import AuthHeader from "@/components/auth/AuthHeader";
import { FormController } from "@/components/auth/FormController";
import Button from "@/components/common/Button";
import { useLogin } from "@/hooks/useLogin";
import { type LoginFormData, loginSchema } from "@/schemas/auth";

export default function LoginScreen() {
  const router = useRouter();
  const { handleLogin, isLoading } = useLogin();

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
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
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
    </SafeAreaView>
  );
}
