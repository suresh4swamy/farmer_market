
const uploadFilesDB = function () {
    const upload = (aId, aFolder, aFile, onUploadProgress, aSuccessCallBackFn, aFailureCallBackFn) => {
        const storageRef = this.storage.ref();
        const img = typeof aFolder === "string" ? storageRef.child(aFolder).child(aFile.name) : storageRef.child(aFile.name);
        let uploadTask = aFile.base64 ? img.putString(aFile.base64.replace("data:image/jpeg;base64,", ""), 'base64', { contentType: 'image/jpeg' }) : img.put(aFile);
        // console.log(aFile);
        uploadTask.then((snapshot) => {
            img.getDownloadURL().then((url) => {
                aSuccessCallBackFn(url, aId);
            })
        })

        uploadTask.on("state_changed", (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onUploadProgress(progress, aId);

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
            aFailureCallBackFn && aFailureCallBackFn(error, aId);
        });

    }

    this.uploadFile = (aFile, aSuccessCallBackFn, aFailureCallBackFn) => {
        let onUploadProgress = progress => {
            console.log('Upload is ' + progress + '% done');
        }
        upload.call(this, null, null, aFile, onUploadProgress, aSuccessCallBackFn, aFailureCallBackFn);
    }
    this.uploadImage = (aId, aFile, onUploadProgress, aSuccessCallBackFn, aFailureCallBackFn) => {
        upload.call(this, aId, "images", aFile, onUploadProgress, aSuccessCallBackFn, aFailureCallBackFn);
    }
}

export default uploadFilesDB;