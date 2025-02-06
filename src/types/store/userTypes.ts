/**
 * 用户信息类型
 */
export interface UserInfo {
  id: number;
  token: string;
  username: string;
}

export type UserState = {
  userInfo: UserInfo | null;
};
