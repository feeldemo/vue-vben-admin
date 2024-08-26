<script lang="ts" setup>
import { reactive, ref } from 'vue';

import { Page } from '@vben/common-ui';
import { $t } from '@vben/locales';

import {
  ElButton,
  ElCard,
  ElDrawer,
  ElForm,
  ElFormItem,
  ElInput,
  ElMessageBox,
  ElOption,
  ElPagination,
  ElSelect,
  ElTable,
  ElTableColumn,
  ElTag,
  type ComponentSize,
  type DrawerProps,
  type FormInstance,
  type FormRules,
} from 'element-plus';

import {
  getMenuList,
  type IMenuDto,
  type ISearchMenuDto,
} from '#/api';
defineOptions({ name: 'MenuManagement' });

const background = ref(false);
const disabled = ref(false);

const total = ref(0);
const loading = ref(true);

const formRef = ref<FormInstance>();

/** searchbody */
const searchBody = reactive({
  menuName: undefined,
  page: 1,
  size: 10,
  type: undefined,
} as ISearchMenuDto);

/** data array */
const tableData = ref<Array<IMenuDto>>([]);

/**
 * 获取数据事件
 */
async function fetchData() {
  loading.value = true;
  const res = await getMenuList(searchBody);
  tableData.value = res.list;
  total.value = res.count;
  loading.value = false;
}

fetchData();

function onSubmit() {
  fetchData();
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const handleSizeChange = (val: number) => {
  searchBody.size = val;
  fetchData();
};
const handleCurrentChange = (val: number) => {
  searchBody.page = val;
  fetchData();
};

/**
 * ElDrawer info
 * update or info or create
 */

const drawerRef = ref(false);
const titleRef = ref('');
const tempMenuRef = ref<FormInstance>();
const direction = ref<DrawerProps['direction']>('rtl'); // open way
const formSize = ref<ComponentSize>('default');

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure you want to close this?')
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};

interface RuleForm {
  id: number;
  name: string;
  type: number;
  icon: string;
  path: string;
  component: string;
}

const ruleForm = reactive<RuleForm>({
  id: 0,
  name: '',
  type: 0,
  icon: '',
  path: '',
  component: '',
});

const rules = reactive<FormRules<RuleForm>>({
  name: [{ required: true, message: '请输入菜单名字', trigger: 'blur' }],
  type: [{ required: true, message: '请选择菜单类型', trigger: 'change' }],
});



/**
 * open click
 * @param drawerTitle
 * @param menu
 */
function openDrawer(drawerTitle: string, menu?: IMenuDto) {
  titleRef.value = drawerTitle;
  drawerRef.value = true;
  ruleForm.id = menu ? menu.id : 0;
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm1 = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
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
        <ElFormItem
          :label="$t(`page.sys.index.search.type.name`)"
          style="width: 200px"
        >
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
        <ElButton
          size="small"
          style="
            width: 100px;
            height: 35px;
            margin-top: -15px;
            margin-bottom: 15px;
          "
          type="primary"
          @click="openDrawer(`新增`)"
          >新增</ElButton
        >
      </span>
      <ElTable
        :border="true"
        :data="tableData"
        row-key="id"
        style="width: 100%; margin-bottom: 10px"
      >
        <ElTableColumn label="菜单名字" prop="menuName" width="120px" />
        <ElTableColumn label="菜单类型" prop="type" width="100px">
          <template #default="scope">
            <ElTag type="primary">
              {{ scope.row.type === 0 ? '菜单' : '按钮' }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="Name" prop="name" />
        <ElTableColumn label="国际化代码" prop="title" />
        <ElTableColumn label="路由地址" prop="component" />
        <ElTableColumn label="状态" prop="status" width="100px">
          <template #default="scope">
            <ElTag type="success">
              {{ scope.row.status === 0 ? '启用' : '禁用' }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="创建时间" prop="createAt" />
        <ElTableColumn fixed="right" label="操作" min-width="70px">
          <template #default="scope">
            <ElButton
              size="small"
              type="primary"
              @click="openDrawer(`详情`, scope.row)"
              >详情</ElButton
            >
            <ElButton
              size="small"
              type="warning"
              @click="openDrawer(`修改`, scope.row)"
              >修改</ElButton
            >
            <ElButton size="small" type="danger">删除</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
    <ElCard style="margin-top: 10px">
      <ElPagination
        v-model:current-page="searchBody.page"
        v-model:page-size="searchBody.size"
        :background="background"
        :disabled="disabled"
        :page-sizes="[5, 10, 20, 50]"
        :total="total"
        layout="sizes, prev, pager, next"
        style="float: right; margin-bottom: 15px"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </ElCard>

    <ElDrawer
      v-model="drawerRef"
      :title="titleRef"
      :direction="direction"
      :before-close="handleClose"
    >
      <ElForm
        ref="tempMenuRef"
        style="max-width: 600px"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
        <ElFormItem label="菜单名字" prop="name">
          <el-input v-model="ruleForm.name" />
        </ElFormItem>
        <ElFormItem label="菜单类型" prop="region">
          <ElSelect v-model="ruleForm.type" placeholder="请选择菜单类型">
            <ElOption label="菜单" value=0 />
            <ElOption label="按钮" value=1 />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="菜单图标" prop="icon">
          <ElSelect v-model="ruleForm.icon" placeholder="请选择菜单图标">
            <ElOption label="菜单" value="0" />
            <ElOption label="按钮" value="1" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" @click="submitForm(tempMenuRef)">
            Create
          </ElButton>
          <ElButton @click="resetForm1(tempMenuRef)">Reset</ElButton>
        </ElFormItem>
      </ElForm>
    </ElDrawer>
  </Page>
</template>
