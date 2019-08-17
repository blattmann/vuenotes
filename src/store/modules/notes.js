import api from '@/api';

/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = {
  notes: [],
  loading: true,
  saved: false,
  modal: false,
  modalType: 'add',
  noteItem: null,
};

const getters = {
  allNotes: state => state.notes,
  showLoading: state => state.loading,
  editNote: state => state.noteItem,
};

const actions = {
  resetSavedState({ commit }) {
    commit('setSaved', false);
  },

  showModal({ commit }) {
    commit('setModal', true);
  },

  hideModal({ commit }) {
    commit('setModal', false);
  },

  setType({ commit, dispatch }, params) {
    commit('setModalType', params.selector);
    dispatch('fetchNote', params.id);
  },

  fetchNotes({ commit }) {
    commit('setLoading', true);

    api.getNotes().then(data => {
      // console.log('getNodes fetched: ', data.val());
      commit('setNotes', data.val());
      commit('setLoading', false);
    });
  },

  fetchNote({ commit }, id) {
    // console.log('fetchNote: ', id);
    api.getNote(id).then(data => {
      // console.log('fetchNote: ', data.val());
      const item = data.val();
      item.id = id;
      commit('setNoteItem', item);
    });
  },

  addNotes({ commit }, form) {
    api
      .addNote(form).then(() => {
        console.log('note added: ', form);
        // vm.$refs.modalform.reset();
        // // show toast
        // vm.$showToast(vm, vm.i18n.toast.toastDataSaved, 'success');

        // eb.$emit('receiveNote', true);
        // // redirect to notes listing if on different page
        // vm.redirect();
        commit('newNote', form);
        commit('setSaved', true);
      })
      .catch(error => {
        console.error(error);
        // show toast
        // vm.$showToast(vm, `${vm.i18n.toast.toastDataError} ${vm.processError(error)}`, 'error');
      });
  },
};

const mutations = {
  setNotes: (state, notes) => (state.notes = notes),
  // setNotes: (state, notes) => state.notes.push(notes),
  setLoading: (state, loading) => (state.loading = loading),
  newNote: (state, note) => state.notes.note,
  // newNote: (state, note) => state.notes.push(note),
  setSaved: (state, saved) => (state.saved = saved),
  setModal: (state, modal) => (state.modal = modal),
  setModalType: (state, modalType) => (state.modalType = modalType),
  setNoteItem: (state, noteItem) => (state.noteItem = noteItem),
};

export default {
  state,
  getters,
  actions,
  mutations,
};

// const fbNotes = () => {
//   api.getNotes().then(data => {
//     console.log('getNodes new: ', data.val());
//     return data.val();
//   });
// };
