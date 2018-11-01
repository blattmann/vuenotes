// Firebase configuration

import settings from '@/config/settings.js'

const host = settings.host

const firebaseMainConfig = {
  apiKey: 'AIzaSyDEHMQ5iQobQmyeCIAE2N5b4OR3FBEIDdg',
  authDomain: 'stefan-blattmann.firebaseapp.com',
  databaseURL: 'https://stefan-blattmann.firebaseio.com',
  projectId: 'stefan-blattmann',
  storageBucket: 'stefan-blattmann.appspot.com',
  messagingSenderId: '878059176831'
}

const firebaseApp = {
  mainconfig: firebaseMainConfig
}

export default firebaseApp
