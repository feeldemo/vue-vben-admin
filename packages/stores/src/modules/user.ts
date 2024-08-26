import { acceptHMRUpdate, defineStore } from 'pinia';
interface BasicUserInfo {
  /**
   * 头像
   */
  avatar: string;
  /**
   * 用户昵称
   */
  realName: string;
  /**
   * 用户角色
   */
  roles?: string[];

  tag: string;
  /**
   * 用户id
   */
  userId: number | string;
  /**
   * 用户名
   */
  username: string;
}

interface AccessState {
  userId: null | number | string;
  /**
   * 用户信息
   */
  userInfo: BasicUserInfo | null;

  /**
   * 用户角色
   */
  userRoles: string[];
}

/**
 * @zh_CN 用户信息相关
 */
export const useUserStore = defineStore('core-user', {
  actions: {
    setUserId(userId: number | string) {
      this.userId = userId;
    },
    setUserInfo(userInfo: BasicUserInfo  | null ) {
      // 设置用户信息
      this.userInfo = userInfo;
      // 设置角色信息
      const roles = userInfo?.roles ?? [];
      this.setUserRoles(roles);
    },
    setUserRoles(roles: string[]) {
      this.userRoles = roles;
    },
  },
  persist: {
    paths: ['userId'],
  },
  state: (): AccessState => ({
    userId: null,
    userInfo: null,
    userRoles: [],
  }),
});

// 解决热更新问题
const hot = import.meta.hot;
if (hot) {
  hot.accept(acceptHMRUpdate(useUserStore, hot));
}
