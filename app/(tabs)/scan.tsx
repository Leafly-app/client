import { CameraPermissionView } from "@/components/scan/CameraPermissionView";
import { ISBNInputBottomSheet } from "@/components/scan/ISBNInputBottomSheet";
import { ScanControls } from "@/components/scan/ScanControls";
import { ScanFrame } from "@/components/scan/ScanFrame";
import { ScanHeader } from "@/components/scan/ScanHeader";
import { useBookOCR } from "@/hooks/useBookOCR";
import type { FlashMode } from "expo-camera";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Scan() {
  const [flash, setFlash] = useState<FlashMode>("off");
  const [permission, requestPermission] = useCameraPermissions();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();
  const { scanBook, isLoading } = useBookOCR();

  if (!permission) {
    return <CameraPermissionView isLoading onRequestPermission={requestPermission} />;
  }

  if (!permission.granted) {
    return <CameraPermissionView onRequestPermission={requestPermission} />;
  }

  const toggleFlash = () => {
    setFlash((current) => (current === "off" ? "on" : "off"));
  };

  const takePicture = async () => {
    if (!cameraRef.current || isLoading) return;

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });

      if (photo?.uri) {
        await scanBook(photo.uri);
      }
    } catch {
      Alert.alert("오류", "촬영 중 문제가 발생했습니다.");
    }
  };

  const handleIsbnSearch = (isbn: string) => {
    router.push(`/search?keyword=${isbn}`);
  };

  return (
    <View className="flex-1 bg-black">
      <CameraView ref={cameraRef} className="absolute inset-0" facing="back" flash={flash}>
        <SafeAreaView className="flex-1">
          <ScanHeader onBackPress={() => router.back()} flash={flash} onFlashToggle={toggleFlash} />
          <ScanFrame />
          <ScanControls
            onManualInput={() => setIsBottomSheetVisible(true)}
            onCapture={takePicture}
            isLoading={isLoading}
          />
        </SafeAreaView>
      </CameraView>

      <ISBNInputBottomSheet
        visible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
        onSearch={handleIsbnSearch}
      />
    </View>
  );
}
