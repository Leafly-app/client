export interface ToggleLikeRequest {
  title: string;
  author: string;
  cover: string;
}

export interface ToggleLikeResponse {
  status: "on" | "off";
}
