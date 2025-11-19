import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface SubmitButtonProps extends TouchableOpacityProps {
  text: string;
  isLoading?: boolean;
  variant?: "primary" | "secondary";
}

export default function SubmitButton({
  text,
  isLoading = false,
  variant = "primary",
  disabled,
  ...props
}: SubmitButtonProps) {
  const bgColor = variant === "primary" ? "bg-primary-600" : "bg-gray-600";

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={`w-full h-14 ${bgColor} rounded-md items-center justify-center`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className="text-white text-lg font-bold">{text}</Text>
      )}
    </TouchableOpacity>
  );
}
