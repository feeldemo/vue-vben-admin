<template>
  <component :is="iconComponent" />
</template>

<script>
import { defineComponent, computed } from 'vue';
import { Icon as IconifyIcon, createIcon } from '@iconify/vue';

export default defineComponent({
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  components: {
    IconifyIcon,
  },
  setup(props) {
    const iconComponent = computed(() => {
      // 根据传入的name动态导入图标，‌并创建Vue组件
      const icon = require(`@iconify-icons/${props.name.split(':')}/${props.name.split(':')}`).default;
      return createIcon(icon);
    });

    return {
      iconComponent,
    };
  },
});
</script>
