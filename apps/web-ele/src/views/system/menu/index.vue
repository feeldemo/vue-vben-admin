<script lang="ts" setup>
import { reactive, ref } from 'vue';

import { Page } from '@vben/common-ui';
import { $t } from '@vben/locales';

import {
  ElMessageBox,
  ElNotification,
  type CascaderOption,
  type ComponentSize,
  type DrawerProps,
  type FormInstance,
  type FormRules,
} from 'element-plus';

import {
  createMenu,
  getMenuList,
  getTreeMenu,
  modifyMenu,
  modifyMenuStatus,
  deleteMenu,
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
  status: undefined,
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

interface RuleForm {
  id: number;
  menuName: string,
  name: string;
  title: string,
  type: number;
  icon?: string;
  path: string;
  component?: string;
  parentId: number;
  status: number,
  order: number,
}

const drawerRef = ref(false);
const titleRef = ref('');
let tempMenuRef = ref<FormInstance>();
const direction = ref<DrawerProps['direction']>('rtl'); // open way
const formSize = ref<ComponentSize>('default');
const formDisabled = ref(false);

let ruleForm = reactive<RuleForm>({
  id: 0,
  menuName: '',
  title: '',
  name: '',
  type: 1,
  icon: '',
  path: '',
  component: '',
  parentId: 0,
  status: 1,
  order: 0
});


function resetRuleForm(value?: IMenuDto) {
  ruleForm.id = value ? value.id : 0;
  ruleForm.menuName = value ? value.menuName : ``;
  ruleForm.title = value ? value.title : ``;
  ruleForm.name = value ? value.name : ``;
  ruleForm.type = value ? value.type : 1;
  ruleForm.icon = value ? value.icon : ``;
  ruleForm.path = value ? value.path : ``;
  ruleForm.component = value ? value.component : ``;
  ruleForm.parentId = value ? value.parentId : 0;
  ruleForm.status = value ? value.status : 1;
  ruleForm.order = value ? value.order : 99;
}

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('您确认要关闭吗?')
    .then(() => {
      resetRuleForm()
      if (tempMenuRef) {
        tempMenuRef.value?.resetFields();
      }
      formDisabled.value = false
      done();
    })
    .catch(() => {
      // catch error
    });
};

let parentOptions: Array<CascaderOption> = [{ id: 0, label: `一级菜单`, value: 0, children: [] }];

async function getParentOptions() {
  const data = await getTreeMenu() as Array<any>;
  parentOptions = parentOptions.concat(data.map(v => {
    return {
      id: v.id,
      label: v.label,
      value: v.value,
      children: v.children
    }
  }));
}
getParentOptions()


const rules = reactive<FormRules<RuleForm>>({
  name: [{ required: true, message: '请输入router名字', trigger: 'blur' }],
  menuName: [{ required: true, message: '请输入菜单名字', trigger: 'blur' }],
  type: [{ required: true, message: '请选择菜单类型', trigger: 'change' }],
  title: [{ required: true, message: '请输入国际化代码', trigger: 'blur' }],
  parentId: [{ required: true, message: '请选择上级菜单', trigger: 'change' }]
});

/**
 * open click
 * @param drawerTitle
 * @param menu
 */
function openDrawer(drawerTitle: string, menu?: IMenuDto) {
  titleRef.value = drawerTitle;
  drawerRef.value = true;
  resetRuleForm(menu)
  if (drawerTitle === `详情`) {
    formDisabled.value = true
  } else {
    formDisabled.value = false
  }
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  const val = await formEl.validate();
  if (!val) {
    return;
  }
  if (titleRef.value == `修改`) {
    await modifyMenu(ruleForm);
  } else if (titleRef.value == `新增`) {
    await createMenu(ruleForm);
  }
  ElNotification.success(`${titleRef.value} 成功!`)
  drawerRef.value = false;
  await fetchData()
}

const deleteClick = async (id: number) => {
  try {
    if (!id) return
    const confirmed = await ElMessageBox.confirm('您确认要删除该菜单吗?');
    if (confirmed == `confirm`) {
      await deleteMenu(id);
      showNotification(`删除成功!`, `success`)
    }
  } catch (error) {
    // 处理错误，例如显示错误通知
    if (error == `cancel`) {
      showNotification(`您取消了删除`, `warning`);
    }
  } finally {
    await fetchData()
  }

}


const resetForm1 = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const props1 = {
  checkStrictly: true,
}

// 封装通知函数  
function showNotification(message: string, type: 'success' | 'error' | 'warning') {
  if (type === 'success') {
    ElNotification.success(message);
  } else if (type == `warning`) {
    ElNotification.warning(message);
  } else {
    ElNotification.error(message);
  }
}

// 改进后的 statusChange 函数  
const statusChange = async (val: string | number | boolean, id: number) => {
  try {
    const confirmed = await ElMessageBox.confirm('您确认要修改该菜单的状态吗?');
    if (confirmed == `confirm`) {
      // 假设 val 总是可以安全地转换为 number  
      const status = Number(val);
      const result = await modifyMenuStatus({ status, id });

      showNotification(result, result === '修改成功' ? 'success' : 'error');
      await fetchData(); // 假设 fetchData 是从服务器重新获取数据的函数  
    }
  } catch (error) {
    // 处理错误，例如显示错误通知
    if (error == `cancel`) {
      showNotification(`您取消了修改`, `warning`);
    }
    await fetchData(); // 假设 fetchData 是从服务器重新获取数据的函数  
  }
};  
</script>

<template>
  <Page>
    <ElCard class="mb-5">
      <ElForm ref="formRef" :inline="true" :model="searchBody">
        <ElFormItem :label="$t(`page.sys.index.search.menu.name`)">
          <ElInput v-model="searchBody.menuName" :placeholder="$t(`page.sys.index.search.menu.placeholder`)"
            clearable />
        </ElFormItem>
        <ElFormItem :label="$t(`page.sys.index.search.type.name`)" style="width: 200px">
          <ElSelect v-model="searchBody.type" :placeholder="$t(`page.sys.index.search.type.placeholder`)" clearable>
            <ElOption label="菜单" :value=1 />
            <ElOption label="按钮" :value=2 />
          </ElSelect>
        </ElFormItem>
        <ElFormItem :label="$t(`page.sys.index.search.status.name`)" style="width: 200px">
          <ElSelect v-model="searchBody.status" :placeholder="$t(`page.sys.index.search.status.placeholder`)" clearable>
            <ElOption label="启用" :value=1 />
            <ElOption label="禁用" :value=0 />
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
        <ElButton size="small" style="
            width: 100px;
            height: 35px;
            margin-top: -15px;
            margin-bottom: 15px;
          " type="primary" @click="openDrawer(`新增`)">新增</ElButton>
      </span>
      <ElTable :border="true" :data="tableData" row-key="id" style="width: 100%; margin-bottom: 10px"  v-loading="loading" >
        <ElTableColumn label="菜单名字" prop="menuName" width="120px" />
        <ElTableColumn label="菜单类型" prop="type" width="100px">
          <template #default="scope">
            <ElTag type="primary">
              {{ scope.row.type === 1 ? '菜单' : '按钮' }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="Name" prop="name" />
        <ElTableColumn label="国际化代码" prop="title" />

        <ElTableColumn label="path" prop="path" />
        <ElTableColumn label="路由地址" prop="component" />
        <ElTableColumn label="状态" prop="status" width="100px">
          <template #default="scope">
            <ElSwitch v-model="scope.row.status" inlinePrompt
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" activeText="启用" inactiveText="禁用"
              :activeValue=1 :inactiveValue=0 @change="statusChange(scope.row.status, scope.row.id)" />
          </template>
        </ElTableColumn>
        <ElTableColumn label="创建时间" prop="createAt" />
        <ElTableColumn fixed="right" label="操作" min-width="70px">
          <template #default="scope">
            <ElButton size="small" type="primary" @click="openDrawer(`详情`, scope.row)">详情</ElButton>
            <ElButton size="small" type="warning" @click="openDrawer(`修改`, scope.row)">修改</ElButton>
            <ElButton size="small" type="danger" @click="deleteClick(scope.row.id)">删除</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </ElCard>
    <ElCard style="margin-top: 10px">
      <ElPagination v-model:current-page="searchBody.page" v-model:page-size="searchBody.size" :background="background"
        :disabled="disabled" :page-sizes="[5, 10, 20, 50]" :total="total" layout="sizes, prev, pager, next"
        style="float: right; margin-bottom: 15px" @current-change="handleCurrentChange"
        @size-change="handleSizeChange" />
    </ElCard>

    <ElDrawer v-model="drawerRef" :title="titleRef" :direction="direction" :before-close="handleClose">
      <ElForm ref="tempMenuRef" style="max-width: 600px" :model="ruleForm" :rules="rules" :disabled="formDisabled"
        label-width="auto" class="demo-ruleForm" :size="formSize" status-icon>
        <ElFormItem label="菜单名字" prop="menuName">
          <el-input v-model="ruleForm.menuName" placeholder="请输入菜单名字" />
        </ElFormItem>
        <ElFormItem label="router名字" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请选择router名字" />
        </ElFormItem>
        <ElFormItem label="国际化" prop="title">
          <el-input v-model="ruleForm.title" placeholder="请输入国际化代码" />
        </ElFormItem>
        <ElFormItem label="菜单类型" prop="type">
          <ElSelect v-model="ruleForm.type" placeholder="请选择菜单类型">
            <ElOption label="菜单" :value=1 />
            <ElOption label="按钮" :value=2 />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="上级菜单" prop="parentId">
          <ElCascader :options="parentOptions" :props="props1" clearable v-model="ruleForm.parentId" />
        </ElFormItem>
        <ElFormItem label="路由地址" prop="component">
          <el-input v-model="ruleForm.component" placeholder="请输入国际化代码" />
        </ElFormItem>
        <ElFormItem label="path" prop="path">
          <el-input v-model="ruleForm.path" placeholder="请输入path" />
        </ElFormItem>
        <ElFormItem label="状态" prop="status">
          <ElSwitch v-model="ruleForm.status" inlinePrompt
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" activeText="启用" inactiveText="禁用"
            :activeValue=1 :inactiveValue=0 />
        </ElFormItem>
        <ElFormItem label="排序" prop="sort">
          <ElInputNumber v-model="ruleForm.order" :min="0" :max="99" />
        </ElFormItem>
        <ElFormItem v-if="titleRef == '新增' || titleRef == '修改'">
          <ElButton type="primary" @click="submitForm(tempMenuRef)">
            {{ titleRef == '新增' ? `创建` : `修改` }}
          </ElButton>
          <ElButton @click="resetForm1(tempMenuRef)">重置</ElButton>
        </ElFormItem>
      </ElForm>
    </ElDrawer>
  </Page>
</template>
