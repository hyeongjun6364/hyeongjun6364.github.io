// exampleData.ts

export interface Useditem2 {
  _id: string;
  writer: string;
  title: string;
  contents: string;
  youtubeUrl:string;
  likeCount: number;
  dislikeCount: number;
  images: string[];
  boardAddress:BoardAddress;
  user:User;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}
export interface BoardAddress{
  _id: string;
  zipcode: string;
  address: string;
  addressDetail: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  picture: string;
  userPoint: UserPoint;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface UserPoint{
  
}

