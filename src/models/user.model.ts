export enum EUserStatus {
  'active' = 'active',
  'banned' = 'banned',
}

export enum EUserGender {
  'male' = 'male',
  'female' = 'female',
}

export enum EUserBase {
  'สนง.ผบช.' = 'สนง.ผบช.',
  'กกพ.ทภ.1' = 'กกพ.ทภ.1',
  'กขว.ทภ.1' = 'กขว.ทภ.1',
  'กยก.ทภ.1' = 'กยก.ทภ.1',
  'กกบ.ทภ.1' = 'กกบ.ทภ.1',
  'กกร.ทภ.1' = 'กกร.ทภ.1',
  'ร้อย.บก.ทภ.1' = 'ร้อย.บก.ทภ.1',
  'ร้อย.ปจว.ทภ.1' = 'ร้อย.ปจว.ทภ.1',
}

export interface IUser {
  index: number;
  id: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  lineId: string;
  displayName: string;
  profileImageUrl: string;
  rank: string;
  firstName: string;
  lastName: string;
  gender: EUserGender;
  base: EUserBase;
  status: EUserStatus;
}

export interface IUserScoreInfo {
  id: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  user: IUser;
}

export interface IUserScoreHistory {
  index: number;
  id: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  scoreInfo: IUserScoreInfo;
  time: number;
  distance: number;
  imageUrl: string;
}
