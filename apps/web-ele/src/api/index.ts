/**
 * 通用查询分页DTO
 */
export interface IpubPageDto {
  page: number,
  size: number
}

export interface IpubResultDto<T>{
  count: number,
  list: Array<T>
}
export * from './core';
