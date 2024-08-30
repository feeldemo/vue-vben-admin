import type { RouteRecordStringComponent } from '@vben/types';

import { requestClient } from '#/api/request';
import type { IPubPageDto, IPubResultDto } from '..';

/**
 * 菜单类型枚举
 */
export enum EMenuType {
  M = 1, // 菜单
  B = 2, // 按钮
}

/**
 * 菜单管理查询DTO
 */
export interface ISearchMenuDto extends IPubPageDto {
  /**
   * 菜单名字  模糊查询
   */
  menuName?: string,
  /**
   * 菜单类型
   */
  type?: EMenuType,

  status?: number
}
/**
 * 修改menu DTO 
 */
export interface IModifyMenuDto extends IMenuDto {

}

/**
 * 菜单管理返回结果DTO
 */
export interface IMenuDto {
  id: number,
  menuName: string,
  name: string,
  title: string,
  type: EMenuType | number,
  icon?: string,
  path: string,
  component?: string,
  status: number,
  order: number,
  parentId: number,
  children?: Array<IMenuDto>
}

export interface IMenuModifyStatusDto {
  id: number,
  status: number
}


const prixf = `menu`
/**
 * 获取用户所有菜单
 */
export async function getAllMenusApi() {
  return requestClient.post<RouteRecordStringComponent[]>(`getAllMenus`);
}

/**
 * 获取系统菜单加搜索功能 分页
 */
export async function getMenuList(data: ISearchMenuDto) {
  return requestClient.post<IPubResultDto<IMenuDto>>(`${prixf}/getMenuList`, data);
}

/**
 * 获取系统菜单 树形结构
 */
export async function getTreeMenu() {
  return requestClient.post(`${prixf}/getTreeMenu`);
}
/**
 * 修改菜单 接口
 * @param data 
 * @returns 
 */
export async function modifyMenu(data: IModifyMenuDto) {
  return requestClient.post(`${prixf}/modifyMenu`, data);
}


/**
 * 删除菜单 接口
 * @param id 参数 菜单id 
 * @returns 
 */
export async function deleteMenu(id: number) {
  return requestClient.post(`${prixf}/deleteMenu`, { id });
}



/**
 * 创建菜单 接口
 * @param 
 * @returns 
 */
export async function createMenu(data: IMenuDto) {
  return requestClient.post(`${prixf}/createMenu`, data);
}



/**
 * 查看菜单详情
 * @param 
 * @returns 
 */
export async function findMenuInfo(id: number) {
  return requestClient.post<IMenuDto>(`${prixf}/findMenuInfo`, id);
}

/**
 * 修改菜单状态
 * @param dto 
 * @returns 
 */
export async function modifyMenuStatus(dto: IMenuModifyStatusDto) {
  return requestClient.post(`${prixf}/modifyStatus`, dto);
}

