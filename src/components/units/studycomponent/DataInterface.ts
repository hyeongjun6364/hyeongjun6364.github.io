// DataInterface.ts

export interface Useditem {
  _id: string;
  name: string;
  remarks: string;
  contents: string;
  price: number;
  tags: string[];
  images: string[];
  pickedCount: number;
  useditemAddress: UseditemAddress;
  buyer: User;
  seller: User;
  soldAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface UseditemAddress {
  _id: string;
  zipcode: string;
  address: string;
  addressDetail: string;
  lat: number;
  lng: number;
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

export interface UserPoint {
  // UserPoint 관련 필드 추가
}
