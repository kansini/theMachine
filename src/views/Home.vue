<template>
  <div class="home">
    <tm-terminal/>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import tmTerminal from '@/components/kits/terminal/Terminal.vue'

export default defineComponent({
  name: 'Home',
  components: {
    tmTerminal
  },
  setup() {

  }
})
</script>
<style lang="scss" scoped>
.home {
  position: relative;
  width: 100%;
  height: 100vh;
  padding: $tm-basic-unit;
  color: $tm-color-text;
}
</style>
