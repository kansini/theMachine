<template>
  <div class="tm-terminal-header">
    <div class="btn-group">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="title" v-if="title">{{ title }}</div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "TerminalHeader",
  props: {
    title: {
      Type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss" scoped>
.tm-terminal-header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 32px;
  padding: 0 16px;
  background: rgba(245, 245, 245, .8);
  box-shadow: inset 0 1px 3px 0 rgba(255, 255, 255, 0.50);
  backdrop-filter: blur(8px);

  .btn-group {
    display: flex;


    div {
      width: 12px;
      height: 12px;
      border-radius: 6px;
      box-shadow: $tm-traffic-light-border;
      margin-right: 8px;
    }

    div:nth-child(1) {
      background: $tm-traffic-light-red;
    }

    div:nth-child(2) {
      background: $tm-traffic-light-yellow;
    }

    div:nth-child(3) {
      background: $tm-traffic-light-green;
    }
  }

  .title {
    color: #333;
  }
}
</style>
