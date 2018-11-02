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
    const res = db.ref(path).once('value')
    return res
  },

  getNote(id) {
    const db = Firebase.database()
    const path = `opensource/notebook/${id}`
    const res = db.ref(path).once('value')
    return res
  },

  addNote(payload) {
    const db = Firebase.database()
    const path = `opensource/notebook`
    const res = db.ref(path).push(payload)
    return res
  },

  editNote(id, payload) {
    const db = Firebase.database()
    const path = `opensource/notebook/${id}`
    const res = db.ref(path).set(payload)
    return res
  },

  deleteNote(id) {},

  // Get language paramaters
  getLanguePack(lang) {
    const trans = StaticData
    let ret = ''
    /* eslint-disable */
    if (lang === '') {
      lang = 'en'
    }
    ret = trans.translations[lang]

    return ret
  }
}
