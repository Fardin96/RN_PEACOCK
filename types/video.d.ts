export type comment = {
  comment: string;
  username: string;
  profilePic: string;
};

export type video = {
  videoId: string;
  videoTitle: string;
  videoThumbnail: string;
  videoUrl: string;
  likes: number;
  comments: comment[];
};
