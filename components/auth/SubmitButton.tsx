import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";

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
  className,
  style,
  ...props
}: SubmitButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={`w-full h-12 rounded-md items-center justify-center ${
        isDisabled
          ? "bg-gray-400"
          : variant === "primary"
            ? "bg-primary-600"
            : "bg-gray-600"
      } ${className || ""}`}
      style={style}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className="text-white text-body-16-bold">{text}</Text>
      )}
    </TouchableOpacity>
  );
}
