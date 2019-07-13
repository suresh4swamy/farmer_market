import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import personalDetailsDB from './personalDetailsDB';
import uploadFilesDB from './uploadFilesDB';

// const config = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
// };
const config = {
  apiKey: "AIzaSyCfcqEtePmv6RcULmQeEtt82mhGOMupdqU",
  authDomain: "farmersaleplatfo-1561457656175.firebaseapp.com",
  databaseURL: "https://farmersaleplatfo-1561457656175.firebaseio.com",
  projectId: "farmersaleplatfo-1561457656175",
  storageBucket: "farmersaleplatfo-1561457656175.appspot.com",
  messagingSenderId: "798114275164",
  appId: "1:798114275164:web:c5df9369173d7887"
};

class Firebase {
  constructor() {

    app.initializeApp(config);

    /* Helper */

    this.serverValue = app.database.ServerValue;
    this.emailAuthProvider = app.auth.EmailAuthProvider;

    /* Firebase APIs */

    this.auth = app.auth();
    this.db = app.database();
    this.storage = app.storage();

    // include functions of external files.
    this.attachOtherCollection();

    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
    this.twitterProvider = new app.auth.TwitterAuthProvider();
  }

  // Append other Collection to this instance
  attachOtherCollection() {
    // User personal Details DB Api
    personalDetailsDB.call(this);
    // File upload Api
    uploadFilesDB.call(this);
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () =>
    this.auth.signInWithPopup(this.facebookProvider);

  doSignInWithTwitter = () =>
    this.auth.signInWithPopup(this.twitterProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doSendEmailVerification = () =>
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password)


  getAuthUser = () => {
    const authUser = JSON.parse(localStorage.getItem('authUser'));
    return authUser;
  }

  setAuthUser = authUser => {
    if (authUser) {
      localStorage.setItem('authUser', JSON.stringify(authUser));
    } else {
      localStorage.removeItem('authUser');
    }
  }

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) => {
    console.error("onAuthStateChange");
    return this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .on('value', snapshot => {
            const dbUser = snapshot.val();

            // // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            console.log(authUser);
            next(authUser);
          });
      } else {
        fallback();
      }
    });
  }
  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Message API ***
  message = uid => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref('messages');

}

export default Firebase;
