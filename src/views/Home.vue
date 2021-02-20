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
})
</script>
<style lang="scss" scoped>
.home {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url("../assets/img/main_bg.jpg") no-repeat center;
  background-size: cover;
  // padding: $tm-basic-unit;
  color: $tm-color-text;
  overflow: hidden;
}
</style>
