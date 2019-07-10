
const personalDetailsDB = function () {

    this.getProfile = callback => {
        if (this.auth.currentUser) {
            this.user(this.auth.currentUser.uid).once('value', snap => {
                callback(snap.val());
            });
        }
    }

    this.doProfileUpdate = (data) => {
        this.user(this.auth.currentUser.uid).update({ ...data });
    }
};

export default personalDetailsDB;