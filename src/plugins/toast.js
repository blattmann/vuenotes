import Toasted from 'vue-toasted'

const toast = {
  install(Vue) {
    const setVue = Vue
    setVue.use(Toasted).prototype.$showToast = (vm, message, type) => {
      // Fix for singleton option not working
      vm.$toasted.clear()

      let toastClass = ''

      switch (type) {
        case 'warning':
          toastClass = 'sb-toast__content sb-toast__content--warning'
          break
        case 'error':
          toastClass = 'sb-toast__content sb-toast__content--error'
          break
        default:
          toastClass = 'sb-toast__content sb-toast__content--success'
          break
      }

      vm.$toasted.show(message, {
        theme: 'bubble',
        position: 'top-center',
        fullWidth: true,
        fitToScreen: false,
        singleton: true,
        containerClass: 'sb-toast__container',
        className: toastClass,
        duration: 5000
      })
    }
  }
}

// Usage example:
// {{ $showToast(this, 'success text', 'success') }}
export default toast
