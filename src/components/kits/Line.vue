<template>
  <div class="tm-line"
       :contenteditable="editable"
       @blur="handleToChange($event)"
       @keydown.enter="handleToEnter($event)"
  >
    <span :class="`tm-label-${type}`" v-if="label && label.length > 0">{{ label }}</span>
    {{ value }}
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "TmLine",
  props: {
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'success'
    },
    editable: {
      type: Boolean,
      default: false
    },
    value: {}
  },
  setup(props, {emit}) {
    function handleToChange(e) {
      emit('change', e)
    }

    function handleToEnter(e) {
      emit('enter', e)
    }

    return {
      handleToChange,
      handleToEnter
    }
  }
})
</script>

<style lang="scss" scoped>

.tm-line {
  color: $tm-color-text;
  margin-bottom: $tm-basic-unit;

  &:focus {
    border: none;
    outline: none;
  }

  [class^="tm-label-"] {
    padding: 0 4px;
    margin-right: $tm-basic-unit;
    color: $tm-color-bg;
  }

  .tm-label-success {
    background: $tm-color-success;
  }

  .tm-label-info {
    background: $tm-color-info;
  }

  .tm-label-warning {
    background: $tm-color-warning;
  }

  .tm-label-error {
    background: $tm-color-error;
  }
}
</style>
