import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback } from "react";

export default function WriteScreen() {
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      router.push("/review/create");
    }, [router]),
  );

  return null;
}
