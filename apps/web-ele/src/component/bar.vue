<template>
  <div ref="batteryChart" style="width: 200px; height: 100px; position: relative">
    <!-- 假设我们使用ECharts来绘制电池背景，但实际上这里只是示例 -->
    <!-- 真实情况下，电池背景可以直接用CSS绘制 -->
    <div
      style="width: 100%; height: 100%; background-color: #007bff; position: absolute"
    ></div>
    <div
      style="
        position: absolute;
        top: 20%;
        left: 10%;
        width: 80%;
        height: 60%;
        background-color: white;
        border-radius: 5px;
      "
    ></div>
    <div
      style="
        position: absolute;
        top: 5px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 16px;
        color: white;
      "
    >
      90% SOC
    </div>
  </div>
</template>
<script lang="ts" setup></script>
