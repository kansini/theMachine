<template>
  <div class="home">
    <tm-line label="connection established"/>
    <tm-line :value="data" editable @change="data = $event.target.innerText"/>
    <tm-line label="warning" type="warning" value=" ✨ Done in 88.04s."/>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import tmLine from '@/components/kits/Line.vue'

export default defineComponent({
  name: 'Home',
  components: {
    tmLine
  },
  setup() {
    const data = ref('success')
    return {
      data
    }
  }
})
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100vh;
  padding: $tm-basic-unit;
  background: $tm-color-bg;
  color: $tm-color-text;
}
</style>
