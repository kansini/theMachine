<template>
  <div class="tm-terminal">
    <tm-terminal-header title="admin"/>
    <div class="tm-terminal-content">
      <tm-shell
          :banner="banner"
          :commands="commands"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import TmTerminalHeader from "./TerminalHeader.vue";
import TmLine from "./Line.vue";
import TmShell from "./Shell.vue";

export default defineComponent({
  name: "Terminal",
  components: {
    TmTerminalHeader,
    TmLine,
    TmShell
  },
  setup() {
    const banner = ref({
          header: "Vue Shell",
          subHeader: "Shell is power just enjoy 🔥",
          helpHeader: 'Enter "help" for more information.',
          emoji: {
            // first: "🔅",
            // second: "🔆",
            // time: 750
          },
          sign: "VueShell$"
        }
    )
    const commands = ref([
      { name: "info",
        desc: "Show information about this terminal",
        get() {
          return `<span>Made With ❤ ️By Old Flood</span>`;
        }
      },
      {
        name: "uname",
        desc: "Show the current terminal name",
        get() {
          return navigator.appVersion;
        }
      }
    ])
    return {
      banner,
      commands
    }
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
    padding: 2px $tm-basic-unit;
    background: rgba(0, 0, 0, .9);
    backdrop-filter: blur(6px);
    overflow-y: scroll;
  }
}
</style>
