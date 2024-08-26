<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import {
  ElButton,
  ElCard,
  ElForm,
  ElFormItem,
  ElInput,
  ElNotification,
  ElOption,
  ElPagination,
  ElSelect,
  ElTable,
  ElTableColumn,
  type ComponentSize,
  type FormInstance
} from 'element-plus';

import { reactive, ref } from 'vue';
import { $t } from '@vben/locales';

defineOptions({ name: 'MenuManagement' });
const formRef = ref<FormInstance>()


const tableData = await 

const searchBody = reactive({
  user: '',
  region: '',
  date: '',
})


function onSubmit() {
  ElNotification({
    duration: 2500,
    message: '提交成功',
    type: `success`,
  });
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}


const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

const background = ref(false)
const disabled = ref(false)
const size = ref<ComponentSize>('default')
const currentPage2 = ref(5)
const pageSize2 = ref(100)

</script>

<template>
  <Page>
    <ElCard class="mb-5">
        <ElForm  ref="formRef" :inline="true" :model="searchBody" >
          <ElFormItem :label="$t(`page.sys.index.search.menu.name`)">
            <ElInput v-model="searchBody.user" :placeholder="$t(`page.sys.index.search.menu.placeholder`)" clearable />
          </ElFormItem>
          <ElFormItem :label="$t(`page.sys.index.search.type.name`)" style="width: 200px;">
            <ElSelect v-model="searchBody.region" :placeholder="$t(`page.sys.index.search.type.placeholder`)" clearable >
              <ElOption label="菜单" value="1" />
              <ElOption label="按钮" value="2" />
            </ElSelect>
          </ElFormItem>
          <ElFormItem style="float:right;">
            <ElButton type="primary" @click="onSubmit">搜索</ElButton>
            <ElButton @click="resetForm(formRef)">Reset</ElButton>
          </ElFormItem>
        </ElForm>
    </ElCard>
    <ElCard>
      <ElTable :data="tableData" style="width: 100%; margin-bottom: 10px" row-key="id" border default-expand-all >
        <ElTableColumn prop="menuName" label="菜单名字"  />
        <ElTableColumn prop="name" label="Name"  />
        <ElTableColumn prop="tile" label="国际化代码" />
      </ElTable>
    </ElCard>

    <ElCard style='margin-top:10px'>
      <ElPagination style="float:right;margin-bottom:15px"
      v-model:current-page="currentPage2"
      v-model:page-size="pageSize2"
      :page-sizes="[100, 200, 300, 400]"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="sizes, prev, pager, next"
      :total="1000"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    </ElCard>
  </Page>
</template>
