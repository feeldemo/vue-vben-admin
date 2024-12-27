<script lang="ts" setup>
import { EchartsUI, type EchartsUIType, useEcharts } from '@vben/plugins/echarts';
import { computed, onMounted, ref } from 'vue';

const chartRef = ref<EchartsUIType>();
const { renderEcharts } = useEcharts(chartRef);

interface Props {
  titleDatas: Array<string>;
  datas: Array<DataItem>;
}

export interface DataItem {
  name: string | number;
  key: string | number;
  value: string | number;
}

interface LineDataItems {
  name: string | number | any,
  type: 'line',
  data: Array<string | number>
}

defineOptions({
  name: 'ProjectLineView',
});

const props = withDefaults(defineProps<Props>(), {
  tilteDatas: () => [],
  datas: () => []
});
const seriesData = computed(() => {
  const map = new Map<string | number, LineDataItems>();
  props.datas.forEach(data => {
    const existing = map.get(data.name);
    if (existing) {
      existing.data.push(data.value);
    } else {
      map.set(data.name, {
        name: data.name,
        type: 'line',
        data: [data.value]
      });
    }
  });
  return [...map.values()];
});

const xAxisData = computed(() => [...new Set(props.datas.map(v => v.key))]);

onMounted(() => {
  if (props.datas && props.datas.length > 0 && props.titleDatas && props.titleDatas.length > 0) {
    renderEcharts({
      legend: {
        data: props.titleDatas,
        right: "10",
        top: '10'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxisData.value
      },
      yAxis: {
        type: 'value'
      },
      series: seriesData.value,
      tooltip: {
        trigger: 'axis'
      },
    });
  }
});
</script>

<template>
  <EchartsUI ref="chartRef" />
</template>

<style scoped>
/* 添加一些样式如果需要 */
</style>
