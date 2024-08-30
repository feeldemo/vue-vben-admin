/**
 * 通用查询分页DTO
 */
export interface IPubPageDto {
  page: number,
  size: number
}

export interface IPubResultDto<T>{
  count: number,
  list: Array<T>
}
export * from './core';
