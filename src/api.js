import axios from 'axios'
import Firebase from 'firebase'
// import firebase from 'firebase/app'

// Import static data (translations, etc)
import StaticData from '@/data/i18n.json'

const projectUrl = 'https://stefan-blattmann.firebaseapp.com/'

/* eslint-disable */
// console.log('projectUrl: ', projectUrl)

const firebaseApp = Firebase.initializeApp({
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

  addNote(payload) {},

  editNote(id, payload) {
    const db = Firebase.database()
    const path = `opensource/notebook/${id}`
    const res = db.ref(path).set('payload')
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
