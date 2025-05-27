<script lang="ts" setup>
import {
  AnalysisChartCard,
} from '@vben/common-ui';
import ProjectLineView, { type DataItem } from "./project-info-soucrce.vue";
import EchartBar from "../../component/echart-bar.vue";
import Bar from "../../component/bar.vue";
const tilteDatas = ['邮箱', 'ads'];
const datas: Array<DataItem> = [
  {
    name: '邮箱',
    key: 'Mon',
    value: 800
  },
  {
    name: '邮箱',
    key: 'Tue',
    value: 600
  },
  {
    name: '邮箱',
    key: 'Wed',
    value: 400
  },
  {
    name: '邮箱',
    key: 'Thu',
    value: 100
  },
  {
    name: 'ads',
    key: 'Mon',
    value: 100
  },
  {
    name: 'ads',
    key: 'Tue',
    value: 450
  },
  {
    name: 'ads',
    key: 'Wed',
    value: 500
  },
  {
    name: 'ads',
    key: 'Thu',
    value: 300
  }
]
</script>

<template>
  <ElScrollbar>
    <div class="mt-5 w-full md:flex">
      <AnalysisChartCard class="mt-4 md:mr-4 md:mt-0 md:w-1/3" title="充电放电曲线">
        <ElRow>
          <ElCol :span="20">
            <ElButton type="primary" round>今日</ElButton>
            <ElButton type="primary" round>昨日</ElButton>
          </ElCol>
          <ElCol :span="4">
            <ElButton type="primary" round>查看历史</ElButton>
          </ElCol>
        </ElRow>
        <ProjectLineView :datas="datas" :titleDatas="tilteDatas" />
      </AnalysisChartCard>
      <AnalysisChartCard class="mt-4 md:mr-4 md:mt-0 md:w-1/2" title="实时动态图">
        <div class="mt-1 w-full md:flex">
          
        </div>
       
      </AnalysisChartCard>
      <AnalysisChartCard class="mt-4 md:mr-4 md:mt-0 md:w-1/3" title="充电放电曲线">
        <ElRow>
          <ElCol :span="20">
            <ElButton type="primary" round>近14天</ElButton>
            <ElButton type="primary" round>近一个月</ElButton>
          </ElCol>
        </ElRow>
        <EchartBar />
      </AnalysisChartCard>
    </div>
    <div class="mt-5 w-full md:flex">
      <AnalysisChartCard class="mt-4 md:mr-4 md:mt-0 md:w-1/3" title="充电放电曲线">
        <ElRow>
          <ElCol :span="20">
            <ElButton type="primary" round>今日</ElButton>
            <ElButton type="primary" round>昨日</ElButton>
          </ElCol>
          <ElCol :span="4">
            <ElButton type="primary" round>查看历史</ElButton>
          </ElCol>
        </ElRow>
        <ProjectLineView :datas="datas" :titleDatas="tilteDatas" />
      </AnalysisChartCard>
      <AnalysisChartCard class="mt-4 md:mr-4 md:mt-0 md:w-1/2" title="实时动态图">
        <div class="mt-1 w-full md:flex">
          <Bar></Bar>
        </div>
       
      </AnalysisChartCard>
      <AnalysisChartCard class="mt-4 md:mr-4 md:mt-0 md:w-1/3" title="充电放电曲线">
        <ElRow>
          <ElCol :span="20">
            <ElButton type="primary" round>近14天</ElButton>
            <ElButton type="primary" round>近一个月</ElButton>
          </ElCol>
        </ElRow>
        <EchartBar />
      </AnalysisChartCard>
    </div>
  </ElScrollbar>
</template
