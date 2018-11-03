import Firebase from 'firebase'

// Import static data (translations, etc)
import StaticData from '@/data/i18n.json'

/* eslint-disable */

Firebase.initializeApp({
  // Populate your firebase configuration data here.
  apiKey: 'AIzaSyDEHMQ5iQobQmyeCIAE2N5b4OR3FBEIDdg',
  authDomain: 'stefan-blattmann.firebaseapp.com',
  databaseURL: 'https://stefan-blattmann.firebaseio.com',
  projectId: 'stefan-blattmann',
  storageBucket: 'stefan-blattmann.appspot.com',
  messagingSenderId: '878059176831'
})

export default {
  // Ref: https://firebase.google.com/docs/database/web/read-and-write

  getNotes() {
    const db = Firebase.database()
    const path = 'opensource/notebook'
    return db.ref(path).once('value')
  },

  getNote(id) {
    const db = Firebase.database()
    const path = `opensource/notebook/${id}`
    return db.ref(path).once('value')
  },

  addNote(payload) {
    const db = Firebase.database()
    const path = `opensource/notebook`
    return db.ref(path).push(payload)
  },

  editNote(id, payload) {
    const db = Firebase.database()
    const path = `opensource/notebook/${id}`
    return db.ref(path).set(payload)
  },

  deleteNote(id) {
    const db = Firebase.database()
    const path = `opensource/notebook/${id}`
    return db.ref(path).remove()
  },

  // Get language paramaters
  getLanguePack(lang) {
    const trans = StaticData
    /* eslint-disable */
    if (lang === '') {
      lang = 'en'
    }
    return trans.translations[lang]
  }
}
