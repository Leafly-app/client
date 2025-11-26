export type LibraryStatus = "완독" | "읽고 싶음";

export interface AddToLibraryRequest {
  title: string;
  author: string;
  cover: string;
  status: LibraryStatus;
}
