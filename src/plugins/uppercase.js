const uppercase = {
  install (Vue, options) {
    const setVue = Vue
    setVue.prototype.$toUpperCase = (str) => {
      const matcher = (txt) => {
        const res = txt.toUpperCase()
        return res
      }

      return str.replace(/\w\S*/g, matcher)
    }
  }
}

// Usage example:
// {{ $toUpperCase(str) }}
export default uppercase
