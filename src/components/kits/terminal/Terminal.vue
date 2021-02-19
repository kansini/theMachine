<template>
  <div class="tm-terminal">
    <tm-terminal-header title="admin"/>
    <div class="tm-terminal-content">
      <tm-line value="System Initializing" />
      <tm-line label="connect established"/>
      <tm-line value="username:" editable/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import TmTerminalHeader from "./TerminalHeader.vue";
import TmLine from "../Line.vue";

export default defineComponent({
  name: "Terminal",
  components: {
    TmTerminalHeader,
    TmLine
  }
})
</script>

<style lang="scss" scoped>
.tm-terminal {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 720px;
  height: 560px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 20px 30px 0 rgba(0, 0, 0, .2);

  .tm-terminal-content {
    width: 100%;
    height: calc(100% - 24px);
    padding:2px $tm-basic-unit;
    background: rgba(0, 0, 0, .9);
    backdrop-filter: blur(6px);
    overflow-y: scroll;
  }
}
</style>
