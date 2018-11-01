import Firebase from 'firebase'
import 'firebase/firestore'
import firebaseinit from '@/firebaseInit'

const firebaseMainConfig = firebaseinit.mainconfig

export default {
  install: (Vue, options) => {
    const setVue = Vue
    const firebase = Firebase.initializeApp(firebaseMainConfig)
    let db = firebase.firestore()
    const settings = { timestampsInSnapshots: true }
    db.settings(settings)
    console.log('install firestore')

    setVue.prototype.$db = {
      firestore: () => {
        let fs = firebase.firestore()
        fs.settings(settings)

        return fs
      },
      getCollection: (name, orderBy = null) => {
        const items = db.collection(name)
        db.collection('events').onSnapshot(snapshot => {
          console.log(snapshot)
          snapshot.docChanges().forEach(function(change) {
            console.log(change.doc.data())
          })
        })
        return items
      }
    } */
  }
}
