<script lang="ts" setup>
import { Page } from '@vben/common-ui';
const tableData = [
  {
    job: `1、人才配置完成率≥95%；`,
    way: `编制37人，实际35人，人才配置完成率94.6%`
  },
  {
    job: `2、绩效管理指标体系完备率95%`,
    way: `绩效管理指标体系完备率95%以上`
  }
  ,
  {
    job: `3、课程体系覆盖率90%以上；培训人员覆盖率=100%`,
    way: `已完成线上课程4个类型，7个系列课程上传；线下课程3堂，培训覆盖率100%`
  }
  ,
  {
    job: `4、员工对行政后勤及人力资源管理的满意度≥85%`,
    way: `9月完成季度测评%以上`
  },
  {
    job: `4、员工对行政后勤及人力资源管理的满意度≥85%`,
    way: `9月完成季度测评%以上`
  },
  {
    job: `4、员工对行政后勤及人力资源管理的满意度≥85%`,
    way: `9月完成季度测评%以上`
  },
  {
    job: `4、员工对行政后勤及人力资源管理的满意度≥85%`,
    way: `9月完成季度测评%以上`
  },
  {
    job: `4、员工对行政后勤及人力资源管理的满意度≥85%`,
    way: `9月完成季度测评%以上`
  },
  {
    job: `4、员工对行政后勤及人力资源管理的满意度≥85%`,
    way: `9月完成季度测评%以上`
  },
  {
    job: `4、员工对行政后勤及人力资源管理的满意度≥85%`,
    way: `9月完成季度测评%以上`
  },
  {
    job: `4、员工对行政后勤及人力资源管理的满意度≥85%`,
    way: `9月完成季度测评%以上`
  },
  {
    job: `4、员工对行政后勤及人力资源管理的满意度≥85%`,
    way: `9月完成季度测评%以上`
  },
  {
    job: `4、员工对行政后勤及人力资源管理的满意度≥85%`,
    way: `9月完成季度测评%以上`
  },
  {
    job: `4、员工对行政后勤及人力资源管理的满意度≥85%`,
    way: `9月完成季度测评%以上`
  },
  {
    job: `4、员工对行政后勤及人力资源管理的满意度≥85%`,
    way: `9月完成季度测评%以上`
  }
]
const tableData1 = [
  {
    job: `制定“定岗定编定员”方案，完成24年下半年人力、行政费用预算的提报`,
    p:`朱敏、刘恋`,
    t:`2024/8/31`,
    y:`否`,
    u:``
  },
  {
    job: `规划设计绩效看板，用于公布各部门的业绩和工作任务的完成情况`,
    p:`朱敏、刘恋`,
    t:`2024/8/31`,
    y:`否`,
    u:``
  }
  ,
  {
    job: `拟订项目小组激励方案`,
    p:`朱敏、刘恋`,
    t:`2024/8/31`,
    y:`否`,
    u:``
  }
  ,
  {
    job: `完成《企业文化大讲堂》第四、五次课程的组织；着手对前期各项培训进行检测；组织学习规章制度、部门职责，并进行考试`,
    p:`朱敏、刘恋`,
    t:`2024/8/31`,
    y:`否`,
    u:``
  },
  {
    job: `修订《员工手册》`,
    p:`朱敏、刘恋`,
    t:`2024/8/31`,
    y:`否`,
    u:`已超期15天`
  },
  {
    job: `修订《员工手册》`,
    p:`朱敏、刘恋`,
    t:`2024/8/31`,
    y:`否`,
    u:`已超期15天`
  },
  {
    job: `修订《员工手册》`,
    p:`朱敏、刘恋`,
    t:`2024/8/31`,
    y:`否`,
    u:`已超期15天`
  },
  {
    job: `修订《员工手册》`,
    p:`朱敏、刘恋`,
    t:`2024/8/31`,
    y:`否`,
    u:`已超期15天`
  },
  {
    job: `修订《员工手册》`,
    p:`朱敏、刘恋`,
    t:`2024/8/31`,
    y:`否`,
    u:`已超期15天`
  },
  {
    job: `修订《员工手册》`,
    p:`朱敏、刘恋`,
    t:`2024/8/31`,
    y:`否`,
    u:`已超期15天`
  },
  {
    job: `修订《员工手册》`,
    p:`朱敏、刘恋`,
    t:`2024/8/31`,
    y:`否`,
    u:`已超期15天`
  },
  {
    job: `修订《员工手册》`,
    p:`朱敏、刘恋`,
    t:`2024/8/31`,
    y:`否`,
    u:`已超期15天`
  },
  {
    job: `修订《员工手册》`,
    p:`朱敏、刘恋`,
    t:`2024/8/31`,
    y:`否`,
    u:`已超期15天`
  },
  {
    job: `修订《员工手册》`,
    p:`朱敏、刘恋`,
    t:`2024/8/31`,
    y:`否`,
    u:`已超期15天`
  },
  {
    job: `修订《员工手册》`,
    p:`朱敏、刘恋`,
    t:`2024/8/31`,
    y:`否`,
    u:`已超期15天`
  },
  {
    job: `修订《员工手册》`,
    p:`朱敏、刘恋`,
    t:`2024/8/31`,
    y:`否`,
    u:`已超期15天`
  }
]
</script>

<template>
  <Page >
    <ElCard >
      <template #header> 绩效看板 </template>
      <!-- 跑马灯-->
      <ElCarousel style="height:800px;" :motion-blur="false">
        <ElDescriptions border>
          <ElDescriptionsItem label="部门" align="center" :span="3">
            <span>人力资源行政部</span>
          </ElDescriptionsItem>
          <ElDescriptionsItem label="年度规划任务目标" align="center" :span="3">
            <ElTable :data="tableData" border style="width: 100%" height="200px">
              <ElTableColumn prop="job" label="任务" />
              <ElTableColumn prop="way" label="完成进度" />
            </ElTable>
          </ElDescriptionsItem>
          <ElDescriptionsItem label="考核期" align="center">
            <span>8月</span>
          </ElDescriptionsItem>
          <ElDescriptionsItem label="重点任务数" align="center">
            <span>3个</span>
          </ElDescriptionsItem>
          <ElDescriptionsItem label="已完成任务数" align="center">
            <span>0</span>
          </ElDescriptionsItem>
        </ElDescriptions>
        <ElTable :data="tableData1" border style="width: 100%;margin-top: 20px" height="380px">
          <ElTableColumn type="index" label="序号" width="70" />
          <ElTableColumn prop="job" label="工作重点内容" />
          <ElTableColumn prop="p" label="主要执行人"   width="150"/>
          <ElTableColumn prop="t" label="截止时间"  width="100" />
          <ElTableColumn prop="y" label="是否完成"  width="100"/>
          <ElTableColumn prop="u" label="超期提醒" width="100" />
        </ElTable>
        <div style="margin-top: 20px;">
          <ElRow>
            <ElCol>
              奖惩事项：
            </ElCol>
          </ElRow>
          <ElRow >
            <ElCol :span="160" :offset="1">
              <span style="color: red;">奖励人力资源部 全员绩效百分之200%,奖励人力资源部 全员绩效百分之200%,奖励人力资源部 全员绩效百分之200%奖励人力资源部 全员绩效百分之200%</span>
            </ElCol>
          </ElRow>
        </div>
      </ElCarousel>
    </ElCard>
  </Page>
</template>
