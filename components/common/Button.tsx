import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  label?: string;
  text?: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "primary-green";
  disabled?: boolean;
  loading?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  label,
  text,
  onPress,
  variant = "primary",
  disabled,
  loading,
  isLoading,
  fullWidth = false,
  className,
  style,
  ...props
}: ButtonProps) {
  const buttonText = label || text || "";
  const isButtonLoading = loading || isLoading || false;
  const isDisabled = disabled || isButtonLoading;

  const getVariantClasses = () => {
    if (isDisabled) return "bg-gray-400";

    switch (variant) {
      case "primary-green":
        return "bg-primary-600";
      case "primary":
        return "bg-gray-600";
      case "secondary":
        return "bg-gray-300";
      default:
        return "bg-gray-600";
    }
  };

  const getTextColor = () => {
    if (variant === "secondary") return "text-gray-900";
    return "text-white";
  };

  const getLoadingColor = () => {
    if (variant === "secondary") return "#000000";
    return "#FFFFFF";
  };

  const widthClass = fullWidth ? "w-full" : "flex-1";
  const sizeClass = fullWidth ? "h-12" : "py-4";
  const roundedClass = fullWidth ? "rounded-md" : "rounded-xl";

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`${widthClass} ${sizeClass} ${roundedClass} items-center justify-center ${getVariantClasses()} ${className || ""}`}
      style={style}
      onPress={onPress}
      disabled={isDisabled}
      {...props}
    >
      {isButtonLoading ? (
        <ActivityIndicator color={getLoadingColor()} />
      ) : (
        <Text className={`text-body-16-bold ${getTextColor()}`}>{buttonText}</Text>
      )}
    </TouchableOpacity>
  );
}
