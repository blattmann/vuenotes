<script>
import moment from 'moment';

const locale = 'en';
// let dateFormat = 'Do MMMM YYYY' // 29th June 2018
let dateFormat = 'MM/DD/YYYY'; // 29/06/2018

if (locale === 'de') {
  dateFormat = 'DD. MMMM YYYY'; // 29. Juni 2018
}

moment.locale(locale); // returns the new locale

export default {
  methods: {
    formatDate(date) {
      let ret = null;
      if (date) {
        ret = moment(date).format(dateFormat);
      }
      // console.log('ret: ', ret)
      return ret;
    },
    formatTime(date) {
      const timeFormat = 'HH:mm'; // 24 hours
      return moment(date).format(timeFormat);
    },
    elapsed(t1, t2) {
      // console.log('duration: ', t1, t2)
      const elapsed = new Date(t2) - new Date(t1); // time in milliseconds
      // console.log('elapsed: ', elapsed)

      const res = this.duration(elapsed);
      // console.log('res: ', res)

      return res;
    },
    duration(ms) {
      let d = null;
      let h = null;
      let m = null;
      let s = null;
      s = Math.floor(ms / 1000);
      m = Math.floor(s / 60);
      s %= 60;
      h = Math.floor(m / 60);
      m %= 60;
      d = Math.floor(h / 24);
      h %= 24;

      return {
        d: d, h: h, m: m, s: s,
      };
    },
  },
};
</script>
