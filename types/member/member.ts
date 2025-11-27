export interface LibraryBook {
  isbn: string;
  coverUrl: string;
  title: string;
}

export interface MemberLibrary {
  finishedCount: number;
  finishedBooks: LibraryBook[];
  wantCount: number;
  wantBooks: LibraryBook[];
}

export interface MemberLikes {
  likeCount: number;
  likeBooks: LibraryBook[];
}

export interface MemberProfile {
  nickName: string;
  profileImage: string | null;
  library: MemberLibrary;
  likes: MemberLikes;
}
