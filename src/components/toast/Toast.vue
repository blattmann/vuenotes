<template>
  <v-snackbar v-model="toast" :bottom="y === 'bottom'" :color="color" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'">
    {{ text }}
    <v-btn class="sw-toast__btn" flat @click="toast = false">
      {{ i18n.close }}
    </v-btn>
  </v-snackbar>
</template>

<script>
import EventBus from '@/eventbus'
/**
 * Snackbar API - Vuetifyjs : https://vuetifyjs.com/en/components/snackbars#api
 * color: ['success', 'info', 'error', 'cyan darken-2']
 */
export default {
  name: 'ToastComponent',
  props: ['snackbar', 'y', 'color', 'x', 'mode', 'timeout', 'text'],
  data() {
    return {
      i18n: this.$root.$data.Translation,
      toast: false
    }
  },
  watch: {
    toast: value => {
      EventBus.$emit('toastChange', value)
    }
  },
  created() {
    const vm = this
    vm.toast = vm.snackbar
    console.log(vm.color)
  }
}
</script>
