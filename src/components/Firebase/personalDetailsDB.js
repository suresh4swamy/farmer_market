
const personalDetailsDB = function () {

    this.profile = uid => this.db.ref(`profiles/${uid}`);

    this.profiles = uid => this.db.ref(`profiles`);

    this.getProfile = callback => {
        if (this.auth.currentUser) {
            this.profiles().once('value', snap => {
                callback(snap.val());
            });
        }
    }

    this.doProfileUpdate = (data) => {
        console.log({ ...data });
        this.profile(this.auth.currentUser.uid).set({ uid: this.auth.currentUser.uid, ...data });
    }
};

export default personalDetailsDB;