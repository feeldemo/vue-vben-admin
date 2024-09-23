<script lang="ts" setup>
import type { ISearchMenuDto } from '#/api';
import { Page } from '@vben/common-ui';
import { ElMessageBox, ElNotification, ElSpace, type FormInstance } from 'element-plus';
import { ref, reactive } from 'vue';
import { SvgPcs, SvgPowerStatus, SvgPowerDui } from '@vben/icons';

const formRef = ref<FormInstance>();

/** searchbody */
const searchBody = reactive({
  menuName: undefined,
  page: 1,
  size: 10,
  type: undefined,
  status: undefined,
} as ISearchMenuDto);
const drawerRef = ref(false);
const background = ref(false);
const disabled = ref(false);
const total = ref(0);
const handleSizeChange = (val: number) => {
  searchBody.size = val;

};
const handleCurrentChange = (val: number) => {
  searchBody.page = val;

};


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
const click = async (val: string | number | boolean) => {
  try {
    const confirmed = await ElMessageBox.confirm('您确认要修改该菜单的状态吗?');
    if (confirmed == `confirm`) {
      // 假设 val 总是可以安全地转换为 number  
      const status = Number(val);
      console.log(status)

      showNotification(`测试`,  'success');
    }
  } catch (error) {
    // 处理错误，例如显示错误通知
    if (error == `cancel`) {
      showNotification(`您取消了修改`, `warning`);
    }
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
          <ElButton type="primary" @click="">搜索</ElButton>
          <ElButton @click="">重置</ElButton>
        </ElFormItem>
      </ElForm>
    </ElCard>
    <ElCard class="mb-5" style="height: 600px;">
      <ElSpace wrap :size="20">
        <ElCard  @click="click" shadow="always">
          <template #header> 高特100kW/215kWh储能站1</template>
          <ElRow :gutter="80">
            <ElCol :span="8">
              <SvgPowerStatus class="size-8"></SvgPowerStatus>
            </ElCol>
            <ElCol :span="8">
              <SvgPcs class="size-8" />
            </ElCol>
            <ElCol :span="8">
              <SvgPowerDui class="size-8" />
            </ElCol>
          </ElRow>
          <ElRow :gutter="20" style="margin-top: 20px;margin-bottom: 0px;">
            <ElCol :span="8" :pull="1">
              <span>电站状态</span>
            </ElCol>
            <ElCol :span="8" :push="2">
              <span>pcs</span>
            </ElCol>
            <ElCol :span="8" :push="3">
              <span>电池堆</span>
            </ElCol>
          </ElRow>
          <template #footer>
            <ElRow :gutter="80">
              <ElCol :span="8">
                <span>放电</span>
              </ElCol>
              <ElCol :span="8">
                <span>1</span>
              </ElCol>
              <ElCol :span="8">
                <span>1</span>
              </ElCol>
            </ElRow>
          </template>
        </ElCard>
        <ElCard  @click="click">
          <template #header> 高特100kW/215kWh储能站1</template>
          <ElRow :gutter="80">
            <ElCol :span="8">
              <SvgPowerStatus class="size-8"></SvgPowerStatus>
            </ElCol>
            <ElCol :span="8">
              <SvgPcs class="size-8" />
            </ElCol>
            <ElCol :span="8">
              <SvgPowerDui class="size-8" />
            </ElCol>
          </ElRow>
          <ElRow :gutter="20" style="margin-top: 20px;margin-bottom: 0px;">
            <ElCol :span="8" :pull="1">
              <span>电站状态</span>
            </ElCol>
            <ElCol :span="8" :push="2">
              <span>pcs</span>
            </ElCol>
            <ElCol :span="8" :push="3">
              <span>电池堆</span>
            </ElCol>
          </ElRow>
          <template #footer>
            <ElRow :gutter="80">
              <ElCol :span="8">
                <span>放电</span>
              </ElCol>
              <ElCol :span="8">
                <span>1</span>
              </ElCol>
              <ElCol :span="8">
                <span>1</span>
              </ElCol>
            </ElRow>
          </template>
        </ElCard>
        <ElCard  @click="click">
          <template #header> 高特100kW/215kWh储能站1</template>
          <ElRow :gutter="80">
            <ElCol :span="8">
              <SvgPowerStatus class="size-8"></SvgPowerStatus>
            </ElCol>
            <ElCol :span="8">
              <SvgPcs class="size-8" />
            </ElCol>
            <ElCol :span="8">
              <SvgPowerDui class="size-8" />
            </ElCol>
          </ElRow>
          <ElRow :gutter="20" style="margin-top: 20px;margin-bottom: 0px;">
            <ElCol :span="8" :pull="1">
              <span>电站状态</span>
            </ElCol>
            <ElCol :span="8" :push="2">
              <span>pcs</span>
            </ElCol>
            <ElCol :span="8" :push="3">
              <span>电池堆</span>
            </ElCol>
          </ElRow>
          <template #footer>
            <ElRow :gutter="80">
              <ElCol :span="8">
                <span>放电</span>
              </ElCol>
              <ElCol :span="8">
                <span>1</span>
              </ElCol>
              <ElCol :span="8">
                <span>1</span>
              </ElCol>
            </ElRow>
          </template>
        </ElCard>
        <ElCard  @click="click">
          <template #header> 高特100kW/215kWh储能站1</template>
          <ElRow :gutter="80">
            <ElCol :span="8">
              <SvgPowerStatus class="size-8"></SvgPowerStatus>
            </ElCol>
            <ElCol :span="8">
              <SvgPcs class="size-8" />
            </ElCol>
            <ElCol :span="8">
              <SvgPowerDui class="size-8" />
            </ElCol>
          </ElRow>
          <ElRow :gutter="20" style="margin-top: 20px;margin-bottom: 0px;">
            <ElCol :span="8" :pull="1">
              <span>电站状态</span>
            </ElCol>
            <ElCol :span="8" :push="2">
              <span>pcs</span>
            </ElCol>
            <ElCol :span="8" :push="3">
              <span>电池堆</span>
            </ElCol>
          </ElRow>
          <template #footer>
            <ElRow :gutter="80">
              <ElCol :span="8">
                <span>放电</span>
              </ElCol>
              <ElCol :span="8">
                <span>1</span>
              </ElCol>
              <ElCol :span="8">
                <span>1</span>
              </ElCol>
            </ElRow>
          </template>
        </ElCard>
        <ElCard  @click="click">
          <template #header> 高特100kW/215kWh储能站1</template>
          <ElRow :gutter="80">
            <ElCol :span="8">
              <SvgPowerStatus class="size-8"></SvgPowerStatus>
            </ElCol>
            <ElCol :span="8">
              <SvgPcs class="size-8" />
            </ElCol>
            <ElCol :span="8">
              <SvgPowerDui class="size-8" />
            </ElCol>
          </ElRow>
          <ElRow :gutter="20" style="margin-top: 20px;margin-bottom: 0px;">
            <ElCol :span="8" :pull="1">
              <span>电站状态</span>
            </ElCol>
            <ElCol :span="8" :push="2">
              <span>pcs</span>
            </ElCol>
            <ElCol :span="8" :push="3">
              <span>电池堆</span>
            </ElCol>
          </ElRow>
          <template #footer>
            <ElRow :gutter="80">
              <ElCol :span="8">
                <span>放电</span>
              </ElCol>
              <ElCol :span="8">
                <span>1</span>
              </ElCol>
              <ElCol :span="8">
                <span>1</span>
              </ElCol>
            </ElRow>
          </template>
        </ElCard>
      </ElSpace>
    </ElCard>
    <ElCard style="margin-top: 10px">
      <ElPagination v-model="drawerRef" :current-page="searchBody.page" v-model:page-size="searchBody.size"
        :background="background" :disabled="disabled" :page-sizes="[5, 10, 20, 50]" :total="total"
        layout="sizes, prev, pager, next" style="float: right; margin-bottom: 15px"
        @current-change="handleCurrentChange" @size-change="handleSizeChange" />
    </ElCard>
  </Page>
</template>


<style>
.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}

.infinite-list .infinite-list-item+.list-item {
  margin-top: 10px;
}
</style>
