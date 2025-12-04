import Header from "@/components/common/Header";
import { useStickyHeader } from "@/hooks/useStickyHeader";
import type { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface HeaderConfig {
  hasBack?: boolean;
  hasSearch?: boolean;
  titleType?: "logo" | "text";
  title?: string;
  searchIcon?: ReactNode;
  isFilterActive?: boolean;
  onBackPress?: () => void;
  onSearchPress?: () => void;
  onLogoPress?: () => void;
}

interface ScreenLayoutProps {
  children: ReactNode;
  hasHeader?: boolean;
  headerConfig?: HeaderConfig;
  scrollable?: boolean;
  enableStickyHeader?: boolean;
  bgColor?: string;
  hasBottomInset?: boolean;
}
export default function ScreenLayout({
  children,
  hasHeader = true,
  headerConfig = {},
  scrollable = true,
  enableStickyHeader = false,
  bgColor = "bg-white",
  hasBottomInset = false,
}: ScreenLayoutProps) {
  const insets = useSafeAreaInsets();
  const { isSticky, handleScroll } = useStickyHeader(50);

  const {
    hasBack = false,
    hasSearch = false,
    titleType = "logo",
    title = "",
    searchIcon,
    isFilterActive = false,
    onBackPress,
    onSearchPress,
    onLogoPress,
  } = headerConfig;

  const headerState: "sticky" | "default" = enableStickyHeader && isSticky ? "sticky" : "default";

  const headerProps = {
    state: headerState,
    hasBack,
    hasSearch,
    titleType,
    title,
    searchIcon,
    isFilterActive,
    onBackPress,
    onSearchPress,
    onLogoPress,
  };

  const content = scrollable ? (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1"
      contentContainerStyle={{ flexGrow: 1 }}
      onScroll={enableStickyHeader ? handleScroll : undefined}
      scrollEventThrottle={enableStickyHeader ? 16 : undefined}
    >
      {hasHeader && enableStickyHeader && <View className="h-12" />}
      {children}
    </ScrollView>
  ) : (
    <View className="flex-1">{children}</View>
  );

  return (
    <View
      className={`flex-1 ${bgColor}`}
      style={{
        paddingTop: insets.top,
        paddingBottom: hasBottomInset ? insets.bottom : 0,
      }}
    >
      {hasHeader && !enableStickyHeader && <Header {...headerProps} state="default" />}

      {content}

      {hasHeader && enableStickyHeader && (
        <View
          style={{
            position: "absolute",
            top: insets.top,
            left: 0,
            right: 0,
            zIndex: 10,
          }}
        >
          <Header {...headerProps} />
        </View>
      )}
    </View>
  );
}
