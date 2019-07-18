
const personalDetailsCollection = function () {

    this.getProfile = callback => {
        if (this.auth.currentUser) {
            this.user(this.auth.currentUser.uid).once('value', snap => {
                callback(snap.val());
            });
        }
    }

    this.doProfileUpdate = (data) => {
        return this.user(this.auth.currentUser.uid).update({ ...data });
    }
};

export default personalDetailsCollection;