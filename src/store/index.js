import Vuex from 'vuex';
import Vue from 'vue';
import notes from '@/store/modules/notes';
// import todos from '@/store/modules/todos';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    notes,
    // todos,
  },
});
