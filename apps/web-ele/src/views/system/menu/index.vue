<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import {
  ElButton,
  ElCard,
  ElForm,
  ElFormItem,
  ElInput,
  ElOption,
  ElPagination,
  ElSelect,
  ElTable,
  ElTableColumn,
  ElTag,
  type FormInstance
} from 'element-plus';
import { reactive, ref } from 'vue';
import { $t } from '@vben/locales';
import {getMenuList, type IMenuDto, type ISearchMenuDto} from "#/api";
const background = ref(false)
const disabled = ref(false)
let total = ref(0);
const loading = ref(true)
defineOptions(
  { 
    name: 'MenuManagement'
  });

const formRef = ref<FormInstance>()
const searchBody = reactive({
  menuName: undefined,
  type: undefined,
  page: 1,
  size: 10
} as ISearchMenuDto)


let tableData = ref<Array<IMenuDto>>([]);

/**
 * 获取数据事件
 * */
async function fetchData() {
  loading.value = true;
  const res = await getMenuList(searchBody)
  tableData.value = res.list
  total.value = res.count;
  loading.value= false
}

fetchData()
function onSubmit() {
  fetchData()
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const handleSizeChange = (val: number) => {
  searchBody.size = val;
  fetchData()
}
const handleCurrentChange = (val: number) => {
  searchBody.page = val;
  fetchData()
}
</script>

<template>
  <Page>
    <ElCard class="mb-5">
      <ElForm ref="formRef" :inline="true" :model="searchBody">
        <ElFormItem :label="$t(`page.sys.index.search.menu.name`)">
          <ElInput
            v-model="searchBody.menuName"
            :placeholder="$t(`page.sys.index.search.menu.placeholder`)"
            clearable
          />
        </ElFormItem>
        <ElFormItem :label="$t(`page.sys.index.search.type.name`)" style="width: 200px">
          <ElSelect
            v-model="searchBody.type"
            :placeholder="$t(`page.sys.index.search.type.placeholder`)"
            clearable
          >
            <ElOption label="菜单" value="1" />
            <ElOption label="按钮" value="2" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem style="float: right">
          <ElButton type="primary" @click="onSubmit">搜索</ElButton>
          <ElButton @click="resetForm(formRef)">重置</ElButton>
        </ElFormItem>
      </ElForm>
    </ElCard>
    <ElCard>
      <span>
        <ElButton  type="primary" size="small" @click="" style="width: 100px; height: 35px;margin-top:-15px; margin-bottom: 15px ">新增</ElButton>
      </span>
      <ElTable
        :data="tableData"
        style="width: 100%; margin-bottom: 10px"
        row-key="id"
        :v-loading="loading"
        element-loading-text="Loading..."
        border
      >
        <ElTableColumn prop="icon" label="菜单图标"  width="100px">
          <template #default="scope">
            <Icon :name="scope.row.icon"></Icon>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="menuName" label="菜单名字" width="120px" />
        <ElTableColumn prop="type" label="菜单类型" width="100px" >
          <template #default="scope">
            <ElTag type="primary">{{scope.row.type == 0? '菜单':'按钮'}}</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="name" label="Name" />
        <ElTableColumn prop="title" label="国际化代码" />
        <ElTableColumn prop="component" label="路由地址" />
        <ElTableColumn prop="createAt" label="创建时间" />
        <ElTableColumn fixed="right" label="操作" min-width="70px">
          <template #default>
            <ElButton  type="primary" size="small" @click="">详情</ElButton>
            <ElButton  type="warning" size="small">修改</ElButton>
            <ElButton  type="danger" size="small">删除</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>

    <ElCard style="margin-top: 10px">
      <ElPagination
        style="float: right; margin-bottom: 15px"
        v-model:current-page="searchBody.page"
        v-model:page-size="searchBody.size"
        :page-sizes="[5, 10, 20, 50]"
        :disabled="disabled"
        :background="background"
        layout="sizes, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </ElCard>
  </Page>
</template>
