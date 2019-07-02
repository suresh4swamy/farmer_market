
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
        // this.profile(this.auth.currentUser.uid).set({ uid: this.auth.currentUser.uid, ...data });
        this.profile(this.auth.currentUser.uid).set({ ...data });
    }

    this.uploadFile = (aFile, aSuccessCallBackFn, aFailureCallBackFn) => {
        const storageRef = this.storage.ref();
        const img = storageRef.child(aFile.name);
        let uploadTask = img.put(aFile)
        uploadTask.then((snapshot) => {
            img.getDownloadURL().then((url) => {
                aSuccessCallBackFn(url);
            })
        })

        uploadTask.on("state_changed", (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');

            /*
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
            */

        }, (error) => {
            console.log("error uploading file");
            aFailureCallBackFn && aFailureCallBackFn(error);
        });

    }
};

export default personalDetailsDB;