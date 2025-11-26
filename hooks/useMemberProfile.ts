import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { getMemberProfile } from "@/apis/member";
import type { MemberProfile } from "@/types/member/member";

export const useMemberProfile = () => {
  const [profile, setProfile] = useState<MemberProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await getMemberProfile();

      if (response.isSuccess && response.data) {
        setProfile(response.data);
      } else {
        throw new Error("프로필 정보를 불러올 수 없습니다.");
      }
    } catch (err: any) {
      const errorMessage = err.message || "프로필 정보를 불러오는데 실패했습니다.";
      setError(errorMessage);
      Alert.alert("오류", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    isLoading,
    error,
    refetch: fetchProfile,
  };
};
