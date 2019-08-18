import api from '@/api';

/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = {
  notes: {},
  loading: true,
  saved: false,
  modal: false,
  modalType: 'add',
  noteItem: null,
  formError: false,
};

const getters = {
  allNotes: state => state.notes,
  showLoading: state => state.loading,
  editNote: state => state.noteItem,
};

// Hint:
// commit is for mutations, while dispatch is for actions

const actions = {
  resetSavedState({ commit }) {
    commit('setSaved', false);
  },

  showModal({ commit }) {
    commit('setModal', true);
  },

  setType({ commit, dispatch }, params) {
    commit('setModalType', params.selector);
    if (params.id) {
      dispatch('fetchNote', params.id);
    }
  },

  fetchNotes({ commit }) {
    commit('setLoading', true);

    api.getNotes().then(data => {
      // console.log('getNodes fetched: ', data.val());
      commit('setNotes', data.val());
      commit('setLoading', false);
    });
  },

  fetchNote({ commit }, params) {
    const { id } = params;
    console.log('fetchNote: ', id);
    api.getNote(id).then(data => {
      // console.log('fetchNote: ', data.val());
      const item = data.val();
      item.id = id;
      commit('setNoteItem', item);
    });
  },

  editNote({ commit, dispatch }, params) {
    commit('setError', false);

    const { id } = params;
    // remove id from params object
    delete params.id;
    const payload = params;

    api
      .editNote(id, payload).then(() => {
        commit('setSaved', true);
        // dispatch('fetchNotes');
      })
      .catch(error => {
        console.error(error);
        commit('setError', true);
      });
  },

  addNotes({ commit }, form) {
    commit('setError', false);
    api
      .addNote(form).then(() => {
        console.log('note added: ', form);
        commit('newNote', form);
        commit('setSaved', true);
      })
      .catch(error => {
        console.error(error);
        commit('setError', true);
      });
  },
};

const mutations = {
  setNotes: (state, notes) => (state.notes = notes),
  newNote: (state, note) => state.notes.note,
  setNoteItem: (state, noteItem) => (state.noteItem = noteItem),

  setLoading: (state, loading) => (state.loading = loading),
  setSaved: (state, saved) => (state.saved = saved),
  setError: (state, formError) => (state.formError = formError),

  setModal: (state, modal) => (state.modal = modal),
  setModalType: (state, modalType) => (state.modalType = modalType),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
