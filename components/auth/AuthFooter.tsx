import { Href, Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

interface AuthFooterProps {
  text: string;
  linkText: string;
  href: Href;
}

export default function AuthFooter({ text, linkText, href }: AuthFooterProps) {
  return (
    <View className="flex-row justify-center mt-4">
      <Text className="text-gray-500">{text} </Text>
      <Link href={href}>
        <Text className="text-primary-600 font-bold">{linkText}</Text>
      </Link>
    </View>
  );
}
