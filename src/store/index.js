import Vuex from 'vuex';
import Vue from 'vue';
import notes from './modules/notes';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    notes,
  },
});
